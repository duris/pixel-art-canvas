import React, { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

type PaintingHook = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  color: string,
  pixelSize: number,
  saveState: () => void
) => void;

const usePixelPainting: PaintingHook = (
  canvasRef,
  color,
  pixelSize,
  saveState
) => {
  const { saveCanvasToLocalStorage, loadCanvasFromLocalStorage } =
    useLocalStorage(canvasRef, "pixelArt");

  useEffect(() => {
    let painting = false;

    const startPaint = (event: MouseEvent) => {
      painting = true;
      draw(event);
    };

    const endPaint = () => {
      painting = false;
      // Save state after finished drawing
      saveState();
    };

    const draw = (event: MouseEvent) => {
      if (!painting) return;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const rect = canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          // Calculate the pixel coordinates
          const pixelX = Math.floor(x / pixelSize) * pixelSize;
          const pixelY = Math.floor(y / pixelSize) * pixelSize;

          ctx.fillStyle = color;
          ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
        }
      }
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousedown", startPaint);
      canvasRef.current.addEventListener("mouseup", endPaint);
      canvasRef.current.addEventListener("mousemove", draw);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", startPaint);
        canvasRef.current.removeEventListener("mouseup", endPaint);
        canvasRef.current.removeEventListener("mousemove", draw);
      }
    };
  }, [canvasRef, color, pixelSize, saveState]); // Only re-run the effect if the canvas, color, pixelSize, or saveState changes
};

export default usePixelPainting;
