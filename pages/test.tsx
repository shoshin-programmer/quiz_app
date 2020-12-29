import useSWR from "swr";
import { useState } from "react";
// Components
import LoadingCard from "../components/LoadingCard";
import QuestionCard from "../components/QuestionCard";
import { SettingsContext } from "../context/settings-context";
// Utils
import { shuffleArray } from "../utils";
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
  const url = `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}`;
  const { data, error, mutate, isValidating } = useSWR(
    url,
    fetcher,
    FETCH_SETTINGS
  );
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [answerConfirmed, setAnswerConfirmed] = useState<boolean>(false);

  const handleConfirm = (e: any) => {
    // if {answer is correct} turn btn to green
    // else if { answer is wrong } turn btn to red
    // else disable all buttons
    setAnswerConfirmed(true);
  };

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    setUserAnswer(null);
    setAnswerConfirmed(false);
  };

  const handleRestart = () => {
    setQuestionNumber(0);
    mutate();
    setUserAnswer(null);
  };

  const [userAnswer, setUserAnswer] = useState<string>("");

  const callback = (answer: any) => {
    setUserAnswer(answer);
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
                  question={data[questionNumber].question}
                  choices={data[questionNumber].choices}
                  correctAnswer={data[questionNumber].correct_answer}
                  questionNumber={questionNumber + 1}
                  totalQuestions={totalQuestions}
                  category={data[questionNumber].category}
                  isValidating={isValidating}
                  userAnswer={userAnswer}
                  callback={callback}
                />
              )}
              <button onClick={handleRestart}>restart</button>
              <button
                className={questionNumber === totalQuestions - 1 ? `hide` : ``}
                disabled={userAnswer ? false : true}
                onClick={handleConfirm}
              >
                Confirm Answer
              </button>
              <button
                // TODO: Show a summay on correct answers.
                className={questionNumber === totalQuestions - 1 ? `hide` : ``}
                disabled={answerConfirmed ? false : true}
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
