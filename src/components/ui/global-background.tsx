"use client";

import { Canvas } from "@react-three/fiber";
import { BackgroundScene } from "../three/background-scene";

export function GlobalBackground() {
  return (
    <>
      <div 
        className="fixed inset-0 -z-30 pointer-events-none" 
        style={{
          backgroundImage: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
        }}
      />
      <video 
        className="fixed inset-0 w-full h-full object-cover -z-20 pointer-events-none" 
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-white/70 backdrop-blur-[2px] -z-10 pointer-events-none" />

      {/* Three.js Canvas Layer */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <BackgroundScene />
        </Canvas>
      </div>
    </>
  );
}
