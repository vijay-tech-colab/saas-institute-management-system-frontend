"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GraduationCap } from "lucide-react";

const textVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 }
  },
};

export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide the splash screen after 3.5 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const title = "CampusOS";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* ─── High-Performance Background ─── */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Dark grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            {/* Center radial glow (static, cheap for GPU) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Ripple Effects */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{ opacity: 0, scale: 3 }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-blue-500/30"
                />
              ))}
            </div>

            {/* Core Icon */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-24 mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] shadow-[0_0_40px_rgba(59,130,246,0.5)] flex items-center justify-center relative z-10 overflow-hidden ring-1 ring-white/20"
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50" />
              <GraduationCap className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
              
              {/* Internal sweeping light */}
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
              />
            </motion.div>
            
            {/* Staggered Typography */}
            <motion.div 
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex text-5xl font-black tracking-tighter text-slate-900 mb-4"
            >
              {title.split("").map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={letterVariants}
                  className={index >= 6 ? "text-blue-600" : "text-slate-900"}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Subtitle */}
            <div className="overflow-hidden mb-12">
              <motion.p 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-500 font-medium tracking-[0.2em] text-[11px] uppercase flex items-center justify-center gap-2"
              >
                Initializing Workspace
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  ...
                </motion.span>
              </motion.p>
            </div>
          </motion.div>

          {/* ─── Infinite Loop Loading Bar ─── */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-16 w-64 h-1 bg-slate-200/50 rounded-full overflow-hidden backdrop-blur-md"
          >
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
