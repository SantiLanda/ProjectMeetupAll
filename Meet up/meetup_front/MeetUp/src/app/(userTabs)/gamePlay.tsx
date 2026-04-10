import { EngineView, useEngine } from '@babylonjs/react-native';
import { MeshBuilder, Vector3, ArcRotateCamera, HemisphericLight, Mesh, Scene } from '@babylonjs/core';
import { useEffect, useRef } from 'react';
import { AxisPad, AxisPadTouchEvent } from '@fustaro/react-native-axis-pad';
import { Image, StyleSheet, View } from 'react-native';
import '@babylonjs/loaders/OBJ'
import '@babylonjs/loaders/glTF'

function GamePlay() {
    const engine = useEngine();
    const cameraRef = useRef<ArcRotateCamera | null>(null);
    const avatarRef = useRef<Mesh | null>(null);
    const sceneRef = useRef<Scene | null>(null);

    useEffect(() => {
        if (!engine) return;

        const scene = new Scene(engine);
        sceneRef.current = scene;
        const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.5, 10, new Vector3(0, 1, 0), scene);
        camera.attachControl(true);
        cameraRef.current = camera;

        const cube = MeshBuilder.CreateBox('mesi', {}, scene)

        new HemisphericLight('light', new Vector3(0, 1, 0), scene);

        engine.runRenderLoop(() => {
            scene.render();
        });

        return () => {
            scene.dispose();
        };
    }, [engine]);


    
    function moveRightPad(event: AxisPadTouchEvent) {
        if (event.eventType == 'pan') {
            console.log('pan-right')
        }
    }

    function moveLeftPad(event: AxisPadTouchEvent) {
        if (event.eventType == 'pan') {
            console.log('pan-left')
        }
    }

    return (
        <>
            <EngineView/>
        </>
    )
}

export default GamePlay

const styles = StyleSheet.create({
  axis:
    {
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
})