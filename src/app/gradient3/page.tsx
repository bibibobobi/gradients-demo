"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const FloatingShape = ({
  geometry,
  color,
  position,
  speed,
  rotationIntensity,
  floatIntensity,
}: {
  geometry: string;
  color: string;
  position: [number, number, number];
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
}) => {
  const renderGeometry = () => {
    switch (geometry) {
      case "sphere":
        return <sphereGeometry args={[20, 42, 42]} />;
      case "box":
        return <boxGeometry args={[25, 25, 25]} />;
      case "cone":
        return <coneGeometry args={[22, 35, 18]} />;
      case "octahedron":
        return <octahedronGeometry args={[20]} />;
      case "torus":
        return <torusGeometry args={[24, 16, 26, 250]} />;
      default:
        return <sphereGeometry args={[25, 42, 42]} />;
    }
  };

  return (
    <Float
      speed={speed || 1}
      rotationIntensity={rotationIntensity || 0.2}
      floatIntensity={floatIntensity || 0.5}
      floatingRange={[-2, 2]}
    >
      <mesh position={position}>
        {renderGeometry()}
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
};

export default function Gradient3() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-pink-200">
      {/* React Three Fiber Canvas with Float components */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          filter: "blur(80px)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 35], fov: 90 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <FloatingShape
            geometry="sphere"
            color="#ff297f"
            position={[-8, 5, 0]}
            speed={3.5}
            rotationIntensity={2.0}
            floatIntensity={2.0}
          />
          <FloatingShape
            geometry="box"
            color="#0d8dfd"
            position={[10, -5, -8]}
            speed={4.0}
            rotationIntensity={1.8}
            floatIntensity={2.5}
          />
          <FloatingShape
            geometry="cone"
            color="#fff958"
            position={[-5, -8, 5]}
            speed={2.8}
            rotationIntensity={2.5}
            floatIntensity={1.8}
          />
          <FloatingShape
            geometry="octahedron"
            color="#8437ff"
            position={[6, 8, -5]}
            speed={5.0}
            rotationIntensity={1.5}
            floatIntensity={3.0}
          />
          <FloatingShape
            geometry="torus"
            color="#fb88ff"
            position={[-12, 0, 8]}
            speed={3.2}
            rotationIntensity={3.0}
            floatIntensity={2.2}
          />
          <FloatingShape
            geometry="sphere"
            color="#1cff60"
            position={[0, -10, -3]}
            speed={4.5}
            rotationIntensity={1.2}
            floatIntensity={2.8}
          />
          <FloatingShape
            geometry="box"
            color="#16fecb"
            position={[8, 6, 10]}
            speed={3.8}
            rotationIntensity={2.2}
            floatIntensity={1.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mt-20 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-xl md:text-2xl font-bold mb-6 text-white drop-shadow-lg">
            Method 3
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white/90">
            React Three Drei Float
          </h2>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              Using React Three Drei&apos;s Float component for natural 3D
              movement, then add CSS blur filter.
            </p>
            {/* 
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
              <p className="text-lg text-purple-200 mb-2">
                💡 <strong>The Magic:</strong>
              </p>
              <p className="text-white/90 text-base">
                When 3D shapes move around in the scene, they mesh into one
                another. Adding blur on top creates unique, organic gradients
                that are impossible to achieve with static CSS.
              </p>
            </div> */}

            <div className="text-left bg-black/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-gray-400">
                  {"// Using React Three Drei Float component"}
                </span>
              </div>
              <div className="text-gray-300 mt-2">
                <span className="text-purple-400">{"<Float"}</span>
              </div>
              <div className="text-gray-300 ml-2">
                <span className="text-blue-400">speed</span>={"{"}
                <span className="text-yellow-400">1</span>
                {"}"}{" "}
                <span className="text-gray-400">
                  {" // Animation speed, defaults to 1"}
                </span>
              </div>
              <div className="text-gray-300 ml-2">
                <span className="text-blue-400">rotationIntensity</span>={"{"}
                <span className="text-yellow-400">0.2</span>
                {"}"}{" "}
                <span className="text-gray-400">
                  {"// XYZ rotation intensity"}
                </span>
              </div>
              <div className="text-gray-300 ml-2">
                <span className="text-blue-400">floatIntensity</span>={"{"}
                <span className="text-yellow-400">0.5</span>
                {"}"}{" "}
                <span className="text-gray-400">
                  {"// Up/down float intensity"}
                </span>
              </div>
              <div className="text-gray-300 ml-2">
                <span className="text-blue-400">floatingRange</span>={"{"}
                <span className="text-yellow-400">[1, 10]</span>
                {"}"}{" "}
                <span className="text-gray-400">
                  {"// Range of y-axis values"}
                </span>
              </div>
              <div className="text-gray-300">{">"}</div>
              <div className="text-gray-300 ml-2">
                <span className="text-purple-400">{"<mesh"}</span>{" "}
                <span className="text-purple-400">{"/>"}</span>
              </div>
              <div className="text-gray-300">
                <span className="text-purple-400">{"</Float>"}</span>
              </div>
              <div className="text-gray-300 mt-3">
                <span className="text-gray-400">
                  {"/* CSS blur filter creates organic blending */"}
                </span>
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">filter:</span>{" "}
                <span className="text-green-400">blur</span>(
                <span className="text-yellow-400">40px</span>);
              </div>
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
