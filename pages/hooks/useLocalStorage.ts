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
    if (canvasRef.current && dataUrl) {
      const img = new Image();
      img.onload = () => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
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
