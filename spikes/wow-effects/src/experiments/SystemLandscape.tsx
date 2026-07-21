import * as THREE from 'three';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Html, Line, useCursor } from '@react-three/drei';

type SystemId = 'rlc' | 'commerce' | 'agents' | 'cloudflare' | 'content';

type SystemNode = {
  id: SystemId;
  label: string;
  short: string;
  summary: string;
  position: [number, number, number];
  radius: number;
  color: string;
  glow: string;
  modules: string[];
};

type SystemEdge = {
  from: SystemId;
  to: SystemId;
  type: 'api' | 'data' | 'control';
  strength: number;
};

interface SystemLandscapeProps {
  reducedMotion: boolean;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'rlc',
    label: 'RLC 1952',
    short: 'Association Platform',
    summary: 'News, events, contact, preview, and verified release workflow.',
    position: [0.3, -0.85, 0.35],
    radius: 0.62,
    color: '#60a5fa',
    glow: '#93c5fd',
    modules: ['News', 'Events', 'Contact'],
  },
  {
    id: 'commerce',
    label: 'Commerce',
    short: 'Coffee Commerce',
    summary: 'Custom product, cart, checkout, and Stripe payment flow.',
    position: [2.9, 0.0, 1.55],
    radius: 0.72,
    color: '#22d3ee',
    glow: '#67e8f9',
    modules: ['Products', 'Cart', 'Stripe'],
  },
  {
    id: 'agents',
    label: 'AI Agents',
    short: 'Agent-assisted Delivery',
    summary: 'Tool-using coding agents for analysis, implementation, testing, and QA.',
    position: [4.95, 0.75, -2.05],
    radius: 0.66,
    color: '#38bdf8',
    glow: '#a5f3fc',
    modules: ['Analysis', 'Build', 'Verification'],
  },
  {
    id: 'cloudflare',
    label: 'Cloudflare',
    short: 'Edge Delivery',
    summary: 'Pages, Functions, Workers, preview deployments, and protected forms.',
    position: [1.4, 3.25, -2.85],
    radius: 0.54,
    color: '#93c5fd',
    glow: '#dbeafe',
    modules: ['Pages', 'Functions', 'Turnstile'],
  },
  {
    id: 'content',
    label: 'Content',
    short: 'Content System',
    summary: 'Structured JSON and CMS workflows for maintainable editorial delivery.',
    position: [1.2, 1.2, -0.55],
    radius: 0.68,
    color: '#7dd3fc',
    glow: '#cffafe',
    modules: ['JSON', 'Pages CMS', 'Publishing'],
  },
];

const SYSTEM_EDGES: SystemEdge[] = [
  { from: 'rlc', to: 'commerce', type: 'control', strength: 1.0 },
  { from: 'rlc', to: 'content', type: 'api', strength: 0.95 },
  { from: 'commerce', to: 'agents', type: 'api', strength: 0.87 },
  { from: 'agents', to: 'content', type: 'data', strength: 0.78 },
  { from: 'cloudflare', to: 'commerce', type: 'control', strength: 0.73 },
  { from: 'cloudflare', to: 'content', type: 'data', strength: 0.66 },
  { from: 'cloudflare', to: 'agents', type: 'api', strength: 0.58 },
  { from: 'rlc', to: 'agents', type: 'api', strength: 0.64 },
];

const NODE_BY_ID = new Map<SystemId, SystemNode>(SYSTEM_NODES.map((node) => [node.id, node]));

const EDGE_COLOR_BY_TYPE: Record<SystemEdge['type'], string> = {
  api: '#22d3ee',
  data: '#67e8f9',
  control: '#93c5fd',
};

const useMobileViewport = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const update = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    media.addEventListener('change', update);
    setIsMobile(media.matches);

    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
};

const hashSeed = (value: string) => {
  let seed = 0;
  for (let i = 0; i < value.length; i++) {
    seed = (seed * 31 + value.charCodeAt(i)) % 10000;
  }
  return (seed / 10000) * Math.PI * 2;
};

const SystemNodeDot = memo(function SystemNodeDot({
  node,
  selected,
  neighbor,
  hoveredSibling,
  reducedMotion,
  mobileScale,
  onSelect,
  onHover,
}: {
  node: SystemNode;
  selected: boolean;
  neighbor: boolean;
  hoveredSibling: boolean;
  reducedMotion: boolean;
  mobileScale: number;
  onSelect: (id: SystemId) => void;
  onHover: (id: SystemId | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const scale = node.radius * (selected ? 1.14 : neighbor ? 1.06 : 1) * mobileScale;
  const isActive = selected || neighbor || hovered;
  const emphasis = hoveredSibling ? 0.7 : 1;
  const phase = useRef(hashSeed(node.id));

  useCursor(hovered, 'pointer', 'default');

  useFrame((state) => {
    if (!groupRef.current || !ringRef.current || !coreRef.current) return;

    const elapsed = state.clock.getElapsedTime() + phase.current;
    const amplitude = isActive ? 0.05 : 0.018;
    const drift = isActive ? 0.4 : 0.2;

    if (!reducedMotion) {
      groupRef.current.rotation.y += drift * 0.04;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.6) * 0.02;

      coreRef.current.rotation.x += 0.003;
      coreRef.current.rotation.z += 0.002;

      const breathe = 1 + Math.sin(elapsed * 1.5) * amplitude;
      coreRef.current.scale.setScalar(scale * (0.9 + 0.1 * emphasis) * breathe);
      ringRef.current.scale.setScalar((0.82 + 0.09 * emphasis) * (0.95 + Math.sin(elapsed * 1.2) * 0.03));
      return;
    }

    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.y = 0;
    coreRef.current.rotation.x = 0;
    coreRef.current.rotation.z = 0;
    coreRef.current.scale.setScalar(scale * (0.9 + 0.1 * emphasis));
    ringRef.current.scale.setScalar(0.82 + 0.09 * emphasis);
  });

  const nodeColor = node.color;
  const nodeGlow = node.glow;
  const hoverColor = hovered ? '#f8fafc' : nodeGlow;

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      onSelect(node.id);
    },
    [node.id, onSelect],
  );

  return (
    <group ref={groupRef} position={node.position}>
      <mesh
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation();
          setHovered(true);
          onHover(node.id);
        }}
        onPointerOut={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation();
          setHovered(false);
          onHover(null);
        }}
        onPointerDown={handlePointerDown}
      >
        <sphereGeometry args={[scale, 36, 28]} />
        <meshPhysicalMaterial
          color={nodeGlow}
          emissive={nodeColor}
          emissiveIntensity={selected ? 0.64 : neighbor ? 0.34 : 0.22}
          roughness={0.2}
          metalness={0.35}
          clearcoat={0.1}
          clearcoatRoughness={0.32}
          transparent
          opacity={0.98}
        />
      </mesh>

      <mesh ref={ringRef} position={[0, -scale * 0.1, 0]} rotation={[Math.PI / 2, 0, phase.current * 1.2]}>
        <ringGeometry args={[scale * 1.3, scale * 1.57, 56]} />
        <meshBasicMaterial
          color={nodeColor}
          transparent
          depthWrite={false}
          opacity={selected ? 0.46 : neighbor ? 0.28 : 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {node.modules.map((moduleName, index) => {
        const angle = phase.current + (index * (Math.PI * 2)) / node.modules.length;
        const radius = scale * (1.9 + index * 0.09);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 1.7 + phase.current) * scale * 0.3;

        return (
          <mesh key={`${node.id}-${moduleName}`} position={[x, y, z]}>
            <sphereGeometry args={[scale * 0.1, 16, 12]} />
            <meshStandardMaterial
              color={nodeColor}
              emissive={nodeGlow}
              emissiveIntensity={selected ? 0.9 : 0.48}
              transparent
              opacity={isActive ? 0.62 : 0.34}
            />
          </mesh>
        );
      })}

      {selected && (
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[scale * 0.55, 1]} />
          <meshStandardMaterial
            color={nodeColor}
            emissive={nodeGlow}
            emissiveIntensity={1.05}
            transparent
            opacity={0.74}
          />
        </mesh>
      )}

      <Html
        distanceFactor={24}
        position={[0, scale + 0.22, 0]}
        center
        style={{
          pointerEvents: 'none',
          opacity: isActive ? 0.95 : 0.4,
          transition: 'opacity 180ms ease',
          transform: `scale(${isActive ? 0.95 : 0.74})`,
        }}
      >
        <div
          style={{
            color: '#ecfeff',
            background: 'rgba(2, 6, 23, 0.55)',
            border: `1px solid ${hoverColor}44`,
            borderRadius: 999,
            padding: '4px 8px',
            fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
            fontSize: 10,
            letterSpacing: '0.03em',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ color: '#f8fafc' }}><b>{node.label}</b> · {node.short}</div>
          {isActive ? <div style={{ color: '#7dd3fc', fontSize: 9, marginTop: 2 }}>{node.summary}</div> : null}
        </div>
      </Html>
    </group>
  );
});

const SystemEdgeLine = memo(function SystemEdgeLine({
  from,
  to,
  type,
  strength,
  active,
  reducedMotion,
}: {
  from: [number, number, number];
  to: [number, number, number];
  type: SystemEdge['type'];
  strength: number;
  active: boolean;
  reducedMotion: boolean;
}) {
  const points = React.useMemo(() => {
    const source = new THREE.Vector3(...from);
    const target = new THREE.Vector3(...to);
    const arc = source.clone().add(target).multiplyScalar(0.5);

    arc.y += 0.7 + strength * 1.1;
    arc.x += (target.z - source.z) * 0.06;
    arc.z += (source.x - target.x) * 0.06;

    return new THREE.CatmullRomCurve3([source, arc, target], false, 'centripetal', 0.62).getPoints(34);
  }, [from, to, strength]);

  const color = EDGE_COLOR_BY_TYPE[type];
  const tRef = useRef(0);
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !active) {
      tRef.current = 0;
      return;
    }

    tRef.current = (tRef.current + delta * (0.28 + strength * 0.55)) % 1;
    if (dotRef.current) {
      dotRef.current.position.copy(points[Math.floor(tRef.current * points.length) % points.length]);
    }
  });

  const baseAlpha = active ? 0.62 : 0.18;

  return (
    <group>
      <Line
        points={points}
        color={color}
        lineWidth={1}
        transparent
        opacity={baseAlpha}
        depthWrite={false}
      />
      {active ? (
        <mesh ref={dotRef}>
          <sphereGeometry args={[0.045, 10, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.85} transparent opacity={0.8} />
        </mesh>
      ) : null}
    </group>
  );
});

const SystemLandscapeRig = memo(function SystemLandscapeRig({
  target,
  reducedMotion,
  isMobile,
}: {
  target: [number, number, number];
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const { camera } = useThree();
  const focus = useRef(new THREE.Vector3(...target));
  const pointer = useRef(new THREE.Vector2(0, 0));
  const yawRef = useRef(0.18);

  useEffect(() => {
    focus.current.set(...target);
  }, [target]);

  useFrame((state, delta) => {
    const lookX = reducedMotion ? 0 : state.pointer.x;
    const lookY = reducedMotion ? 0 : state.pointer.y;

    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, lookX, 4, delta);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, lookY, 4, delta);

    yawRef.current = THREE.MathUtils.damp(yawRef.current, pointer.current.x * 0.35, 0.8, delta);

    focus.current.x = THREE.MathUtils.damp(focus.current.x, target[0], reducedMotion ? 1 : 0.2, delta);
    focus.current.y = THREE.MathUtils.damp(focus.current.y, target[1], reducedMotion ? 1 : 0.2, delta);
    focus.current.z = THREE.MathUtils.damp(focus.current.z, target[2], reducedMotion ? 1 : 0.2, delta);

    const radius = isMobile ? 9.5 : 11.5;
    const orbitHeight = isMobile ? -0.24 : -0.1;
    const elevation = 0.52 + (pointer.current.y * 0.22);
    const yaw = yawRef.current + 0.18;

    const nextX = focus.current.x + Math.cos(yaw) * radius * Math.cos(elevation);
    const nextZ = focus.current.z + Math.sin(yaw) * radius * Math.cos(elevation);
    const nextY = focus.current.y + Math.sin(elevation) * radius + 2.1 + orbitHeight;

    if (reducedMotion) {
      camera.position.set(nextX, nextY, nextZ);
      camera.lookAt(focus.current);
      return;
    }

    camera.position.x = THREE.MathUtils.damp(camera.position.x, nextX, 0.1, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, nextY, 0.1, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, nextZ, 0.1, delta);
    camera.lookAt(focus.current);
  });

  return null;
});

export const SystemLandscape: React.FC<SystemLandscapeProps> = ({ reducedMotion }) => {
  const isMobile = useMobileViewport();
  const [selectedId, setSelectedId] = React.useState<SystemId | null>(null);
  const [hoveredId, setHoveredId] = React.useState<SystemId | null>(null);

  const focusTarget = React.useMemo<[number, number, number]>(() => {
    if (!selectedId) {
      return [2.1, 0.6, -0.8];
    }
    return NODE_BY_ID.get(selectedId)?.position ?? [2.1, 0.6, -0.8];
  }, [selectedId]);

  const connectedNeighbors = React.useMemo(() => {
    const set = new Set<SystemId>();
    if (!selectedId) return set;

    SYSTEM_EDGES.forEach((edge) => {
      if (edge.from === selectedId) {
        set.add(edge.to);
      }
      if (edge.to === selectedId) {
        set.add(edge.from);
      }
    });

    return set;
  }, [selectedId]);

  const selectedNode = selectedId ? NODE_BY_ID.get(selectedId) : null;

  const handleNodeSelect = useCallback((id: SystemId) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  const handleClearFocus = useCallback(() => {
    setSelectedId(null);
    setHoveredId(null);
  }, []);

  const handleHover = useCallback((id: SystemId | null) => {
    setHoveredId(id);
  }, []);

  return (
    <div className="lab-visual" style={{ position: 'relative' }}>
      <Canvas
        dpr={isMobile ? [1, 1.4] : [1, 2]}
        frameloop="always"
        camera={{ position: [0, 2.4, isMobile ? 16 : 20], fov: isMobile ? 56 : 52, near: 0.1, far: 180 }}
        gl={{ antialias: !isMobile, alpha: false, powerPreference: 'high-performance' }}
        onPointerMissed={handleClearFocus}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#030a17']} />
        <fog attach="fog" args={['#030a17', 8, 30]} />

        <ambientLight intensity={reducedMotion ? 0.42 : 0.6} color="#9dc4ff" />
        <directionalLight position={[7, 8, 6]} intensity={0.95} color="#8ab8ff" />
        <directionalLight position={[-6, 6, -6]} intensity={0.75} color="#38bdf8" />
        <pointLight position={[0, 3.8, 0]} intensity={reducedMotion ? 0.32 : 0.55} color="#67e8f9" distance={26} decay={2} />

        <SystemLandscapeRig target={focusTarget} reducedMotion={reducedMotion} isMobile={isMobile} />

        <group>
          {SYSTEM_EDGES.map((edge) => {
            const from = NODE_BY_ID.get(edge.from);
            const to = NODE_BY_ID.get(edge.to);
            if (!from || !to) return null;

            const active =
              selectedId !== null &&
              (edge.from === selectedId || edge.to === selectedId || edge.from === hoveredId || edge.to === hoveredId);

            return (
              <SystemEdgeLine
                key={`${edge.from}-${edge.to}`}
                from={from.position}
                to={to.position}
                type={edge.type}
                strength={edge.strength}
                active={active}
                reducedMotion={reducedMotion}
              />
            );
          })}

          {SYSTEM_NODES.map((node) => {
            const isSelected = node.id === selectedId;
            const isNeighbor = connectedNeighbors.has(node.id);
            const isHoverNeighbor = hoveredId === node.id;

            return (
              <SystemNodeDot
                key={node.id}
                node={node}
                selected={isSelected}
                neighbor={isNeighbor || isHoverNeighbor}
                hoveredSibling={hoveredId === node.id}
                reducedMotion={reducedMotion}
                mobileScale={isMobile ? 0.9 : 1}
                onSelect={handleNodeSelect}
                onHover={handleHover}
              />
            );
          })}
        </group>
      </Canvas>

      <div
        style={{
          display: isMobile ? 'none' : 'block',
          position: 'absolute',
          right: isMobile ? 12 : 24,
          top: isMobile ? 12 : 16,
          maxWidth: isMobile ? '60vw' : '34ch',
          pointerEvents: 'none',
          color: '#94a3b8',
          fontSize: isMobile ? 11 : 12,
          fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
          letterSpacing: '0.03em',
          textAlign: 'left',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            border: '1px solid rgba(148, 163, 184, 0.32)',
            borderRadius: 8,
            padding: '8px 10px',
            background: 'rgba(2, 6, 23, 0.48)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div style={{ color: '#e2e8f0', marginBottom: 2 }}>
            {selectedNode ? `Focus: ${selectedNode.label}` : 'System Landscape'}
          </div>
          <div style={{ color: '#7dd3fc' }}>
            {selectedNode
              ? selectedNode.short
              : reducedMotion
                ? 'Reduced Motion: static layout, click to focus. Dimensional depth remains.'
                : 'Move pointer for subtle parallax. Click a node to lock focus.'}
          </div>
        </div>
      </div>
    </div>
  );
};
