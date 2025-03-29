import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  simulationVertexShader,
  simulationFragmentShader,
  renderVertexShader,
  renderFragmentShader
} from "./shaders";

const About = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2();
    let frame = 0;
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };

    let rta = new THREE.WebGLRenderTarget(width, height, options);
    let rtb = new THREE.WebGLRenderTarget(width, height, options);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMaterial);

    simScene.add(simQuad);
    scene.add(renderQuad);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: true });
    ctx.fillStyle = "#13d44d";
    ctx.fillRect(0, 0, width, height);

    // const fontSize = Math.round(250 * devicePixelRatio);
    // ctx.fillStyle = "#fef4b8";
    // ctx.font = `bold ${fontSize}px Test Sohne`;
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.fillText("TOSBIT", width / 2, height / 2 + fontSize / 2);
    //This was reponsible to show only tosbit










    //This is responsible to show all the text
    const heading = "ABOUT US"; 
    const content = "Tosbit is India’s first indigenous relational database, optimized for high-performance computing and embedded systems with advanced storage, parsing, and error-handling innovations. As an open-source project, we invite developers and researchers to contribute and be part of revolutionizing India's database ecosystem!";
    
    const headingFontSize = Math.round(100 * devicePixelRatio); 
    const contentFontSize = Math.round(40 * devicePixelRatio);  
    
    ctx.fillStyle = "#fef4b8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Draw the heading (Bold)
    ctx.font = `bold ${headingFontSize}px Test Sohne`;
    ctx.fillText(heading, width / 2, height / 4);  // Place heading higher
    
    // Function to wrap text
    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        let words = text.split(" ");
        let line = "";
        let lines = [];
        
        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + " ";
            let testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth && i > 0) {
                lines.push(line);
                line = words[i] + " ";
            } else {
                line = testLine;
            }
        }
        lines.push(line);
    
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], x, y + (i * lineHeight));
        }
    }
    
    // Draw the content (Wrapped text)
    ctx.font = `${contentFontSize}px Test Sohne`;
    wrapText(ctx, content, width / 2, height / 2, width * 0.8, contentFontSize * 1.2); // 80% width for better wrapping
    
    //This is responsible to show all the text









    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    textTexture.format = THREE.RGBAFormat;

    const handleResize = () => {
      const newWidth = window.innerWidth * window.devicePixelRatio;
      const newHeight = window.innerHeight * window.devicePixelRatio;

      renderer.setSize(window.innerWidth, window.innerHeight);
      rta.setSize(newWidth, newHeight);
      rtb.setSize(newWidth, newHeight);
      simMaterial.uniforms.resolution.value.set(newWidth, newHeight);

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.fillStyle = "#fb7427";
      ctx.fillRect(0, 0, newWidth, newHeight);

      const newFontSize = Math.round(250 * devicePixelRatio);
      ctx.fillStyle = "#fef4b8";
      ctx.font = `bold ${newFontSize}px Test Sohne`;
      //ctx.fillText("TOSBIT", newWidth / 2, newHeight / 2);//this used to refer to only tosbit








      //This will show the other content as well

      const heading = "ABOUT US"; // Your heading
      const content = "We create innovative solutions to enhance user experiences in 3D environments."; // Your smaller text

      const headingFontSize = Math.round(100 * devicePixelRatio); // Larger font size for heading
      const contentFontSize = Math.round(40 * devicePixelRatio);  // Smaller font size for content

      ctx.fillStyle = "#fef4b8";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw the heading (Bold)
      ctx.font = `bold ${headingFontSize}px Test Sohne`;
      ctx.fillText(heading, newWidth / 2, newHeight / 2 - headingFontSize / 2);

      // Draw the content (Smaller and below heading)
      ctx.font = `${contentFontSize}px Test Sohne`;
      ctx.fillText(content, newWidth / 2, newHeight / 2 + headingFontSize);

      //The changes end here










      textTexture.needsUpdate = true;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX * window.devicePixelRatio;
      mouse.y = (window.innerHeight - e.clientY) * window.devicePixelRatio;
    };

    const handleMouseLeave = () => {
      mouse.set(0, 0);
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;
      simMaterial.uniforms.textureA.value = rta.texture;
      renderer.setRenderTarget(rtb);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtb.texture;
      renderMaterial.uniforms.textureB.value = textTexture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      [rta, rtb] = [rtb, rta];
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseleave", handleMouseLeave);

      // Remove only the Three.js canvas
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh", marginTop: "60vh" }} />;
};

export default About;
