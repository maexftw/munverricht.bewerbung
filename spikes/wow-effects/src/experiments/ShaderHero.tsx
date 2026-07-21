import * as THREE from 'three';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';

const vertexShader = `
precision highp float;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform vec2 u_clickCenter;
uniform float u_click;
uniform float u_reducedMotion;

varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 234.45));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);

  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p = rot * p * 1.9 + vec2(13.7, 9.3);
    amp *= 0.52;
  }

  return value;
}

void main() {
  vec2 centered = vUv * 2.0 - 1.0;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  centered.x *= aspect;

  float motion = 1.0 - u_reducedMotion;
  float t = u_time;

  vec2 p = centered;
  vec2 cursor = u_pointer * 0.55;
  vec2 clickCenter = u_clickCenter * 0.55;

  p += cursor * (0.16 + 0.28 * motion);
  p += 0.018 * vec2(
    sin(t * 0.45 * motion + cursor.y * 3.3),
    cos(t * 0.37 * motion + cursor.x * 3.1)
  );

  float layerA = fbm(p * 2.1 + vec2(0.14, 0.21) * t * motion + cursor * 0.8);
  float layerB = fbm(p * 4.6 - vec2(2.3, -1.7) * t * 0.07 * motion + cursor * 0.4);
  float layerC = fbm(p * 8.8 + cursor * 0.3 + vec2(2.7, -3.4));

  float membrane = smoothstep(0.25, 0.55, layerA) * 0.65;
  membrane += smoothstep(0.20, 0.84, 1.0 - abs(layerB - 0.52)) * 0.55;
  membrane = clamp(membrane, 0.0, 1.0);

  float lane = abs(sin((layerC + t * 0.17 * motion) * 14.0 + p.x * 6.1));
  lane = pow(smoothstep(0.78, 0.995, lane), 3.0);

  float cursorField = exp(-pow(length(p - cursor) * 3.6, 2.0));
  float clickPulse = u_click * exp(-pow(length(p - clickCenter) * 10.2, 1.55));
  float clickWave = u_click * (0.9 + 0.1 * motion)
    * exp(-length(p - clickCenter) * 2.8)
    * (0.5 + 0.5 * cos(length(p - clickCenter) * 18.0 - t * 3.3 * (0.3 + motion) + 1.8));

  float ridge = smoothstep(0.4, 0.98, layerB + cursorField * 0.2) * 0.4;

  vec3 deepBlue = vec3(0.002, 0.010, 0.035);
  vec3 core = vec3(0.012, 0.070, 0.180);
  vec3 cyan = vec3(0.06, 0.82, 1.00);
  vec3 electric = vec3(0.14, 0.64, 1.00);

  vec3 col = mix(deepBlue, core, pow(membrane * (0.32 + 0.68 * lane), 1.8));
  col = mix(col, cyan, lane * 0.24 + clickPulse * (0.28 + 0.10 * motion));
  col += electric * (0.018 + 0.16 * membrane + 0.18 * cursorField);
  col += electric * clickWave * 0.18;
  col += electric * ridge * 0.12;

  float edge = 1.0 - smoothstep(0.62, 0.98, length(centered));
  vec3 glow = mix(vec3(0.2, 0.76, 1.0), vec3(0.05, 0.28, 0.84), cursorField);
  col += glow * (0.02 + 0.10 * edge) * (0.3 + 0.5 * membrane + clickPulse);

  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(78.233, 37.719))) * 43758.5453);
  col += (grain - 0.5) * vec3(0.004, 0.012, 0.022) * (1.0 + cursorField);
  col *= 0.96 * (0.28 + 0.72 * edge);

  float exposure = mix(0.92, 1.06, motion);
  col = 1.0 - exp(-col * exposure);
  col = pow(col, vec3(0.96));

  gl_FragColor = vec4(col, 1.0);
}
`;

const createUniforms = () => ({
  u_time: { value: 0 },
  u_resolution: { value: new THREE.Vector2(1, 1) },
  u_pointer: { value: new THREE.Vector2(0, 0) },
  u_clickCenter: { value: new THREE.Vector2(0, 0) },
  u_click: { value: 0 },
  u_reducedMotion: { value: 0 },
});

type ShaderHeroProps = {
  reducedMotion: boolean;
};

const shaderTexture = (material: THREE.ShaderMaterial, reducedMotion: boolean) => {
  material.uniforms.u_reducedMotion.value = reducedMotion ? 1 : 0;
  if (reducedMotion) {
    material.uniforms.u_click.value = 0;
  }
};

const HeroPlane: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const viewport = useThree((state) => state.viewport);
  const uniforms = useMemo(createUniforms, []);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const pointer = useRef(new THREE.Vector2(0, 0));
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const clickCenter = useRef(new THREE.Vector2(0, 0));
  const clickAmount = useRef(0);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const reduced = reducedMotion;
    const pointerTargetX = reduced ? 0 : pointerTarget.current.x;
    const pointerTargetY = reduced ? 0 : pointerTarget.current.y;

    const response = reduced ? 24 : 12;
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, pointerTargetX, response, delta);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, pointerTargetY, response, delta);

    const decay = reduced ? 1.9 : 1.0;
    clickAmount.current = Math.max(0, clickAmount.current - delta * decay);

    material.uniforms.u_time.value = reduced ? 0 : state.clock.elapsedTime;
    material.uniforms.u_resolution.value.set(state.size.width, state.size.height);
    material.uniforms.u_pointer.value.copy(pointer.current);
    material.uniforms.u_clickCenter.value.copy(clickCenter.current);
    material.uniforms.u_click.value = clickAmount.current;
    shaderTexture(material, reduced);
  });

  useEffect(() => {
    return () => {
      if (materialRef.current) {
        materialRef.current.dispose();
      }
    };
  }, []);

  const handleInteraction = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (reducedMotion) {
        return;
      }

      pointerTarget.current.set(event.pointer.x, event.pointer.y);
      clickCenter.current.copy(pointerTarget.current);
      clickAmount.current = 1;
    },
    [reducedMotion],
  );

  const handlePointerMove = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (reducedMotion) return;
      pointerTarget.current.set(event.pointer.x, event.pointer.y);
    },
    [reducedMotion],
  );

  const handlePointerOut = useCallback(() => {
    if (reducedMotion) return;
    pointerTarget.current.set(0, 0);
  }, [reducedMotion]);

  return (
    <>
      <mesh
        scale={[viewport.width, viewport.height, 1]}
        onPointerDown={handleInteraction}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        frustumCulled={false}
      >
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={materialRef}
          args={[
            {
              fragmentShader,
              vertexShader,
              uniforms,
              transparent: false,
              depthWrite: false,
              toneMapped: false,
            },
          ]}
        />
      </mesh>
    </>
  );
};

export const ShaderHero: React.FC<ShaderHeroProps> = ({ reducedMotion }) => {
  return (
    <div className="lab-visual">
      <Canvas
        dpr={Math.min(window.devicePixelRatio, 2)}
        camera={{ position: [0, 0, 2], fov: 50, near: 0.1, far: 10 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <HeroPlane reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};
