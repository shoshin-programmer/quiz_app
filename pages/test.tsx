import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
// Components
import LoadingCard from "../components/LoadingCard";
import QuestionCard from "../components/QuestionCard";
import ScoreSummary from "../components/ScoreSummary";
import { SettingsContext } from "../context/settings-context";
// Utils
import { shuffleArray } from "../utils";
import styles from "../styles/main.module.css";
// Variables

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

const fetcher = (url: string) =>
  fetch(url).then((res) =>
    res.json().then((data) =>
      data.results.map((question: Question) => ({
        ...question,
        choices: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }))
    )
  );
const FETCH_SETTINGS = {
  revalidateOnFocus: false,
  revalidateOnMount: true,
  revalidateOnReconnect: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0,
};

export default function Profile() {
  return (
    <SettingsContext.Consumer>
      {({ difficulty, totalQuestions, changeSettings }) => {
        return (
          <>
            <Questions
              difficulty={difficulty}
              totalQuestions={totalQuestions}
            />
          </>
        );
      }}
    </SettingsContext.Consumer>
  );
}

function Questions({ difficulty, totalQuestions }) {
  const router = useRouter();
  const url = `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}`;
  const { data, error, mutate, isValidating } = useSWR(
    url,
    fetcher,
    FETCH_SETTINGS
  );
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [answerConfirmed, setAnswerConfirmed] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleConfirmation = () => {
    setAnswerConfirmed(true);
    const answerIsCorrect = data[questionNumber].correct_answer === userAnswer;
    setCorrect(answerIsCorrect);
    /* Set answerconfirmed, then show modal, then after 2 seconds, handle next. */
    if (answerIsCorrect) {
      setScore(score + 1);
    }
    if (questionNumber === totalQuestions - 1) {
      setGameOver(true)
    } else {
      setTimeout(() => {
        handleNext();
      }, 1000);
    }
  };

  const handleNext = () => {
    console.log("next");
    setQuestionNumber(questionNumber + 1);
    setUserAnswer(null);
    setAnswerConfirmed(false);
    setCorrect(false);
    // TODO optimize rerendering for the buttons
  };

  const handleRestart = () => {
    setQuestionNumber(0);
    mutate();
    setUserAnswer(null);
    setAnswerConfirmed(false);
    setScore(0);
  };

  const setAnswer = (event: any) => {
    setUserAnswer(event.target.value);
  };

  return (
    <div>
      <div className={`hero ${styles.fullheight} ${styles.main_bg}`}>
        <div className="hero-body">
          <div className="row">
            <div className="col-6 offset-3">
              {error ? (
                <LoadingCard />
              ) : !data ? (
                <LoadingCard />
              ) : gameOver ? (
                <ScoreSummary score={score} handleRestart={handleRestart} totalQuestions={totalQuestions} />
              ) : (
                <QuestionCard
                  question={data[questionNumber].question}
                  choices={data[questionNumber].choices}
                  questionNumber={questionNumber + 1}
                  totalQuestions={totalQuestions}
                  category={data[questionNumber].category}
                  isValidating={isValidating}
                  userAnswer={userAnswer}
                  setAnswer={setAnswer}
                  answerConfirmed={answerConfirmed}
                  correct={correct}
                  score={score}
                  handleRestart={handleRestart}
                  handleConfirmation={handleConfirmation}
                  // handleNext={handleNext}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
