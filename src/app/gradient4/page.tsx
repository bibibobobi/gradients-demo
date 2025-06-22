"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the shader component to avoid SSR issues
const ShaderCanvas = dynamic(() => import("./ShaderCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-pulse" />
  ),
});

export default function Gradient4() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Fragment Shader Canvas */}
      <div className="absolute inset-0 w-full h-full">
        {isClient ? (
          <ShaderCanvas />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
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
            Method 4
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90">
            Fragment Shader Noise
          </h2>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              Using WebGL fragment shaders with cosine-based color palettes to
              create organic, flowing noise gradients that are impossible with
              CSS alone.
            </p>

            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
              <p className="text-lg text-purple-200 mb-2">
                🔬 <strong>The Science:</strong>
              </p>
              <p className="text-white/90 text-base">
                Fragment shaders run on the GPU, calculating colors for every
                pixel in parallel. The cosine-based palette creates smooth color
                transitions using mathematical functions, while animated points
                create flowing patterns.
              </p>
            </div>

            <div className="text-left bg-black/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-gray-400">
                  {"// Cosine-based color palette function"}
                </span>
              </div>
              <div className="text-gray-300 mt-2">
                <span className="text-purple-400">vec3</span>{" "}
                <span className="text-yellow-400">palette</span>(
                <span className="text-blue-400">float</span> t,
                <span className="text-blue-400">vec3</span> a,
                <span className="text-blue-400">vec3</span> b,
                <span className="text-blue-400">vec3</span> c,
                <span className="text-blue-400">vec3</span> d)
              </div>
              <div className="text-gray-300">{`{`}</div>
              <div className="text-gray-300 ml-4">
                <span className="text-purple-400">return</span> a + b*
                <span className="text-yellow-400">cos</span>(
                <span className="text-green-400">6.28318</span>*(c*t+d));
              </div>
              <div className="text-gray-300">{`}`}</div>

              <div className="text-gray-300 mt-3">
                <span className="text-gray-400">
                  {"// Animated points create flowing patterns"}
                </span>
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">vec2</span> c1 =
                <span className="text-yellow-400">vec2</span>(
                <span className="text-green-400">sin</span>(time)*
                <span className="text-yellow-400">0.5</span>,
                <span className="text-green-400">cos</span>(time)*
                <span className="text-yellow-400">0.7</span>);
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">float</span> d1 =
                <span className="text-yellow-400">length</span>(uv - c1);
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">vec3</span> col =
                <span className="text-yellow-400">palette</span>(d1 + time,
                ...);
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-lg text-blue-200 mb-2">
                ⚡ <strong>Performance Benefits:</strong>
              </p>
              <ul className="text-white/90 text-sm space-y-1">
                <li>• GPU-accelerated rendering (60+ FPS)</li>
                <li>• Parallel processing for every pixel</li>
                <li>• Mathematical precision in color calculations</li>
                <li>• Infinite detail at any zoom level</li>
              </ul>
            </div>

            <div className="bg-gray-900/20 border border-gray-500/30 rounded-lg p-4 mt-4">
              <p className="text-lg text-gray-200 mb-3">
                🎨 <strong>Shader Credits & More Examples:</strong>
              </p>
              <div className="text-white/90 text-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <span>Based on:</span>
                  <a
                    href="https://www.shadertoy.com/view/tls3zS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <span>🔗</span>
                    <span>Shadertoy: Color Palette Gradient</span>
                  </a>
                </div>
                <div className="border-t border-gray-600/30 pt-2">
                  <p className="text-gray-300 mb-2">
                    More amazing shader possibilities:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.shadertoy.com/view/WslGWl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-purple-300 hover:text-purple-200 transition-colors text-sm"
                      title="Fractal Noise"
                    >
                      <span>🌀</span>
                      <span>Fractal</span>
                    </a>
                    <a
                      href="https://www.shadertoy.com/view/ftSSRR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-green-300 hover:text-green-200 transition-colors text-sm"
                      title="Fluid Simulation"
                    >
                      <span>🌊</span>
                      <span>Fluid</span>
                    </a>
                    <a
                      href="https://www.shadertoy.com/view/WtdXR8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-orange-300 hover:text-orange-200 transition-colors text-sm"
                      title="Plasma Effect"
                    >
                      <span>⚡</span>
                      <span>Plasma</span>
                    </a>
                  </div>
                </div>
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
