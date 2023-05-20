import { useTool, Tools } from "../context/ToolContext";

const ToolSet = () => {
  const { tool, setTool, setColor } = useTool();

  return (
    <>
      <button
        className=" p-2 bg-slate-800 m-2 rounded-lg"
        onClick={() => {
          setColor("blue");
          setTool(Tools.ERASER);
        }}
      >
        Eraser
      </button>
      <button
        className=" p-2 bg-slate-800 m-2 rounded-lg"
        onClick={() => {
          setColor("black");
          setTool(Tools.PAINT_BRUSH);
        }}
      >
        Paint Brush
      </button>

      <button
        className=" p-2 bg-slate-800 m-2 rounded-lg"
        onClick={() => {
          setTool(Tools.EYEDROPPER);
        }}
      >
        Eyedropper
      </button>
    </>
  );
};

export default ToolSet;
