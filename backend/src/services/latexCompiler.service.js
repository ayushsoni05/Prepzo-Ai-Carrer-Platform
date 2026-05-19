/**
 * LaTeX Compiler Service
 * Compiles LaTeX source to PDF using local pdflatex if available,
 * otherwise falls back automatically to the texlive.net cloud API.
 */

import { exec } from 'child_process';
import { writeFileSync, readFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import os from 'os';
import axios from 'axios';

const COMPILE_TIMEOUT = 30000; // 30 seconds

/**
 * Compile a LaTeX source string to a PDF.
 * @param {string} latexSource - The full .tex content
 * @returns {Promise<{ pdf: string, log: string }>} pdf is base64-encoded
 */
export const compileLatexToPdf = async (latexSource) => {
  const isAvailable = await isPdflatexAvailable();

  if (isAvailable) {
    console.log('[latexCompiler] pdflatex detected locally. Compiling on-machine...');
    return compileLocal(latexSource);
  } else {
    console.log('[latexCompiler] pdflatex not found. Compiling via texlive.net cloud API...');
    return compileCloudFallback(latexSource);
  }
};

/**
 * Check if pdflatex is available on this system.
 */
export const isPdflatexAvailable = () =>
  new Promise((resolve) => {
    exec('pdflatex --version', { timeout: 5000 }, (error) => {
      resolve(!error);
    });
  });

/**
 * Compile LaTeX locally using local pdflatex
 */
const compileLocal = async (latexSource) => {
  const jobId = randomUUID();
  const tmpBase = path.join(os.tmpdir(), 'latex-jobs');
  const workDir = path.join(tmpBase, jobId);

  try {
    mkdirSync(workDir, { recursive: true });

    const texFile = path.join(workDir, 'resume.tex');
    writeFileSync(texFile, latexSource, 'utf-8');

    // Run pdflatex twice (for references / cross-refs)
    const cmd = `pdflatex -interaction=nonstopmode -halt-on-error -output-directory="${workDir}" "${texFile}"`;

    const runLatex = () =>
      new Promise((resolve, reject) => {
        exec(cmd, { timeout: COMPILE_TIMEOUT, cwd: workDir }, (error, stdout, stderr) => {
          resolve({ error, stdout, stderr });
        });
      });

    // First pass
    const pass1 = await runLatex();

    // Second pass (for cross-references)
    await runLatex();

    const pdfPath = path.join(workDir, 'resume.pdf');
    const logPath = path.join(workDir, 'resume.log');

    let log = '';
    if (existsSync(logPath)) {
      try { log = readFileSync(logPath, 'utf-8'); } catch { /* ignore */ }
    } else {
      log = pass1.stdout || '';
    }

    if (existsSync(pdfPath)) {
      const pdfBuffer = readFileSync(pdfPath);
      return {
        pdf: pdfBuffer.toString('base64'),
        log: log.slice(-3000), // last 3000 chars of log
      };
    }

    // No PDF produced → compilation failed
    throw new Error(
      `pdflatex did not produce a PDF.\n\n${log.slice(-2000)}`
    );
  } finally {
    // Cleanup temp directory
    try {
      if (existsSync(workDir)) {
        rmSync(workDir, { recursive: true, force: true });
      }
    } catch { /* best-effort cleanup */ }
  }
};

/**
 * Compile LaTeX using texlive.net cloud API fallback
 */
const compileCloudFallback = async (latexSource) => {
  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  const body = [
    '--' + boundary,
    'Content-Disposition: form-data; name="filecontents[]"',
    '',
    latexSource,
    '--' + boundary,
    'Content-Disposition: form-data; name="filename[]"',
    '',
    'document.tex',
    '--' + boundary,
    'Content-Disposition: form-data; name="engine"',
    '',
    'pdflatex',
    '--' + boundary,
    'Content-Disposition: form-data; name="return"',
    '',
    'pdf',
    '--' + boundary + '--',
    ''
  ].join('\r\n');

  try {
    const res = await axios.post('https://texlive.net/cgi-bin/latexcgi', body, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary
      },
      responseType: 'arraybuffer',
      timeout: COMPILE_TIMEOUT
    });

    const pdfBuffer = Buffer.from(res.data);
    const pdfBase64 = pdfBuffer.toString('base64');

    // Check if the response is actually a PDF (starts with JVBERi0xLjcKJdDUxdgK or similar %PDF magic bytes)
    if (!pdfBase64.startsWith('JVBERi')) {
      // Decode response to see if it's an error log
      const responseText = pdfBuffer.toString('utf-8');
      throw new Error(`Cloud LaTeX compilation failed:\n\n${responseText.slice(0, 1500)}`);
    }

    return {
      pdf: pdfBase64,
      log: 'Successfully compiled using texlive.net cloud fallback service.'
    };
  } catch (err) {
    throw new Error(`Cloud LaTeX compilation error: ${err.message}`);
  }
};
