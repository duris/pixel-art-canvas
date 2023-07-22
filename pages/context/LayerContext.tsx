import React, { createContext, useState, useContext } from "react";

type LayerProviderType = {
  children: React.ReactNode;
};

type Layer = {
  id: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  file: File | null;
};

interface LayerContextType {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  activeLayer: Layer | null;
  setActiveLayer: React.Dispatch<React.SetStateAction<Layer | null>>;
}

const LayerContext = React.createContext<LayerContextType | undefined>(
  undefined
);

export const LayerProvider: React.FC<LayerProviderType> = ({ children }) => {
  const [activeLayer, setActiveLayer] = useState<Layer | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);

  const addLayer = (layer: Layer) => {
    setLayers((prevLayers) => [...prevLayers, layer]);
  };

  return (
    <LayerContext.Provider
      value={{ layers, setLayers, activeLayer, setActiveLayer }}
    >
      {children}
    </LayerContext.Provider>
  );
};

export const useLayers = (): LayerContextType => {
  const context = useContext(LayerContext);
  if (!context) {
    throw new Error("useLayer must be used within a LayerProvider");
  }
  return context;
};
