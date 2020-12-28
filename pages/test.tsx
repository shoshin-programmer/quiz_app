import QuestionCard from "../components/QuestionCard";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

interface Questions {
  category: string;
  type: string;
  difficulty: string;
  questions: string[];
  correct_answers: string;
  incorrect_answers: string[];
}

const TOTAL_QUESTIONS = 10;

const Test: NextPage<{ questions: Questions }> = (props) => {
  const [loading, setLoading] = useState(false);
  // const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  console.log(props);

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    // if answer is correct then continue and show correct answer or highlight it with green
    // if answer is wrong, do the same.
  };

  return (
    <div>
      <div className="hero fullscreen main-bg">
        <div className="hero-body">
          <div className="mx-auto">
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={''}
              answers={[]}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />

            <Link href="#">
              <button className="btn btn-xsmall btn-info w-100">Next</button>
            </Link>
            <Link href="/">
              <button className="btn btn-xsmall btn-danger">Restart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://opentdb.com/api.php?amount=10`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Test;
