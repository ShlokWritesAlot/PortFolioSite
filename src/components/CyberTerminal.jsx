import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../lib/sounds';

const CyberTerminal = ({ setActiveModule }) => {
  const [history, setHistory] = useState([
    { text: 'SYSTEM.BOOT_SEQUENCE_COMPLETE', type: 'system' },
    { text: 'TYPE "help" TO LIST MODULES', type: 'system' }
  ]);
  const [input, setInput] = useState('');
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
    <div className="fixed bottom-4 right-4 w-96 h-64 cyber-glass rounded-lg flex flex-col overflow-hidden z-50">
      {/* Header bar */}
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-white/50 font-code text-[10px] tracking-widest">SYS.TERM_WIDGET</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar font-code text-[11px] leading-relaxed">
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
    </div>
  );
};

export default CyberTerminal;
