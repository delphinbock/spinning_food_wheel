import { useState, useEffect } from "react";

import "../styles/game.scss";

/* Spinning wheel */
const SpinningFoodWheel = () => {
  /* Restaurants params */
  const restaurants = ["Road Side", "Royal Kebab", "Grune", "Mundo"];

  /* Settings params */
  const settingsGame = {
    radius: 75 /* pixels */,
    rotate: 0 /* degrees */,
    easeOut: 0 /* seconds */,
    angle: 0 /* radians*/,
    top: null /* index */,
    offset: null /* radians*/,
    net: null /* radians*/,
    result: null /* index */,
    spinning: false /* boolean action */,
  };

  /* Restaurants state */
  const [restaurantsState, setRestaurantsState] =
    useState<string[]>(restaurants);

  /* Settings state */
  const [settingsGameState, setSettingsGameState] = useState<any>(settingsGame);

  const renderWheel = () => {
    // determine number/size of sectors that need to created
    let numOptions = restaurantsState.length;
    let arcSize = (2 * Math.PI) / numOptions;
    setSettingsGameState({
      angle: arcSize,
    });

    // get index of starting position of selector
    topPosition(numOptions, arcSize);

    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = restaurantsState[i];
      renderSector(i + 1, text, angle, arcSize, getColor());
      angle += arcSize;
    }
  };

  /* Side effects */
  useEffect(() => {
    renderWheel();
  }, []);

  const topPosition = (num: any, angle: any) => {
    // set starting index and angle offset based on list length
    // works upto 9 options
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    setSettingsGameState({
      top: topSpot - 1,
      offset: degreesOff,
    });
  };

  const renderSector = (
    index: any,
    text: any,
    start: any,
    arc: any,
    color: any
  ) => {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel") as HTMLCanvasElement;

    if (canvas) {
      let ctx = canvas.getContext("2d");
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      let radius = settingsGameState.radius;
      let startAngle = start;
      let endAngle = start + arc;
      let angle = index * arc;
      let baseSize = radius * 3.33;
      let textRadius = baseSize - 150;

      if (ctx) {
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, false);
        ctx.lineWidth = radius * 2;
        ctx.strokeStyle = color;

        ctx.font = "17px Arial";
        ctx.fillStyle = "black";
        ctx.stroke();

        ctx.save();
        ctx.translate(
          baseSize + Math.cos(angle - arc / 2) * textRadius,
          baseSize + Math.sin(angle - arc / 2) * textRadius
        );
        ctx.rotate(angle - arc / 2 + Math.PI / 2);
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }
    }
  };

  const getColor = () => {
    // randomly generate rbg values for wheel sectors
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  };

  const getResult = (spin: any) => {
    // find net rotation and add to offset angle
    // repeat substraction of inner angle amount from total distance traversed
    // use count as an index to find value of result from state list
    const { angle, top, offset } = settingsGameState;
    let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel = travel - angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = restaurantsState.length + count;
    }

    // set state variable to display result
    setSettingsGameState({
      net: netRotation,
      result: result,
    });
  };

  const spin = () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation
    let randomSpin = Math.floor(Math.random() * 900) + 500;
    setSettingsGameState({
      rotate: randomSpin,
      easeOut: 2,
      spinning: true,
    });

    // calculate result after wheel stops spinning
    setTimeout(() => {
      getResult(randomSpin);
    }, 2000);
  };

  const reset = () => {
    // reset wheel and result
    setSettingsGameState({
      rotate: 0,
      easeOut: 0,
      result: null,
      spinning: false,
    });
  };

  return (
    <div className="App">
      <h1>Spinning Prize Wheel React</h1>
      <span id="selector">&#9660;</span>
      <canvas
        id="wheel"
        width="500"
        height="500"
        style={{
          WebkitTransform: `rotate(${settingsGameState.rotate}deg)`,
          WebkitTransition: `-webkit-transform ${settingsGameState.easeOut}s ease-out`,
        }}
      />

      {settingsGameState.spinning ? (
        <button type="button" id="reset" onClick={() => reset()}>
          reset
        </button>
      ) : (
        <button type="button" id="spin" onClick={() => spin()}>
          spin
        </button>
      )}
      <div className="display">
        <span id="readout">
          YOU WON:{""}
          <span id="result">{restaurantsState[settingsGameState.result]}</span>
        </span>
      </div>
    </div>
  );
};

export default SpinningFoodWheel;
