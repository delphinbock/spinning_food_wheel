/* React */
//import React from "react";

/* Canvas component */
import Canvas from "./canvas_main_component";

/* Types */
type SettingsWheelComponentType = {
  dataObj: {
    segments: any;
    segColors: any;
    winningSegment: any;
    onFinished: any;
    onRotate: any;
    onRotatefinish: any;
    primaryColor: string;
    primaryColoraround: any;
    contrastColor: any;
    buttonText: any;
    isOnlyOnce: any;
    size: any;
    upDuration: any;
    downDuration: any;
    fontFamily: any;
    width: any;
    height: any;
  };
};

const CanvasWheelComponent = () => {
  /* Parameters */
  const segments = [
    "Grüne",
    "Les italiens du coin",
    "Royal kebab",
    "Onolulu",
    "Yam Yam",
  ];
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#FF9000"];

  /* Console message on finish */
  const onFinished = (winner: any) => {
    console.log(winner);
  };

  /* Data object */
  let settingsWheelComponentObj = {
    dataObj: {
      segments: segments,
      segColors: segColors,
      winningSegment: "",
      onFinished: (winner: any) => onFinished(winner),
      onRotate: null,
      onRotatefinish: null,
      primaryColor: "black",
      primaryColoraround: "#ffffffb4",
      contrastColor: "white",
      buttonText: "Spin",
      isOnlyOnce: false,
      size: 190,
      upDuration: 50,
      downDuration: 2000,
      fontFamily: "proxima-nova",
      width: 100,
      height: 100,
    },
  };

  /* Defined parameters */
  let currentSegment = "";
  let isStarted = false;
  let timerHandle: any = 0;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext: any = null;
  let spinStart = 0;
  let frames = 0;
  let maxSpeed = Math.PI / settingsWheelComponentObj.dataObj.segments.length;
  const upTime =
    settingsWheelComponentObj.dataObj.segments.length *
    settingsWheelComponentObj.dataObj.upDuration;
  const downTime =
    settingsWheelComponentObj.dataObj.segments.length *
    settingsWheelComponentObj.dataObj.downDuration;
  const timerDelay = settingsWheelComponentObj.dataObj.segments.length;
  const centerX = 300;
  const centerY = 300;

  /* Draw */
  const draw = (ctx: any, frameCount: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  return <Canvas draw={draw} />;
};

export default CanvasWheelComponent;
