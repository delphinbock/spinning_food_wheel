/* React */
import React, { useEffect } from "react";

/* Redux types */
import type { RootState, AppDispatch } from "../../index";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* Redux slice */
import { segmentsColorsArr } from "./spinningWheelComponentSlice";

/* Spinning wheel animation component */
import SpinningWheelAnimationComponent from "./SpinningWheelAnimationComponent";

/* Main library */
import { randomHexaColorArray } from "../../lib/main_library";

/* Spinning food wheel component */
const SpinningFoodWheelComponent = () => {
  /* Get store data */
  const dataStoreSpinningWheelComponent = useSelector(
    (state: RootState) => state.spinningWheelComponent
  );

  /* Actions */
  const dispatch = useDispatch<AppDispatch>();

  /* Console message on finish */
  const onFinished = (winner: any) => {
    console.log(winner);
  };

  /* Side effects */
  useEffect(() => {
    /* Random segments hexa colors */
    const randomSegmentsColorsFnc = async (segmentsNames: string[]) => {
      const randomColors: any = await randomHexaColorArray(segmentsNames);

      /* Record segments colors to Redux store */
      dispatch(segmentsColorsArr(randomColors));
    };

    /* Run randomly segments hex colors */
    randomSegmentsColorsFnc(dataStoreSpinningWheelComponent.segmentsNamesArr);
  }, [dataStoreSpinningWheelComponent.segmentsNamesArr, dispatch]);

  /* Data object state */
  const dataObj = {
    segments: dataStoreSpinningWheelComponent.segmentsNamesArr,
    segColors: dataStoreSpinningWheelComponent.segmentsColorsArr,
    winningSegment: "",
    onFinished: (winner: any) => onFinished(winner),
    onRotate: null,
    onRotatefinish: null,
    primaryColor: "gold",
    primaryColoraround: "gold",
    contrastColor: "black",
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
    <>
      <button
        onClick={() => {
          console.log(dataStoreSpinningWheelComponent);
        }}
      >
        test
      </button>
      <div id="wheelCircle">
        <SpinningWheelAnimationComponent dataObj={dataObj} />
      </div>
    </>
  );
};

export default SpinningFoodWheelComponent;
