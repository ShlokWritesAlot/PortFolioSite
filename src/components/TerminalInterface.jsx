import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../lib/sounds';

const TerminalInterface = () => {
  const [history, setHistory] = useState([
    { text: 'S.PANDEY SECURE TERMINAL v2.0.4', type: 'system' },
    { text: 'Type "help" for available commands.', type: 'system' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    playSound('type');
    const cmd = input.trim().toLowerCase();
    
    let newHistory = [...history, { text: `root@sys:~$ ${cmd}`, type: 'input' }];
    
    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: 'AVAILABLE COMMANDS:', type: 'system' },
          { text: '  scan_projects  - Discover active projects', type: 'system' },
          { text: '  read_bio       - Display user profile', type: 'system' },
          { text: '  view_research  - Access secure documents', type: 'system' },
          { text: '  contact_me     - Open comms channel', type: 'system' },
          { text: '  clear          - Clear terminal', type: 'system' }
        );
        break;
      case 'scan_projects':
        newHistory.push({ text: 'Initiating scan...', type: 'system' });
        setTimeout(() => scrollTo('projects'), 500);
        break;
      case 'read_bio':
        newHistory.push({ text: 'Fetching profile data...', type: 'system' });
        setTimeout(() => scrollTo('about'), 500);
        break;
      case 'view_research':
        newHistory.push({ text: 'Accessing secure vault...', type: 'system' });
        setTimeout(() => scrollTo('research'), 500);
        break;
      case 'contact_me':
        newHistory.push({ text: 'Opening secure comms...', type: 'system' });
        setTimeout(() => scrollTo('contact'), 500);
        break;
      case 'clear':
        newHistory = [];
        break;
      default:
        newHistory.push({ text: `Command not found: ${cmd}`, type: 'error' });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl bg-black border border-gray-700 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden font-code text-xs md:text-sm">
      {/* Header bar */}
      <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-400 text-xs ml-2">sys_terminal_root</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 h-64 overflow-y-auto custom-scrollbar text-green-400">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 ${line.type === 'error' ? 'text-red-500' : line.type === 'input' ? 'text-cyan-400' : 'text-green-400'}`}>
            {line.text}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex mt-2">
          <span className="text-cyan-400 mr-2">root@sys:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-green-400 shadow-none caret-green-400"
            autoFocus
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TerminalInterface;
