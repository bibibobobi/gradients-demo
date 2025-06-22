"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Gradient1() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Full background gradient */}
      <div className="absolute inset-0 css-gradient" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Method 1
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90">
            CSS Linear Gradients
          </h2>

          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              The simplest and most widely-used approach. Perfect for most use
              cases.
            </p>

            <div className="text-left bg-black/30 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-blue-400">background:</span>{" "}
                <span className="text-green-400">linear-gradient</span>(
                <span className="text-yellow-400">45deg</span>,{" "}
                <span className="text-pink-400">#ff6b6b</span>,{" "}
                <span className="text-cyan-400">#4ecdc4</span>,{" "}
                <span className="text-purple-400">#45b7d1</span>);
              </div>
              <div className="text-gray-300 mt-2">
                <span className="text-blue-400">background-size:</span>{" "}
                <span className="text-yellow-400">300% 300%</span>;
              </div>
              <div className="text-gray-300 mt-2">
                <span className="text-blue-400">animation:</span>{" "}
                <span className="text-green-400">gradientShift</span>{" "}
                <span className="text-yellow-400">4s ease infinite</span>;
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300"
              >
                ← Home
              </motion.button>
            </Link>

            <div className="text-white/70">1 / 5</div>

            <Link href="/gradient2">
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
