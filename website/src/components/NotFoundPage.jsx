import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const particles = Array.from({ length: 30 });

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden font-sans text-white">
      
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-blue-600/20 rounded-full blur-[100px] mix-blend-screen"
        />
      </div>

      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random(),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
          className="absolute w-1 h-1 bg-white rounded-full blur-[1px] z-0"
        />
      ))}

      <div className="z-10 relative flex flex-col items-center">
        <div className="relative mb-8">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="text-[150px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 relative z-10"
          >
            404
          </motion.h1>

          <motion.div
            animate={{
              x: [-2, 2, -2],
              opacity: [0.5, 0.8, 0.5],
              skewX: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="absolute top-0 left-0 w-full h-full text-[150px] md:text-[220px] font-black leading-none tracking-tighter text-cyan-500/50 mix-blend-overlay z-0"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
          >
            404
          </motion.div>

          <motion.div
            animate={{
              x: [2, -2, 2],
              opacity: [0.5, 0.8, 0.5],
              skewX: [0, -10, 0, 10, 0],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 0.2,
            }}
            className="absolute top-0 left-0 w-full h-full text-[150px] md:text-[220px] font-black leading-none tracking-tighter text-rose-500/50 mix-blend-overlay z-0"
            style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
          >
            404
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center px-4"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 uppercase tracking-[0.2em]">
            Reality Not Found
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-12 font-light">
            You have ventured beyond the known universe. There is nothing here but code and stardust.
          </p>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
              <span className="absolute inset-0 w-full h-full border border-white/20 rounded-full group-hover:border-white/50 transition-colors duration-300"></span>
              <span className="relative text-white font-bold tracking-widest uppercase z-10 flex items-center gap-2">
                Abort Mission
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150 brightness-100"></div>
    </div>
  );
};

export default NotFoundPage;