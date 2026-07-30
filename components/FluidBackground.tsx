"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FluidBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0,
      1
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        ),
      },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,

      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,

      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uIntensity;
        uniform vec2 uResolution;

        void main() {

          vec2 uv = gl_FragCoord.xy / uResolution;

          float d = distance(uv, uMouse);

          float ripple =
            abs(
              sin(
                d * 60.0
                - uTime * 8.0
              )
            );

          ripple *= exp(-d * 10.0);

          vec3 black = vec3(0.0);
          float alpha = ripple * 0.85 * uIntensity;

          gl_FragColor = vec4(black, alpha);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      material
    );

    scene.add(mesh);

    const handleMouseMove = (e: MouseEvent) => {
      uniforms.uMouse.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );

      uniforms.uIntensity.value = 1;
    };

    const handleResize = () => {
      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    let animationId: number;

    const animate = () => {
      uniforms.uTime.value += 0.01;
      uniforms.uIntensity.value *= 0.94;

      renderer.render(scene, camera);

      animationId = requestAnimationFrame(
        animate
      );
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      renderer.dispose();

      if (
        mountRef.current &&
        renderer.domElement.parentNode
      ) {
        mountRef.current.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
