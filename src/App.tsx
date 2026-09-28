import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Phone, MapPin, Calendar, Clock, X, Music, VolumeX, Send } from "lucide-react";

/**
 * Premium Sri Lankan Engagement Invitation Theme
 * Names: Naween & Nadeesha
 * Background: Cream/Sand
 * Accents: Green/Brown
 */

const mandalaImage = "/images/floral_wreath.jpg";
const centerImage = "/images/floral_wreath.jpg";

function FloatingPetals() {
  const petals = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 10,
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
    })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-theme-200/20"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.2,
            borderRadius: "50% 5% 50% 5%",
            rotate: p.rotation
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: [0, 1200], opacity: [0, 0.5, 0], rotate: p.rotation + 360 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export default function EngagementInvitation() {
  // Read guest params from URL
  const searchParams = new URLSearchParams(window.location.search);
  const guestPrefix = searchParams.get("prefix");
  const guestName = searchParams.get("name");

  const [isOpened, setIsOpened] = useState(false);
  const [rsvpName, setRsvpName] = useState(guestName || "");
  const [attendance, setAttendance] = useState<"attending" | "declined" | null>(null);
  const [guests, setGuests] = useState(1);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !attendance) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", rsvpName);
      formData.append("attendance", attendance);
      formData.append("guests", attendance === "attending" ? guests.toString() : "0");
      formData.append("guestPrefix", guestPrefix || "");
      formData.append("guestName", guestName || "");

      // Replace this URL with your deployed Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyxO0LHroR-4WZ781x8mLLPznhCTWaqgqkrJLySE0o0vFfGXDV6DLsPv4HcqmJvVoLV/exec";

      if (GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: formData,
          mode: "no-cors" // Prevents CORS preflight issues
        });
      } else {
        // Simulate network delay if URL is not set
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      setSubmitting(false);
      setRsvpSubmitted(true);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitting(false);
      alert("There was an issue submitting your RSVP. Please try again.");
    }
  };

  return (
    <main className="h-[100dvh] w-full bg-brown-dark overflow-hidden relative flex items-center justify-center font-montserrat">
      <FloatingPetals />

      <audio ref={audioRef} src="/paulyudin-wedding-485932.mp3" loop autoPlay />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="flex flex-col items-center justify-center p-6 relative z-10 w-full"
          >
            {/* Title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <span className="inline-block px-5 py-2 rounded-full bg-brown-base border border-theme-500/20 text-[10px] uppercase tracking-[0.5em] text-theme-600 font-bold mb-6">
                Save the Date
              </span>
              <h1 className="font-cinzel text-4xl md:text-5xl text-theme-900 mb-4 tracking-tight">
                Shakila & Randika
              </h1>
              <p className="text-theme-600 text-sm tracking-[0.2em] font-light">DECEMBER 02, 2026</p>
            </motion.div>

            {/* Gatefold Envelope */}
            <div
              className="relative w-full max-w-[400px] aspect-[1/1.4] flex items-center justify-center group cursor-pointer perspective-1000"
              onClick={() => {
                setIsOpened(true);
                if (audioRef.current) {
                  audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio autoplay blocked", e));
                }
              }}
            >
              <div className="absolute inset-0 bg-brown-base rounded-xl shadow-2xl border border-theme-500/20 overflow-hidden" />

              {/* Left Flap */}
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 bg-brown-base z-20 shadow-[5px_0_15px_rgba(0,0,0,0.3)] origin-left flex items-center justify-end pr-4 overflow-hidden"
                whileHover={{ rotateY: -10 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div
                  className="absolute top-0 bottom-0 left-0 w-[200%] bg-cover bg-center z-0"
                  style={{ backgroundImage: `url('/ChatGPT%20Image%20Sep%201,%202026,%2004_10_34%20AM.png')` }}
                />
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-0" />
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-theme-400/30 z-10" />

                <div className="text-theme-200/40 rotate-90 whitespace-nowrap text-xs tracking-[0.5em] uppercase font-bold relative z-10">
                  SHAKILA & RANDIKA
                </div>
              </motion.div>

              {/* Right Flap */}
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 bg-brown-base z-20 shadow-[-5px_0_15px_rgba(0,0,0,0.3)] origin-right flex items-center justify-start pl-4 overflow-hidden"
                whileHover={{ rotateY: 10 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div
                  className="absolute top-0 bottom-0 right-0 w-[200%] bg-cover bg-center z-0"
                  style={{ backgroundImage: `url('/ChatGPT%20Image%20Sep%201,%202026,%2004_10_34%20AM.png')` }}
                />
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] z-0" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-theme-400/30 z-10" />
              </motion.div>

              {/* The Seal Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpened(true);
                  if (audioRef.current) {
                    audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log("Audio autoplay blocked", err));
                  }
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 rounded-full bg-gradient-to-br from-theme-200 via-theme-100 to-theme-300 shadow-2xl border-4 border-[#3d2a25] flex items-center justify-center group-hover:shadow-theme-500/20 cursor-pointer"
              >
                <div className="text-center">
                  <p className="font-cinzel text-2xl font-bold text-[#3d2a25] leading-none">S&R</p>
                  <div className="h-px w-10 bg-[#3d2a25]/30 mx-auto my-1.5" />
                  <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#3d2a25]">Open</p>
                </div>
              </motion.div>

              {/* Card Preview inside (Mandala) */}
              <div className="absolute inset-10 opacity-30 flex items-center justify-center">
                <img src={mandalaImage} alt="" className="w-full h-auto animate-spin-slow mix-blend-multiply" style={{ animationDuration: '20s' }} />
              </div>
            </div>

            <p className="mt-8 text-[11px] uppercase tracking-[0.6em] text-theme-500 font-bold animate-pulse">
              Tap to Reveal
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="card-stage"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center"
          >
            {/* The Main Card */}
            <div className="relative w-full h-full bg-brown-base flex flex-col text-theme-900 overflow-hidden">

              {/* Top fixed close button */}
              <button
                onClick={() => {
                  setIsOpened(false);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                }}
                className="absolute top-3 right-3 z-50 p-1.5 rounded-full border border-theme-500/20 text-theme-700 hover:text-theme-500 hover:border-theme-500/50 bg-brown-base/80 backdrop-blur-sm transition-all duration-300"
                title="Return to envelope"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top fixed audio toggle button */}
              <button
                onClick={toggleAudio}
                className="absolute top-3 left-3 z-50 p-1.5 rounded-full border border-theme-500/20 text-theme-700 hover:text-theme-500 hover:border-theme-500/50 bg-brown-base/80 backdrop-blur-sm transition-all duration-300"
                title={isPlaying ? "Mute music" : "Play music"}
              >
                {isPlaying ? <Music className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Scroll Container */}
              <div className="flex-1 overflow-y-auto relative z-10 scrollbar-thin">

                {/* Scrolling Background and Content Wrapper */}
                <div 
                  className="min-h-full w-full flex flex-col items-center justify-start p-4 sm:p-6 pb-20 relative text-center bg-top bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url('/ChatGPT%20Image%20Sep%201,%202026,%2004_23_03%20AM.png')` }}
                >
                  {/* Background Textures */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                  {/* Content Sections */}
                  <div className="flex flex-col items-center justify-center relative z-10 w-full mt-48 sm:mt-48 mb-8 px-2">

                    {guestName && (
                      <div className="text-center mb-6">
                        <p className="font-playball text-3xl md:text-4xl text-theme-900 drop-shadow-sm mb-1">
                          Dear
                        </p>
                        <p className="font-cinzel text-base md:text-lg font-bold text-[#c59d5f] tracking-wider">
                          {guestPrefix} {guestName},
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-2 text-[#c59d5f] opacity-80 mb-5 w-full">
                      <div className="h-[1.5px] w-12 bg-[#c59d5f]/50"></div>
                      <div className="text-[#c59d5f] text-[10px] font-serif">✧</div>
                      <div className="h-[1.5px] w-12 bg-[#c59d5f]/50"></div>
                    </div>

                    <p className="font-playball text-4xl md:text-5xl tracking-wide text-theme-900 drop-shadow-sm mb-6">
                      With Heartfelt Joy And Gratitude,
                    </p>

                    <div className="text-center">
                      <p className="text-[11px] md:text-xs font-cinzel text-theme-900 uppercase tracking-widest leading-[2] font-bold">
                        Mr. Sudath De Silva & Mrs. Sumalka De Silva
                        <br/>
                        <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-theme-700 mt-2 mb-2 inline-block">TOGETHER WITH</span>
                        <br/>
                        Mr. Benaji Wickramarachchi & Mrs. Sandhya Liyanagamage
                      </p>
                    </div>

                    <div className="text-center space-y-1 my-6 px-2">
                       <p className="text-[11px] md:text-xs tracking-[0.15em] font-bold text-theme-900 uppercase leading-[2] font-cinzel">
                         Request the pleasure of your presence<br/>at the wedding celebration of<br/>their beloved children
                       </p>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-0 my-2">
                      <h2 className="text-6xl md:text-7xl font-playball text-[#c59d5f] leading-none py-1 drop-shadow-md">Shakila</h2>
                      <span className="text-4xl md:text-5xl font-playball text-[#c59d5f] leading-none drop-shadow-md">&</span>
                      <h2 className="text-6xl md:text-7xl font-playball text-[#c59d5f] leading-none py-1 drop-shadow-md">Randika</h2>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[#c59d5f] opacity-80 my-8 w-full">
                      <div className="h-[1.5px] w-16 bg-[#c59d5f]/50"></div>
                      <div className="text-[#c59d5f] text-[10px] font-serif">✧</div>
                      <div className="h-[1.5px] w-16 bg-[#c59d5f]/50"></div>
                    </div>

                    <div className="flex items-stretch justify-center w-full max-w-[340px] mx-auto gap-4">
                      <div className="flex-1 flex flex-col items-end text-right justify-center">
                        <p className="text-[10px] md:text-[11px] font-cinzel tracking-widest font-bold text-theme-900 uppercase">WEDNESDAY, DECEMBER</p>
                        <p className="text-5xl md:text-6xl font-cinzel text-theme-900 leading-none my-1 font-bold">02<span className="text-xl md:text-2xl align-super font-semibold">ND</span></p>
                        <p className="text-[10px] md:text-[11px] font-cinzel tracking-widest font-bold text-theme-900 uppercase">TWENTY TWENTY SIX</p>
                      </div>
                      
                      <div className="w-[1.5px] bg-[#c59d5f]"></div>
                      
                      <div className="flex-1 flex flex-col items-start text-left justify-center space-y-1.5">
                        <p className="text-[11px] md:text-xs font-cinzel tracking-widest font-bold text-theme-900 uppercase">AT</p>
                        <p className="text-xs md:text-sm font-cinzel tracking-widest font-bold text-theme-900 uppercase leading-snug">
                          MONARCH IMPERIAL<br/>BALLROOM
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 text-center mt-8 mb-2">
                      <p className="text-[11px] md:text-xs font-cinzel font-bold tracking-widest text-theme-900 uppercase">
                        FROM 09.00 AM TO 03.00 PM
                      </p>
                      <p className="text-[10px] md:text-[11px] font-cinzel font-bold tracking-widest text-theme-900 uppercase">
                        (PORUWA CEREMONY AT 09.00 AM)
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[#c59d5f] opacity-80 my-6 w-full">
                      <div className="h-[1.5px] w-12 bg-[#c59d5f]/50"></div>
                      <div className="text-[#c59d5f] text-[10px] font-serif">✧</div>
                      <div className="h-[1.5px] w-12 bg-[#c59d5f]/50"></div>
                    </div>

                    <div className="text-center space-y-2 mb-4">
                      <p className="text-[11px] md:text-xs font-cinzel font-bold text-theme-900 tracking-widest uppercase mb-2">
                        RSVP BEFORE 15TH NOVEMBER
                      </p>
                      <div className="text-[10px] md:text-[11px] font-cinzel text-theme-900 tracking-[0.15em] font-bold uppercase">
                        RANDIKA: 076 4414252 <span className="mx-2 text-[#c59d5f]">|</span> SUDATH: 077 8189174
                      </div>
                    </div>

                    {/* Location Connection Link */}
                    <div className="pt-4 w-full max-w-[280px] mx-auto">
                      <a
                        href="https://maps.app.goo.gl/dSY1ynsZqWc8TLAE7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-theme-500/40 text-[#c59d5f] hover:bg-[#c59d5f] hover:text-brown-base transition-all duration-300 font-bold tracking-[0.1em] text-xs uppercase shadow-md shadow-theme-500/5 hover:shadow-theme-500/20"
                      >
                        <MapPin className="w-4 h-4" />
                        View Location on Maps
                      </a>
                    </div>
                  </div>

                  {/* Bottom close button */}
                  <button
                    onClick={() => {
                      setIsOpened(false);
                      if (audioRef.current) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      }
                    }}
                    className="mt-2 text-theme-700 hover:text-theme-500 hover:underline transition-colors text-[7px] md:text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-1 group w-full pt-2 border-t border-theme-500/10 mx-auto"
                  >
                    Return to Cover
                  </button>

                  {/* Footer */}
                  <div className="w-full pt-6 pb-2 text-center">
                    <p className="text-theme-700 text-[9px] md:text-[10px] font-sans tracking-wider">
                      Want a beautiful wedding website like this? Create yours with{" "}
                      <a 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-theme-900 font-bold hover:text-theme-500 underline transition-colors" 
                        href="https://wa.me/94707819074"
                      >
                        invitemint
                      </a>
                    </p>
                  </div>

                </div>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        /* Styling scrollbar in card */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.4);
        }
      `}} />
    </main>
  );
}
