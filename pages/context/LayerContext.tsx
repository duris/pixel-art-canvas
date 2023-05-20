// context/LayerContext.tsx
import React, { createContext, useContext, useState } from "react";

type LayerContextType = {
  layers: string[];
  addLayer: (layer: string) => void;
  removeLayer: (index: number) => void;
};

type LayerProviderType = {
  children: React.ReactNode;
};

const LayerContext = createContext<LayerContextType | undefined>(undefined);

export const LayerProvider: React.FC<LayerProviderType> = ({ children }) => {
  const [layers, setLayers] = useState<string[]>([]);

  const addLayer = (layer: string) => {
    setLayers([...layers, layer]);
  };

  const removeLayer = (index: number) => {
    setLayers(layers.filter((_, i) => i !== index));
  };

  return (
    <LayerContext.Provider value={{ layers, addLayer, removeLayer }}>
      {children}
    </LayerContext.Provider>
  );
};

export const useLayers = (): LayerContextType => {
  const context = useContext(LayerContext);
  if (context === undefined) {
    throw new Error("useLayers must be used within a LayerProvider");
  }
  return context;
};
