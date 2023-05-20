import React, { useCallback, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

type PixelArtHook = [
  React.RefObject<HTMLCanvasElement>,
  (file: File | null) => void,
  (saveStateFunction: () => void) => void
];

const usePixelArt: () => PixelArtHook = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [saveState, setSaveState] = useState<(() => void) | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { saveCanvasToLocalStorage, loadCanvasFromLocalStorage } =
    useLocalStorage(canvasRef, "pixelArt");

  const handleUpload = useCallback(
    async (file: File | null) => {
      setFile(file);

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result as string;

          img.onload = () => {
            if (canvasRef.current) {
              const ctx = canvasRef.current.getContext("2d");
              if (ctx) {
                let width = img.width;
                let height = img.height;

                // If the image is larger than 500px in either dimension, scale it down
                if (width > 500 || height > 500) {
                  if (width > height) {
                    // If the image is wider than it is tall, set the width to 500 and scale the height to maintain the aspect ratio
                    height = Math.floor((height / width) * 500);
                    width = 500;
                  } else {
                    // If the image is taller than it is wide, set the height to 500 and scale the width to maintain the aspect ratio
                    width = Math.floor((width / height) * 500);
                    height = 500;
                  }
                }
                const pixelSize = 10;
                canvasRef.current.width = width;
                canvasRef.current.height = height;

                // Clear the canvas
                ctx.clearRect(0, 0, width, height);

                // Create a temporary canvas and context to hold the original image
                const tempCanvas = document.createElement("canvas");
                const tempContext = tempCanvas.getContext("2d");

                if (tempContext) {
                  tempCanvas.width = width;
                  tempCanvas.height = height;

                  // Draw the original image onto the temporary canvas
                  tempContext.drawImage(img, 0, 0, width, height);

                  let imageData = tempContext.getImageData(0, 0, width, height);
                  for (let i = 0; i < imageData.width; i += pixelSize) {
                    for (let j = 0; j < imageData.height; j += pixelSize) {
                      // Get the image data from the temporary canvas
                      const data = tempContext.getImageData(
                        i,
                        j,
                        pixelSize,
                        pixelSize
                      );
                      const pixels = data.data;
                      let r = 0;
                      let g = 0;
                      let b = 0;
                      let a = 0;

                      for (let p = 0; p < pixels.length; p += 4) {
                        r += pixels[p];
                        g += pixels[p + 1];
                        b += pixels[p + 2];
                        a += pixels[p + 3];
                      }

                      // average color values
                      r /= pixels.length / 4;
                      g /= pixels.length / 4;
                      b /= pixels.length / 4;
                      a /= pixels.length / 4;

                      // Convert alpha to a value between 0 and 1
                      a /= 255;

                      // Draw the pixelated image onto the actual canvas
                      ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
                      ctx.fillRect(i, j, pixelSize, pixelSize);
                    }
                  }
                }

                // Save the pixel art to localStorage
                saveCanvasToLocalStorage();
              }
            }
          };
        };

        reader.readAsDataURL(file);
      }
    },
    [canvasRef, saveState]
  );

  const setSaveStateFunction = (saveStateFunction: () => void) => {
    setSaveState(() => saveStateFunction);
  };

  // Load the state from localStorage when the component mounts
  useEffect(() => {
    loadCanvasFromLocalStorage();
  }, []);

  // Save the state to localStorage whenever the canvas changes
  useEffect(() => {
    saveCanvasToLocalStorage();
  }, [canvasRef, file]);

  return [canvasRef, handleUpload, setSaveStateFunction];
};

export default usePixelArt;
