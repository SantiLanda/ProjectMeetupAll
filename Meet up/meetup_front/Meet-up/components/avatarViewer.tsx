import React, { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import * as THREE from 'three';
import { PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { Asset } from 'expo-asset';
import { Avatar } from '@/classes/Avatar.model'; 

interface AvatarViewerProps {
	avatar: Avatar;
}

const AvatarViewer: React.FC<AvatarViewerProps> = ({ avatar }) => {
	const cubeRef = useRef<THREE.Mesh | THREE.Group>();
	const cameraRef = useRef<THREE.PerspectiveCamera>();
	const sceneRef = useRef<THREE.Scene>();
	const rendererRef = useRef<Renderer>();
	const rotation = useRef({ x: 0, y: 0 });
	const pivotRef = useRef<THREE.Group>();
	const zoom = useRef(1.5);
	const [loading, setLoading] = React.useState(true);

	const handlePanResponderMove = (
		event: GestureResponderEvent,
		gestureState: PanResponderGestureState
	) => {
		if (event.nativeEvent.touches.length === 1) {
			const { dx, dy } = gestureState;
			rotation.current.x -= dy * 0.0005;
			rotation.current.y += dx * 0.0005;
		}
	};

	const handlePinchZoom = (scale: number) => {
		zoom.current = Math.max(1, Math.min(1.5, zoom.current / scale));
	};

	const panResponder = PanResponder.create({
		onMoveShouldSetPanResponder: () => true,
		onPanResponderMove: handlePanResponderMove,
		onPanResponderRelease: () => {},
	});

	useEffect(() => {

		return () => {
			cubeRef.current = undefined;
			cameraRef.current = undefined;
			sceneRef.current = undefined;
			rendererRef.current = undefined;
			pivotRef.current = undefined;
		};
	}, []);

	const initScene = async (gl: ExpoWebGLRenderingContext) => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
		camera.position.z = zoom.current;
		const light = new THREE.DirectionalLight(0xffffff, 3);
		light.position.set(0, 0, 3);
		light.castShadow = false;
		scene.add(light);
		const pivot = new THREE.Group();
		pivot.position.set(0, 0, 0);
		scene.add(pivot);
		pivotRef.current = pivot;

		const renderer = new Renderer({ gl });
		renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
		console.log('initing scene')
		const gltfLoader = new GLTFLoader();
		console.log('gltf loader loaded');
		const modelAsset = Asset.fromModule(require('@/assets/models/female/femalea.glb')); // Replace with the correct path to your local .glb file
		const textureAsset = Asset.fromModule(require('@/assets/models/female/texture_0.png')); // Replace with the correct path to your texture file
		await Promise.all([modelAsset.downloadAsync(), textureAsset.downloadAsync()]);
		console.log('assets downloaded');

		const textureLoader = new TextureLoader();
		const texture = await new Promise<THREE.Texture>((resolve, reject) => {
			textureLoader.load(
				textureAsset.localUri || '',
				(resolve),
				undefined,
				(error) => reject(error)
			);
		});
		texture.flipY = false;
		console.log('texture loaded');

		gltfLoader.load(
			modelAsset.localUri || '', // Use the local URI of the downloaded asset
			(gltf) => {
				console.log('model loaded');
				const model = gltf.scene;

				model.traverse((child) => {
					if ((child as THREE.Mesh).isMesh) {
						(child as THREE.Mesh).material = new THREE.MeshStandardMaterial({map: texture});
						(child as THREE.Mesh).material.needsUpdate = true;
						(child as THREE.Mesh).castShadow = true;
					}
				});

				model.position.set(0, -1, 0);
				pivot.add(model);
				cubeRef.current = model;
				setLoading(false)
			},
			undefined,
			(error) => {
				console.error('An error occurred while loading the model:', error);
			}
		);

		const cube = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshNormalMaterial();
		const mesh = new THREE.Mesh(cube, material);
		mesh.position.set(0, -1, 0);

		cameraRef.current = camera;
		sceneRef.current = scene;
		rendererRef.current = renderer;

		const animate = () => {
			requestAnimationFrame(animate);

			if (pivotRef.current) {
				pivotRef.current.rotation.x = rotation.current.x;
				pivotRef.current.rotation.y = rotation.current.y;
			}

			if (cameraRef.current) {
				cameraRef.current.position.z = zoom.current;
			}
			renderer.render(scene, camera);
			gl.endFrameEXP();
		};

		animate();
	};

	return (
		<>{loading && 
			<View style={styles.loading}>
				<>
					<ActivityIndicator size="large" color="#1abc9c" />
					<Text>Loading...</Text>
				</>
			</View>
		}
			<View style={{ flex: 1 }} {...panResponder.panHandlers}>
				<GLView
					style={{ flex: 1 }}
					onContextCreate={initScene}
					onTouchMove={(e) => {
						if (e.nativeEvent.touches.length === 2) {
							const [touch1, touch2] = e.nativeEvent.touches;
							const distance = Math.sqrt(
								Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
							);
							handlePinchZoom(distance/200);
						}
					}}
				/>
			</View>
		</>

	);
};

const styles = StyleSheet.create({
	loading: {position: 'absolute', top: '40%', left: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center'},
})

export default AvatarViewer;