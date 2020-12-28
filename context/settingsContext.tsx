import { createContext, useState } from "react";

interface Settings {
  difficulty: string;
  totalQuestions: number;
}

interface SettingsContext {
  difficulty: string;
  totalQuestions: number;
  setDifficulty: (difficulty) => void;
  setTotalQuestions: (totalQuestions) => void;
}

const defaultSettings: Settings = {
  difficulty: "easy",
  totalQuestions: 10,
};

export const settingsContext = createContext({
  difficulty: "easy",
  totalQuestions: 10,
  setDifficulty: () => {},
  setTotalQuestions: () => {},
})


export function quizSettings(): SettingsContext {
  const [difficulty, setDifficulty] = useState(defaultSettings.difficulty);
  const [totalQuestions, setTotalQuestions] = useState(
    defaultSettings.totalQuestions
  );

  return {
    difficulty,
    totalQuestions,
    setDifficulty,
    setTotalQuestions,
  };
}
