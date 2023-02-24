/* React */
import React, { useEffect, useState } from "react";

/* Styles */
//import "./index.css";

/* Type */
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
  /* Default current segment*/
  let currentSegment = "";

  /* Default start action */
  let isStarted = false;

  /* Default timer */
  let timerHandle: any = 0;

  /* Default current angle's degree */
  let angleCurrent = 0;

  /* Default delta angle's degree */
  let angleDelta = 0;

  /* Default canvas context */
  let canvasContext: any = null;

  /* Default spin start action */
  let spinStart = 0;

  /* Default anmation's frame number */
  let frames = 0;

  /* Default max speed wheel animation */
  let maxSpeed = Math.PI / propertiesWheelComponentObj.dataObj.segments.length;

  /* Duration time of working animation */
  const upTime =
    propertiesWheelComponentObj.dataObj.segments.length *
    propertiesWheelComponentObj.dataObj.upDuration;

  /* Break time of animation */
  const downTime =
    propertiesWheelComponentObj.dataObj.segments.length *
    propertiesWheelComponentObj.dataObj.downDuration;

  /* Time delay */
  const timerDelay = propertiesWheelComponentObj.dataObj.segments.length;

  /* Centered position on X axle of the wheel */
  const centerX = 300;

  /* Centered position on Y axle of the wheel */
  const centerY = 300;

  /* Finish animation action state */
  const [isFinished, setFinished] = useState(false);

  /* Side effects */
  useEffect(() => {
    /* Get the "RootNode" DOM element from its ID */
    let rootNode = document.getElementById("RootNode");

    /* Get the "RootNodeRes" DOM element from its ID */
    let rootNodeRes = document.getElementById("RootNodeRes");

    /* Check if "rootNode" DOM element is existing */
    if (rootNode !== null) {
      /* Create a "onClick" funcion on "RootNode" DOM element */
      rootNode.onclick = () => {
        /* Run "spin" function */
        spin();
      };
    }

    /* Check if "rootNodeRes" DOM element is existing */
    if (rootNodeRes !== null) {
      /* Create a "onClick" funcion on "RootNode" DOM element */
      rootNodeRes.onclick = () => {
        /* Run "spin" function */
        spin();
      };
    }

    /* Run wheel's initialization function */
    wheelInit();
  });

  /*  Initialize the wheel */
  const wheelInit = () => {
    /* Initialize canvas DOM element area */
    initCanvas();

    /* Run the "draw the wheel" function */
    wheelDraw();
  };

  /* Initialize the canvas DOM element */
  const initCanvas = () => {
    /* Get the "canvas" DOM element from its ID */
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;

    /* Check the browser version - MSIE => MicroSoft Internet Explorer */
    if (navigator.userAgent.indexOf("MSIE") !== -1) {
      /* Canvas element creation */
      canvas = document.createElement("canvas");

      /* Add an attribute "width" to canvas DOM element */
      canvas.setAttribute("width", propertiesWheelComponentObj.dataObj.width);

      /* Add an attribute "height" to canvas DOM element */
      canvas.setAttribute("height", propertiesWheelComponentObj.dataObj.height);

      /* Add an attribute "id" to canvas DOM element */
      canvas.setAttribute("id", "canvas");

      /* Get "wheel" DOM element from its ID */
      let wheelElement = document.getElementById("wheel");

      /* Append canvas element */
      if (wheelElement) {
        wheelElement.appendChild(canvas);
      }
    }

    /* Check if canvas DOM element is existing */
    if (canvas) {
      /* Set the type of canvas context */
      canvasContext = canvas.getContext("2d");
    }
  };

  /* Run to spin the wheel */
  const spin = () => {
    isStarted = true;

    /* Check if the delay of timer */
    if (timerHandle === 0) {
      /* Get time now */
      spinStart = new Date().getTime();

      /* Maximum speed */
      maxSpeed = Math.PI / propertiesWheelComponentObj.dataObj.segments.length;

      /* Animation frames number */
      frames = 0;

      /* Delay of timer */
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  /* Run after the delay of timer */
  const onTimerTick = () => {
    /* Increase by one the frame animation's number */
    frames++;

    /* Run "draw the wheel" function */
    wheelDraw();

    /* Duration of the animation - Time between the "time now" and the "start spin time" */
    const duration = new Date().getTime() - spinStart;

    /* Default animation's progress parameter */
    let progress = 0;

    /* Default animation's finished parameter */
    let finished = false;

    /* Check if the animation is ready */
    if (duration < upTime) {
      /* Set the animation's progress time */
      progress = duration / upTime;

      /* Set the delta angle's degree */
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      /* Check if the winning segment is existing */
      if (propertiesWheelComponentObj.dataObj.winningSegment) {
        /* Check if the current segment is existing & if the wheel's animation is ready */
        if (
          currentSegment ===
            propertiesWheelComponentObj.dataObj.winningSegment &&
          frames > propertiesWheelComponentObj.dataObj.segments.length
        ) {
          /* Animation's progress time */
          progress = duration / upTime;

          /* Delta angle's degree */
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);

          /* Animation's progress time */
          progress = 1;
        } else {
          /* Animation's progress time */
          progress = duration / downTime;

          /* Delta angle's degree */
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        /* Animation's progress time */
        progress = duration / downTime;

        /* Check if the animation's progress time is running at 0.8 seconde */
        if (progress >= 0.8) {
          /* Delta angle's degree */
          angleDelta =
            (maxSpeed / 1.2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);

          /* Check if the animation's progress time is running at 0.98 seconde */
        } else if (progress >= 0.98) {
          angleDelta =
            (maxSpeed / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else
        /* Delta angle's degree */
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }

      /* Check if the animation's progress is over */
      if (progress >= 1) finished = true;
    }

    /* Addition of current angle's degree & delta angle's degree */
    angleCurrent += angleDelta;

    /* While the current angle (x°) have rotated a full circle (360°) => substraction of current angle (x°) & full circle (360°) */
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;

    /* Check if the animation is finished */
    if (finished) {
      /* Reinitialize the wheel's animation */
      //setFinished(true);

      /* Reinitialize the segments */
      propertiesWheelComponentObj.dataObj.onFinished(currentSegment);

      /* Reset the interval time */
      clearInterval(timerHandle);

      /* Reinitialize the timer */
      timerHandle = 0;

      /* Reinitialize the angle's degree */
      angleDelta = 0;
    }
  };

  /* Draw the wheel */
  const wheelDraw = () => {
    /* Run the "reinitialize the wheel" function */
    clear();

    /* Run the "draw the wheel" function */
    drawWheel();

    /* Run the "draw the needle" function */
    drawNeedle();
  };

  /* Draw & name each segment */
  const drawSegment = (key: any, lastAngle: any, angle: any) => {
    /* Set the canvas context */
    const ctx = canvasContext;

    /* Names - name for each segment */
    const value = `${propertiesWheelComponentObj.dataObj.segments[
      key
    ].substring(0, 20)}`;

    /* Circle - create a new path to initialize a new draw */
    ctx.beginPath();

    /* Segments - move the element from position x to position y */
    ctx.moveTo(centerX, centerY);

    /* Circle - Draw an arc - here draw a circle */
    ctx.arc(
      centerX,
      centerY,
      propertiesWheelComponentObj.dataObj.size,
      lastAngle,
      angle,
      false
    );

    /* Circle - draw a line from position x to position y */
    ctx.lineTo(centerX, centerY);

    /* Circle - draw a line back to the starting point */
    ctx.closePath();

    /* Segments - color style for each segment */
    ctx.fillStyle = propertiesWheelComponentObj.dataObj.segColors[key];

    /* Segments - colorize the segments */
    ctx.fill();

    /* Context - save the current context */
    ctx.save();

    /* Segments - center the segments names */
    ctx.translate(centerX, centerY);

    /* Names - rotate the segments names  */
    ctx.rotate((lastAngle + angle) / 2);

    /* Segments - stroke still for each segment's text */
    //ctx.strokeStyle = "red";

    /* Segments - stroke action */
    //ctx.stroke();

    /*  */
    //ctx.fillStyle = propertiesWheelComponentObj.dataObj.contrastColor;

    /* Radius - thickness in px */
    ctx.lineWidth = 2;

    /* Radius - color style */
    ctx.strokeStyle = "white";

    /* Radius - stroke action */
    ctx.stroke();

    /* Names - font's styles */
    ctx.font = `bold 1em ${propertiesWheelComponentObj.dataObj.fontFamily}`;

    /* Names - color style */
    ctx.fillStyle = "white";

    /* Names - stroke style */
    ctx.strokeStyle = "gray";

    /* Names - stroke thickness in px */
    ctx.lineWidth = 0.2;

    /* Names - colorize and position the segments names */
    ctx.fillText(value, propertiesWheelComponentObj.dataObj.size / 2 + 20, 0);

    /* Names - stroke the segments names */
    ctx.strokeText(value, propertiesWheelComponentObj.dataObj.size / 2 + 20, 0);

    /* Restores the most recently saved canvas state */
    ctx.restore();
  };

  /* Draw the wheel */
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

    /* Center circle - create a new path to initialize a new draw */
    ctx.beginPath();

    /* Center circle - Draw an arc - here draw a circle */
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

    /* Outer circle - create a new path to initialize a new draw */
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

    /* Outer circle - thickness in px */
    ctx.lineWidth = 5;

    /* Outer circle - color style */
    ctx.strokeStyle = propertiesWheelComponentObj.dataObj.primaryColoraround;

    /* Stroke action */
    ctx.stroke();
  };

  /* Draw the needle */
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

  /* Reinitialize the canvas */
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
