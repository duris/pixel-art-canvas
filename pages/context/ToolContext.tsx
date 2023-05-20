import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  RefObject,
} from "react";

export enum Tools {
  PAINT_BRUSH = "PAINT_BRUSH",
  EYEDROPPER = "EYEDROPPER",
  DRAG_AND_DROP = "DRAG_AND_DROP",
  ERASER = "ERASER",
}

type ToolContextType = {
  tool: Tools;
  color: string;
  activeCanvas: HTMLCanvasElement | undefined;
  setTool: (tool: Tools) => void;
  setColor: (color: string) => void;
  setActiveCanvas: (activeCanvas: HTMLCanvasElement) => void;
};

type ToolProviderProps = {
  children: React.ReactNode;
};

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("useTool must be used within a ToolProvider");
  }
  return context;
};

export const ToolProvider: React.FC<ToolProviderProps> = ({ children }) => {
  const [tool, setTool] = useState<Tools>(Tools.PAINT_BRUSH);
  const [color, setColor] = useState<string>("blue");
  const [activeCanvas, setActiveCanvas] = useState<HTMLCanvasElement>();

  useEffect(() => {
    console.log("Tool changed to ", tool);
  }, [tool]);

  return (
    <ToolContext.Provider
      value={{ tool, setTool, color, setColor, activeCanvas, setActiveCanvas }}
    >
      {children}
    </ToolContext.Provider>
  );
};
