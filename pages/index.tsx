import PixelArtImage from "./components/PixelArtImage";
import ToolSet from "./components/Tools";

export default function Home() {
  return (
    <div>
      <h1>PixelPrinted</h1>
      <canvas
        style={{
          background: "blue",
          width: 1000,
          height: 600,
        }}
      />
      <PixelArtImage />
      <ToolSet />
    </div>
  );
}
