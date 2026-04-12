import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface KineticWavesProps {
  className?: string;
}

const KineticWaves: React.FC<KineticWavesProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Config
    const CONFIG = {
      gridSize: 32,
      spacing: 0.9,
      boxSize: 0.5,
      waveSpeed: 1.5,
      waveHeight: 2.5,
      mouseRadius: 10,
      mouseStrength: 4,
      chaos: 0
    };

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to see project background
    scene.fog = new THREE.FogExp2(0x050505, 0.02);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 30, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Grid Mesh
    const geometry = new THREE.BoxGeometry(CONFIG.boxSize, CONFIG.boxSize, CONFIG.boxSize);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.6,
      emissive: 0x111111,
      emissiveIntensity: 0.2
    });

    const count = CONFIG.gridSize * CONFIG.gridSize;
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const baseColor = new THREE.Color(0x3b82f6); // Indigo-ish for Munverricht
    for (let i = 0; i < count; i++) {
      mesh.setColorAt(i, baseColor);
    }
    mesh.instanceColor!.needsUpdate = true;
    scene.add(mesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 4);
    scene.add(ambientLight);

    const mouseLight = new THREE.PointLight(0xffffff, 2, 15);
    scene.add(mouseLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0x4f46e5, 5, 100); // Indigo
    pointLight1.position.set(0, 10, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 5, 100); // Cyan
    pointLight2.position.set(20, 10, 20);
    scene.add(pointLight2);

    // State
    const dummy = new THREE.Object3D();
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    let mousePos3D = new THREE.Vector3();
    let isLanding = false;
    let cameraAngle = 0;
    let cameraPhi = Math.PI / 3.5;

    const initialPositions: { x: number; y: number; z: number; ox: number; oz: number }[] = [];
    const randomOffsets: { rx: number; ry: number; rz: number }[] = [];
    for (let i = 0; i < CONFIG.gridSize; i++) {
      for (let j = 0; j < CONFIG.gridSize; j++) {
        const x = (i - CONFIG.gridSize / 2) * CONFIG.spacing;
        const z = (j - CONFIG.gridSize / 2) * CONFIG.spacing;
        initialPositions.push({ x, y: 0, z, ox: x, oz: z });
        randomOffsets.push({
          rx: (Math.random() - 0.5) * 2,
          ry: (Math.random() - 0.5) * 2,
          rz: (Math.random() - 0.5) * 2
        });
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const target = new THREE.Vector3();
      const intersection = raycaster.ray.intersectPlane(plane, target);
      if (intersection) {
        gsap.to(mousePos3D, { x: target.x, z: target.z, duration: 0.1, ease: 'power2.out' });
        mouseLight.position.set(target.x, 5, target.z);
      }
    };

    const triggerExplosion = () => {
      if (isLanding) return;
      isLanding = true;
      const tl = gsap.timeline({ onComplete: () => { isLanding = false; } });
      tl.to(CONFIG, { spacing: 4, chaos: 1, duration: 0.4, ease: 'power4.out' })
        .to(CONFIG, { spacing: 0.9, chaos: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', triggerExplosion);

    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();
      let i = 0;
      for (let x = 0; x < CONFIG.gridSize; x++) {
        for (let z = 0; z < CONFIG.gridSize; z++) {
          const pos = initialPositions[i];
          const offset = randomOffsets[i];
          const dx = pos.ox - mousePos3D.x;
          const dz = pos.oz - mousePos3D.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          
          let y = Math.sin(dist * 0.4 - time * CONFIG.waveSpeed) * 0.8;
          if (dist < CONFIG.mouseRadius) {
            const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseStrength;
            y += Math.sin(dist * 1.5 - time * 4) * force;
          }

          const currentSpacing = CONFIG.spacing;
          const finalX = (x - CONFIG.gridSize / 2) * currentSpacing;
          const finalZ = (z - CONFIG.gridSize / 2) * currentSpacing;

          dummy.position.set(finalX, y, finalZ);
          dummy.rotation.x = (y * 0.1) + (offset.rx * CONFIG.chaos * 2);
          dummy.rotation.y = (offset.ry * CONFIG.chaos * 2);
          dummy.rotation.z = (y * 0.1) + (offset.rz * CONFIG.chaos * 2);
          
          const scale = 1 + y * 0.2;
          dummy.scale.set(scale, scale, scale);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
          i++;
        }
      }
      mesh.instanceMatrix.needsUpdate = true;

      // Camera
      const radius = 45;
      const targetX = radius * Math.sin(cameraPhi) * Math.sin(cameraAngle);
      const targetY = radius * Math.cos(cameraPhi);
      const targetZ = radius * Math.sin(cameraPhi) * Math.cos(cameraAngle);
      camera.position.x += (targetX - camera.position.x) * 0.1;
      camera.position.y += (targetY - camera.position.y) * 0.1;
      camera.position.z += (targetZ - camera.position.z) * 0.1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animReqId = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animReqId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', triggerExplosion);
      renderer.dispose();
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className || ''}`} 
    />
  );
};

export default KineticWaves;
