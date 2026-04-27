import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { playSound } from '../lib/sounds';

// --- MINI SIMULATIONS ---

const SentinelSimulation = () => {
  const [data, setData] = useState({ pm: 12, voc: 40, co: 5, audio: 120, state: 'SCANNING', threat: null });

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      if (tick < 15) {
        setData({
          pm: 12 + Math.random() * 5,
          voc: 40 + Math.random() * 10,
          co: 5 + Math.random() * 2,
          audio: 120 + Math.random() * 30,
          state: 'SCANNING',
          threat: null
        });
      } else if (tick < 25) {
        setData({
          pm: 280 + Math.random() * 50,
          voc: 800 + Math.random() * 100,
          co: 15 + Math.random() * 5,
          audio: 80 + Math.random() * 10,
          state: 'FUSION_ANALYSIS',
          threat: 'EVALUATING...'
        });
      } else if (tick < 40) {
        setData(prev => ({ ...prev, state: 'THREAT_LOCKED', threat: 'CIGARETTE SMOKE [96.7%]' }));
      } else {
        tick = 0;
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/80 border border-red-500/30 rounded p-6 font-code h-full flex flex-col justify-between relative overflow-hidden">
      <div className="text-red-400 mb-4 border-b border-red-500/30 pb-2 text-lg">DECISION_FUSION_ENGINE // LIVE</div>
      <div className="grid grid-cols-2 gap-6 text-white/70 mb-4 flex-1 text-sm md:text-base">
        <div>PM2.5: <span className={data.pm > 100 ? 'text-red-400 font-bold' : 'text-green-400'}>{data.pm.toFixed(1)} µg/m³</span></div>
        <div>VOC: <span className={data.voc > 300 ? 'text-red-400 font-bold' : 'text-green-400'}>{data.voc.toFixed(1)} ppb</span></div>
        <div>CO: <span className="text-green-400">{data.co.toFixed(1)} ppm</span></div>
        <div>AUDIO: <span className="text-white">{data.audio.toFixed(0)} Hz</span></div>
      </div>
      
      <div className={`mt-auto p-4 text-center border text-lg md:text-xl ${data.state === 'THREAT_LOCKED' ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'bg-white/5 border-white/10 text-white/50'}`}>
        STATUS: {data.state}
        {data.threat && <div className="font-bold mt-2">{data.threat}</div>}
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(255,0,60,1)_360deg)] animate-[spin_2s_linear_infinite] mix-blend-screen"></div>
    </div>
  );
};

const AttendanceSimulation = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress(p => {
        if (p >= 75) {
          clearInterval(interval);
          return 75;
        }
        return p + 1.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/80 border border-cyan-400/30 rounded p-6 font-code h-full flex flex-col items-center justify-center relative">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#00E5FF" strokeWidth="6" strokeDasharray="251" strokeDashoffset={251 - (251 * progress) / 100} className="transition-all duration-100 ease-linear" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-cyan-400 text-4xl">
          {progress.toFixed(0)}%
        </div>
      </div>
      
      {progress >= 75 && (
        <div className="mt-8 text-cyan-400 text-center animate-pulse text-lg md:text-xl">
          <div className="bg-cyan-400/20 border border-cyan-400 px-4 py-2 rounded">SAFE_TO_SKIP: 3 LECTURES</div>
        </div>
      )}
    </div>
  );
};

const MalwareSimulation = () => {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const isMalicious = count === 15 || count === 16;
      const newLog = isMalicious 
        ? { text: `[SYS.PID.${4000+count}] INJECTION DETECTED // MEM_WRITE AT 0x7FFA8...`, threat: true }
        : { text: `[SYS.PID.${4000+count}] SYS_CALL_OPEN (OK) -> /usr/lib/libc.so`, threat: false };
      
      setLogs(prev => [...prev.slice(-12), newLog]);
      
      if (count >= 20) count = 0; 
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const isQuarantined = logs.some(l => l.threat);

  return (
    <div className="bg-black border border-green-500/30 rounded p-6 font-code text-xs md:text-sm h-full flex flex-col relative overflow-hidden">
      <div className="text-white/40 mb-4 border-b border-white/10 pb-2 text-lg">PROC_MONITOR // KERNEL RING 0</div>
      <div className="flex-1 flex flex-col justify-end gap-1">
        {logs.map((log, i) => (
          <div key={i} className={log.threat ? 'text-red-500 font-bold' : 'text-green-500'}>
            {log.text}
          </div>
        ))}
      </div>
      {isQuarantined && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 backdrop-blur-[2px]">
          <div className="border-4 border-red-500 text-red-500 font-bold text-3xl px-6 py-4 rotate-[-15deg] bg-black/90 shadow-[0_0_30px_rgba(255,0,0,0.5)]">
            QUARANTINE EXECUTED
          </div>
        </div>
      )}
    </div>
  );
};

const PDFSimulation = () => {
  const [step, setStep] = useState(0); 
  const hexRaw = "4F 8A 1C FF 00 2B 44 9A 11 0C FE CA 8B 99 22 10 \n33 44 55 66 77 88 99 AA BB CC DD EE FF 00 11 22 \n... RAW BYTES STREAM ...";
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 3);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/5 border border-white/20 rounded p-6 font-code h-full flex flex-col items-center justify-center text-sm md:text-base">
      {step === 0 && (
        <div className="text-white/40 text-center w-full max-w-lg">
          <div className="mb-4 text-lg">STREAM_INPUT</div>
          <pre className="text-left bg-black/50 p-4 border border-white/10 rounded">{hexRaw}</pre>
        </div>
      )}
      {step === 1 && (
        <div className="text-cyan-400 text-center w-full max-w-md">
          <div className="mb-4 animate-pulse text-lg">PARSING STRUCTURE & DECODING...</div>
          <div className="h-2 bg-white/10 w-full rounded overflow-hidden">
            <div className="h-full bg-cyan-400 w-full animate-[loading_1.5s_linear]"></div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="text-green-400 text-center flex flex-col items-center">
          <div className="text-6xl mb-4">📄</div>
          <div className="border-2 border-green-400/50 bg-green-400/10 px-6 py-3 rounded text-xl">
            PDF/A GENERATED
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---

const projectData = [
  {
    id: 'sentinel',
    title: 'Sentinel Node',
    role: 'Founder & Systems Developer',
    description: 'AI-powered multi-sensor security system. Features a Decision Fusion Engine combining heuristics and Neural Engine classifiers (Cigarette, Vape, Fight) with 96.7% accuracy.',
    tech: ['Python', 'FastAPI', 'Sensor Fusion', 'Neural Networks'],
    level: 'L5_CRITICAL',
    Simulation: SentinelSimulation
  },
  {
    id: 'attendance',
    title: 'Smart Attendance & CGPA Planner',
    role: 'Lead Developer',
    description: 'System to track attendance data via portal scraping. Includes CGPA calculator with target-based projections and recommendation engine for safe-to-skip classes.',
    tech: ['Python', 'FastAPI', 'Web Scraping', 'Data Analysis'],
    level: 'L3_ELEVATED',
    Simulation: AttendanceSimulation
  },
  {
    id: 'malware',
    title: 'Malware Behavior Simulator',
    role: 'Security Researcher',
    description: 'Simulates process-level system activity to detect malicious patterns. Uses event queues for real-time tracking and a priority queue threat scoring mechanism.',
    tech: ['Python', 'Data Structures', 'System Simulation'],
    level: 'L5_CRITICAL',
    Simulation: MalwareSimulation
  },
  {
    id: 'pdf-tool',
    title: 'PDF Conversion Tool',
    role: 'Freelance Developer',
    description: 'Web-based document processing tool supporting multiple file formats with an efficient user-friendly interface for conversion workflows.',
    tech: ['Python', 'File Handling', 'Web UI'],
    level: 'L1_STANDARD',
    Simulation: PDFSimulation
  }
];

const Projects = () => {
  const { state, dispatch } = useGame();
  const [decrypting, setDecrypting] = useState(null);
  const [activeSimulation, setActiveSimulation] = useState(null);

  useEffect(() => {
    if (state.viewedProjects.length === projectData.length && !state.unlockedAchievements.includes('code_breaker')) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'code_breaker' });
    }
  }, [state.viewedProjects, state.unlockedAchievements, dispatch]);

  const handleUnlock = (id) => {
    if (state.viewedProjects.includes(id)) return;
    
    playSound('type');
    setDecrypting(id);
    
    setTimeout(() => {
      playSound('success');
      dispatch({ type: 'VIEW_PROJECT', payload: id });
      setDecrypting(null);
    }, 1500);
  };

  const openSimulation = (project) => {
    playSound('type');
    setActiveSimulation(project);
  };

  const closeSimulation = () => {
    setActiveSimulation(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full text-white">
        {projectData.map((project) => {
          const isUnlocked = state.viewedProjects.includes(project.id);
          const isDecrypting = decrypting === project.id;
          
          return (
            <div 
              key={project.id} 
              className={`bg-white/5 border rounded-lg p-6 flex flex-col relative overflow-hidden transition-all duration-300 min-h-[250px] ${isUnlocked ? 'border-cyan-400/30 shadow-[0_0_15px_rgba(0,229,255,0.1)]' : 'border-white/10'}`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4 z-10">
                <div>
                  <div className="text-[10px] font-code text-white/40 tracking-widest mb-1">
                    ID // {project.id.toUpperCase()}
                  </div>
                  <h3 className={`text-lg font-display font-bold ${isUnlocked ? 'text-cyan-400' : 'text-white'}`}>
                    {project.title}
                  </h3>
                </div>
                <div className={`text-[9px] font-code px-2 py-1 border rounded shrink-0 ml-2 ${
                  project.level === 'L5_CRITICAL' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                  project.level === 'L3_ELEVATED' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                  'border-white/30 text-white/60 bg-white/5'
                }`}>
                  {project.level}
                </div>
              </div>

              {/* Content (Encrypted/Decrypted) */}
              <div className="flex-1 flex flex-col z-10">
                {isDecrypting ? (
                  <div className="h-full flex flex-col justify-center items-center font-code text-xs text-cyan-400 animate-pulse my-auto">
                    <div className="mb-2 glitch" data-text="DECRYPTING DATA...">DECRYPTING DATA...</div>
                    <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
                      <div className="h-full bg-cyan-400 w-1/2 animate-[bounce_1s_infinite]"></div>
                    </div>
                  </div>
                ) : isUnlocked ? (
                  <div className="flex flex-col h-full gap-4">
                    <p className="text-xs font-body text-white/80 leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map(t => (
                        <span key={t} className="text-[9px] font-code bg-white/10 border border-white/5 text-white px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <button 
                        onClick={() => openSimulation(project)}
                        className="w-full bg-cyan-400/10 border border-cyan-400/50 hover:bg-cyan-400 hover:text-black text-cyan-400 font-code text-[10px] tracking-widest py-2 rounded transition-all duration-300 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                      >
                        SIMULATE_PROJECT
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-center items-center font-code text-white/30 text-center my-auto">
                    <div className="text-2xl mb-2">🔒</div>
                    <div className="text-xs tracking-widest">DATA ENCRYPTED</div>
                    <div className="text-[9px] mt-1">CLEARANCE REQUIRED</div>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="mt-4 border-t border-white/10 pt-3 flex justify-between items-center z-10 shrink-0">
                <span className={`text-[10px] font-code ${isUnlocked ? 'text-cyan-400' : 'text-white/40'}`}>
                  {isUnlocked ? 'ACCESS: GRANTED' : 'ACCESS: DENIED'}
                </span>
                
                {!isUnlocked && !isDecrypting && (
                  <button 
                    onClick={() => handleUnlock(project.id)}
                    className="text-[10px] font-code border border-white/20 px-3 py-1.5 rounded hover:bg-white hover:text-black transition-colors"
                  >
                    INITIATE_HACK
                  </button>
                )}
              </div>
              
              {isUnlocked && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-[200%] animate-[scanline_4s_linear_infinite] z-0"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full-screen Subwindow Modal for Simulation */}
      {activeSimulation && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-12">
          <div className="w-full h-full max-w-5xl cyber-glass border-white/20 rounded-xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.2)] animate-[fadeIn_0.3s_ease-out]">
            {/* Modal Header */}
            <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_5px_#00E5FF]"></div>
                <span className="font-code text-xs tracking-widest text-white/70">
                  SIMULATION_ENV // {activeSimulation.title.toUpperCase()}
                </span>
              </div>
              <button 
                onClick={closeSimulation}
                className="text-white/50 hover:text-red-400 font-code text-sm transition-colors"
              >
                [ TERMINATE ]
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 p-6 md:p-10 relative bg-black/40">
              <activeSimulation.Simulation />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
