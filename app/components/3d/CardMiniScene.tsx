'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────────────────
 * Card 0 — Infrastructure: rotating wireframe cube lattice
 * ────────────────────────────────────────────────────────────────────────── */
function InfrastructureScene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.25;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
  });

  const cubePositions: [number, number, number][] = useMemo(
    () => [
      [0, 0, 0],
      [0.7, 0, 0],
      [-0.7, 0, 0],
      [0, 0.7, 0],
      [0, -0.7, 0],
    ],
    [],
  );

  const edges = useMemo(() => {
    const pts: [number, number, number][][] = [];
    for (let i = 0; i < cubePositions.length; i++) {
      for (let j = i + 1; j < cubePositions.length; j++) {
        pts.push([cubePositions[i], cubePositions[j]]);
      }
    }
    return pts;
  }, [cubePositions]);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        {cubePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.32, 0.32, 0.32]} />
            <meshStandardMaterial
              color="#3B82F6"
              wireframe
              emissive="#3B82F6"
              emissiveIntensity={hovered ? 1.2 : 0.4}
              transparent
              opacity={hovered ? 0.9 : 0.6}
            />
          </mesh>
        ))}
        {edges.map((pts, i) => (
          <Line
            key={i}
            points={pts}
            color={hovered ? '#60A5FA' : '#3B82F6'}
            lineWidth={0.6}
            transparent
            opacity={hovered ? 0.4 : 0.15}
          />
        ))}
      </group>
    </Float>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Card 1 — Automation: orbiting workflow rings + nodes
 * ────────────────────────────────────────────────────────────────────────── */
function AutomationScene({ hovered }: { hovered: boolean }) {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.3;
  });

  const ring1Nodes = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => {
        const a = (i / 4) * Math.PI * 2;
        return [Math.cos(a) * 0.8, Math.sin(a) * 0.8, 0] as [number, number, number];
      }),
    [],
  );

  const ring2Nodes = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => {
        const a = (i / 3) * Math.PI * 2 + 0.5;
        return [Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0] as [number, number, number];
      }),
    [],
  );

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      {/* Outer ring */}
      <group ref={ring1Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.01, 8, 48]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 0.8 : 0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
        {ring1Nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#FBBF24"
              emissive="#FBBF24"
              emissiveIntensity={hovered ? 1.5 : 0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Inner ring */}
      <group ref={ring2Ref}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.01, 8, 32]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 0.6 : 0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        {ring2Nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#60A5FA"
              emissive="#60A5FA"
              emissiveIntensity={hovered ? 1.2 : 0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Core */}
      <mesh>
        <octahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={hovered ? 1.5 : 0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Card 2 — Intelligence: neural mesh / brain-like network
 * ────────────────────────────────────────────────────────────────────────── */
function IntelligenceScene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  const nodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 12; i++) {
      const phi = Math.acos(-1 + (2 * i) / 12);
      const theta = Math.sqrt(12 * Math.PI) * phi;
      pts.push([
        Math.cos(theta) * Math.sin(phi) * 0.7,
        Math.sin(theta) * Math.sin(phi) * 0.7,
        Math.cos(phi) * 0.7,
      ]);
    }
    return pts;
  }, []);

  const edges = useMemo(() => {
    const result: [number, number, number][][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 0.9) {
          result.push([nodes[i], nodes[j]]);
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <Float speed={1} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={groupRef}>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#FBBF24' : '#60A5FA'}
              emissive={i % 3 === 0 ? '#FBBF24' : '#60A5FA'}
              emissiveIntensity={hovered ? 1.4 : 0.5}
            />
          </mesh>
        ))}
        {edges.map((pts, i) => (
          <Line
            key={i}
            points={pts}
            color={hovered ? '#60A5FA' : '#3B82F6'}
            lineWidth={0.5}
            transparent
            opacity={hovered ? 0.5 : 0.2}
          />
        ))}

        {/* Central glow */}
        <mesh>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 1.5 : 0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Scenes array ─── */
const SCENES = [InfrastructureScene, AutomationScene, IntelligenceScene];

/* ─── Exported card mini 3D canvas ─── */
interface CardMiniSceneProps {
  variant: number;
  hovered: boolean;
}

export function CardMiniScene({ variant, hovered }: CardMiniSceneProps) {
  const SceneComponent = SCENES[variant] ?? InfrastructureScene;

  return (
    <div style={{ height: 120, width: '100%' }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[2, 2, 2]} intensity={0.8} color="#3B82F6" />
        <SceneComponent hovered={hovered} />
      </Canvas>
    </div>
  );
}
