/* Canvas hook */
import useCanvas from "../../hooks/useCanvasHook";

/* Canvas component */
const Canvas = (props: any) => {
  /* Draw & options from properties */
  const { draw, options } = props;

  /* Context from options */
  //const { context } = options;

  /* Use canvas hook */
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
