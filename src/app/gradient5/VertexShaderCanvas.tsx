"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Define the custom shader material type
type VertexDeformationMaterialType = THREE.ShaderMaterial & {
  uTime: number;
  iResolution: THREE.Vector2;
};

// Create the shader material with vertex deformation
const VertexDeformationMaterial = shaderMaterial(
  {
    uTime: 0,
    iResolution: new THREE.Vector2(1, 1),
  },
  // Vertex shader with simplex noise deformation
  `
    varying vec2 vUv;
    uniform float uTime;
    
    // Simplex noise function
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
         return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    float snoise(vec3 v) { 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; 
      vec3 x3 = x0 - D.yyy;      

      i = mod289(i); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 0.142857142857; 
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      
      // Create deformation pattern
      vec2 modifiedCoord = uv * vec2(3., 4.);
      vec3 newPosition = position;
      
      // Apply vertex deformation using simplex noise (slowed down)
      float distortion = snoise(vec3(modifiedCoord.x + uTime * .1, modifiedCoord.y, uTime * .2)) * 1.;
      distortion = max(0., distortion);
      
      newPosition.z += distortion;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment shader (same as gradient4 with cosine palette)
  `
    uniform float uTime;
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
        float time = uTime * 0.2;
        
        // Calculate two points on screen (slowed down).
        vec2 c1 = vec2(sin(time)*0.5, cos(uTime * 0.3)*0.7);
        vec2 c2 = vec2(sin(time*0.7)*0.9, cos(uTime*0.2)*0.6);
        
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
extend({ VertexDeformationMaterial });

// Component that renders the vertex deformation shader
const VertexDeformationPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<VertexDeformationMaterialType>(null);
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
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.iResolution = resolution;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <vertexDeformationMaterial ref={materialRef} />
    </mesh>
  );
};

// Main VertexShaderCanvas component
export default function VertexShaderCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <VertexDeformationPlane />
    </Canvas>
  );
}

// Extend JSX IntrinsicElements for the custom shader material
declare module "@react-three/fiber" {
  interface ThreeElements {
    vertexDeformationMaterial: React.RefAttributes<VertexDeformationMaterialType>;
  }
}
