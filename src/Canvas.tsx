import React, { useRef, useState, useEffect, useCallback } from "react";
import "./canvas.css";

interface CanvasProps {
  width: number;
  height: number;
  onExplode: () => void;
}

type Coordinate = {
  x: number;
  y: number;
};

const Canvas = ({ width, height, onExplode }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }

    // setProgress(progress + 1);

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.globalCompositeOperation = "destination-out";
      context.strokeStyle = "rgba(255,255,255,1)";
      context.lineWidth = 10;
      context.lineJoin = "round";
      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x + 1, newMousePosition.y + 1);
      context.closePath();

      context.stroke();
    }
  };

  const paint = useCallback(
    (event: MouseEvent) => {
      // if (progress > 280) {
      //   onExplode();
      //   return;
      // }
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, drawLine, onExplode]
  );

  const paintTouch = useCallback(
    (event: TouchEvent) => {
      if (isPainting) {
        // if (progress > 280) {
        //   onExplode();
        //   return;
        // }
        const newMousePosition = getCoordinatesTouch(event.touches[0]);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, drawLine, onExplode]
  );

  // ...other stuff here

  const getCoordinatesTouch = (touch: Touch): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;

    const newCoordinates = {
      x: touch.clientX - canvas.offsetLeft,
      y: touch.clientY - canvas.offsetTop,
    };
    return newCoordinates;
  };

  const startPaintTouch = useCallback((event: TouchEvent) => {
    const touches = event.changedTouches;

    for (let i = 0; i < touches.length; i++) {
      const coordinates = getCoordinatesTouch(touches[i]);

      if (coordinates) {
        setIsPainting(true);
        setMousePosition(coordinates);
      }
    }
  }, []);

  //   const paintTouchEnd = useCallback((event: TouchEvent) => {
  //     const touches = event.touches;

  //     for (let i = 0; i < touches.length; i++) {
  //       const coordinates = getCoordinatesTouch(touches[i]);

  //       if (coordinates) {
  //         setIsPainting(true);
  //         setMousePosition(coordinates);
  //       }
  //     }
  //   }, []);

  const startPaintMouse = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;

    const newCoordinates = {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
    return newCoordinates;
  };

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", startPaintMouse);
    canvas.addEventListener("touchstart", startPaintTouch);
    // canvas.addEventListener("touchend", paintTouchEnd);
    return () => {
      canvas.removeEventListener("mousedown", startPaintMouse);
      canvas.removeEventListener("touchstart", startPaintTouch);
    };
  }, [startPaintMouse, startPaintTouch]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("touchmove", paintTouch);
    return () => {
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("touchmove", paintTouch);
    };
  }, [paint, paintTouch]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("touchmove", paintTouch);
    return () => {
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("touchmove", paintTouch);
    };
  }, [paint, paintTouch]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.fillStyle = "#6A5D7B";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <canvas ref={canvasRef} height={height} width={width} className="canvas" />
  );
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Canvas;
