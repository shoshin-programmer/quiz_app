import { createContext, Dispatch, SetStateAction, useState } from "react";

// interface for the actual value of the settings
export interface ISettings {
  difficulty: string;
  totalQuestions: string;
  changeSettings: Dispatch<SetStateAction<ISettings>>;
}

// default values
export const defaultSettings: ISettings = {
  difficulty: "easy",
  totalQuestions: "10",
  changeSettings: (): void => {},
};

// actual context being consumed
export const SettingsContext = createContext<ISettings>(defaultSettings);
