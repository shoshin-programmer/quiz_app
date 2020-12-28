import type { AppProps /*, AppContext */ } from "next/app";
import "../styles/globals.css";
import "cirrus-ui";
import {
  ISettings,
  defaultSettings,
  SettingsContext,
} from "../context/settings-context";
import { useState, useContext } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [settings, setSettings] = useState<ISettings>(defaultSettings);
  const changeSettings = (value:any) => setSettings({ ...value });
  return (
    <SettingsContext.Provider value={{ ...settings, changeSettings }}>
      <Component {...pageProps} />
    </SettingsContext.Provider>
  );
}
export default MyApp;
