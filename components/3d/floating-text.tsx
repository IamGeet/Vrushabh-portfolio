"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import type * as THREE from "three"

export default function FloatingText() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
        <Text
          position={[-8, 5, -12]}
          rotation={[0, 0.3, 0]}
          fontSize={1}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          AI
        </Text>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Text
          position={[6, -4, -10]}
          rotation={[0, -0.5, 0]}
          fontSize={0.8}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
        >
          ML
        </Text>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <Text
          position={[-5, -5, -8]}
          rotation={[0, 0.8, 0]}
          fontSize={0.6}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
        >
          Python
        </Text>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2.5}>
        <Text
          position={[4, 6, -15]}
          rotation={[0, -0.2, 0]}
          fontSize={0.7}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
        >
          Data
        </Text>
      </Float>
    </group>
  )
}
