'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════════════
 * Card 0 — Sovereign Architecture: rotating glass server cluster
 * ═══════════════════════════════════════════════════════════════════════════ */
function SovereignClusterScene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const boxes = useMemo(
    () => [
      [0, 0, 0],
      [0.35, 0.2, 0],
      [-0.25, -0.15, 0.2],
      [0.1, -0.35, -0.1],
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * (hovered ? 0.4 : 0.2);
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
  });

  return (
    <Float speed={1} rotationIntensity={0.12} floatIntensity={0.4}>
      <group ref={groupRef}>
        {boxes.map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial
              color="#3B5BDB"
              wireframe={i < 2}
              emissive="#3B82F6"
              emissiveIntensity={hovered ? 0.9 : 0.4}
              transparent
              opacity={hovered ? 0.7 : 0.45}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Card 1 — Explainable AI: decision tree unfolding
 * ═══════════════════════════════════════════════════════════════════════════ */
function DecisionTreeScene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo<[number, number, number][]>(
    () => [
      [0, 0.4, 0],
      [-0.4, 0, 0],
      [0.4, 0, 0],
      [-0.55, -0.35, 0],
      [0, -0.35, 0],
      [0.55, -0.35, 0],
    ],
    [],
  );
  const edges = useMemo(
    () => [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5],
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.35}>
      <group ref={groupRef}>
        {edges.map(([a, b], i) => (
          <Line
            key={i}
            points={[nodes[a], nodes[b]]}
            color="#3B82F6"
            lineWidth={hovered ? 1 : 0.6}
            transparent
            opacity={hovered ? 0.5 : 0.25}
          />
        ))}
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[i === 0 ? 0.08 : 0.05, 8, 8]} />
            <meshStandardMaterial
              color={i === 0 ? '#FBBF24' : '#3B82F6'}
              emissive={i === 0 ? '#FBBF24' : '#3B82F6'}
              emissiveIntensity={hovered ? 1.3 : 0.5}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Card 2 — Enterprise-Grade Security: holographic shield
 * ═══════════════════════════════════════════════════════════════════════════ */
function ShieldScene({ hovered }: { hovered: boolean }) {
  const shieldRef = useRef<THREE.Group>(null);
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0.6);
    s.quadraticCurveTo(0.5, 0.5, 0.5, 0.1);
    s.quadraticCurveTo(0.5, -0.35, 0, -0.6);
    s.quadraticCurveTo(-0.5, -0.35, -0.5, 0.1);
    s.quadraticCurveTo(-0.5, 0.5, 0, 0.6);
    return s;
  }, []);

  useFrame(({ clock }) => {
    if (!shieldRef.current) return;
    const t = clock.getElapsedTime();
    shieldRef.current.rotation.y = Math.sin(t * 0.3) * 0.25;
    shieldRef.current.position.y = Math.sin(t * 0.6) * 0.03;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={shieldRef}>
        <mesh>
          <shapeGeometry args={[shape]} />
          <meshStandardMaterial
            color="#FBBF24"
            emissive="#FBBF24"
            emissiveIntensity={hovered ? 0.6 : 0.25}
            transparent
            opacity={hovered ? 0.35 : 0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <shapeGeometry args={[shape]} />
          <meshStandardMaterial
            color="#FBBF24"
            wireframe
            emissive="#FBBF24"
            emissiveIntensity={hovered ? 1.2 : 0.5}
            transparent
            opacity={hovered ? 0.8 : 0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.05, 0.02]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial
            color="#FBBF24"
            emissive="#FBBF24"
            emissiveIntensity={hovered ? 1.5 : 0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Card 3 — Global Deployment: 3D globe with connected nodes
 * ═══════════════════════════════════════════════════════════════════════════ */
function GlobeScene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 8; i++) {
      const phi = Math.acos(-1 + (2 * i) / 8);
      const theta = Math.sqrt(8 * Math.PI) * phi;
      pts.push([
        Math.cos(theta) * Math.sin(phi) * 0.5,
        Math.sin(theta) * Math.sin(phi) * 0.5,
        Math.cos(phi) * 0.5,
      ]);
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * (hovered ? 0.35 : 0.18);
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.08;
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[0.45, 16, 12]} />
          <meshStandardMaterial
            color="#1E3A8A"
            wireframe
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 0.5 : 0.2}
            transparent
            opacity={0.4}
          />
        </mesh>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#FBBF24' : '#3B82F6'}
              emissive={i % 2 === 0 ? '#FBBF24' : '#3B82F6'}
              emissiveIntensity={hovered ? 1.2 : 0.5}
            />
          </mesh>
        ))}
        {nodes.map((pos, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <Line key={i} points={[pos, next]} color="#3B82F6" lineWidth={0.5} transparent opacity={hovered ? 0.4 : 0.15} />
          );
        })}
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Intelligence Core — glass sphere with orbiting nodes (centerpiece)
 * ═══════════════════════════════════════════════════════════════════════════ */
function IntelligenceCoreInner({ cardHovered }: { cardHovered: number | null }) {
  const coreRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const nodeCount = 6;
  const nodePositions = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => {
        const a = (i / nodeCount) * Math.PI * 2;
        return [Math.cos(a) * 0.85, Math.sin(a) * 0.85, 0] as [number, number, number];
      }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z = t * 0.2;
    }
  });

  const active = cardHovered !== null;

  return (
    <group>
      {/* Glass sphere */}
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 24]} />
          <meshStandardMaterial
            color="#1E3A8A"
            emissive="#3B82F6"
            emissiveIntensity={active ? 0.4 : 0.2}
            transparent
            opacity={0.25}
            wireframe={false}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 16, 12]} />
          <meshStandardMaterial
            color="#3B82F6"
            wireframe
            emissive="#3B82F6"
            emissiveIntensity={active ? 0.8 : 0.4}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
      {/* Orbiting nodes */}
      <group ref={orbitRef}>
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#FBBF24' : '#3B82F6'}
              emissive={i % 2 === 0 ? '#FBBF24' : '#3B82F6'}
              emissiveIntensity={active ? 1.5 : 0.7}
            />
          </mesh>
        ))}
        {nodePositions.map((pos, i) => (
          <Line
            key={i}
            points={[[0, 0, 0], pos]}
            color="#3B82F6"
            lineWidth={0.6}
            transparent
            opacity={active ? 0.5 : 0.2}
          />
        ))}
      </group>
      {/* Center dot */}
      <mesh>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial
          color="#FBBF24"
          emissive="#FBBF24"
          emissiveIntensity={active ? 2 : 1}
        />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Exports
 * ═══════════════════════════════════════════════════════════════════════════ */
const CARD_SCENES = [
  SovereignClusterScene,
  DecisionTreeScene,
  ShieldScene,
  GlobeScene,
];

interface WhyVRisoCardSceneProps {
  variant: number;
  hovered: boolean;
}

export function WhyVRisoCardScene({ variant, hovered }: WhyVRisoCardSceneProps) {
  const Scene = CARD_SCENES[variant] ?? SovereignClusterScene;
  return (
    <div style={{ height: 140, width: '100%' }} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 2.2], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} intensity={0.8} color="#3B82F6" />
        <pointLight position={[-1, -1, 1]} intensity={0.25} color="#1E3A8A" />
        <Scene hovered={hovered} />
      </Canvas>
    </div>
  );
}

interface IntelligenceCoreProps {
  cardHovered: number | null;
}

export function IntelligenceCore({ cardHovered }: IntelligenceCoreProps) {
  return (
    <div style={{ height: 280, width: '100%' }} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[3, 3, 3]} intensity={1} color="#3B82F6" />
        <pointLight position={[-2, -2, 2]} intensity={0.4} color="#FBBF24" />
        <IntelligenceCoreInner cardHovered={cardHovered} />
      </Canvas>
    </div>
  );
}
