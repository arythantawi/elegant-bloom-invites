import { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

interface FloatingTileProps {
  url: string;
  position: [number, number, number];
  scale?: [number, number];
  rotation?: [number, number, number];
  index: number;
}

const FloatingTile = ({ 
  url, 
  position, 
  scale = [2, 1.5], 
  rotation = [0, 0, 0],
  index 
}: FloatingTileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useCursor(hovered);

  // Load texture
  const texture = useLoader(TextureLoader, url);

  // Float animation parameters
  const floatSpeed = 0.5 + index * 0.1;
  const floatAmplitude = 0.1 + (index % 3) * 0.05;
  const rotationAmplitude = 0.02;

  // Store initial position for animation
  const initialY = useMemo(() => position[1], [position]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Floating animation
    meshRef.current.position.y = initialY + Math.sin(time * floatSpeed + index) * floatAmplitude;
    
    // Subtle rotation animation
    if (!hovered) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3 + index) * rotationAmplitude;
      meshRef.current.rotation.y = rotation[1] + Math.cos(time * 0.4 + index) * rotationAmplitude;
    }
    
    // Hover effect - tilt towards mouse
    if (hovered) {
      const targetRotationX = rotation[0] + (state.pointer.y * 0.2);
      const targetRotationY = rotation[1] + (state.pointer.x * 0.3);
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      
      // Scale up on hover
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.1, 0.1);
    } else {
      // Return to normal scale
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={scale} />
      <meshStandardMaterial 
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={hovered ? 1 : 0.95}
      />
    </mesh>
  );
};

export default FloatingTile;
