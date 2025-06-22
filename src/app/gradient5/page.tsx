"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the shader component to avoid SSR issues
const VertexShaderCanvas = dynamic(() => import("./VertexShaderCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-500 via-purple-600 to-blue-600 animate-pulse" />
  ),
});

export default function Gradient5() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Vertex Deformation Shader Canvas */}
      <div className="absolute inset-0 w-full h-full">
        {isClient ? (
          <VertexShaderCanvas />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-500 via-purple-600 to-blue-600" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mt-20 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-xl md:text-2xl font-bold mb-6 text-white drop-shadow-lg">
            Method 5
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90">
            Vertex Deformation
          </h2>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              Combining fragment shaders with vertex deformation using simplex
              noise to create sharp gradient edges and unique organic patterns.
            </p>

            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-6">
              <p className="text-lg text-orange-200 mb-2">
                🔺 <strong>Vertex Deformation Magic:</strong>
              </p>
              <p className="text-white/90 text-base">
                By displacing vertices with noise functions before applying the
                fragment shader, we create sharp transitions and organic
                distortions that are impossible to achieve with fragment shaders
                alone.
              </p>
            </div>

            <div className="text-left bg-black/50 rounded-lg p-4 font-mono text-sm mb-4">
              <div className="text-gray-300">
                <span className="text-gray-400">
                  {"// Vertex shader with noise deformation"}
                </span>
              </div>
              <div className="text-gray-300 mt-2">
                <span className="text-blue-400">vec2</span> modifiedCoord = uv *
                <span className="text-yellow-400">vec2</span>(
                <span className="text-green-400">3.</span>,
                <span className="text-green-400">4.</span>);
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">vec3</span> newPosition =
                position;
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">float</span> distortion =
                <span className="text-yellow-400">snoise</span>(
                <span className="text-blue-400">vec3</span>(modifiedCoord.x +
                uTime *<span className="text-green-400">.5</span>,
                modifiedCoord.y, uTime)) *
                <span className="text-green-400">1.</span>;
              </div>
              <div className="text-gray-300">newPosition.z += distortion;</div>
              <div className="text-gray-300 mt-2">
                <span className="text-gray-400">
                  {"// Creates sharp edges and organic flow"}
                </span>
              </div>
            </div>

            <div className="text-left bg-black/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-gray-400">
                  {"// Fragment shader (same as Method 4)"}
                </span>
              </div>
              <div className="text-gray-300 mt-2">
                <span className="text-blue-400">vec3</span> col1 =
                <span className="text-yellow-400">palette</span>(d1 + time,
                ...);
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">vec3</span> col2 =
                <span className="text-yellow-400">palette</span>(d2 + time,
                ...);
              </div>
              <div className="text-gray-300">
                <span className="text-purple-400">gl_FragColor</span> =
                <span className="text-blue-400">vec4</span>((col1 + col2) /
                <span className="text-green-400">2.0</span>,
                <span className="text-green-400">1.0</span>);
              </div>
            </div>

            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mt-4">
              <p className="text-lg text-purple-200 mb-2">
                ✨ <strong>Advanced Techniques:</strong>
              </p>
              <ul className="text-white/90 text-sm space-y-1">
                <li>
                  • <strong>Vertex displacement</strong> before fragment
                  processing
                </li>
                <li>
                  • <strong>Simplex noise</strong> for organic deformation
                  patterns
                </li>
                <li>
                  • <strong>Sharp gradient transitions</strong> impossible with
                  CSS
                </li>
                <li>
                  • <strong>Layered effects</strong> combining geometry + color
                </li>
                <li>
                  • <strong>Real-time animation</strong> with time-based
                  distortion
                </li>
              </ul>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mt-4">
              <p className="text-lg text-green-200 mb-2">
                🎯 <strong>When to Use This Method:</strong>
              </p>
              <ul className="text-white/90 text-sm space-y-1">
                <li>• Need sharp, distinct gradient boundaries</li>
                <li>• Want organic, flowing distortion effects</li>
                <li>• Creating abstract art or data visualizations</li>
                <li>• Building premium, cutting-edge interfaces</li>
                <li>• Maximum visual impact and uniqueness required</li>
              </ul>
            </div>

            <div className="bg-gray-900/20 border border-gray-500/30 rounded-lg p-4 mt-4">
              <p className="text-lg text-gray-200 mb-3">
                📚 <strong>Learn More About Vertex Shaders:</strong>
              </p>
              <div className="text-white/90 text-sm">
                <p className="mb-2">
                  {"Want to understand what's happening in the vertex shader?"}
                </p>
                <a
                  href="https://www.youtube.com/watch?v=qmRqgFbNprM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-red-300 hover:text-red-200 transition-colors"
                >
                  <span>🎥</span>
                  <span>WebGL Noise Gradient Tutorial</span>
                </a>
                <p className="text-gray-400 text-xs mt-1">
                  Deep dive into vertex deformation techniques and noise
                  functions
                </p>
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
