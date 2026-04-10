import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from "expo-screen-orientation";
import {AxisPad, AxisPadTouchEvent} from "@fustaro/react-native-axis-pad"
import { StyleSheet } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { IconButton } from 'react-native-paper';
import ExpoTHREE from 'expo-three';

export default function GameIn() {
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<Renderer>();
  const pivotRef = useRef<THREE.Group>();
  const rotation = useRef({ x: 0, y: 0 });
  const avatarRef = useRef<THREE.Mesh>();
  const navigation = useNavigation();

  const charSpeed = 0.1; // Adjust this value to control the speed of the character
  const charRotationSpeed = 0.05; // Adjust this value to control the rotation speed of the character

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const updateRightAxis = () => (event: AxisPadTouchEvent) => {
    if (event.eventType == 'pan') {
      const dx = event.ratio.x
      const dy = event.ratio.y;
      rotation.current.x -= dy * charRotationSpeed;
      rotation.current.y += dx * charRotationSpeed;
    }
  };

  const onContextCreate = async (gl: any) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 10, 0); // Set camera height and distance
    cameraRef.current = camera;

    // Create a renderer
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);


    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    directionalLight.lookAt(10, 0, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Load the .obj model
    const asset = Asset.fromModule(require('@/assets/models/city2/cityExport.obj')); // Place your .obj file in the assets folder
    await asset.downloadAsync();
    console.log('asset loaded')

    const loader = new OBJLoader();
    loader.load(
      asset.localUri || '',
      (object) => {
        console.log('model loaded')
        scene.add(object);
        camera.lookAt(object.position); // Adjust camera to look at the loaded object
      },
      undefined,
      (error) => {
        console.error('Error loading OBJ file:', error);
      }
    );

    cameraRef.current = camera;
		sceneRef.current = scene;
		rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (cameraRef.current) {
        cameraRef.current.position.x = Math.sin(rotation.current.y) * 10;
        cameraRef.current.position.z = Math.cos(rotation.current.y) * 10;
        cameraRef.current.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'skyblue' }}>
      <View style={styles.backButton}>
        <IconButton 
          icon="arrow-left" 
          iconColor="#182C45" 
          onPress={() => {
            ScreenOrientation.unlockAsync();
            navigation.goBack();
          }} 
        />
      </View>
      <View style={styles.axis}>
        <AxisPad size={100} id="1" onTouchEvent={() => console.log('hola')}></AxisPad>
        <AxisPad size={100} id="2" onTouchEvent={updateRightAxis()}></AxisPad>
      </View>
      <GLView style={{ flex: 1, zIndex: 0}} onContextCreate={onContextCreate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  axis:
    {
      width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
      position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 20, paddingLeft: 20, paddingRight: 20,
      zIndex: 1
    },
    backButton: {
      color: '#1abc9c',
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 1,
      backgroundColor: 'white',
      borderRadius: 20,
    },
})