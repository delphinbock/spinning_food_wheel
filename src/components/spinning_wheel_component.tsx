import SpinningWheelAnimationComponent from "./spinning_wheel_animation_component";

/* Spinning food wheel component */
const spinningFoodWheelComponent = () => {
  /* Parameters */
  const segments = ["Grüne", "Les italiens du coin", "Royal kebab", "Onolulu", "Yam Yam"];
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#FF9000"];

  /* Console message on finish */
  const onFinished = (winner: any) => {
    console.log(winner);
  };

  /* Data object */
  let dataObj = {
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
  };

  return (
    <div id="wheelCircle">
      <SpinningWheelAnimationComponent dataObj={dataObj} />
    </div>
  );
};

export default spinningFoodWheelComponent;
