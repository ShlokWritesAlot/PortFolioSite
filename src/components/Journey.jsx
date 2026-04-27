import React from 'react';

const journeyData = [
  {
    id: 1,
    year: '2025 - Present',
    title: 'Founder & Systems Developer',
    institution: 'Sentinel Node / Incandescence Systems',
    type: 'WORK',
    details: 'Designed AI-powered multi-sensor security system. Built real-time monitoring dashboard for 1000+ rooms. Implemented context-aware detection for smoking, vaping, and fights using sensor fusion.'
  },
  {
    id: 2,
    year: '2025 - 2029',
    title: 'Bachelor\'s in Computer Science',
    institution: 'Manipal University Jaipur',
    type: 'EDU',
    details: 'Pursuing degree in Computer Science, focusing on systems architecture and security.'
  },
  {
    id: 3,
    year: '2023',
    title: 'Freelance Developer',
    institution: 'Self-initiated',
    type: 'WORK',
    details: 'Developed a web-based PDF conversion tool supporting multiple formats. Implemented document processing and user-friendly interface.'
  },
  {
    id: 4,
    year: '2022 - Present',
    title: 'Leadership & Technical Activities',
    institution: 'Various Competitions & Events',
    type: 'ACHV',
    details: 'Participated in CS competitions. Competed in state-level English debates. Active in Model United Nations (MUNs), engaging in policy discussions.'
  }
];

const Journey = () => {
  return (
    <div className="h-full flex flex-col text-white">
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 shrink-0">
        <h2 className="text-xl font-display font-bold">SYSTEM_LOGS</h2>
        <div className="text-[10px] font-code tracking-widest text-white/50">
          ARCHIVE // CHRONOLOGICAL
        </div>
      </div>

      <div className="flex-1 relative border-l border-white/20 ml-4 pl-8 space-y-10 py-4">
        {journeyData.map((item, index) => {
          const isLatest = index === 0;
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node */}
              <div className={`absolute -left-[37px] top-1 w-3 h-3 rounded-full border border-black z-10 ${isLatest ? 'bg-green-400 shadow-[0_0_10px_#39FF14] animate-pulse' : 'bg-white/40 group-hover:bg-white transition-colors'}`}></div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-5 transition-colors hover:bg-white/10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                  <div>
                    <h3 className="text-sm font-display font-bold text-white">{item.title}</h3>
                    <div className="text-[10px] font-code text-white/50 mt-1">{item.institution}</div>
                  </div>
                  
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[9px] font-code bg-white/10 px-2 py-1 rounded">
                      {item.type}
                    </span>
                    <span className={`text-[9px] font-code px-2 py-1 rounded border ${isLatest ? 'border-green-400/50 text-green-400 bg-green-400/10' : 'border-white/20 text-white/60 bg-white/5'}`}>
                      {item.year}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-body text-white/70 leading-relaxed mt-4">
                  {item.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Journey;
