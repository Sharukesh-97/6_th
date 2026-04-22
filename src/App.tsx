/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, ArrowRight } from 'lucide-react';

const chapterTitles = [
  "Part I: The Code",
  "Part II: The Smile",
  "Part III: The Flash",
  "Part IV: Our Symphony",
  "Part V: The Memories"
];

export default function App() {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full min-h-screen bg-[#0a0502] text-white font-sans relative overflow-hidden flex flex-col">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#3a1510] rounded-full blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#1a2b3c] rounded-full blur-[150px] opacity-30 pointer-events-none"></div>

      {/* Header / Progress Tracker */}
      <header className="flex items-center justify-between px-6 md:px-12 pt-10 z-20 shrink-0">
        <div className="flex items-center gap-2 md:gap-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              className={`h-2 rounded-full transition-all duration-500 ${step === s ? "w-8 bg-white" : step > s ? "w-4 bg-white/40" : "w-2 bg-white/10"}`}
            ></div>
          ))}
        </div>
        <div className="text-[9px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold text-white/50">
          {chapterTitles[step - 1]}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 1 && <PinPage key="step1" onNext={() => setStep(2)} />}
          {step === 2 && <SmilePage key="step2" onNext={() => setStep(3)} />}
          {step === 3 && <FlashPage key="step3" onNext={() => setStep(4)} />}
          {step === 4 && <SpotifyPage key="step4" onNext={() => setStep(5)} />}
          {step === 5 && <AnniversaryPage key="step5" />}
        </AnimatePresence>
      </main>
      
      {/* Camera Flash Element Overlay (Subtle global texture) */}
      <div className="absolute inset-0 pointer-events-none bg-white opacity-[0.01]"></div>
    </div>
  );
}

// ==========================================
// SCREENS
// ==========================================

function PinPage({ onNext }: { onNext: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handlePress = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === "3115") {
          setTimeout(onNext, 400);
        } else {
          setError(true);
          setTimeout(() => { setError(false); setPin(""); }, 500);
        }
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 w-full max-w-5xl px-6 py-10"
    >
      {/* Image Preview Block */}
      <div className="w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-white/5 border border-white/10 rounded-3xl relative flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-sm group shrink-0">
         <img src="https://res.cloudinary.com/dckterw8r/image/upload/v1776824869/loginp1_v39fyg.jpg" alt="Cute Raccoon" className="w-full h-full object-cover opacity-90 scale-105" referrerPolicy="no-referrer" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502]/80 to-transparent"></div>
      </div>

      {/* Keypad Block */}
      <motion.div animate={error ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }} className="flex flex-col items-center shrink-0">
        <h2 className="text-xl md:text-2xl font-serif mb-6 tracking-widest text-white/90">Enter Passcode</h2>
        
        {/* Pin Indicators */}
        <div className="flex gap-4 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`w-4 h-4 rounded-full border transition-colors ${i < pin.length ? 'bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.6)]' : 'border-white/30'}`}></div>
          ))}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((btn, i) => (
            <button 
              key={i} 
              onClick={() => handlePress(btn.toString())}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 text-xl md:text-2xl font-light hover:bg-white/20 active:translate-y-1 transition-all flex items-center justify-center text-white cursor-pointer"
            >
              {btn}
            </button>
          ))}
        </div>
        <p className="mt-10 text-white/30 text-[10px] tracking-widest uppercase">Hint: Special date (3115)</p>
      </motion.div>
    </motion.div>
  );
}

function SmilePage({ onNext }: { onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center w-full max-w-4xl px-6 py-10"
    >
      <h1 className="text-4xl md:text-6xl font-serif mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
        Heyy cutiee, <br/><span className="italic font-light opacity-80 mt-2 block">smile pleaseee</span>
      </h1>
      
      <div className="w-full max-w-lg md:max-w-xl aspect-[4/3] bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden relative shadow-[0_40px_80px_rgba(0,0,0,0.8)] backdrop-blur-md mb-12 group">
        <img src="https://res.cloudinary.com/dckterw8r/image/upload/v1776833915/Screenshot_2026-04-22_102739_uwivj6.png" alt="Vintage Camera" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
      </div>

      <NextButton onClick={onNext} label="Say Cheese" />
    </motion.div>
  );
}

function FlashPage({ onNext }: { onNext: () => void }) {
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setFlash(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full max-w-4xl px-6 relative py-10"
    >
      {/* Flash effect overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div 
            initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-50 pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>

      <h1 className="text-4xl md:text-6xl font-serif mb-12 text-center text-white">
        sayy <span className="text-white/80 italic font-light drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">cheese !!</span>
      </h1>
      
      <div className="w-full max-w-lg md:max-w-xl aspect-[4/3] bg-white/10 border border-white/20 rounded-[2rem] overflow-hidden relative shadow-[0_0_100px_rgba(255,255,255,0.15)] backdrop-blur-md mb-12">
        <img src="https://res.cloudinary.com/dckterw8r/image/upload/v1776833915/Screenshot_2026-04-22_102750_hnfpxp.png" alt="Camera Flash" className="w-full h-full object-cover opacity-100" referrerPolicy="no-referrer" />
        
        {/* Flash bulb intense center light */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: [1, 2, 1], opacity: [1, 0, 0] }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full blur-[40px] mix-blend-plus-lighter"
        />
      </div>

      <NextButton onClick={onNext} label="Our Symphony" />
    </motion.div>
  );
}

function AnniversaryPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.8 }}
      className="flex flex-col relative w-full h-full max-w-5xl mx-auto px-6 py-10"
    >
      <div className="flex-1 relative w-full h-full min-h-[500px] flex items-center justify-center">
        {/* Full Image Container */}
        <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center bg-transparent drop-shadow-2xl overflow-hidden rounded-md border border-white/10">
          <motion.img 
            initial={{ opacity: 0, scale: 0.85 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            src="https://res.cloudinary.com/dckterw8r/image/upload/v1776824789/Happy_Anniversary_1_ammkpc.png" 
            alt="Anniversary Design" 
            className="w-full h-full object-contain" 
            referrerPolicy="no-referrer" 
          />
          
          {/* Cute Raccoon Easter Egg - Nested inside the image container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            whileHover={{ opacity: 0.9, scale: 1.05 }}
            transition={{ duration: 1.5, delay: 2.5 }}
            className="absolute bottom-[-10px] left-[-10px] w-28 h-28 md:w-36 md:h-36 z-50 pointer-events-auto cursor-pointer mix-blend-luminosity hover:mix-blend-normal"
            style={{
              maskImage: 'radial-gradient(circle at 45% 45%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0) 60%)',
              WebkitMaskImage: 'radial-gradient(circle at 45% 45%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0) 60%)'
            }}
          >
            <img 
              src="https://res.cloudinary.com/dckterw8r/image/upload/v1776839110/d5bbc4a5-b194-418e-87d7-ebb3dbfd6267.png" 
              alt="Cute Raccoon" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 1.2 }}
        className="w-full flex flex-col items-center shrink-0 z-40 relative mt-10"
      >
        <div className="text-[#e2b793] text-sm uppercase tracking-[0.3em] font-semibold text-center drop-shadow-md">
          Forever & Always
        </div>
      </motion.footer>
    </motion.div>
  );
}

function SpotifyPage({ onNext }: { onNext: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // PLACE MUSIC LINK HERE WHEN READY
  // (Currently using a generic placeholder song)
  const audioSrc = "https://res.cloudinary.com/dckterw8r/video/upload/v1776837256/Eyedress_-_She_looks_just_like_a_dream_Something_About_You_Lyrics_ft._Dent_May_tm1prg.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Auto-play attempt since user has already interacted with the app (clicked through pages)
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.8 }}
      className="flex-1 flex flex-col w-full max-w-6xl mx-auto h-full px-6 md:px-12 py-10"
    >
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full relative">
        {/* Left side: Video Container Placeholder */}
      <div className="w-full md:flex-1 h-[320px] md:h-[500px] bg-black border border-white/10 rounded-[2rem] relative flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-sm">
         <video 
           src="https://res.cloudinary.com/dckterw8r/video/upload/v1776834351/Apr_22_0832_am_29s_202604220859_2gk8b_avbxlo.mp4" 
           autoPlay 
           loop 
           muted 
           playsInline
           className="w-full h-full object-cover opacity-90"
         />
      </div>

      {/* Right side: Spotify-style Player UI */}
      <div className="w-full md:w-[400px] flex flex-col justify-center">
        <div className="mb-10 md:mb-14">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#e2b793] uppercase inline-block mb-4">Now Playing</span>
          <h1 className="text-3xl md:text-4xl font-serif mt-2 leading-tight text-white mb-2">Something About You</h1>
          <p className="text-white/50 text-base md:text-lg tracking-wide">Eyedress ft. Dent May</p>
        </div>

        {/* Hidden Audio Element */}
        <audio 
          ref={audioRef} 
          src={audioSrc}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Player Controls */}
        <div className="space-y-8">
          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-visible relative">
              <div 
                className="h-full bg-white rounded-full relative transition-[width] duration-100 ease-linear"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)] translate-x-1/2"></div>
              </div>
            </div>
            <div className="flex justify-between text-[11px] text-white/40 font-mono tracking-wider">
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(duration - currentTime)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between px-2 pt-4">
            <Shuffle className="w-5 h-5 text-white/30 cursor-pointer hover:text-white/80 transition-colors" />
            <SkipBack className="w-8 h-8 text-white/80 cursor-pointer fill-current hover:text-white transition-colors" />
            
            <div 
              onClick={togglePlay}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-8 h-8 md:w-10 md:h-10 fill-current" /> : <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />}
            </div>
            
            <SkipForward className="w-8 h-8 text-white/80 cursor-pointer fill-current hover:text-white transition-colors" />
            <Repeat className="w-5 h-5 text-white/30 cursor-pointer hover:text-white/80 transition-colors" />
          </div>

          {/* Device indicator */}
          <div className="flex items-center justify-center mt-10">
            <div className="px-5 py-2.5 border border-white/5 rounded-full flex items-center gap-3 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer">
               <Volume2 className="w-4 h-4 text-white/60" />
               <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/60">iPhone</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Footer / Next Button positioned relatively to prevent overlap */}
      <footer className="w-full flex justify-end shrink-0 z-20 mt-8 relative">
        <NextButton onClick={onNext} label="View Memories" />
      </footer>

    </motion.div>
  );
}

// ==========================================
// SHARED COMPONENTS
// ==========================================

function NextButton({ onClick, label }: { onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-4 py-3 md:py-4 px-6 md:px-10 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer ml-auto group active:scale-95 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
      <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-white/80 group-hover:text-white transition-colors relative z-10">{label}</span>
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-white transition-colors shadow-sm relative z-10">
        <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
      </div>
    </button>
  );
}
