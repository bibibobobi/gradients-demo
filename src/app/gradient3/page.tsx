"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const shapes = [
  { size: 500, color: "#ffaeff", x: 10, y: 10, delay: 0 },
  { size: 480, color: "#4ecdc4", x: 70, y: 20, delay: 2 },
  { size: 360, color: "#45b7d1", x: 20, y: 70, delay: 4 },
  { size: 520, color: "#667eea", x: 50, y: 50, delay: 6 },
  { size: 440, color: "#ffeaa7", x: 80, y: 80, delay: 8 },
];

export default function Gradient3() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountNode.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create 3D shapes
    const meshes: THREE.Mesh[] = [];
    const colors = [0xffaeff, 0x4ecdc4, 0x45b7d1, 0x667eea, 0xffeaa7];
    const geometries = [
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.BoxGeometry(4, 4, 4),
      new THREE.ConeGeometry(3, 5, 8),
      new THREE.OctahedronGeometry(3.5),
      new THREE.TorusGeometry(3, 1.2, 16, 100),
    ];

    for (let i = 0; i < 5; i++) {
      const geometry = geometries[i];
      const material = new THREE.MeshBasicMaterial({
        color: colors[i],
        transparent: true,
        opacity: 0.8,
      });
      const mesh = new THREE.Mesh(geometry, material);

      // Random initial positions
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8
      );

      scene.add(mesh);
      meshes.push(mesh);
    }

    meshesRef.current = meshes;
    camera.position.z = 12;

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      meshes.forEach((mesh, index) => {
        // Random movement similar to the second method
        const time = Date.now() * 0.001 + index * 0.5;
        mesh.position.x = Math.sin(time * 0.5) * 5;
        mesh.position.y = Math.cos(time * 0.3) * 4;
        mesh.position.z = Math.sin(time * 0.7) * 3;

        // Random rotation (slower)
        mesh.rotation.x += 0.002 + index * 0.0005;
        mesh.rotation.y += 0.003 + index * 0.0003;
        mesh.rotation.z += 0.001 + index * 0.0007;
      });

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
      // Cleanup
      meshes.forEach((mesh) => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Three.js Canvas with blur filter */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        style={{
          filter: "blur(40px)",
        }}
      />

      {/* CSS Fallback shapes for additional effect */}
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
            3D Elements + CSS Blur
          </h2>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10">
            <p className="text-xl text-white/90 mb-6">
              Create a bunch of 3D elements, make them move in random fashion,
              then add CSS blur filter.
            </p>

            <div className="text-left bg-black/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-300">
                <span className="text-gray-400">
                  {"// Create 3D geometries"}
                </span>
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">const</span> geometry ={" "}
                <span className="text-purple-400">
                  new THREE.SphereGeometry
                </span>
                (<span className="text-yellow-400">1, 32, 32</span>);
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">const</span> material ={" "}
                <span className="text-purple-400">
                  new THREE.MeshBasicMaterial
                </span>
              </div>
              <div className="text-gray-300 ml-4">
                <span className="text-blue-400">color:</span>
                <span className="text-yellow-400">0xff6b6b</span>
                <span className="text-blue-400">opacity:</span>
                <span className="text-yellow-400">0.8</span>
              </div>
              <div className="text-gray-300">{"});"}</div>
              <div className="text-gray-300 mt-2">
                <span className="text-gray-400">{"/* CSS blur filter */"}</span>
              </div>
              <div className="text-gray-300">
                <span className="text-blue-400">filter:</span>
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
