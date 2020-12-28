import React from "react";

interface Settings {
  difficulty: string;
  number_of_questions: number;
}

export const defaultSettings: Settings = {
  difficulty: "easy",
  number_of_questions: 10,
};

const TestSettings = React.createContext<Settings>(defaultSettings);

export default TestSettings;
