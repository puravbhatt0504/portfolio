"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  ShaderMaterial,
  type Group,
  type Mesh,
} from "three";

function seededNoise(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function ParticleTunnel() {
  const pointsRef = useRef<Group | null>(null);
  const coreRef = useRef<Mesh | null>(null);

  const shaderMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new Color("#38ebff") },
          uColorB: { value: new Color("#3ef7b5") },
        },
        transparent: true,
        vertexShader: `
          uniform float uTime;
          varying vec3 vPos;
          varying vec3 vNormal;

          float hash(vec3 p) {
            p = fract(p * 0.3183099 + vec3(0.1, 0.17, 0.13));
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
          }

          float noise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);

            float n000 = hash(i + vec3(0.0, 0.0, 0.0));
            float n100 = hash(i + vec3(1.0, 0.0, 0.0));
            float n010 = hash(i + vec3(0.0, 1.0, 0.0));
            float n110 = hash(i + vec3(1.0, 1.0, 0.0));
            float n001 = hash(i + vec3(0.0, 0.0, 1.0));
            float n101 = hash(i + vec3(1.0, 0.0, 1.0));
            float n011 = hash(i + vec3(0.0, 1.0, 1.0));
            float n111 = hash(i + vec3(1.0, 1.0, 1.0));

            float nx00 = mix(n000, n100, f.x);
            float nx10 = mix(n010, n110, f.x);
            float nx01 = mix(n001, n101, f.x);
            float nx11 = mix(n011, n111, f.x);

            float nxy0 = mix(nx00, nx10, f.y);
            float nxy1 = mix(nx01, nx11, f.y);

            return mix(nxy0, nxy1, f.z);
          }

          void main() {
            vNormal = normal;
            vPos = position;

            float pulse = sin((position.y * 3.0) + uTime * 1.8) * 0.08;
            float ripple = sin((position.x + position.z) * 5.0 + uTime * 2.4) * 0.04;
            float grain = (noise(position * 2.8 + vec3(uTime * 0.35)) - 0.5) * 0.16;

            vec3 displaced = position + normal * (pulse + ripple + grain);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform float uTime;
          varying vec3 vPos;
          varying vec3 vNormal;

          void main() {
            float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
            float wave = 0.5 + 0.5 * sin(vPos.y * 6.0 + uTime * 2.0);
            vec3 colorBase = mix(uColorA, uColorB, wave + fresnel * 0.5);
            vec3 chroma = vec3(
              colorBase.r + fresnel * 0.16,
              colorBase.g,
              colorBase.b + fresnel * 0.12
            );
            float alpha = 0.35 + fresnel * 0.45;
            gl_FragColor = vec4(chroma, alpha);
          }
        `,
      }),
    [],
  );

  const positions = useMemo(() => {
    const count = 2400;
    const sphere = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 2.7 + seededNoise(i + 3.1) * 4;
      const theta = seededNoise(i + 11.7) * Math.PI * 2;
      const y = (seededNoise(i + 27.4) - 0.5) * 7;

      sphere[i * 3] = Math.cos(theta) * radius;
      sphere[i * 3 + 1] = y;
      sphere[i * 3 + 2] = Math.sin(theta) * radius;
    }

    return sphere;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;

    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      const material = coreRef.current.material as ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={pointsRef}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#58f0ff"
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </Points>

      <Float speed={1.5} rotationIntensity={0.9} floatIntensity={1.2}>
        <mesh ref={coreRef} material={shaderMaterial}>
          <icosahedronGeometry args={[1.35, 4]} />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroNebula() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 6], fov: 58 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#60e9ff" />
        <ParticleTunnel />
      </Canvas>
    </div>
  );
}
