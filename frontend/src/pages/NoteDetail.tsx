import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Clock,
  Download,
  AlertCircle,
  FileText
} from 'lucide-react';
import { getNoteById, Note } from '@/api/notes';
import { useAppStore } from '@/store/appStore';

export const NoteDetail: React.FC = () => {
  const { selectedNoteId, setCurrentPage } = useAppStore();
  const noteId = selectedNoteId;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) return;
      try {
        setLoading(true);
        const data = await getNoteById(noteId);
        setNote(data);
      } catch (err) {
        console.error('Failed to fetch note:', err);
        setError('Failed to load study material.');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6">
        <div className="relative w-16 h-16">
          <motion.div 
            className="absolute inset-0 border-t-2 border-r-2 border-blue-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-2 border-b-2 border-l-2 border-blue-400/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse italic">
          Decrypting File...
        </p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="p-12 text-center border border-white/5 bg-black rounded-[32px] flex flex-col items-center justify-center min-h-[400px] max-w-4xl mx-auto mt-12">
        <AlertCircle className="mb-6 text-red-500/50" size={48} />
        <h3 className="text-xl font-[900] text-white mb-2 uppercase tracking-widest italic">File Not Found</h3>
        <p className="text-white/30 mb-8 italic text-sm">{error || "The requested study material does not exist or has been removed."}</p>
        <button 
          onClick={() => {
            setCurrentPage('notes');
            window.location.hash = 'notes';
          }}
          className="px-8 py-3 bg-white/5 text-white border border-white/10 font-[900] text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all italic cursor-pointer"
        >
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 font-rubik p-4 md:p-8">
      {/* Back Button */}
      <button 
        onClick={() => {
          setCurrentPage('notes');
          window.location.hash = 'notes';
        }}
        className="inline-flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest italic hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none"
      >
        <ArrowLeft size={14} /> Back to Library
      </button>

      {/* Header Info */}
      <div className="bg-black border border-white/5 p-8 md:p-12 rounded-[40px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md border ${note.difficulty === 'advanced' ? 'text-red-400 border-red-400/20 bg-red-400/5' : note.difficulty === 'intermediate' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' : 'text-blue-400 border-blue-400/20 bg-blue-400/5'}`}>
            {note.difficulty}
          </span>
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] bg-white/[0.02] px-3 py-1.5 rounded-md">
            {note.category}
          </span>
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] bg-white/[0.02] px-3 py-1.5 rounded-md">
            {note.subSkill}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-black text-white/30 uppercase tracking-widest ml-auto">
            <Clock size={12} /> {note.readTimeMinutes} min read
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-[900] text-white italic tracking-tighter uppercase mb-6 leading-tight">
          {note.title}
        </h1>

        <p className="text-lg text-white/50 italic leading-relaxed max-w-4xl mb-8">
          {note.summary}
        </p>

        <a 
          href={note.content} 
          target="_blank" 
          rel="noopener noreferrer"
          download
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-400 text-black font-[900] text-[11px] uppercase tracking-widest rounded-xl hover:scale-105 transition-transform italic shadow-[0_0_20px_rgba(96,165,250,0.3)]"
        >
          <Download size={16} /> Download Full PDF
        </a>
      </div>

      {/* PDF Viewer Area */}
      <div className="bg-[#0a0c10] border border-white/5 rounded-[40px] p-4 md:p-8">
        <div className="flex items-center gap-3 mb-6 px-4">
          <FileText className="text-blue-400" size={20} />
          <h3 className="text-xl font-black text-white italic uppercase tracking-widest">Document Viewer</h3>
        </div>
        
        <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[1/1.4] md:aspect-[16/9]">
          <iframe 
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(note.content)}&embedded=true`} 
            className="w-full h-full border-0"
            title="PDF Document Viewer"
          />
        </div>
        <p className="text-center text-[10px] text-white/30 italic uppercase tracking-widest mt-6">
          Note: For the best reading experience, please download the PDF using the button above.
        </p>
      </div>
    </div>
  );
};
