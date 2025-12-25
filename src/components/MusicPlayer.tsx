import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playlistRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const playlist = [
    { title: "Untuk Perempuan yang Sedang Dalam Pelukan", artist: "Payung Teduh" },
    { title: "Anugerah Terindah", artist: "Andmesh" },
    { title: "Teman Hidup", artist: "Tulus" },
    { title: "It's You", artist: "Raisa" },
    { title: "Denganmu", artist: "Arsy Widianto" },
    { title: "Perfect", artist: "Ed Sheeran" },
    { title: "Akad", artist: "Payung Teduh" },
    { title: "Jodoh Pasti Bertemu", artist: "Afgan" },
    { title: "Kasih Putih", artist: "Glenn Fredly" },
    { title: "Janji Suci", artist: "Kahitna" },
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setShowPlaylist(false);
    if (audioRef.current && !isPlaying) {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = false;
    audioRef.current.addEventListener('ended', nextTrack);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', nextTrack);
        audioRef.current.pause();
      }
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial slide in animation
      gsap.from(containerRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        delay: 2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // Playlist animation
  useEffect(() => {
    if (!playlistRef.current) return;

    if (showPlaylist) {
      gsap.fromTo(playlistRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [showPlaylist]);

  // Pulse animation when playing
  useEffect(() => {
    if (!pulseRef.current) return;

    if (isPlaying) {
      gsap.to(pulseRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 1,
        repeat: -1,
        ease: "power2.out",
      });
    } else {
      gsap.killTweensOf(pulseRef.current);
      gsap.set(pulseRef.current, { scale: 1, opacity: 0 });
    }
  }, [isPlaying]);

  return (
    <>
      {/* Floating Player Button */}
      <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Playlist Popup */}
          {showPlaylist && (
            <div 
              ref={playlistRef}
              className="absolute bottom-20 right-0 w-72 max-h-80 overflow-y-auto bg-card/95 backdrop-blur-md rounded-2xl shadow-card border border-border/50"
            >
              <div className="p-4 border-b border-border/30">
                <h3 className="font-display text-lg text-foreground">Playlist</h3>
              </div>
              <div className="p-2">
                {playlist.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => selectTrack(index)}
                    className={`w-full text-left p-3 rounded-xl transition-colors duration-200 ${
                      currentTrack === index
                        ? "bg-warm-blush/30 text-foreground"
                        : "hover:bg-blush-pink/20 text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm font-medium truncate">{track.title}</p>
                    <p className="text-xs text-muted-foreground">{track.artist}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Now Playing Info */}
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="bg-card/90 backdrop-blur-md rounded-full px-4 py-2 shadow-soft border border-border/30 cursor-pointer hover:bg-card transition-colors"
              onClick={() => setShowPlaylist(!showPlaylist)}
            >
              <p className="text-xs text-muted-foreground">Now Playing</p>
              <p className="text-sm font-medium text-foreground truncate max-w-[180px]">
                {playlist[currentTrack].title}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevTrack}
              className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-md shadow-soft border border-border/30 flex items-center justify-center text-foreground hover:bg-warm-blush/30 transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <div className="relative">
              {/* Pulse effect */}
              <div 
                ref={pulseRef}
                className="absolute inset-0 w-14 h-14 rounded-full bg-warm-blush/30"
                style={{ opacity: 0 }}
              />
              <button
                onClick={togglePlay}
                className="relative w-14 h-14 rounded-full bg-gradient-to-br from-warm-blush to-accent shadow-glow flex items-center justify-center text-cream-white hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>
            </div>

            <button
              onClick={nextTrack}
              className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-md shadow-soft border border-border/30 flex items-center justify-center text-foreground hover:bg-warm-blush/30 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-md shadow-soft border border-border/30 flex items-center justify-center text-foreground hover:bg-warm-blush/30 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
