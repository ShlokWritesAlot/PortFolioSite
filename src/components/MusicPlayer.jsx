import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../lib/sounds';

const SONGS = [
  { 
    id: 1, 
    title: "Dil me ek leher si uthi hai abhi", 
    artist: "Ghulam Ali", 
    why: "The depth of the ghazal combined with Ghulam Ali's soulful voice makes it timeless.", 
    feel: "It evokes a sense of nostalgia and a gentle stirring of old memories.",
    spotifyId: "1kd46bWGCfVT4q2OIx7RCb" 
  },
  { 
    id: 2, 
    title: "Dil to baccha hai ji", 
    artist: "Ishqiya", 
    why: "The playful lyrics and Rahat Fateh Ali Khan's delivery are infectious.", 
    feel: "Makes me feel young, whimsical, and slightly mischievous.",
    spotifyId: "6Y7AIladjWYJdooAblcWj5" 
  },
  { 
    id: 3, 
    title: "bewafa hai ghadi (lifafa)", 
    artist: "Lifafa", 
    why: "The lo-fi aesthetic and modern take on Indian sounds are incredibly unique.", 
    feel: "Perfect for late-night introspection or a rainy drive.",
    spotifyId: "28RecyQKqKn7OSh5O3diVX" 
  },
  { 
    id: 4, 
    title: "Chaand baaliyan", 
    artist: "Aditya A", 
    why: "Its simplicity and the sweet melody are just so comforting.", 
    feel: "Warm, like a soft breeze on a summer evening.",
    spotifyId: "0snQrp1VaY5Pj1YIHRJpRJ" 
  },
  { 
    id: 5, 
    title: "cold/mess", 
    artist: "Prateek Kuhad", 
    why: "Captures the raw emotion of a complicated relationship perfectly.", 
    feel: "Melancholic yet beautiful, like a bittersweet dream.",
    spotifyId: "2AoWWiMelowkStJoqPMDed" 
  },
  { 
    id: 6, 
    title: "My way", 
    artist: "Frank Sinatra", 
    why: "The ultimate anthem of individuality and living life on one's own terms.", 
    feel: "Empowered, confident, and ready to take on the world.",
    spotifyId: "3spdoTYpuCpmq19tuD0bOe" 
  },
  { 
    id: 7, 
    title: "In my solitude", 
    artist: "Billie Holiday", 
    why: "Billie Holiday's voice carries so much weight and history.", 
    feel: "Quiet, reflective, and deeply personal.",
    spotifyId: "0uF3PzqiraNCQjRmERsUNI" 
  },
  { 
    id: 8, 
    title: "tum ek gorakh dhanda ho", 
    artist: "Nusrat Fateh Ali Khan", 
    why: "The spiritual energy and complexity of this qawwali are unmatched.", 
    feel: "Transcendental and profoundly moving.",
    spotifyId: "3K2U5XjczEXKxlY1i1WSj6" 
  },
  { 
    id: 9, 
    title: "main rahoon ya na rahoon", 
    artist: "Armaan Malik", 
    why: "A beautiful melody that speaks to the legacy we leave behind.", 
    feel: "Hopeful and slightly sad at the same time.",
    spotifyId: "5SX62TLnbzKz1pVQa1QGFV" 
  },
  { 
    id: 10, 
    title: "when im sixty four", 
    artist: "The Beatles", 
    why: "A charming, lighthearted look at growing old with someone.", 
    feel: "Cheerful, optimistic, and full of love.",
    spotifyId: "1zdBFL2UtwbCEubEdcdSmU" 
  }
];

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState('IDLE');
  const embedControllerRef = useRef(null);

  const currentSong = SONGS[currentSongIndex];

  useEffect(() => {
    // Check if script already exists
    if (!document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')) {
      const script = document.createElement('script');
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    }

    const initSpotify = (IFrameAPI) => {
      const element = document.getElementById('spotify-embed');
      if (!element) return;
      
      // Clean up previous content if any
      element.innerHTML = '';
      
      const options = {
        width: '100%',
        height: '152',
        uri: `spotify:track:${currentSong.spotifyId}`
      };
      
      const callback = (EmbedController) => {
        embedControllerRef.current = EmbedController;
        EmbedController.addListener('playback_update', e => {
          setIsPlaying(!e.data.isPaused);
          setStatus(e.data.isPaused ? 'PAUSED' : 'PLAYING');
        });
      };
      IFrameAPI.createController(element, options, callback);
    };

    if (window.SpotifyIframeApi) {
      initSpotify(window.SpotifyIframeApi);
    } else {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        window.SpotifyIframeApi = IFrameAPI;
        initSpotify(IFrameAPI);
      };
    }
  }, []);

  // Update track when index changes
  useEffect(() => {
    if (embedControllerRef.current) {
      embedControllerRef.current.loadUri(`spotify:track:${currentSong.spotifyId}`);
      embedControllerRef.current.play();
    }
  }, [currentSongIndex]);

  const handlePlayPause = () => {
    playSound('type');
    if (embedControllerRef.current) {
      embedControllerRef.current.togglePlay();
    }
  };

  const handleNext = () => {
    playSound('type');
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
  };

  const handlePrev = () => {
    playSound('type');
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
  };

  return (
    <div className="flex flex-col h-full text-white font-body">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Left: Song List */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-4 custom-scrollbar max-h-[600px]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-xl tracking-widest text-cyan-400">TOP_10_TRANSMISSIONS</h3>
            <span className="font-code text-[10px] text-white/30 tracking-[0.3em]">SECURE_STORAGE // {SONGS.length} UNITS</span>
          </div>
          
          {SONGS.map((song, index) => (
            <motion.div
              key={song.id}
              onClick={() => {
                playSound('type');
                setCurrentSongIndex(index);
              }}
              whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              className={`p-4 rounded border cursor-pointer transition-all flex items-center gap-4 ${
                currentSongIndex === index 
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                  : 'border-white/10 bg-white/5 grayscale'
              }`}
            >
              <div className="font-code text-xs text-white/30">{(index + 1).toString().padStart(2, '0')}</div>
              <div className="flex-1 overflow-hidden">
                <div className={`font-bold text-sm truncate ${currentSongIndex === index ? 'text-cyan-400' : 'text-white'}`}>
                  {song.title.toUpperCase()}
                </div>
                <div className="text-[10px] text-white/50 font-code tracking-widest truncate">{song.artist}</div>
              </div>
              {currentSongIndex === index && isPlaying && (
                <div className="flex gap-0.5 items-end h-4">
                  {[1, 2, 3, 4].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ height: [4, 16, 4] }}
                      transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                      className="w-1 bg-cyan-400"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right: Now Playing & Reflections */}
        <div className="flex flex-col gap-6 bg-white/5 rounded-xl border border-white/10 p-8 relative overflow-hidden h-fit">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <h3 className="font-display text-xl tracking-widest text-cyan-400">NOW_PLAYING</h3>
              <div className="font-code text-[10px] text-cyan-400/30 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`}></span>
                STATUS: {status}
              </div>
            </div>
            <div className="font-code text-[10px] text-cyan-400/50 flex items-center gap-2">
              <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png" alt="Spotify" className="h-3 opacity-50" />
              SPOTIFY_CORE
            </div>
          </div>
          
          {/* Spotify Player Integration */}
          <div className="w-full rounded-lg overflow-hidden border border-cyan-400/30 bg-black/40 shadow-[0_0_20px_rgba(0,229,255,0.1)] mb-4 min-h-[152px]">
            <div id="spotify-embed"></div>
          </div>

          <div className="text-center mt-2">
            <h2 className="text-2xl font-display font-bold tracking-[0.1em] text-white truncate px-4">{currentSong.title}</h2>
            <p className="text-cyan-400 font-code text-xs tracking-widest mt-1">{currentSong.artist.toUpperCase()}</p>
          </div>

          {/* Reflections */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="p-4 rounded border border-white/5 bg-white/5">
              <h4 className="text-[10px] font-code text-cyan-400/50 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                Why I like it
              </h4>
              <p className="text-sm text-white/80 italic leading-relaxed">
                "{currentSong.why}"
              </p>
            </div>
            <div className="p-4 rounded border border-white/5 bg-white/5">
              <h4 className="text-[10px] font-code text-purple-400/50 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                How it makes me feel
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">
                {currentSong.feel}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-auto pt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <button onClick={handlePrev} className="text-white/40 hover:text-white transition-colors p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
              </button>
              
              <button 
                onClick={handlePlayPause}
                className="p-4 rounded-full border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/10 transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]"
              >
                {isPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="4" x2="10" y2="20"></line><line x1="14" y1="4" x2="14" y2="20"></line></svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                )}
              </button>

              <button onClick={handleNext} className="text-white/40 hover:text-white transition-colors p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
