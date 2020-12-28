import type { AppProps /*, AppContext */ } from "next/app";
import "../styles/globals.css";
import "cirrus-ui";
import { settingsContext } from "../context/settingsContext";
import { useContext } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const settings = useContext(settingsContext);
  console.log("settings", settings);
  return (
    <settingsContext.Provider value={settings}>
      <Component {...pageProps} />
    </settingsContext.Provider>
  );
}
export default MyApp;
