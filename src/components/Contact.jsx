import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../lib/sounds';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, scanning, success, error

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('scanning');
    playSound('type');

    // Web3Forms Integration - Fully Functional
    const formData = new FormData();
    formData.append("access_key", "569ea252-6ffd-41a5-8115-01249763e59a"); 
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("message", formState.message);
    formData.append("subject", `New Message from Portfolio: ${formState.name}`);

    try {
      // Keep the "encryption" animation for the fluid cyberpunk feel
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || "Submission failed");
      }

      setStatus('success');
      playSound('success');
      setFormState({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error("Form Submission Error:", error);
      setStatus('error');
      // Show error status for a bit before resetting
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-8 text-white">
      {/* Left: Info */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          </div>
          
          <h2 className="text-xl font-display font-bold mb-6 text-cyan-400">SECURE_COMMS</h2>
          
          <div className="space-y-6 font-code text-xs">
            <div className="group/item">
              <div className="text-white/40 mb-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                ROOT_ADDRESS
              </div>
              <a href="mailto:shlokpandey8219@gmail.com" className="text-white hover:text-cyan-400 transition-colors break-all">
                shlokpandey8219@gmail.com
              </a>
            </div>
            
            <div className="group/item">
              <div className="text-white/40 mb-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                ENCRYPTED_LINE
              </div>
              <div className="text-white">
                +91 9650640669
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
            <a href="https://github.com/ShlokWritesAlot" target="_blank" rel="noreferrer" className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all font-code text-[10px]">
              GH
            </a>
            <a href="https://www.linkedin.com/in/shlok-pandey-842b08368/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all font-code text-[10px]">
              IN
            </a>
            <a href="mailto:shlokpandey8219@gmail.com" className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all font-code text-[10px]">
              MAIL
            </a>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#39FF14]"></div>
          <div className="text-[10px] font-code text-green-400/70 tracking-[0.2em] uppercase">
            uplink_status: connected
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
        
        {status === 'scanning' && (
          <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center font-code text-cyan-400 text-xs">
            <div className="mb-4 glitch" data-text="ENCRYPTING_DATA_PACKETS...">ENCRYPTING_DATA_PACKETS...</div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-full animate-[scanline_2s_linear_infinite]"></div>
            </div>
            <div className="mt-4 text-[10px] text-white/30 animate-pulse">ESTABLISHING SECURE HANDSHAKE...</div>
          </div>
        )}

        {status === 'success' ? (
          <div className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center text-center p-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full border-2 border-green-400 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </motion.div>
            <h3 className="text-2xl font-display font-bold text-green-400 mb-2 tracking-[0.2em]">TRANSMISSION_COMPLETE</h3>
            <p className="text-sm text-white/60 font-code max-w-xs">Payload encrypted and delivered to root. Awaiting response sequence.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 text-[10px] font-code text-cyan-400/50 hover:text-cyan-400 transition-colors uppercase tracking-widest"
            >
              [ send_another_packet ]
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="h-full flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-code text-white/30 uppercase tracking-widest">Identifier // Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="ANONYMOUS_USER"
                  className="bg-black/40 border border-white/10 rounded px-4 py-3 text-sm font-code text-white focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-code text-white/30 uppercase tracking-widest">Return_Path // Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="USER@NETWORK.LOCAL"
                  className="bg-black/40 border border-white/10 rounded px-4 py-3 text-sm font-code text-white focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[10px] font-code text-white/30 uppercase tracking-widest">Payload // Message</label>
              <textarea 
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                placeholder="ENTER_DATA_HERE..."
                className="bg-black/40 border border-white/10 rounded px-4 py-3 text-sm font-code text-white focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all flex-1 resize-none min-h-[150px] placeholder:text-white/10"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'scanning'}
              className="mt-4 bg-cyan-400/10 border border-cyan-400/30 hover:bg-cyan-400 hover:text-black text-cyan-400 font-code text-xs font-bold tracking-[0.3em] py-4 rounded transition-all duration-500 uppercase shadow-[0_0_15px_rgba(0,229,255,0.1)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]"
            >
              EXECUTE_TRANSFER
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
