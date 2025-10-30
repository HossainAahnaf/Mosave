import type { AppProps } from "next/app";
import "@/styles/globals.css";

const MoSaveApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MoSaveApp;
