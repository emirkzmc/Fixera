"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";

function RotatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  // Slow constant rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  const isDark = theme === "dark";
  const distortColor = isDark ? "#FF6B00" : "#E65000";

  return (
    <mesh ref={meshRef} scale={1.5} position={[2.5, 0, 0]}>
      <torusKnotGeometry args={[1, 0.35, 120, 16]} />
      <MeshDistortMaterial
        color={distortColor}
        roughness={0.2}
        metalness={0.8}
        distort={0.4}
        speed={2}
      />
    </mesh>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [canvasKey] = useState(() => Math.random().toString());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-[180px] sm:h-[220px] rounded-2xl relative overflow-hidden bg-gradient-to-br from-[var(--accent-light)] to-[var(--background)] border border-[var(--border-color)]">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <Canvas key={canvasKey} camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <RotatingMesh />
            </Float>
          </Canvas>
        )}
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-8 md:px-12 pointer-events-none">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] leading-tight max-w-lg">
          Atölyenizin Tüm Süreçleri Tek Ekranda
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-md hidden sm:block">
          Premium arayüz, akıllı takip ve gelişmiş finans analizi ile Fixera işlerinizi kolaylaştırır.
        </p>
      </div>
    </div>
  );
}
