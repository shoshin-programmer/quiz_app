import useSWR from "swr";
import { useState } from "react";
// Components
import LoadingCard from "../components/LoadingCard";
import QuestionCard from "../components/QuestionCard";
import { SettingsContext } from "../context/settings-context";

// Variables
const fetcher = (url: string) => fetch(url).then((res) => res.json());
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
  const url = `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}`;
  const { data, error, mutate, isValidating } = useSWR(
    url,
    fetcher,
    FETCH_SETTINGS
  );
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    setUserAnswer("");
  };

  const handleRestart = () => {
    setQuestionNumber(0);
    mutate();
    setUserAnswer("");
  };

  const [userAnswer, setUserAnswer] = useState<string>("");

  const callback = () => {
    setUserAnswer("value");
  };

  return (
    <div>
      <div className="hero fullscreen main-bg">
        <div className="hero-body">
          <div className="row">
            <div className="col-6 offset-3">
              {error ? (
                <LoadingCard />
              ) : !data ? (
                <LoadingCard />
              ) : (
                <QuestionCard
                  question={data.results[questionNumber].question}
                  incorrectAnswers={
                    data.results[questionNumber].incorrect_answers
                  }
                  correctAnswer={data.results[questionNumber].correct_answer}
                  questionNumber={questionNumber + 1}
                  totalQuestions={totalQuestions}
                  category={data.results[questionNumber].category}
                  isValidating={isValidating}
                  userAnswer={userAnswer}
                  callback={callback}
                />
              )}
              <button onClick={handleRestart}>restart</button>
              <button
                className={questionNumber === totalQuestions - 1 ? `hide` : ``}
                disabled={userAnswer ? false : true}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
