"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Gradient2() {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ curX: 0, curY: 0, tgX: 0, tgY: 0 });

  useEffect(() => {
    const interBubble = interactiveRef.current;
    if (!interBubble) return;

    let animationFrame: number;

    const move = () => {
      const { curX, curY, tgX, tgY } = cursorPos.current;
      cursorPos.current.curX += (tgX - curX) / 20;
      cursorPos.current.curY += (tgY - curY) / 20;

      interBubble.style.transform = `translate(${Math.round(
        cursorPos.current.curX
      )}px, ${Math.round(cursorPos.current.curY)}px)`;

      animationFrame = requestAnimationFrame(move);
    };

    const handleMouseMove = (event: MouseEvent) => {
      cursorPos.current.tgX = event.clientX;
      cursorPos.current.tgY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* SVG Filter Definition */}
      <svg
        className="fixed top-0 left-0 w-0 h-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(40deg, rgb(108, 0, 162), rgb(0, 17, 82))",
        }}
      />

      {/* Gradients container with SVG filter */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          filter: "url(#goo) blur(40px)",
        }}
      >
        {/* G1 - Vertical movement */}
        <div
          className="absolute animate-moveVertical"
          style={{
            background:
              "radial-gradient(circle at center, rgba(18, 113, 255, 0.8) 0%, rgba(18, 113, 255, 0) 50%)",
            mixBlendMode: "hard-light",
            width: "80%",
            height: "80%",
            top: "calc(50% - 40%)",
            left: "calc(50% - 40%)",
            transformOrigin: "center center",
            opacity: 1,
          }}
        />

        {/* G2 - Circular movement */}
        <div
          className="absolute animate-moveInCircle"
          style={{
            background:
              "radial-gradient(circle at center, rgba(221, 74, 255, 0.8) 0%, rgba(221, 74, 255, 0) 50%)",
            mixBlendMode: "hard-light",
            width: "80%",
            height: "80%",
            top: "calc(50% - 40%)",
            left: "calc(50% - 40%)",
            transformOrigin: "calc(50% - 400px)",
            opacity: 1,
          }}
        />

        {/* G3 - Large circular movement */}
        <div
          className="absolute animate-moveInCircleSlow"
          style={{
            background:
              "radial-gradient(circle at center, rgba(100, 220, 255, 0.8) 0%, rgba(100, 220, 255, 0) 50%)",
            mixBlendMode: "hard-light",
            width: "80%",
            height: "80%",
            top: "calc(50% - 40% + 200px)",
            left: "calc(50% - 40% - 500px)",
            transformOrigin: "calc(50% + 400px)",
            opacity: 1,
          }}
        />

        {/* G4 - Horizontal movement */}
        <div
          className="absolute animate-moveHorizontal"
          style={{
            background:
              "radial-gradient(circle at center, rgba(200, 50, 50, 0.8) 0%, rgba(200, 50, 50, 0) 50%)",
            mixBlendMode: "hard-light",
            width: "80%",
            height: "80%",
            top: "calc(50% - 40%)",
            left: "calc(50% - 40%)",
            transformOrigin: "calc(50% - 200px)",
            opacity: 0.7,
          }}
        />

        {/* G5 - Large bubble */}
        <div
          className="absolute animate-moveInCircleFast"
          style={{
            background:
              "radial-gradient(circle at center, rgba(180, 180, 50, 0.8) 0%, rgba(180, 180, 50, 0) 50%)",
            mixBlendMode: "hard-light",
            width: "160%",
            height: "160%",
            top: "calc(50% - 80%)",
            left: "calc(50% - 80%)",
            transformOrigin: "calc(50% - 800px) calc(50% + 200px)",
            opacity: 1,
          }}
        />

        {/* Interactive bubble that follows mouse */}
        <div
          ref={interactiveRef}
          className="absolute"
          style={{
            background:
              "radial-gradient(circle at center, rgba(140, 100, 255, 0.8) 0%, rgba(140, 100, 255, 0) 50%)",
            mixBlendMode: "hard-light",
            width: "100%",
            height: "100%",
            top: "-50%",
            left: "-50%",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 className="text-xl md:text-2xl font-bold mb-6 text-white drop-shadow-lg">
            Method 2
          </motion.h1>

          <motion.h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90">
            Advanced CSS Blobs
          </motion.h2>

          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              SVG filters + CSS blend modes + mouse interaction for liquid-like
              effects.
            </p>

            <div className="text-left bg-black/30 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-blue-400">filter:</span>{" "}
                <span className="text-green-400">url(#goo) blur(40px)</span>;
              </div>
              <div className="text-gray-300 mt-2">
                <span className="text-blue-400">mix-blend-mode:</span>{" "}
                <span className="text-yellow-400">hard-light</span>;
              </div>
              <div className="text-gray-300 mt-2">
                <span className="text-blue-400">feColorMatrix:</span>{" "}
                <span className="text-pink-400">
                  &quot;1 0 0 0 0 ... 0 0 0 18 -8&quot;
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-sm text-white/70 mb-2">
                💡 Inspired by this tutorial:
              </p>
              <a
                href="https://www.youtube.com/watch?v=Ml-B-W91gtw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors duration-300 underline text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube Tutorial - Advanced CSS Blob Effects
              </a>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/gradient1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300"
              >
                ← Previous
              </motion.button>
            </Link>

            <div className="text-white/70">2 / 5</div>

            <Link href="/gradient3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300"
              >
                Next →
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
