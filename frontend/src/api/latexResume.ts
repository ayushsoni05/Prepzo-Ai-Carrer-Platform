/**
 * LaTeX Resume API Module
 * Handles LaTeX compilation, AI-powered generation, and source persistence.
 */

import axiosInstance from './axios';

// ---------- Types ----------

export interface CompileLatexResponse {
  success: boolean;
  data: {
    /** Base64-encoded PDF */
    pdf: string;
    /** pdflatex stdout / log */
    log: string;
  };
}

export interface GenerateLatexResponse {
  success: boolean;
  data: {
    /** The LaTeX source with user data filled in */
    latex: string;
    /** Helpful tips from AI */
    tips: string[];
  };
}

// ---------- API Functions ----------

/**
 * Compile a LaTeX source string into a PDF on the backend.
 * Returns the PDF as a base64 string.
 */
export const compileLatex = async (
  latexSource: string
): Promise<CompileLatexResponse> => {
  const response = await axiosInstance.post('/resume/compile-latex', {
    latexSource,
  });
  return response.data;
};

/**
 * Ask the AI to populate a LaTeX template with the user's profile data.
 * @param extractedData - Freshly parsed resume data from the analyze step (optional but recommended).
 */
export const generateLatexResume = async (
  templateId: string,
  targetRole: string,
  jobDescription?: string,
  extractedData?: Record<string, unknown>
): Promise<GenerateLatexResponse> => {
  const response = await axiosInstance.post('/resume/generate-latex', {
    templateId,
    targetRole,
    jobDescription,
    extractedData,
  });
  return response.data;
};

/**
 * Persist the user's current LaTeX source & template choice.
 */
export const saveLatexSource = async (
  latexSource: string,
  templateId: string
): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.put('/resume/latex-source', {
    latexSource,
    templateId,
  });
  return response.data;
};

/**
 * Retrieve the user's saved LaTeX source.
 */
export const getLatexSource = async (): Promise<{
  success: boolean;
  data: { latexSource: string; templateId: string };
}> => {
  const response = await axiosInstance.get('/resume/latex-source');
  return response.data;
};
