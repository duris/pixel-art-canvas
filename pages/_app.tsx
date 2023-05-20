import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToolProvider } from "./context/ToolContext";
import { LayerProvider } from "./context/LayerContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToolProvider>
      <LayerProvider>
        <Component {...pageProps} />
      </LayerProvider>
    </ToolProvider>
  );
}
