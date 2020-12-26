import QuestionCard from "../components/QuestionCard";
import { NextPage } from "next";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answers: string;
  incorrect_answers: Array<string>;
}

const Test: NextPage<{ question: Question }> = (props) => {
  return (
    <div>
      <div className="hero fullscreen main-bg">
        <div className="hero-body">
          <div className="mx-auto">
            <QuestionCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
