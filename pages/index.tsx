import Image from "next/image";
import { Inter } from "next/font/google";
import PixelArtImage from "./components/PixelArtImage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1>Pixelator</h1>
      <canvas
        style={{
          background: "white",
          width: 1000,
          height: 600,
        }}
      />
      <PixelArtImage />
    </div>
  );
}
