"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function CircuitLines() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  // Generate random lines and points
  const lines = Array.from({ length: 30 }, (_, i) => {
    const points = [
      new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, 0),
      new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, 0),
    ];
    return (
      <line key={i}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00eaff" />
      </line>
    );
  });

  const points = Array.from({ length: 40 }, (_, i) => {
    const pos = [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 12,
      0.1,
    ];
    return (
      <mesh key={i} position={pos}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#00eaff" />
      </mesh>
    );
  });

  return <group ref={group}>{lines}{points}</group>;
}

export default function CircuitBoardBackground() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: -2,
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
    }}>
      <Canvas camera={{ position: [0, 0, 16], fov: 50 }} gl={{ alpha: true }}>
        <color attach="background" args={["#0a0f1e"]} />
        <ambientLight intensity={0.7} />
        <CircuitLines />
      </Canvas>
    </div>
  );
}