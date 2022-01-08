import React from "react";
import { 
    ArcRotateCamera, 
    Vector3, 
    Color3, 
    HemisphericLight, 
    MeshBuilder, 
    StandardMaterial, 
    Animation, 
    Matrix } from "@babylonjs/core";
import SceneComponent from 'babylonjs-hook';

import './App.css';

const onSceneReady = (scene) => {
    
    // Canvas 
    const canvas = scene.getEngine().getRenderingCanvas();

    // Camera
    const camera = new ArcRotateCamera('camera', Math.PI / 4, Math.PI / 3, 40, new Vector3(20, 15, 20), scene);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 100;
    camera.lowerBetaLimit = Math.PI / 6;
    camera.upperBetaLimit = Math.PI / 2;
    camera.attachControl(canvas, true);

    // Light
    const light = new HemisphericLight('light', new Vector3(0, 100, 0), scene);

    // Ground
    const ground = MeshBuilder.CreateGround('ground', { width: 30, height: 30 }, scene);
    ground.material = new StandardMaterial('groundMaterial', scene);
    ground.material.diffuseColor = new Color3(0, 0, 0);

    // rightFoot
    const rightFoot = new MeshBuilder.CreateBox('rightFoot', { width: 1, height: 1, depth: 3 }, scene);
    rightFoot.position = new Vector3(2, 0.5, 0);

    // rightShin
    const rightShin = new MeshBuilder.CreateBox('rightShin', { width: 1, height: 3, depth: 1 }, scene);
    rightShin.parent = rightFoot;
    rightShin.position = new Vector3(0, 1.5, -1);

    // rightKnee
    const rightKnee = new MeshBuilder.CreateCylinder('rightKnee', { height: 1, diameter: 1 }, scene);
    rightKnee.parent = rightShin;
    rightKnee.position.y = 2;
    rightKnee.rotation.z = Math.PI / 2;

    // rightHip
    const rightHip = new MeshBuilder.CreateBox('rightHip', { width: 1, height: 3, depth: 1 }, scene);
    rightHip.parent = rightKnee;
    rightHip.rotation.z = Math.PI / 2;
    rightHip.position.x = 2;
    
    // pelvis
    const pelvis = new MeshBuilder.CreateCylinder('pelvis', { height: 5, diameter: 1 }, scene);
    pelvis.parent = rightHip;
    pelvis.rotation.z = Math.PI / 2;
    pelvis.position = new Vector3(2, -2, 0);

    // leftHip
    const leftHip = new MeshBuilder.CreateBox('leftHip', { width: 1, height: 3, depth: 1 }, scene);
    leftHip.parent = pelvis;
    leftHip.rotation.z = Math.PI / 2;
    leftHip.position = new Vector3(2, -2, 0);
    
    // leftKnee
    const leftKnee = new MeshBuilder.CreateCylinder('leftKnee', { height: 1, diameter: 1 }, scene);
    leftKnee.parent = leftHip;
    leftKnee.position.y = -2;
    leftKnee.rotation.z = Math.PI / 2;

    // leftShin
    const leftShin = new MeshBuilder.CreateBox('leftShin', { width: 1, height: 3, depth: 1 }, scene);
    leftShin.parent = leftKnee;
    leftShin.rotation.z = Math.PI / 2;
    leftShin.position.x = -2;

    // leftFoot
    const leftFoot = new MeshBuilder.CreateBox('leftFoot', { width: 1, height: 1, depth: 3 }, scene);
    leftFoot.position = new Vector3(-2, 0.5, 0);

    // spine
    const spine = new MeshBuilder.CreateBox('spine', { width: 1, height: 8, depth: 1 }, scene);
    spine.parent = pelvis;
    spine.rotation.z = Math.PI / 2;
    spine.position.x = -4.5;

    // chest
    const chest = new MeshBuilder.CreateCylinder('chest', { diameter: 1, height: 5 }, scene);
    chest.parent = spine;
    chest.rotation.z = Math.PI / 2;
    chest.position.y = 4.5;

    // rightHand
    const rightHand = new MeshBuilder.CreateBox('rightHand', { width: 1, height: 6, depth: 1 }, scene);
    rightHand.parent = chest;
    rightHand.rotation.z = Math.PI / 2;
    // rightHand.position = new Vector3(-2.5, -3, 0);
    rightHand.position = new Vector3(0, 0, 0);
    rightHand.setPivotMatrix(Matrix.Translation(0, 2.5, 0));

    // leftHand
    const leftHand = new MeshBuilder.CreateBox('leftHand', { width: 1, height: 6, depth: 1 }, scene);
    leftHand.parent = chest;
    leftHand.rotation.z = Math.PI / 2;
    leftHand.position = new Vector3(2.5, 3.5, 0);
    leftHand.setPivotMatrix(Matrix.Translation(2.5, 3, 0));

    // head
    const head = new MeshBuilder.CreateSphere('head', { diameter: 3 }, scene);
    head.parent = chest;
    head.position.x = 2;

    const animationHand = new Animation('animationHand', 'rotation.y', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
    animationHand.setKeys([
        {
            frame: 0,
            value: 0
        },
        {
            frame: 50,
            value: Math.PI / 2
        },
        {
            frame: 100,
            value: Math.PI / 2
        },
        {
            frame: 150,
            value: 0
        }
    ]);


    rightHand.animations.push(animationHand);
    leftHand.animations.push(animationHand);

    scene.beginAnimation(rightHand, 0, 150, true);
    scene.beginAnimation(leftHand, 0, 150, true);

}

const App = () => {
    return (
        <SceneComponent onSceneReady={onSceneReady} id="my-canvas" />   
    )
}

export default App;