
import React from 'react';

export const SeriousNotes: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id} className="bg-slate-50 py-24 border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="font-heading text-3xl text-dark-blue mb-12 text-center uppercase tracking-widest">Serious Notes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-6 bg-white border-l-4 border-msblue">
              <p className="text-slate-600 leading-relaxed italic">
                Submission confirms completion, not validation. Feedback is provided only where review sessions are included.
              </p>
            </div>
            <div className="p-6 bg-white border-l-4 border-msblue">
              <p className="text-slate-600 leading-relaxed italic">
                Peer reflection is structured and anonymized. It sharpens clarity, not judgment.
              </p>
            </div>
          </div>
          
          <div className="bg-dark-blue p-8 text-white flex flex-col justify-center">
             <h4 className="font-heading text-xl text-msaccent uppercase tracking-widest mb-4">Final Filter</h4>
             <p className="text-xl md:text-2xl font-bold leading-tight mb-4">
               This challenge requires protected thinking time.
             </p>
             <p className="text-msaccent/60 uppercase text-xs font-bold tracking-widest">
               If you cannot commit, do not enroll.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};
