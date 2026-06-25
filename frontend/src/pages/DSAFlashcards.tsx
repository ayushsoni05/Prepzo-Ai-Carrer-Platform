import React from 'react';
import ThinkingLoader from '@/components/ui/loading';
export default function DSAFlashcards() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex items-center justify-center">
      <ThinkingLoader loadingText="Deploying DSA Flashcards..." />
    </div>
  );
}
