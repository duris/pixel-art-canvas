import { useEffect } from "react";

const useLocalStorage = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  key: string
) => {
  const saveCanvasToLocalStorage = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      localStorage.setItem(key, dataUrl);
    }
  };

  const loadCanvasFromLocalStorage = () => {
    const dataUrl = localStorage.getItem(key);

    if (dataUrl) {
      const img = new Image();
      img.onload = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          // Set the canvas dimensions to match the image dimensions
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx.drawImage(img, 0, 0);
        }
      };
      img.src = dataUrl;
    }
  };

  // Load the state from localStorage when the component mounts
  useEffect(() => {
    loadCanvasFromLocalStorage();
  }, []);

  return { saveCanvasToLocalStorage, loadCanvasFromLocalStorage };
};

export default useLocalStorage;
