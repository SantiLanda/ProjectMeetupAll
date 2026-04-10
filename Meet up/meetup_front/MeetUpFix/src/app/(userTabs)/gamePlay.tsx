import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useEngine, EngineView } from '@babylonjs/react-native';
import {
  ArcRotateCamera,
  Camera,
  Scene,
  SceneLoader,
  Color4,
  AnimationGroup,
  Nullable,
  HemisphericLight,
  Vector3,
  AbstractMesh,
	MeshBuilder,
	StandardMaterial,
	Color3,
	Mesh,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import { ActivityIndicator } from 'react-native-paper';
import { AxisPad, AxisPadTouchEvent } from '@fustaro/react-native-axis-pad';

function App(): React.JSX.Element {
  const cityGLBURL =
    'https://raw.githubusercontent.com/SantiLanda/MeetupAsset/refs/heads/main/cityExport.glb';

	const femaleURL =
    'https://raw.githubusercontent.com/SantiLanda/MeetupAsset/refs/heads/main/animFem.glb';

  const engine = useEngine();
  const [scene, setScene] = useState<Scene>();
  const [cam, setCamera] = useState<Camera>();
  const [loading, setLoading] = useState(true)
  
	// Character controls
  const charRef = useRef<AbstractMesh | null>(null);
	const currentAnim = useRef<Nullable<AnimationGroup>>(null);
  const walkAnim = useRef<Nullable<AnimationGroup>>(null);
  const idleAnim = useRef<Nullable<AnimationGroup>>(null);
	const cubeMoving = useRef(false);
	const cubeMovement = useRef({x: 0, y: 0});
	const cubeMovementSpeed = useRef(0);

	// Camera controls
	const cameraRotating = useRef(false);
	const cameraDelta = useRef({x: 0, y: 0});
	const cameraRotationSpeed = useRef(0);
	

  useEffect(() => {
    if (engine) {
      renderCityGLB();
    }
  }, [engine]);

	function leftAxis(event: AxisPadTouchEvent) {
		if (!charRef.current || !(charRef.current instanceof AbstractMesh)) {
			return
		}
		if (event.eventType == 'end') {
			cubeMoving.current = false;
			cubeMovementSpeed.current = 0
			if (walkAnim.current && walkAnim.current.isStarted) {
				walkAnim.current.stop()
				walkAnim.current.reset()
			}
		}
		if (event.eventType == 'start') {
			cubeMoving.current = true;
			cubeMovementSpeed.current = 0;
			if (walkAnim.current && !walkAnim.current.isStarted) {
				walkAnim.current.enableBlending = true
				walkAnim.current.blendingSpeed = 0.1
				walkAnim.current.start(true, undefined, walkAnim.current.from, walkAnim.current.to, true)
			}
		}
		if (event.eventType == 'pan') {
			cubeMovement.current = {x: event.ratio.x, y: event.ratio.y}
			const direction = new Vector3(event.ratio.x, 0, -event.ratio.y);
			const angle = Math.atan2(direction.x, direction.z);
			charRef.current.rotation.y = -angle;
			cubeMovementSpeed.current = Math.sqrt(Math.pow(event.ratio.x, 2) + Math.pow(event.ratio.y, 2)) * 0.2
		}
	}

	function rightAxis(event: AxisPadTouchEvent) {
		if (!cam || !(cam instanceof ArcRotateCamera)) {
			return
		}
		if (event.eventType == 'end') {
			cameraRotating.current = false;
			cameraRotationSpeed.current = 0
		}
		if (event.eventType == 'start') {
			cameraRotating.current = true;
			cameraRotationSpeed.current = 0;
		}
		if (event.eventType == 'pan') {
			cameraDelta.current = {x: event.ratio.x, y: event.ratio.y}
			cameraRotationSpeed.current = Math.sqrt(Math.pow(event.ratio.x, 2) + Math.pow(event.ratio.y, 2)) * 0.1
		}
	}

  const renderCityGLB = () => {
    SceneLoader.LoadAsync(cityGLBURL, undefined, engine)
      .then((loadedScene: Scene) => {
        if (loadedScene) {
          setScene(loadedScene);
					console.log('scene on');

          // logMeshesAndAnimationNames(loadedScene.meshes, loadedScene.animationGroups);

					// Light
					const light = new HemisphericLight(
						'light',
						new Vector3(0, 1, 0),
						loadedScene,
					);
					light.intensity = 0.7;

					// logMeshesAndAnimationNames(loadedScene.meshes, loadedScene.animationGroups);
					createRedCube(loadedScene);
					// Camera
					const camera = new ArcRotateCamera(
						'camera',
						-Math.PI/2,
						Math.PI/2 + 0.2,
						-6,
						charRef.current!.position,
						loadedScene,
						true,
					);
					camera.upperBetaLimit = Math.PI;
					camera.lowerBetaLimit = Math.PI/2 + 0.2;

					loadedScene.activeCamera = camera;

					loadedScene.onBeforeRenderObservable.add(() => {
						if (camera && cameraRotating.current) {
							const { x, y } = cameraDelta.current;

							camera.alpha += x * cameraRotationSpeed.current;
							camera.beta -= y * cameraRotationSpeed.current;

							// Clamp beta para evitar que pase debajo del objeto
							camera.beta = Math.min(
								camera.upperBetaLimit ?? Math.PI / 2,
								Math.max(camera.lowerBetaLimit ?? 0.1, camera.beta)
							);
						}

						if (charRef.current && cubeMoving.current) {
							const moveDirection = new Vector3(cubeMovement.current.x, 0, cubeMovement.current.y)
							charRef.current.position.addInPlace(moveDirection.scale(cubeMovementSpeed.current))

							if (camera) {
								const movementAngle = Math.atan2(moveDirection.z, moveDirection.x);
								camera.target = charRef.current.position.clone()
								if (!cameraRotating.current) {
									const diff =  movementAngle - camera.alpha;
									if (Math.abs(diff) > 0.001) {
										camera.alpha += diff * 0.04
									}
								}
							}
						}
					});

					setCamera(camera);
					setLoading(false)
        } else {
          console.error('Error loading loadScene.');
        }
      })
      .catch(error => {
        console.error('Error loading scene: ', error);
      });
  };

	function createRedCube(scene: Scene) {
		const box = MeshBuilder.CreateBox('redBox', { size: 0.5 }, scene);
		box.position = new Vector3(2, -60, 2);

		const redMaterial = new StandardMaterial('redMat', scene);
		redMaterial.diffuseColor = new Color3(1, 0, 0);
		box.material = redMaterial;
		charRef.current = box;
		console.log('loading char')
		SceneLoader.ImportMeshAsync('', femaleURL, '', scene).then((loadedMesh) => {
			console.log('loaded')
			const root = loadedMesh.meshes[0]
			if (!root) {
				return
			}
			if (root.rotationQuaternion) {
				console.log('rotation')
				root.rotationQuaternion = null;
			}
			root.position = box.position;
			walkAnim.current = loadedMesh.animationGroups.find(a => a.name.includes("walking")) ?? null
			if (walkAnim.current) {
				walkAnim.current.stop()
			}

			charRef.current = root;
			charRef.current.rotation.y = 0
			box.dispose()
		} )
	}

  const renderJoystickUI = () => {
    return (
      <View style={styles.absoluteView}>
        <AxisPad id={'left-axis'} size={100} onTouchEvent={leftAxis}/>
				<AxisPad id={'right-axis'} size={100} onTouchEvent={rightAxis}/>
      </View>
    );
  };

  const startWalkAnimation = () => {
    if (scene) {
      const walkAnimation = scene.getAnimationGroupByName('Walk');
      if (walkAnimation) {
        if (currentAnim.current) {
          currentAnim.current.stop();
        }
        walkAnimation.play(true);
        currentAnim.current = walkAnimation;
      } else {
        console.warn('Animation not found:', walkAnimation);
      }
    }
  };

  const stopWalkAnimation = () => {
    if (scene) {
      const idleAnimation = scene.getAnimationGroupByName('Idle');
      if (idleAnimation) {
        if (currentAnim.current) {
          currentAnim.current.stop();
        }
        idleAnimation.play(true);
        currentAnim.current = idleAnimation;
      } else {
        console.warn('Animation not found:', idleAnimation);
      }
    }
  };


  // Utility functions
  const logMeshesAndAnimationNames = (
    meshes: AbstractMesh[],
    animationGroups: AnimationGroup[],
  ) => {
    console.log('-------------------MESHES--------------------');
    meshes.forEach(mesh => {
      console.log(mesh.name);
    });

    console.log('---------------ANIMATIONS--------------------');
    animationGroups.forEach(animationGroup => {
      console.log(animationGroup.name);
    });
  };

  return (
    <View style={styles.container}>
			{loading && <ActivityIndicator style={styles.activityInd}/>}
			<EngineView camera={cam} displayFrameRate={false} />
      {renderJoystickUI()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteView: {
      width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
      position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 30, paddingLeft: 50, paddingRight: 50,
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
  buttonContainer: {
    backgroundColor: '#61dafb',
    borderWidth: 1,
    padding: 4,
  },
	activityInd: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		backgroundColor: 'white',
		zIndex: 1
	}
});

export default App;