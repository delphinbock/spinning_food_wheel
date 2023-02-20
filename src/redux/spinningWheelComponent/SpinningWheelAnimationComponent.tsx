/* React */
import React, { useEffect, useState } from "react";

/* Styles */
//import "./index.css";

/* Types */
type SettingsWheelComponentType = {
  dataObj: {
    segments: string[];
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

/* Spinning wheel component */
const SpinningWheelAnimationComponent = (
  propertiesWheelComponentObj: SettingsWheelComponentType
) => {
  /* Defined parameters */
  let currentSegment = "";
  let isStarted = false;
  let timerHandle: any = 0;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext: any = null;
  let spinStart = 0;
  let frames = 0;
  let maxSpeed = Math.PI / propertiesWheelComponentObj.dataObj.segments.length;
  const upTime =
    propertiesWheelComponentObj.dataObj.segments.length *
    propertiesWheelComponentObj.dataObj.upDuration;
  const downTime =
    propertiesWheelComponentObj.dataObj.segments.length *
    propertiesWheelComponentObj.dataObj.downDuration;
  const timerDelay = propertiesWheelComponentObj.dataObj.segments.length;
  const centerX = 300;
  const centerY = 300;

  /* Finish action state */
  const [isFinished, setFinished] = useState(false);

  /* Side effects */
  useEffect(() => {
    /* DOM elements */
    let rootNode = document.getElementById("RootNode");
    let rootNodeRes = document.getElementById("RootNodeRes");

    console.log(rootNode);
    console.log(rootNodeRes);

    if (rootNode !== null) {
      rootNode.onclick = () => {
        spin();
      };
    }

    if (rootNodeRes !== null) {
      rootNodeRes.onclick = () => {
        spin();
      };
    }

    /* Initialization */
    wheelInit();
  });

  /*  Settings */
  const wheelInit = () => {
    /* Initialize canvas element area */
    initCanvas();

    /* Draw the wheel */
    wheelDraw();
  };

  /* Canvas */
  const initCanvas = () => {
    /* Canvas DOM element */
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;

    /* Check the browser version */
    if (navigator.userAgent.indexOf("MSIE") !== -1) {
      /* Canvas element creation */
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", propertiesWheelComponentObj.dataObj.width);
      canvas.setAttribute("height", propertiesWheelComponentObj.dataObj.height);
      canvas.setAttribute("id", "canvas");

      /* Wheel DOM element */
      let wheelElement = document.getElementById("wheel");

      /* Append canvas element */
      if (wheelElement) {
        wheelElement.appendChild(canvas);
      }
    }

    if (canvas) {
      canvasContext = canvas.getContext("2d");
    }
  };

  /* Run to spin the wheel */
  const spin = () => {
    isStarted = true;

    if (timerHandle === 0) {
      /* Get time now */
      spinStart = new Date().getTime();

      /* Maximum speed */
      maxSpeed = Math.PI / propertiesWheelComponentObj.dataObj.segments.length;

      /* Animation frames number */
      frames = 0;

      /*  */
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  /* Timer */
  const onTimerTick = () => {
    /* Settings */
    frames++;

    /* Draw the wheel */
    wheelDraw();

    /* Duration */
    const duration = new Date().getTime() - spinStart;

    /* Parameters */
    let progress = 0;
    let finished = false;

    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (propertiesWheelComponentObj.dataObj.winningSegment) {
        if (
          currentSegment ===
            propertiesWheelComponentObj.dataObj.winningSegment &&
          frames > propertiesWheelComponentObj.dataObj.segments.length
        ) {
          progress = duration / upTime;

          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);

          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;

        if (progress >= 0.8) {
          angleDelta =
            (maxSpeed / 1.2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else if (progress >= 0.98) {
          angleDelta =
            (maxSpeed / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;

    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;

    if (finished) {
      //setFinished(true);

      propertiesWheelComponentObj.dataObj.onFinished(currentSegment);

      clearInterval(timerHandle);

      timerHandle = 0;

      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    /* Reinitialize */
    clear();

    /* Draw the wheel */
    drawWheel();

    /* Draw the needle */
    drawNeedle();
  };

  const drawSegment = (key: any, lastAngle: any, angle: any) => {
    const ctx = canvasContext;
    const value = propertiesWheelComponentObj.dataObj.segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      propertiesWheelComponentObj.dataObj.size,
      lastAngle,
      angle,
      false
    );
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = propertiesWheelComponentObj.dataObj.segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle =
      propertiesWheelComponentObj.dataObj.contrastColor || "white";
    ctx.font = "bold 1em " + propertiesWheelComponentObj.dataObj.fontFamily;
    ctx.fillText(
      value.substring(0, 21),
      propertiesWheelComponentObj.dataObj.size / 2 + 20,
      0
    );
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = propertiesWheelComponentObj.dataObj.segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle =
      propertiesWheelComponentObj.dataObj.primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + propertiesWheelComponentObj.dataObj.fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    /* Draw a center circle */
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = propertiesWheelComponentObj.dataObj.primaryColor;
    ctx.lineWidth = 5;
    ctx.strokeStyle = propertiesWheelComponentObj.dataObj.contrastColor;
    ctx.fill();
    ctx.font = "bold 2em " + propertiesWheelComponentObj.dataObj.fontFamily;
    ctx.fillStyle = propertiesWheelComponentObj.dataObj.contrastColor;
    ctx.textAlign = "center";
    ctx.fillText(
      propertiesWheelComponentObj.dataObj.buttonText,
      centerX,
      centerY + 3
    );
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      propertiesWheelComponentObj.dataObj.size,
      0,
      PI2,
      false
    );
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = propertiesWheelComponentObj.dataObj.primaryColoraround;
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = propertiesWheelComponentObj.dataObj.contrastColor;
    ctx.fileStyle = propertiesWheelComponentObj.dataObj.contrastColor;
    ctx.beginPath();
    ctx.moveTo(centerX + 10, centerY - 40);
    ctx.lineTo(centerX - 10, centerY - 40);
    ctx.lineTo(centerX, centerY - 60);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      propertiesWheelComponentObj.dataObj.segments.length -
      Math.floor(
        (change / (Math.PI * 2)) *
          propertiesWheelComponentObj.dataObj.segments.length
      ) -
      1;
    if (i < 0) i = i + propertiesWheelComponentObj.dataObj.segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "transparent";
    ctx.font = "bold 1.5em " + propertiesWheelComponentObj.dataObj.fontFamily;
    currentSegment = propertiesWheelComponentObj.dataObj.segments[i];
    isStarted &&
      ctx.fillText(
        currentSegment,
        centerX + 10,
        centerY + propertiesWheelComponentObj.dataObj.size + 50
      );
  };

  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };

  return (
    <>
      <div id="wheel">
        <canvas
          onClick={() => spin()}
          id="canvas"
          width="600"
          height="600"
          style={{
            pointerEvents:
              isFinished && propertiesWheelComponentObj.dataObj.isOnlyOnce
                ? "none"
                : "auto",
          }}
        />
      </div>
    </>
  );
};

export default SpinningWheelAnimationComponent;
