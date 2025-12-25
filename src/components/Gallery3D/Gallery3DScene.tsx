import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  Float,
  Sparkles,
  Text3D,
  Center
} from "@react-three/drei";
import * as THREE from "three";
import FloatingTile from "./FloatingTile";

interface GalleryImage {
  src: string;
  alt: string;
}

interface SceneProps {
  images: GalleryImage[];
}

const CameraRig = () => {
  const { camera, pointer } = useThree();
  
  useFrame(() => {
    // Subtle camera movement following mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.5, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.3 + 1, 0.02);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

const FloatingParticles = () => {
  return (
    <Sparkles
      count={50}
      scale={15}
      size={3}
      speed={0.3}
      color="#d4a574"
      opacity={0.6}
    />
  );
};

const Scene = ({ images }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Calculate tile positions in a creative 3D arrangement
  const getTileConfig = (index: number, total: number) => {
    const layouts = [
      // Main center tile (larger)
      { position: [0, 0, 0] as [number, number, number], scale: [2.5, 2, 0.08] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },
      // Left side
      { position: [-3.2, 0.5, -1] as [number, number, number], scale: [1.8, 1.4, 0.08] as [number, number, number], rotation: [0, 0.3, 0] as [number, number, number] },
      // Right side
      { position: [3.2, -0.3, -1] as [number, number, number], scale: [1.8, 1.4, 0.08] as [number, number, number], rotation: [0, -0.3, 0] as [number, number, number] },
      // Top left back
      { position: [-2, 1.8, -2.5] as [number, number, number], scale: [1.5, 1.2, 0.08] as [number, number, number], rotation: [0.1, 0.2, 0.05] as [number, number, number] },
      // Top right back
      { position: [2, 1.5, -2.5] as [number, number, number], scale: [1.5, 1.2, 0.08] as [number, number, number], rotation: [0.1, -0.2, -0.05] as [number, number, number] },
      // Bottom center back
      { position: [0, -1.5, -2] as [number, number, number], scale: [1.6, 1.3, 0.08] as [number, number, number], rotation: [-0.1, 0, 0] as [number, number, number] },
    ];

    return layouts[index % layouts.length];
  };

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle group rotation based on scroll/time
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {images.map((image, index) => {
        const config = getTileConfig(index, images.length);
        return (
          <Float
            key={index}
            speed={1.5 + index * 0.2}
            rotationIntensity={0.1}
            floatIntensity={0.3}
          >
            <FloatingTile
              url={image.src}
              position={config.position}
              scale={config.scale}
              rotation={config.rotation}
              index={index}
            />
          </Float>
        );
      })}
    </group>
  );
};

interface Gallery3DSceneProps {
  images: GalleryImage[];
}

const Gallery3DScene = ({ images }: Gallery3DSceneProps) => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        shadows
        camera={{ position: [0, 1, 8], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 3, 3]} intensity={0.4} color="#e8d4c4" />
          <pointLight position={[5, -2, 2]} intensity={0.3} color="#c4d4c8" />
          
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* Main scene */}
          <Scene images={images} />
          
          {/* Floating particles */}
          <FloatingParticles />
          
          {/* Camera rig for mouse following */}
          <CameraRig />
          
          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
            rotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay gradient for blending */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-cream/50 via-transparent to-cream/30" />
    </div>
  );
};

export default Gallery3DScene;
