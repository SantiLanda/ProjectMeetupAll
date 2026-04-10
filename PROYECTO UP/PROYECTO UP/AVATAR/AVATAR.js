var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
};

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() {
    return new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        disableWebGL2Support: false
    });
};

// Pantalla de carga personalizada
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    if (document.getElementById("customLoadingScreenDiv")) {
        document.getElementById("customLoadingScreenDiv").style.display = "initial";
        return;
    }
    this._loadingDiv = document.createElement("div");
    this._loadingDiv.id = "customLoadingScreenDiv";
    this._loadingDiv.innerHTML = "RPM Avatar Demo - Working on Chrome Canary desktop with WebGPU flag enabled.<br>The Scene is currently loading...";
    var customLoadingScreenCss = document.createElement('style');
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv {
        background-color: #BB464Bcc;
        color: white;
        font-size:50px;
        text-align:center;
    }`;
    document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
    document.body.appendChild(this._loadingDiv);
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function () {
    document.getElementById("customLoadingScreenDiv").style.display = "none";
    console.log("Scene is now loaded");
};

const setSnapshotMode = (mode) => {
    switch (mode) {
        case "disabled":
            engine.snapshotRendering = false;
            break;
        case "standard":
            engine.snapshotRenderingMode = BABYLON.Constants.SNAPSHOTRENDERING_STANDARD;
            engine.snapshotRendering = true;
            break;
        case "fast":
            engine.snapshotRenderingMode = BABYLON.Constants.SNAPSHOTRENDERING_FAST;
            engine.snapshotRendering = true;
            break;
    }
};

var delayCreateScene = async function () {
    engine.displayLoadingUI();
    const scene = new BABYLON.Scene(engine);
    const IsWebGPUMode = engine.isWebGPU;

    scene.skipFrustumClipping = true;

    const sceneInstrumentation = new BABYLON.SceneInstrumentation(scene);
    sceneInstrumentation.captureFrameTime = true;

    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.env", scene);
    const currentSkybox = scene.createDefaultSkybox(hdrTexture, true);
    currentSkybox.isVisible = false;
    scene.environmentIntensity = 0.02;

    const spotLight1 = new BABYLON.SpotLight("spot1", new BABYLON.Vector3(-4, 6, -3), new BABYLON.Vector3(1, -1.5, 1), Math.PI / 2, 10, scene);
    spotLight1.intensity = 200;
    spotLight1.diffuse = BABYLON.Color3.FromHexString("#430404");

    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 3, 5, BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    const livingRoomScene = await BABYLON.SceneLoader.AppendAsync("https://thomlucc.github.io/Assets/RoomDemo/", "LivingRoomModel9.glb", scene);
    const floor = scene.getMeshByName("floor");
    const baseUrl = "https://thomlucc.github.io/Assets/AvatarDemo/";

    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("AnimationUI");
    var panel = new BABYLON.GUI.StackPanel();
    advancedTexture.addControl(panel);

    const buttonStart = BABYLON.GUI.Button.CreateSimpleButton("button1", "Start");
    buttonStart.width = 0.25;
    buttonStart.height = "120px";
    buttonStart.color = "white";
    buttonStart.background = "green";
    panel.addControl(buttonStart);

    const buttonStop = BABYLON.GUI.Button.CreateSimpleButton("button1", "Stop");
    buttonStop.width = 0.25;
    buttonStop.height = "120px";
    buttonStop.color = "white";
    buttonStop.background = "green";
    panel.addControl(buttonStop);

    BABYLON.SceneLoader.LoadAssetContainer(baseUrl, "RPTom.glb", scene, assets => {
        const rpmMesh = assets.meshes[0];
        assets.addAllToScene();

        const shadowGenerator1 = new BABYLON.ShadowGenerator(1024, spotLight1);
        shadowGenerator1.addShadowCaster(rpmMesh, true);

        floor.receiveShadows = true;

        const hiphop = BABYLON.SceneLoader.ImportAnimations(baseUrl, "SillyDance.glb", scene, false, BABYLON.SceneLoaderAnimationGroupLoadingMode.Clean, null, () => {
            const dancing = scene.getAnimationGroupByName("Armature|mixamo.com|Layer0");
            buttonStop.onPointerClickObservable.add(() => dancing.stop());
            buttonStart.onPointerClickObservable.add(() => dancing.start(true, 1.0, dancing.from, dancing.to, false));
        });
    });

    return new Promise((resolve) => {
        scene.executeWhenReady(() => {
            engine.snapshotRendering = false;
            resolve(scene);
            engine.hideLoadingUI();
            makeGUI(IsWebGPUMode, scene, sceneInstrumentation);
        });
    });
};

function makeGUI(IsWebGPUMode, scene, sceneInstrumentation) {
    const gui = new dat.GUI();
    gui.add({ "Snapshot Mode": "disabled" }, "Snapshot Mode", ["disabled", "standard", "fast"])
        .onChange(value => setSnapshotMode(value));

    scene.onAfterRenderObservable.add(() => {
        const frameTime = sceneInstrumentation.frameTimeCounter.lastSecAverage.toFixed(2);
        console.log(`Frame Time: ${frameTime} ms`);
    });
}

window.initFunction = async function () {
    var asyncEngineCreation = async function() {
        return createDefaultEngine();
    };

    window.engine = await asyncEngineCreation();
    startRenderLoop(engine, canvas);
    window.scene = delayCreateScene();
};

initFunction().then(() => {
    scene.then(returnedScene => {
        sceneToRender = returnedScene;
    });
});

window.addEventListener("resize", function () {
    engine.resize();
});
