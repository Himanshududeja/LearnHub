import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FloatingShapes3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create materials with emissive glow
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.6,
      wireframe: true
    });

    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0088,
      emissive: 0xff0088,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.6,
      wireframe: true
    });

    const torusMaterial = new THREE.MeshPhongMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.6,
      wireframe: true
    });

    // Create geometries
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), cubeMaterial);
    cube.position.set(-3, 2, 0);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), sphereMaterial);
    sphere.position.set(3, -1, 0);

    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.3, 16, 100), torusMaterial);
    torus.position.set(3.5, 1.5, 0);

    scene.add(cube, sphere, torus);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate shapes
      cube.rotation.x = elapsedTime * 0.3;
      cube.rotation.y = elapsedTime * 0.5;

      sphere.rotation.x = elapsedTime * 0.2;
      sphere.rotation.y = elapsedTime * 0.4;

      torus.rotation.x = elapsedTime * 0.4;
      torus.rotation.y = elapsedTime * 0.3;

      // Float animation (up and down)
      cube.position.y = 2 + Math.sin(elapsedTime * 0.8) * 0.5;
      sphere.position.y = -1 + Math.sin(elapsedTime * 0.8 + 1) * 0.6;
      torus.position.y = 1.5 + Math.sin(elapsedTime * 0.8 + 2) * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default FloatingShapes3D;