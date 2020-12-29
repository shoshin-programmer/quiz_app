import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import useSWR from "swr";
import { SettingsContext } from "../context/settings-context";
import Router from "next/router";

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

function Questions(props) {
  const difficulty = props.difficulty;
  const totalQuestions = props.totalQuestions;

  const [loading, setLoading] = useState<Boolean>(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const url = `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}`;
  const fetch_settings = {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  };
  const { data, error, mutate, isValidating } = useSWR(
    url,
    fetcher,
    fetch_settings
  );
  const [questionNumber, setQuestionNumber] = useState(0);

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
  };

  const handleRestart = () => {
    setQuestionNumber(0);
    mutate();
  };

  if (error)
    return (
      <div>
        <div className="hero fullscreen main-bg">
          <div className="hero-body">
            <div className="mx-auto"></div>
          </div>
        </div>
      </div>
    );

  if (!data)
    return (
      <div>
        <div className="hero fullscreen main-bg">
          <div className="hero-body">
            <div className="row">
              <div className="col-6 offset-3">
                <div className="card transparent">
                  <div className="animated loading hide-text full-width w-100">
                    <p>' '</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  const questions = data.results;
  return (
    <div>
      <div className="hero fullscreen main-bg">
        <div className="hero-body">
          <div className="row">
            <div className="col-6 offset-3">
              <QuestionCard
                question={questions[questionNumber].question}
                answers={questions[questionNumber].incorrect_answers}
                questionNumber={questionNumber + 1}
                totalQuestions={totalQuestions}
                category={questions[questionNumber].category}
                isValidating={isValidating}
              />
              <button onClick={handleRestart}>restart</button>
              <button
                className={questionNumber === totalQuestions - 1 ? `hide` : ``}
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
