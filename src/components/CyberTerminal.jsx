import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../lib/sounds';

const CyberTerminal = ({ setActiveModule }) => {
  const [history, setHistory] = useState([
    { text: 'SYSTEM.BOOT_SEQUENCE_COMPLETE', type: 'system' },
    { text: 'TYPE "help" TO LIST MODULES', type: 'system' }
  ]);
  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    playSound('type');
    const cmd = input.trim().toLowerCase();
    
    let newHistory = [...history, { text: `user@sys:~$ ${cmd}`, type: 'input' }];
    
    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: 'AVAILABLE MODULES:', type: 'system' },
          { text: '  scan_projects  - Discover active projects', type: 'system' },
          { text: '  read_bio       - Display user profile', type: 'system' },
          { text: '  view_research  - Access secure documents', type: 'system' },
          { text: '  system_logs    - View career journey', type: 'system' },
          { text: '  contact_me     - Open comms channel', type: 'system' },
          { text: '  clear          - Clear terminal', type: 'system' }
        );
        break;
      case 'scan_projects':
        newHistory.push({ text: '> EXECUTING projects.exe...', type: 'system' });
        setActiveModule('projects');
        break;
      case 'read_bio':
        newHistory.push({ text: '> FETCHING user_data...', type: 'system' });
        setActiveModule('about');
        break;
      case 'view_research':
        newHistory.push({ text: '> DECRYPTING vault...', type: 'system' });
        setActiveModule('research');
        break;
      case 'system_logs':
        newHistory.push({ text: '> READING logs...', type: 'system' });
        setActiveModule('journey');
        break;
      case 'contact_me':
        newHistory.push({ text: '> OPENING secure socket...', type: 'system' });
        setActiveModule('contact');
        break;
      case 'clear':
        newHistory = [];
        break;
      default:
        newHistory.push({ text: `ERR: Command not found.`, type: 'error' });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 transition-all duration-500 ${isCollapsed ? 'w-auto' : 'w-[calc(100vw-2rem)] md:w-96'}`}>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-full h-64 cyber-glass rounded-lg flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            {/* Header bar */}
            <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-white/50 font-code text-[10px] tracking-widest">SYS.TERM_WIDGET</span>
              <button 
                onClick={() => setIsCollapsed(true)}
                className="text-white/30 hover:text-white"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 12H6"></path></svg>
              </button>
            </div>
            
            {/* Terminal content */}
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar font-code text-[11px] md:text-[12px] leading-relaxed">
              {history.map((line, i) => (
                <div key={i} className={`mb-1 ${line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-white' : 'text-green-400'}`}>
                  {line.text}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex mt-2 items-center">
                <span className="text-white mr-2">user@sys:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-green-400 shadow-none focus:ring-0 p-0"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button 
        onClick={() => {
          setIsCollapsed(!isCollapsed);
          playSound('type');
        }}
        className={`w-12 h-12 rounded-lg cyber-glass border border-white/20 flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'bg-white/5' : 'bg-cyan-400 text-black border-cyan-400'}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isCollapsed ? 'text-cyan-400' : 'text-black'}>
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
      </button>
    </div>
  );
};

export default CyberTerminal;
