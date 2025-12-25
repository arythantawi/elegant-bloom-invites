import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Image, useCursor } from "@react-three/drei";
import * as THREE from "three";

interface FloatingTileProps {
  url: string;
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  index: number;
}

const FloatingTile = ({ 
  url, 
  position, 
  scale = [2, 1.5, 0.1], 
  rotation = [0, 0, 0],
  index 
}: FloatingTileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useCursor(hovered);

  // Float animation parameters
  const floatSpeed = 0.5 + index * 0.1;
  const floatAmplitude = 0.1 + (index % 3) * 0.05;
  const rotationAmplitude = 0.02;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * floatSpeed + index) * floatAmplitude;
    
    // Subtle rotation animation
    meshRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3 + index) * rotationAmplitude;
    meshRef.current.rotation.y = rotation[1] + Math.cos(time * 0.4 + index) * rotationAmplitude;
    
    // Hover effect - tilt towards mouse
    if (hovered) {
      const targetRotationX = (state.pointer.y * 0.2);
      const targetRotationY = (state.pointer.x * 0.3);
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        rotation[0] + targetRotationX,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        rotation[1] + targetRotationY,
        0.1
      );
      
      // Scale up on hover
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, scale[0] * 1.1, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scale[1] * 1.1, 0.1);
    } else {
      // Return to normal scale
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, scale[0], 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scale[1], 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        rotation={rotation}
        castShadow
        receiveShadow
      >
        <boxGeometry args={scale} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : "#f5f5f5"}
          metalness={0.1}
          roughness={0.8}
        />
        
        {/* Front face image */}
        <Image
          url={url}
          position={[0, 0, scale[2] / 2 + 0.001]}
          scale={[scale[0] * 0.95, scale[1] * 0.95]}
          transparent
        />
        
        {/* Glow effect on hover */}
        {hovered && (
          <pointLight 
            position={[0, 0, 1]} 
            intensity={0.5} 
            color="#d4a574" 
            distance={3} 
          />
        )}
      </mesh>
      
      {/* Shadow plane */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -scale[1] / 2 - 0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[scale[0] * 1.2, scale[0] * 1.2]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default FloatingTile;
