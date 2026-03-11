'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';

/* ─── Node positions ─── */
const NODE_POSITIONS: [number, number, number][] = [
  [2, 0, 0],
  [-2, 0, 0],
  [0, 1.8, 0],
  [0, -1.8, 0],
  [1.4, 1.4, 0],
  [-1.4, -1.4, 0],
];

const NODE_LABELS = [
  'models',
  'data',
  'workflows',
  'agents',
  'knowledge',
  'automation',
];

/* ─── Core sphere ─── */
function CoreNode({ activeNode }: { activeNode: number | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
    if (glowRef.current) {
      const s = 1.3 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
      glowRef.current.scale.set(s, s, s);
    }
  });

  const hasActive = activeNode !== null;

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={hasActive ? 0.06 : 0.08}
        />
      </mesh>

      {/* Core sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={hasActive ? 0.3 : 0.5}
          roughness={0.2}
          metalness={0.6}
          transparent
          opacity={0.85}
          wireframe
        />
      </mesh>

      {/* Inner solid core */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#1E3A8A"
          emissive="#3B82F6"
          emissiveIntensity={0.8}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

/* ─── Surrounding node ─── */
function SatelliteNode({
  index,
  basePosition,
  isActive,
}: {
  index: number;
  basePosition: [number, number, number];
  isActive: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = index * ((Math.PI * 2) / 6);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.15 + offset;
    ref.current.position.x = basePosition[0] * Math.cos(t * 0.3) - basePosition[1] * Math.sin(t * 0.3) * 0.2;
    ref.current.position.y = basePosition[1] * Math.cos(t * 0.3) + basePosition[0] * Math.sin(t * 0.3) * 0.2;
    ref.current.position.z = Math.sin(t + index) * 0.3;
  });

  return (
    <mesh ref={ref} position={basePosition}>
      <sphereGeometry args={[isActive ? 0.18 : 0.13, 12, 12]} />
      <meshStandardMaterial
        color={isActive ? '#60A5FA' : '#3B82F6'}
        emissive={isActive ? '#60A5FA' : '#3B82F6'}
        emissiveIntensity={isActive ? 1.8 : 0.6}
        roughness={0.3}
        metalness={0.5}
      />
    </mesh>
  );
}

/* ─── Connection beams ─── */
function ConnectionBeams({ activeNode }: { activeNode: number | null }) {
  const lineData = useMemo(
    () =>
      NODE_POSITIONS.map((pos) => [
        [0, 0, 0] as [number, number, number],
        pos,
      ]),
    [],
  );

  return (
    <group>
      {lineData.map((points, i) => {
        const isActive = activeNode === Math.floor(i / 2);
        return (
          <Line
            key={i}
            points={points}
            color={isActive ? '#60A5FA' : '#3B82F6'}
            lineWidth={isActive ? 1.5 : 0.8}
            transparent
            opacity={isActive ? 0.6 : 0.2}
            dashed
            dashSize={0.15}
            gapSize={0.15}
          />
        );
      })}
    </group>
  );
}

/* ─── Signal particles ─── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(120 * 3);
    const vel = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < 120; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(arr[i * 3]) > 4) velocities[i * 3] *= -1;
      if (Math.abs(arr[i * 3 + 1]) > 3) velocities[i * 3 + 1] *= -1;
      if (Math.abs(arr[i * 3 + 2]) > 2) velocities[i * 3 + 2] *= -1;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={120}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3B82F6"
        size={0.02}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Pulse rings traveling from core to nodes ─── */
function PulseRings({ activeNode }: { activeNode: number | null }) {
  const ringsRef = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    ringsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = (clock.getElapsedTime() * 0.4 + i * 0.8) % 3;
      const s = 0.3 + t * 0.6;
      mesh.scale.set(s, s, s);
      (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.3 - t * 0.1);
    });
  });

  const setRef = useCallback(
    (i: number) => (el: THREE.Mesh | null) => {
      if (el) ringsRef.current[i] = el;
    },
    [],
  );

  return (
    <group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={setRef(i)} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.95, 1, 32]} />
          <meshBasicMaterial
            color={activeNode !== null ? '#60A5FA' : '#3B82F6'}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Scene ─── */
function Scene({ activeNode }: { activeNode: number | null }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#3B82F6" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#1E3A8A" />

      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <CoreNode activeNode={activeNode} />

        {NODE_POSITIONS.map((pos, i) => (
          <SatelliteNode
            key={NODE_LABELS[i]}
            index={i}
            basePosition={pos}
            isActive={activeNode === Math.floor(i / 2)}
          />
        ))}

        <ConnectionBeams activeNode={activeNode} />
        <PulseRings activeNode={activeNode} />
      </Float>

      <Particles />
    </>
  );
}

/* ─── Exported wrapper ─── */
interface AISystemVisualizationProps {
  activeNode: number | null;
  inView: boolean;
}

export function AISystemVisualization({ activeNode, inView }: AISystemVisualizationProps) {
  return (
    <div
      style={{
        height: 420,
        maxWidth: 700,
        marginInline: 'auto',
        position: 'relative',
      }}
      role="img"
      aria-label="AI system architecture visualization"
    >
      {/* Fade vignette edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 50%, var(--color-bg-primary) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        frameloop={inView ? 'always' : 'never'}
        aria-hidden="true"
        style={{ background: 'transparent' }}
      >
        <Scene activeNode={activeNode} />
      </Canvas>
    </div>
  );
}
