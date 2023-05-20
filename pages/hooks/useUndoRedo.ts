import { useCallback, useRef } from "react";

type UndoRedoHook = [() => void, () => void, () => void];

const useUndoRedo: (
  canvasRef: React.RefObject<HTMLCanvasElement>
) => UndoRedoHook = (canvasRef) => {
  const undoStack = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    undoStack.current.push(
      context.getImageData(0, 0, canvas.width, canvas.height)
    );
    redoStack.current = []; // When we save a new state, we can't redo anymore
  }, [canvasRef]);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    if (undoStack.current.length > 1) {
      // We always want to keep the initial state
      const imageData = undoStack.current.pop() as ImageData;
      redoStack.current.push(imageData);

      const previousImageData = undoStack.current[undoStack.current.length - 1];
      context.putImageData(previousImageData, 0, 0);
    }
  }, [canvasRef]);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    if (redoStack.current.length > 0) {
      const imageData = redoStack.current.pop() as ImageData;
      undoStack.current.push(imageData);

      context.putImageData(imageData, 0, 0);
    }
  }, [canvasRef]);

  return [undo, redo, saveState];
};

export default useUndoRedo;
