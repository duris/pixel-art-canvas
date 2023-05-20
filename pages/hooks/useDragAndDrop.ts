import { useState, useCallback } from "react";

type DragAndDropHook = [
  { x: number; y: number },
  (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void,
  (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void,
  (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
];

const useDragAndDrop: () => DragAndDropHook = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleDragEnd = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [dragStart]
  );

  const handleActivateLayer = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      // setPosition({
      //   x: e.clientX - dragStart.x,
      //   y: e.clientY - dragStart.y,
      // });
      console.log("handle mouse");
      console.log(e);
    },
    [dragStart]
  );

  return [position, handleDragStart, handleDragEnd, handleActivateLayer];
};

export default useDragAndDrop;
