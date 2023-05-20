import React, { useEffect, useRef } from "react";
import usePixelArt from "../hooks/usePixelArt";
import usePixelPainting from "../hooks/usePixelPainting";
import useUndoRedo from "../hooks/useUndoRedo";
import useDragAndDrop from "../hooks/useDragAndDrop";
import { Tools, useTool } from "../context/ToolContext";
import { useLayers } from "../context/LayerContext";

const PixelArtImage: React.FC = () => {
  const { layers, addLayer, removeLayer } = useLayers();
  const [position, handleActivateLayer] = useDragAndDrop();
  const [canvasRef, handleUpload] = usePixelArt();
  const { color, setColor, tool, setTool } = useTool();
  const pixelSize = 10; // The size of the pixels in the pixel art
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const [undo, redo, saveState] = useUndoRedo(canvasRef);
  usePixelPainting(canvasRef, color, pixelSize, saveState);

  useEffect(() => {
    if (!mainContainerRef.current) return;

    const handleMouseMove = () => {};

    mainContainerRef.current.addEventListener("mousemove", handleMouseMove);
    return () =>
      mainContainerRef.current?.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, [mainContainerRef]);

  return (
    <div ref={mainContainerRef}>
      <canvas
        style={{ position: "absolute", left: position.x, top: position.y }}
        ref={canvasRef}
      />
      <input
        type="file"
        onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
      />
      <button className=" p-2 bg-slate-800 m-2 rounded-lg" onClick={undo}>
        Undo
      </button>
      <button className=" p-2 bg-slate-800 m-2 rounded-lg" onClick={redo}>
        Redo
      </button>
    </div>
  );
};

export default PixelArtImage;
