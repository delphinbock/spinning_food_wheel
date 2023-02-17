/* React */
import { useEffect, useState, useRef } from "react";

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
  settingsWheelComponentObj: SettingsWheelComponentType
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

  console.log("test", settingsWheelComponentObj);

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

    /* Scrolling after a timeout */
    // setTimeout(() => {
    //   window.scrollTo(0, 1);
    // }, 0);
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
      canvas.setAttribute("width", settingsWheelComponentObj.dataObj.width);
      canvas.setAttribute("height", settingsWheelComponentObj.dataObj.height);
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

  const spin = () => {
    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / settingsWheelComponentObj.dataObj.segments.length;
      frames = 0;
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
      if (settingsWheelComponentObj.dataObj.winningSegment) {
        if (
          currentSegment === settingsWheelComponentObj.dataObj.winningSegment &&
          frames > settingsWheelComponentObj.dataObj.segments.length
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
      setFinished(true);

      settingsWheelComponentObj.dataObj.onFinished(currentSegment);

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
    const value = settingsWheelComponentObj.dataObj.segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      settingsWheelComponentObj.dataObj.size,
      lastAngle,
      angle,
      false
    );
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = settingsWheelComponentObj.dataObj.segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = settingsWheelComponentObj.dataObj.contrastColor || "white";
    ctx.font = "bold 1em " + settingsWheelComponentObj.dataObj.fontFamily;
    ctx.fillText(
      value.substr(0, 21),
      settingsWheelComponentObj.dataObj.size / 2 + 20,
      0
    );
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = settingsWheelComponentObj.dataObj.segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = settingsWheelComponentObj.dataObj.primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + settingsWheelComponentObj.dataObj.fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    /* Draw a center circle */
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = settingsWheelComponentObj.dataObj.primaryColor || "black";
    ctx.lineWidth = 5;
    ctx.strokeStyle =
      settingsWheelComponentObj.dataObj.contrastColor || "white";
    ctx.fill();
    ctx.font = "bold 2em " + settingsWheelComponentObj.dataObj.fontFamily;
    ctx.fillStyle = settingsWheelComponentObj.dataObj.contrastColor || "white";
    ctx.textAlign = "center";
    ctx.fillText(
      settingsWheelComponentObj.dataObj.buttonText || "Spin",
      centerX,
      centerY + 3
    );
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      settingsWheelComponentObj.dataObj.size,
      0,
      PI2,
      false
    );
    ctx.closePath();
    ctx.lineWidth = 25;
    ctx.strokeStyle =
      settingsWheelComponentObj.dataObj.primaryColoraround || "white";
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle =
      settingsWheelComponentObj.dataObj.contrastColor || "white";
    ctx.fileStyle = settingsWheelComponentObj.dataObj.contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + 10, centerY - 40);
    ctx.lineTo(centerX - 10, centerY - 40);
    ctx.lineTo(centerX, centerY - 60);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      settingsWheelComponentObj.dataObj.segments.length -
      Math.floor(
        (change / (Math.PI * 2)) *
          settingsWheelComponentObj.dataObj.segments.length
      ) -
      1;
    if (i < 0) i = i + settingsWheelComponentObj.dataObj.segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "transparent";
    ctx.font = "bold 1.5em " + settingsWheelComponentObj.dataObj.fontFamily;
    currentSegment = settingsWheelComponentObj.dataObj.segments[i];
    isStarted &&
      ctx.fillText(
        currentSegment,
        centerX + 10,
        centerY + settingsWheelComponentObj.dataObj.size + 50
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
              isFinished && settingsWheelComponentObj.dataObj.isOnlyOnce
                ? "none"
                : "auto",
          }}
        />
      </div>
    </>
  );
};

export default SpinningWheelAnimationComponent;
