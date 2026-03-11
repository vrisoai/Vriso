'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════════════
 * Scene 0 — Sovereign AI Architecture: rotating glass server cube
 * ═══════════════════════════════════════════════════════════════════════════ */
function SovereignScene({ hovered }: { hovered: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = hovered ? 0.6 : 0.3;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * speed;
      outerRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * speed * 0.5;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={outerRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#3B5BDB"
          wireframe
          emissive="#3B82F6"
          emissiveIntensity={hovered ? 1.0 : 0.4}
          transparent
          opacity={hovered ? 0.8 : 0.5}
        />
      </mesh>
      <mesh ref={innerRef}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#1E3A8A"
          emissive="#3B82F6"
          emissiveIntensity={hovered ? 1.2 : 0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color="#FBBF24"
          emissive="#FBBF24"
          emissiveIntensity={hovered ? 1.5 : 0.8}
        />
      </mesh>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Scene 1 — Agentic Orchestration: network nodes with animated beams
 * ═══════════════════════════════════════════════════════════════════════════ */
function AgenticScene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo<[number, number, number][]>(
    () => [
      [0, 0, 0],
      [0.9, 0.5, 0],
      [-0.9, 0.5, 0],
      [0.6, -0.7, 0.3],
      [-0.6, -0.7, -0.3],
      [0, 0.9, -0.2],
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * (hovered ? 0.4 : 0.2);
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef}>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[i === 0 ? 0.14 : 0.08, 10, 10]} />
            <meshStandardMaterial
              color={i === 0 ? '#FBBF24' : '#3B82F6'}
              emissive={i === 0 ? '#FBBF24' : '#3B82F6'}
              emissiveIntensity={hovered ? 1.4 : 0.6}
            />
          </mesh>
        ))}
        {nodes.slice(1).map((pos, i) => (
          <Line
            key={i}
            points={[nodes[0], pos]}
            color={hovered ? '#60A5FA' : '#3B82F6'}
            lineWidth={hovered ? 1.5 : 0.8}
            transparent
            opacity={hovered ? 0.5 : 0.2}
            dashed
            dashSize={0.1}
            gapSize={0.08}
          />
        ))}
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Scene 2 — Enterprise Automation: workflow loop animation
 * ═══════════════════════════════════════════════════════════════════════════ */
function AutomationScene({ hovered }: { hovered: boolean }) {
  const ringRef = useRef<THREE.Group>(null);
  const nodeCount = 5;

  const nodePositions = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => {
        const a = (i / nodeCount) * Math.PI * 2;
        return [Math.cos(a) * 0.7, Math.sin(a) * 0.7, 0] as [number, number, number];
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = clock.getElapsedTime() * (hovered ? 0.5 : 0.25);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.015, 8, 48]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 0.8 : 0.3}
            transparent
            opacity={0.5}
          />
        </mesh>
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#FBBF24' : '#3B82F6'}
              emissive={i % 2 === 0 ? '#FBBF24' : '#3B82F6'}
              emissiveIntensity={hovered ? 1.3 : 0.5}
            />
          </mesh>
        ))}
        {nodePositions.map((pos, i) => {
          const next = nodePositions[(i + 1) % nodeCount];
          return (
            <Line
              key={`e-${i}`}
              points={[pos, next]}
              color="#3B82F6"
              lineWidth={0.6}
              transparent
              opacity={hovered ? 0.4 : 0.15}
            />
          );
        })}
      </group>
      <mesh>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={hovered ? 1.5 : 0.7}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Scene 3 — AI Technology Consulting: 3D digital roadmap / transformation pathway
 * Glowing nodes connected by lines, path gradually illuminating
 * ═══════════════════════════════════════════════════════════════════════════ */
function ConsultingScene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  const pathNodes = useMemo<[number, number, number][]>(
    () => [
      [-0.55, -0.45, 0],
      [-0.3, -0.15, 0.05],
      [-0.1, 0.2, 0],
      [0.15, 0.4, -0.05],
      [0.4, 0.15, 0.05],
      [0.55, -0.2, 0],
      [0.6, -0.45, -0.02],
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.02;
    setProgress(((t * (hovered ? 0.35 : 0.2)) % 1));
  });

  return (
    <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={groupRef}>
        {pathNodes.map((pos, i) => {
          const nodeProgress = i / (pathNodes.length - 1);
          const dist = progress - nodeProgress;
          const lit = dist > -0.12 && dist < 0.25;
          const intensity = lit
            ? Math.min(1, (dist + 0.12) / 0.15) * (hovered ? 1.5 : 0.9) + (hovered ? 0.3 : 0.15)
            : hovered ? 0.2 : 0.08;
          return (
            <TransformationNode
              key={i}
              position={pos}
              intensity={intensity}
              isDestination={i === pathNodes.length - 1}
            />
          );
        })}
        {pathNodes.slice(0, -1).map((from, i) => {
          const to = pathNodes[i + 1];
          const segProgress = (i + 0.5) / (pathNodes.length - 1);
          const lit = progress > segProgress - 0.1;
          const opacity = lit ? (hovered ? 0.6 : 0.4) : hovered ? 0.12 : 0.06;
          return (
            <Line
              key={i}
              points={[from, to]}
              color="#3B82F6"
              lineWidth={hovered ? 1.2 : 0.7}
              transparent
              opacity={opacity}
            />
          );
        })}
        <TransformationOrb pathNodes={pathNodes} hovered={hovered} />
      </group>
    </Float>
  );
}

function TransformationNode({
  position,
  intensity,
  isDestination,
}: {
  position: [number, number, number];
  intensity: number;
  isDestination: boolean;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[isDestination ? 0.1 : 0.06, 10, 10]} />
      <meshStandardMaterial
        color={isDestination ? '#FBBF24' : '#3B82F6'}
        emissive={isDestination ? '#FBBF24' : '#3B82F6'}
        emissiveIntensity={intensity}
      />
    </mesh>
  );
}

function TransformationOrb({
  pathNodes,
  hovered,
}: {
  pathNodes: [number, number, number][];
  hovered: boolean;
}) {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!orbRef.current) return;
    const p = ((clock.getElapsedTime() * (hovered ? 0.35 : 0.2)) % 1);
    const idx = p * (pathNodes.length - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(i0 + 1, pathNodes.length - 1);
    const t = idx - i0;
    const a = pathNodes[i0];
    const b = pathNodes[i1];
    orbRef.current.position.set(
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t,
    );
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        color="#FBBF24"
        emissive="#FBBF24"
        emissiveIntensity={hovered ? 2 : 1.2}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Scene 4 — Knowledge Intelligence: floating knowledge graph
 * ═══════════════════════════════════════════════════════════════════════════ */
function KnowledgeScene({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 10; i++) {
      const phi = Math.acos(-1 + (2 * i) / 10);
      const theta = Math.sqrt(10 * Math.PI) * phi;
      pts.push([
        Math.cos(theta) * Math.sin(phi) * 0.65,
        Math.sin(theta) * Math.sin(phi) * 0.65,
        Math.cos(phi) * 0.65,
      ]);
    }
    return pts;
  }, []);

  const edges = useMemo(() => {
    const result: [number, number, number][][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = new THREE.Vector3(...nodes[i]).distanceTo(new THREE.Vector3(...nodes[j]));
        if (d < 0.85) result.push([nodes[i], nodes[j]]);
      }
    }
    return result;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * (hovered ? 0.35 : 0.18);
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.1;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
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
            opacity={hovered ? 0.45 : 0.18}
          />
        ))}
        <mesh>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={hovered ? 1.2 : 0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Scene 5 — MX Optimization: AI crawler scanning pages
 * ═══════════════════════════════════════════════════════════════════════════ */
function MXScene({ hovered }: { hovered: boolean }) {
  const scanRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(t * (hovered ? 1.5 : 0.8)) * 0.5;
      scanRef.current.position.x = Math.cos(t * 0.6) * 0.3;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  const pages = useMemo<[number, number, number][]>(
    () => [
      [-0.4, 0, 0],
      [0, 0, 0.15],
      [0.4, 0, 0],
    ],
    [],
  );

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef}>
        {pages.map((pos, i) => (
          <mesh key={i} position={pos} rotation={[0, (i - 1) * 0.2, 0]}>
            <planeGeometry args={[0.35, 0.5]} />
            <meshStandardMaterial
              color="#1F1F1F"
              emissive="#3B82F6"
              emissiveIntensity={hovered ? 0.15 : 0.05}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
        {pages.map((pos, i) => (
          <Line
            key={`grid-${i}`}
            points={[
              [pos[0] - 0.12, pos[1] + 0.15, pos[2] + 0.01],
              [pos[0] + 0.12, pos[1] + 0.15, pos[2] + 0.01],
            ]}
            color="#3B82F6"
            lineWidth={0.5}
            transparent
            opacity={0.3}
          />
        ))}
        {/* Scanner beam */}
        <mesh ref={scanRef}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#FBBF24"
            emissive="#FBBF24"
            emissiveIntensity={hovered ? 2 : 1}
          />
        </mesh>
        {/* Scanner trail */}
        <mesh ref={scanRef}>
          <ringGeometry args={[0.1, 0.14, 16]} />
          <meshBasicMaterial
            color="#FBBF24"
            transparent
            opacity={hovered ? 0.3 : 0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Exported card canvas wrapper
 * ═══════════════════════════════════════════════════════════════════════════ */
const SCENES = [
  SovereignScene,
  AgenticScene,
  AutomationScene,
  ConsultingScene,
  KnowledgeScene,
  MXScene,
];

interface CoreServiceSceneProps {
  variant: number;
  hovered: boolean;
}

export function CoreServiceScene({ variant, hovered }: CoreServiceSceneProps) {
  const SceneComponent = SCENES[variant] ?? SovereignScene;

  return (
    <div style={{ height: 160, width: '100%' }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} intensity={0.9} color="#3B82F6" />
        <pointLight position={[-1, -1, 1]} intensity={0.3} color="#1E3A8A" />
        <SceneComponent hovered={hovered} />
      </Canvas>
    </div>
  );
}
