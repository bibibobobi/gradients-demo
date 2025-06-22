"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Define the custom shader material type
type NoiseGradientMaterialType = THREE.ShaderMaterial & {
  iTime: number;
  iResolution: THREE.Vector2;
};

// Create the shader material
const NoiseGradientMaterial = shaderMaterial(
  {
    iTime: 0,
    iResolution: new THREE.Vector2(1, 1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float iTime;
    uniform vec2 iResolution;
    varying vec2 vUv;

    // cosine based palette, 4 vec3 params
    vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
    {
        return a + b*cos( 6.28318*(c*t+d) );
    }

    void main()
    {
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = vUv;
        float time = iTime*0.2;
        
        // Calculate two points on screen.
        vec2 c1 = vec2(sin(time)*0.5, cos(iTime)*0.7);
        vec2 c2 = vec2(sin(time*0.7)*0.9, cos(iTime*0.65)*0.6);
        
        //Determine length to point 1 & calculate color.
        float d1 = length( uv - c1);
        vec3 col1 = palette( d1+time,vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));
        
        //Determine length to point 2 & calculate color.
        float d2 = length( uv - c2);
        vec3 col2 = palette( d2+time,vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20));
        
        // Output to screen
        gl_FragColor = vec4( (col1+col2) / 2.0 ,1.0);
    }
  `
);

// Extend the material so it can be used in JSX
extend({ NoiseGradientMaterial });

// Component that renders the shader
const ShaderPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<NoiseGradientMaterialType>(null);
  const [resolution, setResolution] = useState(new THREE.Vector2(1920, 1080));

  useEffect(() => {
    if (typeof window !== "undefined") {
      setResolution(new THREE.Vector2(window.innerWidth, window.innerHeight));

      const handleResize = () => {
        setResolution(new THREE.Vector2(window.innerWidth, window.innerHeight));
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.iTime = state.clock.elapsedTime;
      materialRef.current.iResolution = resolution;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <noiseGradientMaterial ref={materialRef} />
    </mesh>
  );
};

// Main ShaderCanvas component
export default function ShaderCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ShaderPlane />
    </Canvas>
  );
}

// Extend JSX IntrinsicElements for the custom shader material
declare module "@react-three/fiber" {
  interface ThreeElements {
    noiseGradientMaterial: React.RefAttributes<NoiseGradientMaterialType>;
  }
}
