"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Gradient2() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Blob gradient background */}
      <div className="absolute inset-0 blob-gradient" />

      {/* Additional floating blobs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full opacity-60"
          style={{
            background: `radial-gradient(circle, ${
              ["#ff6b6b", "#4ecdc4", "#45b7d1"][i]
            }, transparent)`,
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Method 2
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90">
            CSS Blob Gradients
          </h2>

          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              Using multiple radial gradients to create organic, blob-like
              effects.
            </p>

            <div className="text-left bg-black/30 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-blue-400">background:</span>
              </div>
              <div className="text-gray-300 ml-4">
                <span className="text-green-400">radial-gradient</span>(
                <span className="text-yellow-400">circle at 20% 80%</span>,{" "}
                <span className="text-pink-400">#ff6b6b</span>, transparent),
              </div>
              <div className="text-gray-300 ml-4">
                <span className="text-green-400">radial-gradient</span>(
                <span className="text-yellow-400">circle at 80% 20%</span>,{" "}
                <span className="text-cyan-400">#4ecdc4</span>, transparent);
              </div>
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
