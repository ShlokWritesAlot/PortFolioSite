import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { achievements } from '../lib/achievements';

const Navigation = () => {
  const { state } = useGame();
  const [showAchievements, setShowAchievements] = useState(false);

  const sections = [
    { id: 'hero', name: 'ROOT' },
    { id: 'projects', name: 'PROJECTS' },
    { id: 'about', name: 'ABOUT' },
    { id: 'journey', name: 'JOURNEY' },
    { id: 'research', name: 'RESEARCH' },
    { id: 'contact', name: 'CONTACT' }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const unlockedCount = state.unlockedAchievements.length;
  const totalCount = achievements.length;
  const progress = Math.round((unlockedCount / totalCount) * 100);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0E27]/90 backdrop-blur-md border-b border-[#2A2E4A]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-cyan-400 font-display font-bold text-xl tracking-widest glow-cyan-text">
            S.PANDEY<span className="text-gray-500 text-sm">_SYS</span>
          </div>

          <div className="hidden md:flex space-x-6 font-code text-sm">
            {sections.map(s => (
              <button 
                key={s.id} 
                onClick={() => scrollTo(s.id)}
                className="text-gray-400 hover:text-cyan-400 transition-colors hover:glow-cyan-text"
              >
                ./{s.name.toLowerCase()}
              </button>
            ))}
          </div>

          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setShowAchievements(true)}
          >
            <div className="text-xs font-code text-gray-400 group-hover:text-green-400 transition-colors">
              ACHV: {progress}%
            </div>
            <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Achievement Modal */}
      {showAchievements && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0A0E27] border border-cyan-400 rounded-lg p-6 max-w-2xl w-full shadow-[0_0_30px_rgba(0,217,255,0.2)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display text-cyan-400 glow-cyan-text">SYSTEM_ACHIEVEMENTS</h2>
              <button onClick={() => setShowAchievements(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {achievements.map(a => {
                const isUnlocked = state.unlockedAchievements.includes(a.id);
                return (
                  <div key={a.id} className={`p-4 rounded border ${isUnlocked ? 'border-green-400 bg-green-400/10' : 'border-gray-800 bg-gray-900'} flex items-start gap-4`}>
                    <div className={`text-3xl ${isUnlocked ? '' : 'opacity-20 grayscale'}`}>{a.icon}</div>
                    <div>
                      <h4 className={`font-bold font-code ${isUnlocked ? 'text-green-400' : 'text-gray-500'}`}>{a.name}</h4>
                      <p className="text-sm text-gray-400 font-body">{a.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
