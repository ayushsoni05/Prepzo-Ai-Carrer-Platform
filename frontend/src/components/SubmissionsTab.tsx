import React, { useState } from 'react';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Code2, AlertCircle } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

export interface Submission {
  _id: string;
  problemId: string;
  language: string;
  code: string;
  status: string;
  testCasesPassed: number;
  totalTestCases: number;
  createdAt: string;
}

interface SubmissionsTabProps {
  submissions: Submission[];
  loading: boolean;
}

const LANGUAGE_EXTENSIONS: Record<string, any> = {
  javascript: javascript({ jsx: true }),
  python: python(),
  cpp: cpp(),
  java: java()
};

export const SubmissionsTab: React.FC<SubmissionsTabProps> = ({ submissions, loading }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <Code2 className="w-12 h-12 mb-4 opacity-20" />
        <p>No submissions yet for this problem.</p>
        <p className="text-sm mt-2 opacity-60">Submit your code to see history.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] relative">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium">Past Submissions ({submissions.length})</h3>
        </div>
        
        {submissions.map((sub) => {
          const isAccepted = sub.status === 'Accepted';
          const isWrong = sub.status === 'Wrong Answer';
          
          return (
            <div 
              key={sub._id} 
              className="bg-[#2d2d2d] rounded-lg p-4 border border-gray-700 hover:border-indigo-500/50 transition-colors cursor-pointer"
              onClick={() => setSelectedSubmission(sub)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {isAccepted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : isWrong ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <div className={`font-medium ${isAccepted ? 'text-green-500' : isWrong ? 'text-red-500' : 'text-yellow-500'}`}>
                      {sub.status}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <span className="capitalize">{sub.language}</span>
                      <span>•</span>
                      <span>{format(new Date(sub.createdAt), 'MMM d, yyyy HH:mm')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-300">
                    <span className="font-mono">{sub.testCasesPassed}</span> / <span className="font-mono">{sub.totalTestCases}</span> testcases
                  </div>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 font-medium">
                    View Code
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Modal */}
      {selectedSubmission && (
        <div className="absolute inset-0 bg-[#1e1e1e] z-10 flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-[#252526]">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700"
              >
                &larr; Back
              </button>
              <span className="text-sm text-gray-300 font-medium">
                {selectedSubmission.status} • {format(new Date(selectedSubmission.createdAt), 'MMM d, yyyy HH:mm')}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeMirror
              value={selectedSubmission.code}
              height="100%"
              theme={vscodeDark}
              extensions={[LANGUAGE_EXTENSIONS[selectedSubmission.language] || LANGUAGE_EXTENSIONS.javascript]}
              editable={false}
              className="h-full text-sm font-mono"
            />
          </div>
        </div>
      )}
    </div>
  );
};
