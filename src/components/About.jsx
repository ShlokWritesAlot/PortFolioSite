import React from 'react';
import { useGame } from '../contexts/GameContext';

// Simple text decryption effect component
const DecryptText = ({ text, delay = 0 }) => {
  const [display, setDisplay] = React.useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  React.useEffect(() => {
    let iteration = 0;
    let interval = null;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(text.split('').map((letter, index) => {
          if (index < iteration) { return text[index]; }
          return chars[Math.floor(Math.random() * 26)];
        }).join(''));

        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3; 
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{display || text.replace(/./g, '_')}</span>;
};

const About = () => {
  const { state } = useGame();

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 md:gap-8 text-white">
      {/* Left Column: ID Card */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 shrink-0">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full pointer-events-none"></div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded bg-white/10 flex items-center justify-center border border-white/20">
              <span className="text-3xl filter grayscale">👤</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-white/40 font-code tracking-widest mb-1">ID // 99482-B</div>
              <h2 className="text-lg sm:text-xl font-display font-bold truncate"><DecryptText text="SHLOK PANDEY" /></h2>
              <div className="text-cyan-400 font-code text-[10px] mt-1 bg-cyan-400/10 inline-block px-2 py-0.5 rounded border border-cyan-400/20">
                L5_CLEARANCE
              </div>
            </div>
          </div>

          <div className="space-y-4 font-code text-xs">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/40">ROLE</span>
              <span className="text-right">Researcher &<br/>Systems Dev</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/40">ORG</span>
              <span className="text-right">Sentinel Node<br/>MUJ</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-white/40">LOC</span>
              <span>Jaipur, IND</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-center items-center text-center">
            <div className="text-2xl font-display font-bold text-green-400">96.7%</div>
            <div className="text-[9px] font-code text-white/40 tracking-widest mt-1">THREAT DETECTION</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-center items-center text-center">
            <div className="text-2xl font-display font-bold text-white">1000+</div>
            <div className="text-[9px] font-code text-white/40 tracking-widest mt-1">NODES SECURED</div>
          </div>
        </div>
      </div>

      {/* Right Column: Bio & Skills */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex-1 overflow-y-auto custom-scrollbar">
          <h3 className="text-sm font-code text-white/50 tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/50 rounded-full inline-block"></span> BIOGRAPHY_DATA
          </h3>
          
          <div className="space-y-6 font-body text-sm text-white/90 leading-relaxed">
            <p>
              I build intelligent security systems that don’t just monitor environments—they understand them. From multi-sensor fusion to large-scale real-time dashboards, my work is centered on creating systems that remain reliable under real-world chaos.
            </p>
            <p>
              I study emerging cyber threats like Ransomware-as-a-Service and evolving malware ecosystems to stay ahead of the curve. My focus is simple: predict the next attack vector before it becomes a problem—and build systems that are already ready for it.
            </p>
          </div>

          <h3 className="text-sm font-code text-white/50 tracking-widest mt-8 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/50 rounded-full inline-block"></span> TECH_STACK_MATRIX
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 font-code text-xs">
            {/* Skill rows */}
            {[
              { name: 'Python', val: 90 },
              { name: 'FastAPI', val: 85 },
              { name: 'React', val: 65 },
              { name: 'SQL/PostgreSQL', val: 80 },
              { name: 'Docker', val: 60 },
              { name: 'Data Structures', val: 85 }
            ].map(skill => (
              <div key={skill.name} className="flex flex-col gap-1">
                <div className="flex justify-between text-white/60">
                  <span>{skill.name}</span>
                  <span>{skill.val}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/80 shadow-[0_0_5px_rgba(255,255,255,0.5)]" style={{ width: `${skill.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
