import * as THREE from 'three';
import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

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
  vec2 p = centered;
  vec2 cursor = u_pointer * 0.55;
  vec2 clickCenter = u_clickCenter * 0.55;

  p += cursor * 0.26;
  p += 0.018 * vec2(sin(u_time * 0.45 + cursor.y * 3.3), cos(u_time * 0.37 + cursor.x * 3.1));

  float layerA = fbm(p * 2.1 + vec2(0.14, 0.21) * u_time + cursor * 0.8);
  float layerB = fbm(p * 4.6 - vec2(2.3, -1.7) * u_time * 0.07 + cursor * 0.4);
  float layerC = fbm(p * 8.8 + cursor * 0.3 + vec2(2.7, -3.4));
  float membrane = smoothstep(0.25, 0.55, layerA) * 0.65;
  membrane += smoothstep(0.20, 0.84, 1.0 - abs(layerB - 0.52)) * 0.55;
  membrane = clamp(membrane, 0.0, 1.0);

  float lane = abs(sin((layerC + u_time * 0.17) * 14.0 + p.x * 6.1));
  lane = pow(smoothstep(0.78, 0.995, lane), 3.0);
  float cursorField = exp(-pow(length(p - cursor) * 3.6, 2.0));
  float clickPulse = u_click * exp(-pow(length(p - clickCenter) * 10.2, 1.55));
  float clickWave = u_click * exp(-length(p - clickCenter) * 2.8)
    * (0.5 + 0.5 * cos(length(p - clickCenter) * 18.0 - u_time * 3.3 + 1.8));
  float ridge = smoothstep(0.4, 0.98, layerB + cursorField * 0.2) * 0.4;

  vec3 deepBlue = vec3(0.002, 0.010, 0.035);
  vec3 core = vec3(0.012, 0.070, 0.180);
  vec3 cyan = vec3(0.06, 0.82, 1.00);
  vec3 electric = vec3(0.14, 0.64, 1.00);
  vec3 col = mix(deepBlue, core, pow(membrane * (0.32 + 0.68 * lane), 1.8));
  col = mix(col, cyan, lane * 0.24 + clickPulse * 0.38);
  col += electric * (0.018 + 0.16 * membrane + 0.18 * cursorField);
  col += electric * clickWave * 0.18;
  col += electric * ridge * 0.12;

  float edge = 1.0 - smoothstep(0.62, 0.98, length(centered));
  vec3 glow = mix(vec3(0.2, 0.76, 1.0), vec3(0.05, 0.28, 0.84), cursorField);
  col += glow * (0.02 + 0.10 * edge) * (0.3 + 0.5 * membrane + clickPulse);
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(78.233, 37.719))) * 43758.5453);
  col += (grain - 0.5) * vec3(0.004, 0.012, 0.022) * (1.0 + cursorField);
  col *= 0.96 * (0.28 + 0.72 * edge);
  col = 1.0 - exp(-col * 1.06);
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
});

const HeroPlane = () => {
  const viewport = useThree((state) => state.viewport);
  const uniforms = useMemo(createUniforms, []);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const clickCenter = useRef(new THREE.Vector2(0, 0));
  const clickAmount = useRef(0);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointerTarget.current.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    };
    const sendImpulse = (event: PointerEvent) => {
      updatePointer(event);
      clickCenter.current.copy(pointerTarget.current);
      clickAmount.current = 1;
    };
    const resetPointer = () => pointerTarget.current.set(0, 0);

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerdown', sendImpulse, { passive: true });
    document.documentElement.addEventListener('mouseleave', resetPointer);
    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerdown', sendImpulse);
      document.documentElement.removeEventListener('mouseleave', resetPointer);
      materialRef.current?.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, pointerTarget.current.x, 12, delta);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, pointerTarget.current.y, 12, delta);
    clickAmount.current = Math.max(0, clickAmount.current - delta);
    material.uniforms.u_time.value = state.clock.elapsedTime;
    material.uniforms.u_resolution.value.set(state.size.width, state.size.height);
    material.uniforms.u_pointer.value.copy(pointer.current);
    material.uniforms.u_clickCenter.value.copy(clickCenter.current);
    material.uniforms.u_click.value = clickAmount.current;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        args={[{ fragmentShader, vertexShader, uniforms, transparent: false, depthWrite: false, toneMapped: false }]}
      />
    </mesh>
  );
};

const HeroShaderScene = () => (
  <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 2], fov: 50, near: 0.1, far: 10 }}
    gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
  >
    <HeroPlane />
  </Canvas>
);

export default HeroShaderScene;
