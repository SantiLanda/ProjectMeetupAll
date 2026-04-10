import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber/native";
import { View } from "react-native";
import { THREE } from "expo-three";
import { Avatar } from "@/classes/Avatar.model";
import { OrbitControls } from "@react-three/drei/native";
import { useLoader } from '@react-three/fiber/native';
import { DRACOLoader } from 'three-stdlib';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';
import { Asset } from "expo-asset";

interface ModelProps {
    rotationX: number;
    rotationY: number;
    avatar: Avatar;
  }

  export const Model: React.FC<ModelProps> = ({ rotationX, rotationY, avatar }) => {
    return avatar.gender === 'male' ? (
      <MaleModel rotationX={rotationX} rotationY={rotationY} avatar={avatar}/>
    ) : (
      <FemaleModel rotationX={rotationX} rotationY={rotationY} avatar={avatar}/>
    );
  };

  const MaleModel: React.FC<ModelProps> = ({ rotationX, rotationY, avatar }) => {
    const group = useRef<THREE.Group>(null);
    const { nodes } = useGLTF(require('@/assets/models/female/female2.glb'));
  
    return (
      <group ref={group} scale={3} position={[0, -2.4, 0]}>
        {/* render male nodes */}
      </group>
    );
  };
  
  const FemaleModel: React.FC<ModelProps> = ({ rotationX, rotationY, avatar }) => {
    const group = useRef<THREE.Group>(null);
    const [avatarSt, setAvatarSt] = useState<Avatar>(avatar)
    let counter = 0

    useEffect(() => {
      setAvatarSt(avatar)
    }, [avatar])

  console.log('loading start')
  const female = useLoader(
    GLTFLoader,
    Asset.fromModule(require('@/assets/models/female/female2.glb')).uri,
    loader => {
      const dracoLoader = new DRACOLoader();
      // Usamos decoders remotos porque estamos en Expo Go
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(dracoLoader);
    }
  );
  /*const [bodyTexture, clothesTexture, hairTexture] = useTexture([require("@/assets/models/female/Skin.jpg"),
    require("@/assets/models/female/everytexture_com-stock-plastic-texture-00020-diffuse-2048.jpg"),
    require("@/assets/models/female/_21.png"),
  ])
  // needed because glTF standard specifies that textures should be Y-flipped, while the three.js default is not to Y-flip
  hairTexture.flipY = false
  bodyTexture.flipY = false
  clothesTexture.flipY = false

  materials['Metal.001'].metalness = 0*/
  console.log('loading end')
  return (
    <group ref={group} scale={3} position={[0, -2.4, 0]}>
    {Object.entries(nodes).map(([key, node]: any) => {
      if (!node.geometry) return null;
      return (

        <mesh
          key={key}
          geometry={node.geometry}
          material={node.material ?? undefined}
        />
      );
    })}
  </group>
  );
}

export default function AvatarViewerFiber({avatar}: {avatar: Avatar}) {

  return (
        <View style={{ flex: 1 }}>
                <Canvas camera={{ position: [0, 0, 20], fov: 36 }}>
                    <Suspense>
                    <ambientLight intensity={5}/>
                    <Model rotationX={0} rotationY={0} avatar={avatar}/>
                    </Suspense>
                    <OrbitControls maxDistance={20}
                    />
                </Canvas>
        </View>
  );
}