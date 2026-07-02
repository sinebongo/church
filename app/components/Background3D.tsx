"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface Background3DProps {
  variant?: "spheres" | "sparkles";
  className?: string;
  intensity?: "subtle" | "default";
}

function FloatingSpheres({ subtle }: { subtle: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((mesh, i) => {
      mesh.position.y = Math.sin(t * 0.3 + i * 2) * 0.4;
      mesh.rotation.x = t * 0.1;
      mesh.rotation.y = t * 0.15;
    });
  });

  const spheres = [
    { position: [-2.2, 0, -1], color: "#2f3a82", scale: 1.6 },
    { position: [2.4, 0.5, -2], color: "#e1c575", scale: 1.1 },
    { position: [0, -1, -3], color: "#2f3a82", scale: 1.3 },
  ];

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.position as [number, number, number]} scale={s.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={s.color}
            transparent
            opacity={subtle ? 0.18 : 0.32}
            distort={0.4}
            speed={1.2}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Background3D({ variant = "spheres", className, intensity = "default" }: Background3DProps) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!mounted || reducedMotion) return null;

  const subtle = intensity === "subtle";

  return (
    <div ref={containerRef} className={className ?? "absolute inset-0 pointer-events-none"}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? "always" : "never"}
      >
        {variant === "spheres" ? (
          <FloatingSpheres subtle={subtle} />
        ) : (
          <Sparkles
            count={subtle ? 30 : 60}
            scale={[8, 4, 4]}
            size={2}
            speed={0.3}
            color="#e1c575"
            opacity={subtle ? 0.4 : 0.7}
          />
        )}
        <ambientLight intensity={0.6} />
      </Canvas>
    </div>
  );
}
