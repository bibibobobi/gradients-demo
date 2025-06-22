"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Gradient4() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Noise gradient background */}
      <div className="absolute inset-0 noise-gradient" />

      {/* Additional noise layers */}
      <div className="absolute inset-0 opacity-70">
        <div
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 15% 15%, #ff6b6b 0%, transparent 20%),
              radial-gradient(circle at 85% 85%, #4ecdc4 0%, transparent 20%),
              radial-gradient(circle at 30% 70%, #45b7d1 0%, transparent 25%),
              radial-gradient(circle at 70% 30%, #96ceb4 0%, transparent 15%),
              radial-gradient(circle at 50% 50%, #ffeaa7 0%, transparent 30%)
            `,
            backgroundSize:
              "120px 120px, 80px 80px, 150px 150px, 90px 90px, 110px 110px",
            animation: "noiseShift 15s linear infinite reverse",
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Method 4
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90">
            Noise Gradients
          </h2>

          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              Multiple layered radial gradients with different sizes and
              positions to create noise-like patterns.
            </p>

            <div className="text-left bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="text-gray-300">
                <span className="text-blue-400">background:</span>
              </div>
              <div className="text-gray-300 ml-2">
                <span className="text-green-400">radial-gradient</span>(
                <span className="text-yellow-400">circle at 25% 25%</span>,{" "}
                <span className="text-pink-400">#ff6b6b</span>, transparent),
              </div>
              <div className="text-gray-300 ml-2">
                <span className="text-green-400">radial-gradient</span>(
                <span className="text-yellow-400">circle at 75% 75%</span>,{" "}
                <span className="text-cyan-400">#4ecdc4</span>, transparent),
              </div>
              <div className="text-gray-300 ml-2">
                <span className="text-green-400">radial-gradient</span>(
                <span className="text-yellow-400">circle at 50% 10%</span>,{" "}
                <span className="text-purple-400">#45b7d1</span>, transparent);
              </div>
              <div className="text-gray-300 mt-2">
                <span className="text-blue-400">background-size:</span>{" "}
                <span className="text-yellow-400">
                  80px 80px, 60px 60px, 100px 100px
                </span>
                ;
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/gradient3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300"
              >
                ← Previous
              </motion.button>
            </Link>

            <div className="text-white/70">4 / 5</div>

            <Link href="/gradient5">
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
