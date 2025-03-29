import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import starImage from "./../assets/star.png";

export default function BackgroundAnimation() {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, stars;
    let velocities = [];

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 100;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      const starGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(6000 * 3);

      for (let i = 0; i < 6000; i++) {
        positions[i * 3] = Math.random() * 400 - 200;
        positions[i * 3 + 1] = Math.random() * 400 - 200;
        positions[i * 3 + 2] = Math.random() * 400 - 200;

        velocities.push({
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3,
          z: (Math.random() - 0.5) * 0.3,
        });
      }

      starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const sprite = new THREE.TextureLoader().load(starImage);
      const starMaterial = new THREE.PointsMaterial({
        size: 1,
        map: sprite,
        transparent: true,
        alphaTest: 0.5,
        opacity: 1,
      });

      stars = new THREE.Points(starGeo, starMaterial);
      scene.add(stars);
    };

    const animate = () => {
      const positions = stars.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i / 3].x;
        positions[i + 1] += velocities[i / 3].y;
        positions[i + 2] += velocities[i / 3].z;

        if (Math.abs(positions[i]) > 200) positions[i] = -positions[i];
        if (Math.abs(positions[i + 1]) > 200) positions[i + 1] = -positions[i + 1];
        if (Math.abs(positions[i + 2]) > 200) positions[i + 2] = -positions[i + 2];
      }

      stars.geometry.attributes.position.needsUpdate = true;
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      if (renderer) renderer.dispose();
    };
  }, []);

  return <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 }} ref={mountRef} />;
}
