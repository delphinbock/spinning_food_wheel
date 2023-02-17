/* React */
import { useRef, useEffect } from "react";

const useCanvas = (draw: any, options: any = {}) => {
  /* Set canvas React reference */
  const canvasRef = useRef(null);

  /* Side effects */
  useEffect(() => {
    /* Use React reference */
    const canvas: any = canvasRef.current;

    /* Existing canvas checking */
    if (canvas) {
      /* Set a 2D plan canvas */
      const context = canvas.getContext(options.context || "2d");

      /* Animation frame counter */
      let frameCount = 0;

      /* Animation frame identity */
      let animationFrameId: any;

      const render = () => {
        /* Add one frame unit */
        frameCount++;

        /* Draw action */
        draw(context, frameCount);

        /* Set animation frame identity */
        animationFrameId = window.requestAnimationFrame(render);
      };

      /* Display animation */
      render();

      return () => {
        /* Reinitialize animation frame identity */
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [draw, options.context]);

  return canvasRef;
};

export default useCanvas;
