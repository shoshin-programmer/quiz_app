import type { AppProps /*, AppContext */ } from "next/app";
import "../styles/globals.css";
import "cirrus-ui";
import TestSettings from "../context/settingsContext";
import defaultSettings from "../context/settingsContext";
import { useContext } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const defaultSetting = useContext(defaultSettings);
  return (
    <TestSettings.Provider value={defaultSetting}>
      <Component {...pageProps} />
    </TestSettings.Provider>
  );
}
export default MyApp;
