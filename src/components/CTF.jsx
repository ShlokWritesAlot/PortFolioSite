import React, { useState, useRef, useEffect } from 'react';
import { playSound } from '../lib/sounds';
import { useGame } from '../contexts/GameContext';

const CTF = () => {
  const { dispatch } = useGame();
  const [history, setHistory] = useState([
    { text: "KERNEL PANIC: VFS: Unable to mount root fs on unknown-block(0,0)", type: "error" },
    { text: "CRITICAL: File system corrupted. Interactive shell disabled.", type: "error" },
    { text: "Type recovery commands to restore system state.", type: "system" }
  ]);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState(1);
  const [generatedKey, setGeneratedKey] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const generateCryptoKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = 'SEC-';
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) key += chars.charAt(Math.floor(Math.random() * chars.length));
      if (i < 3) key += '-';
    }
    return key;
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    playSound('type');
    const cmd = input.trim();
    const cmdLower = cmd.toLowerCase();
    
    let newHistory = [...history, { text: `root@recovery:~# ${cmd}`, type: 'input' }];
    
    if (phase === 1) {
      if (cmdLower === 'fsck' || cmdLower === 'mount -a' || cmdLower === 'reboot --override') {
        newHistory.push(
          { text: "[OK] File system restored.", type: "success" },
          { text: "Entering WARGAMES CTF Environment...", type: "system" },
          { text: "MISSION: A heavily encrypted payload is hidden in the /var/log/archives directory.", type: "system" },
          { text: "Find it. Decrypt it. Extract the 256-bit key.", type: "system" }
        );
        setPhase(2);
      } else {
        newHistory.push({ text: "bash: command not found or kernel lock active.", type: "error" });
      }
    } 
    else if (phase === 2) {
      if (cmdLower === 'ls /var/log/archives' || cmdLower === 'ls') {
        newHistory.push({ text: "syslog.1 syslog.2 syslog.3 ... [50 hidden files]. Use search tools.", type: "system" });
      } 
      else if (cmdLower.includes('grep') || cmdLower.includes('find')) {
        newHistory.push(
          { text: "FOUND MATCH: ./.hidden_payload_cache", type: "success" },
          { text: "Hint: Read the file.", type: "system" }
        );
        setPhase(3);
      } 
      else {
        newHistory.push({ text: "Command executed, no output.", type: "system" });
      }
    }
    else if (phase === 3) {
      if (cmdLower.startsWith('cat') && cmdLower.includes('.hidden_payload_cache')) {
        newHistory.push(
          { text: "FILE CONTENTS (Encrypted - Level 1):", type: "system" },
          { text: "p2hzb2tAZXhhbXBsZS5jb20= // This looks like standard Base64, but the text before encoding was shifted.", type: "error" },
          { text: "HINT: It is a double cipher. ROT13 -> Base64.", type: "system" },
          { text: "You must run: decrypt --rot13 [string]", type: "system" }
        );
        setPhase(4);
      } else {
        newHistory.push({ text: "File not found or permission denied.", type: "error" });
      }
    }
    else if (phase === 4) {
      if (cmdLower.startsWith('decrypt --rot13')) {
        const payload = cmd.split(' ')[2];
        if (payload) {
          // Rot13 logic is complex for user to type, we just pretend it works if they pass the string
          newHistory.push(
            { text: `[DECRYPT_ROT13] -> c2hsb2tAZXhhbXBsZS5jb20=`, type: "success" },
            { text: "Now decode the Base64 result.", type: "system" }
          );
          setPhase(5);
        } else {
          newHistory.push({ text: "Usage: decrypt --rot13 [string]", type: "error" });
        }
      } else {
        newHistory.push({ text: "Command not recognized.", type: "error" });
      }
    }
    else if (phase === 5) {
      if (cmdLower.startsWith('decode base64') || cmdLower.includes('base64 -d')) {
        const key = generateCryptoKey();
        setGeneratedKey(key);
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'secret_agent' });
        
        newHistory.push(
          { text: "[DECODE_B64] -> EXECUTING...", type: "system" },
          { text: "CTF COMPLETED. GENERATING 256-BIT SECURE KEY.", type: "success" }
        );
        setPhase(6);
        setTimeout(() => playSound('success'), 1000);
      } else {
        newHistory.push({ text: "Usage: decode base64 [string]", type: "error" });
      }
    }

    setHistory(newHistory);
    setInput('');
  };

  const copyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    alert('Key copied to clipboard!');
  };

  return (
    <div className="h-full flex flex-col text-white">
      <div className="flex items-center justify-between mb-4 border-b border-red-500/30 pb-4 shrink-0">
        <h2 className="text-xl font-display font-bold text-red-400 tracking-widest">WARGAMES // CTF</h2>
        <div className="text-[10px] font-code tracking-widest text-red-500/50 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          SEVERITY: EXTREME
        </div>
      </div>

      <div className="flex-1 bg-black border border-white/10 rounded-lg p-6 flex flex-col font-code text-xs md:text-sm relative overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.05)]">
        {phase === 6 && generatedKey ? (
          <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center text-center p-8 animate-[fadeIn_1s_ease-out]">
            <div className="w-24 h-24 bg-green-500/10 border border-green-500 rounded-lg flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(57,255,20,0.2)]">
              <span className="text-5xl">🗝️</span>
            </div>
            <h3 className="text-3xl font-display font-bold text-green-400 mb-2 tracking-widest uppercase">
              PAYLOAD EXTRACTED
            </h3>
            <p className="text-xs text-white/50 font-code mb-8 max-w-md leading-relaxed">
              You have successfully bypassed the kernel lock, traversed the file system, and broken the multi-layer cipher. 
            </p>
            
            <div className="bg-[#050505] border-2 border-green-400/50 p-6 rounded-lg w-full max-w-lg relative group">
              <div className="text-[10px] font-code text-green-400/50 mb-2 absolute -top-2.5 left-4 bg-black px-2">
                YOUR_UNIQUE_KEY
              </div>
              <div className="text-2xl md:text-3xl font-code text-white tracking-[0.2em] mb-6 text-center select-all">
                {generatedKey}
              </div>
              <button 
                onClick={copyKey}
                className="w-full bg-green-400/10 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors py-3 rounded font-bold tracking-widest text-xs"
              >
                COPY TO CLIPBOARD
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 pb-4">
              {history.map((line, i) => (
                <div key={i} className={`
                  ${line.type === 'error' ? 'text-red-400' : ''}
                  ${line.type === 'input' ? 'text-white' : ''}
                  ${line.type === 'success' ? 'text-green-400 font-bold' : ''}
                  ${line.type === 'system' ? 'text-cyan-400/80' : ''}
                `}>
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} className="h-4 shrink-0" />
            </div>
            
            <form onSubmit={handleCommand} className="flex mt-4 items-center shrink-0 border-t border-white/10 pt-4">
              <span className="text-red-400 mr-2">root@recovery:~#</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white shadow-none focus:ring-0 p-0"
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CTF;
