"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Gradient5() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGradient = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Create multiple dynamic gradients
      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createRadialGradient(
          Math.sin(time * 0.01 + i * 2) * width * 0.3 + width * 0.5,
          Math.cos(time * 0.008 + i * 2) * height * 0.3 + height * 0.5,
          0,
          Math.sin(time * 0.01 + i * 2) * width * 0.3 + width * 0.5,
          Math.cos(time * 0.008 + i * 2) * height * 0.3 + height * 0.5,
          Math.min(width, height) * 0.6
        );

        const hue1 = (time * 0.5 + i * 120) % 360;
        const hue2 = (time * 0.7 + i * 120 + 60) % 360;

        gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, 0.8)`);
        gradient.addColorStop(0.5, `hsla(${hue2}, 80%, 50%, 0.4)`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Add noise-like effect
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 30;
        data[i] = Math.max(0, Math.min(255, data[i] + noise)); // Red
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // Green
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // Blue
      }

      ctx.putImageData(imageData, 0, 0);

      time++;
      animationFrame = requestAnimationFrame(drawGradient);
    };

    resizeCanvas();
    drawGradient();

    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(2px)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Method 5
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90">
            WebGL / Canvas Gradients
          </h2>

          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              Using HTML5 Canvas or WebGL with mathematical functions for
              complex, dynamic gradients.
            </p>

            <div className="text-left bg-black/40 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-blue-400">const</span>{" "}
                <span className="text-yellow-400">gradient</span> = ctx.
                <span className="text-green-400">createRadialGradient</span>(
              </div>
              <div className="text-gray-300 ml-4">
                Math.<span className="text-green-400">sin</span>(time *{" "}
                <span className="text-yellow-400">0.01</span>) * width,
              </div>
              <div className="text-gray-300 ml-4">
                Math.<span className="text-green-400">cos</span>(time *{" "}
                <span className="text-yellow-400">0.008</span>) * height,
              </div>
              <div className="text-gray-300 ml-4">
                <span className="text-yellow-400">0</span>, x, y, radius
              </div>
              <div className="text-gray-300">);</div>
              <div className="text-gray-300 mt-2">
                gradient.<span className="text-green-400">addColorStop</span>(
                <span className="text-yellow-400">0</span>,{" "}
                <span className="text-pink-400">
                  {"`hsl(${hue}, 70%, 60%)`"}
                </span>
                );
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/gradient4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300"
              >
                ← Previous
              </motion.button>
            </Link>

            <div className="text-white/70">5 / 5</div>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300"
              >
                Home →
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
