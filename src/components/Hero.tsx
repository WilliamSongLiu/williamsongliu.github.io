import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/Hero.css';

const Hero: FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();

    // Create isometric camera
    const width = mount.offsetWidth;
    const height = mount.offsetHeight;
    const aspect = width / height;
    const d = 5;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(d, d, d);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Create different geometries with varied sizes
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const pyramidGeometry = new THREE.TetrahedronGeometry(1.2);
    const octaGeometry = new THREE.OctahedronGeometry(1.6);

    // Create wireframe materials with different colors
    const createWireframe = (color: number) => {
      return new THREE.LineBasicMaterial({
        color: color,
        linewidth: 1
      });
    };

    const materials = [
      createWireframe(0xf7d794), // Golden
      createWireframe(0xff6b81), // Pink
      createWireframe(0x74b9ff)  // Blue
    ];

    // Convert geometries to wireframe edges
    const createWireframeShape = (geometry: THREE.BufferGeometry, material: THREE.Material) => {
      const edges = new THREE.EdgesGeometry(geometry);
      return new THREE.LineSegments(edges, material);
    };

    const shape1 = createWireframeShape(cubeGeometry, materials[0]);
    const shape2 = createWireframeShape(pyramidGeometry, materials[1]);
    const shape3 = createWireframeShape(octaGeometry, materials[2]);

    // Position shapes further apart
    shape1.position.set(-3, 0.3, -1);
    shape2.position.set(1, -0.2, 1);
    shape3.position.set(2.5, 0.1, -2);

    // Set random initial rotations
    [shape1, shape2, shape3].forEach(shape => {
      shape.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
    });

    scene.add(shape1);
    scene.add(shape2);
    scene.add(shape3);

    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let requestRef: number;
    const animate = () => {
      requestRef = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      const amplitude = 0.15;

      // Vertical floating animation
      shape1.position.y = 0.3 + Math.sin(time) * amplitude;
      shape2.position.y = -0.2 + Math.sin(time + (2 * Math.PI / 3)) * amplitude;
      shape3.position.y = 0.1 + Math.sin(time + (4 * Math.PI / 3)) * amplitude;

      // Rotate shapes based on mouse position
      const rotationSpeed = 0.5;
      [shape1, shape2, shape3].forEach(shape => {
        shape.rotation.x += (-mouse.y * rotationSpeed - shape.rotation.x) * 0.05;
        shape.rotation.y += (mouse.x * rotationSpeed - shape.rotation.y) * 0.05;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = mount.offsetWidth;
      const newHeight = mount.offsetHeight;
      const newAspect = newWidth / newHeight;

      camera.left = -d * newAspect;
      camera.right = d * newAspect;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-3d" ref={mountRef}></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1>Hi, I'm William</h1>
          <p>
            As a Stanford MS &amp; BS student in Computer Science with a specialization in Artificial Intelligence graduating in spring 2025, my passion lies in AI agents and innovative games. My areas of expertise include reinforcement learning bots, blockchain projects, game development, VR/AR, and full-stack web development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;