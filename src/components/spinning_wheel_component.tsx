/* React */
import { useState, useEffect } from "react";

/* Spinning wheel animation component */
import SpinningWheelAnimationComponent from "./spinning_wheel_animation_component";

/* Main library */
import { randomHexaColorArray } from "../libraries/main_library";

/* Spinning food wheel component */
const SpinningFoodWheelComponent = () => {
  /* Default restaurants name */
  const segments = [
    "Grüne",
    "Les italiens du coin",
    "Royal kebab",
    "Onolulu",
    "Yam Yam",
    "Road Side",
    "Big Fernand",
  ];

  /* Console message on finish */
  const onFinished = (winner: any) => {
    console.log(winner);
  };

  /* Colors segments */
  const segColors = async (segments: any) => {
    return await randomHexaColorArray(segments);
  };

  console.log(segColors(segments));

  /* Data object state */
  const dataObj = {
    segments: segments,
    segColors: segColors(segments),
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
  };

  return (
    <div id="wheelCircle">
      <SpinningWheelAnimationComponent dataObj={dataObj} />
    </div>
  );
};

export default SpinningFoodWheelComponent;
