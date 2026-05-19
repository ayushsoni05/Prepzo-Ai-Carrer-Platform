/**
 * LaTeX Compiler Service
 * Compiles LaTeX source to PDF using pdflatex.
 * Falls back to a simple "no pdflatex" error message if texlive is not installed.
 */

import { exec } from 'child_process';
import { writeFileSync, readFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import os from 'os';

const COMPILE_TIMEOUT = 30000; // 30 seconds

/**
 * Compile a LaTeX source string to a PDF.
 * @param {string} latexSource - The full .tex content
 * @returns {{ pdf: string, log: string }} pdf is base64-encoded
 */
export const compileLatexToPdf = async (latexSource) => {
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
 * Check if pdflatex is available on this system.
 */
export const isPdflatexAvailable = () =>
  new Promise((resolve) => {
    exec('pdflatex --version', { timeout: 5000 }, (error) => {
      resolve(!error);
    });
  });
