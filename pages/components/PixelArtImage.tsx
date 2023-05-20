import React from "react";
import usePixelArt from "../hooks/usePixelArt";
import usePixelPainting from "../hooks/usePixelPainting";
import useUndoRedo from "../hooks/useUndoRedo";

const PixelArtImage: React.FC = () => {
  const [canvasRef, handleUpload] = usePixelArt();
  const color = "black"; // The color you want to use for painting
  const pixelSize = 10; // The size of the pixels in the pixel art

  const [undo, redo, saveState] = useUndoRedo(canvasRef);
  usePixelPainting(canvasRef, color, pixelSize, saveState);

  return (
    <div>
      <canvas
        style={{ position: "absolute", top: 0, left: 0 }}
        ref={canvasRef}
      />
      <input
        type="file"
        onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
      />

      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
};

export default PixelArtImage;
