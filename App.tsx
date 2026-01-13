
import React, { useState, useRef, useEffect } from 'react';
import SpaceSimulation from './SpaceSimulation';
import Starfield from './Starfield';

const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !audioStarted) {
        audioRef.current.play()
          .then(() => {
            setIsMuted(false);
            setAudioStarted(true);
          })
          .catch(err => console.log("Audio play failed", err));
        

        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [audioStarted]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
      setAudioStarted(true);
    }
  };

  return (

      <audio 
        ref={audioRef}
        loop 
        src="https://cdn.pixabay.com/audio/2022/03/15/audio_732290740a.mp3" 
      />

      <div className="animate-fadeInSlow">
       
        <Starfield />
        
        
        <SpaceSimulation />
        <button 
          onClick={toggleMusic}
          className="fixed bottom-8 right-8 z-[100] flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
          title={isMuted ? "Phát nhạc" : "Tạm dừng"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <div className="flex items-end gap-[3px] h-3">
              <div className="w-[2px] bg-blue-400/60 animate-[musicBar_0.6s_infinite]" />
              <div className="w-[2px] bg-blue-400/60 animate-[musicBar_0.8s_infinite] delay-75" />
              <div className="w-[2px] bg-blue-400/60 animate-[musicBar_0.7s_infinite] delay-150" />
            </div>
          )}
        </button>
        {!audioStarted && (
          <div className="fixed bottom-24 right-8 z-[100] pointer-events-none animate-pulse">
            <p className="text-[9px] text-white/20 tracking-[0.4em] uppercase vertical-text">Chạm để nghe nhạc</p>
          </div>
        )}

        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] z-30" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes musicBar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInSlow { animation: fadeInSlow 3s ease-out forwards; }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}} />
    </div>
  );
};

export default App;
