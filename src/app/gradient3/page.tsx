"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const shapes = [
  { size: 200, color: "#ff6b6b", x: 10, y: 10, delay: 0 },
  { size: 180, color: "#4ecdc4", x: 70, y: 20, delay: 2 },
  { size: 160, color: "#45b7d1", x: 20, y: 70, delay: 4 },
  { size: 220, color: "#667eea", x: 50, y: 50, delay: 6 },
  { size: 140, color: "#ffeaa7", x: 80, y: 80, delay: 8 },
];

export default function Gradient3() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* 3D Shapes with blur */}
      <div className="absolute inset-0">
        <div className="shapes-container">
          {shapes.map((shape, i) => (
            <motion.div
              key={i}
              className="gradient-shape"
              style={{
                width: shape.size,
                height: shape.size,
                background: `radial-gradient(circle, ${shape.color}, ${shape.color}88)`,
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                animationDelay: `${shape.delay}s`,
              }}
              animate={{
                x: [0, 50, -30, 0],
                y: [0, -40, 30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Method 3
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90">
            3D Shapes + Blur Filter
          </h2>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              Create multiple 3D shapes, animate them, and apply a heavy blur
              filter for organic gradients.
            </p>

            <div className="text-left bg-black/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-blue-400">.shapes-container</span> {"{"}
              </div>
              <div className="text-gray-300 ml-4">
                <span className="text-blue-400">filter:</span>{" "}
                <span className="text-green-400">blur</span>(
                <span className="text-yellow-400">60px</span>);
              </div>
              <div className="text-gray-300">{"}"}</div>
              <div className="text-gray-300 mt-2">
                <span className="text-blue-400">.shape</span> {"{"}
              </div>
              <div className="text-gray-300 ml-4">
                <span className="text-blue-400">animation:</span>{" "}
                <span className="text-green-400">float3d</span>{" "}
                <span className="text-yellow-400">
                  12s ease-in-out infinite
                </span>
                ;
              </div>
              <div className="text-gray-300">{"}"}</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link href="/gradient2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300"
              >
                ← Previous
              </motion.button>
            </Link>

            <div className="text-white/70">3 / 5</div>

            <Link href="/gradient4">
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
