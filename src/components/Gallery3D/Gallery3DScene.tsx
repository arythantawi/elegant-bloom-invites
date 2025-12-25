import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
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

  const getTileConfig = (index: number) => {
    const layouts = [
      { position: [0, 0, 0] as [number, number, number], scale: [2.5, 2] as [number, number], rotation: [0, 0, 0] as [number, number, number] },
      { position: [-3.2, 0.5, -1] as [number, number, number], scale: [1.8, 1.4] as [number, number], rotation: [0, 0.3, 0] as [number, number, number] },
      { position: [3.2, -0.3, -1] as [number, number, number], scale: [1.8, 1.4] as [number, number], rotation: [0, -0.3, 0] as [number, number, number] },
      { position: [-2, 1.8, -2.5] as [number, number, number], scale: [1.5, 1.2] as [number, number], rotation: [0.1, 0.2, 0.05] as [number, number, number] },
      { position: [2, 1.5, -2.5] as [number, number, number], scale: [1.5, 1.2] as [number, number], rotation: [0.1, -0.2, -0.05] as [number, number, number] },
      { position: [0, -1.5, -2] as [number, number, number], scale: [1.6, 1.3] as [number, number], rotation: [-0.1, 0, 0] as [number, number, number] },
    ];
    return layouts[index % layouts.length];
  };

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {images.map((image, index) => {
        const config = getTileConfig(index);
        return (
          <FloatingTile
            key={index}
            url={image.src}
            position={config.position}
            scale={config.scale}
            rotation={config.rotation}
            index={index}
          />
        );
      })}
    </group>
  );
};

interface Gallery3DSceneProps {
  images: GalleryImage[];
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#d4a574" wireframe />
  </mesh>
);

const Gallery3DScene = ({ images }: Gallery3DSceneProps) => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 1, 8], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 3, 3]} intensity={0.4} color="#e8d4c4" />
          <pointLight position={[5, -2, 2]} intensity={0.3} color="#c4d4c8" />
          
          <Scene images={images} />
          <FloatingParticles />
          <CameraRig />
          
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
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-cream/50 via-transparent to-cream/30" />
    </div>
  );
};

export default Gallery3DScene;
