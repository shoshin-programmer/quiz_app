import SmallLoading from "./SmallLoading";
// Utils
import { shuffleArray } from "../utils";

interface Props {
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
  questionNumber: number;
  totalQuestions: number;
  category: string;
  isValidating: boolean;
  userAnswer: any;
  callback: any;
}

const QuestionCard: React.FC<Props> = ({
  question,
  incorrectAnswers,
  correctAnswer,
  questionNumber,
  totalQuestions,
  category,
  isValidating,
  userAnswer,
  callback
}) => {
  /*
  if button is clicked,
    register answer
    disable all other options
    check if the answer is the same with the correct one
    then go to next question
  onclick
    function on parent component
      get the value of the button
      update userAnswer state
  */
  const answers = shuffleArray(incorrectAnswers.concat(correctAnswer));
  return (
    <div>
      <div className="card transparent">
        {isValidating ? (
          <SmallLoading />
        ) : (
          <>
            <div className="card-head">
              <p className="font-bold px-3">Score: $</p>
              <p className="font-bold px-3">
                Question: {questionNumber} / {totalQuestions}
              </p>
            </div>

            <div className="content full-width pl-5 pr-5 pt-2">
              <p dangerouslySetInnerHTML={{ __html: question }} />
            </div>

            <div className="card-footer level content full-width pl-5 text-dark">
              {category}
            </div>

            <div className="u-left action-bar row">
              {answers.map((answer, idx) => (
                <div className="col-6" key={idx}>
                  <button
                    onClick={callback}
                    disabled={userAnswer ? true : false}
                    className={`btn btn-dark mb-1 w-100 btn-small ${
                      answer ? "" : "success"
                    }`}
                  >
                    <b dangerouslySetInnerHTML={{ __html: answer }} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
