import SmallLoading from "./SmallLoading";
import "css.gg/icons/css/home-alt.css";
import "css.gg/icons/css/sync.css";
import "css.gg/icons/css/check-o.css";
import "css.gg/icons/css/close-o.css";
import Link from "next/link";

interface Props {
  question: string;
  choices: string[];
  questionNumber: number;
  totalQuestions: number;
  category: string;
  isValidating: boolean;
  userAnswer: any;
  setAnswer: any;
  answerConfirmed: boolean;
  correct: boolean;
  score: number;
  handleRestart: any;
  handleConfirmation: any;
  // handleNext: any;
}

const QuestionCard: React.FC<Props> = ({
  question,
  choices,
  questionNumber,
  totalQuestions,
  category,
  isValidating,
  userAnswer,
  setAnswer,
  answerConfirmed,
  correct,
  score,
  handleRestart,
  handleConfirmation,
  // handleNext,
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
  return (
    <div>
      <div className="card transparent">
        {isValidating ? (
          <SmallLoading />
        ) : (
          <>
            <div className="card-head u-flex u-justify-space-between u-items-center p-1">
              <div className="row">
                <span className="font-bold px-3 col">Score: {score}</span>
                <span className="font-bold px-3 col">
                  Question: {questionNumber} / {totalQuestions}
                </span>
              </div>
              <div className="u-flex u-flex-row">
                <button
                  className="px-3 bg-none tooltip tooltip--bottom"
                  onClick={handleRestart}
                  data-tooltip="Restart"
                >
                  <i className="gg-sync" />
                </button>
                <Link href="/">
                  <button
                    className="px-3 bg-none tooltip tooltip--bottom"
                    data-tooltip="Home"
                  >
                    <i className="gg-home-alt"></i>
                  </button>
                </Link>
              </div>
            </div>
            <div className="content full-width pl-5 pr-5 pt-2">
              <p dangerouslySetInnerHTML={{ __html: question }} />
            </div>

            <div className="card-footer level content full-width pl-5 text-dark">
              {category}
            </div>

            <div className="u-left action-bar row">
              {choices.map((choice) => (
                <div className="col-6" key={choice}>
                  <button
                    onClick={(e) => setAnswer(e)}
                    disabled={answerConfirmed ? true : false}
                    className={`
                      btn mb-1 w-100 btn-small m-0 u-position-relative
                      ${
                        userAnswer === choice
                          ? "btn-dark text-white"
                          : "outline text-dark"
                      }
                      ${correct && answerConfirmed && " btn-success"}
                      ${!correct && answerConfirmed && " btn-danger"}
                      `}
                    value={choice}
                  >
                    {correct && userAnswer === choice ? (
                      <i className="gg-check-o u-position-absolute absolute-center-right"></i>
                    ) : (
                      ""
                    )}
                    {answerConfirmed && correct === false && userAnswer === choice ? (
                      <i className="gg-close-o u-position-absolute absolute-center-right"></i>
                    ) : (
                      ""
                    )}
                    <b dangerouslySetInnerHTML={{ __html: choice }} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        <hr />
        <div className="row">
          <div className="col-6 p-1">
            <button
              className={`${
                questionNumber === totalQuestions ? `hide` : ``
              } btn-info btn-small w-100 m-0`}
              disabled={userAnswer ? false : true}
              onClick={handleConfirmation}
            >
              Confirm Answer
            </button>
          </div>
          {/* <div className="col-6 p-1">
            <button
              // TODO: Show a summay on correct answers.
              className={`${
                questionNumber === totalQuestions - 1 ? "hide" : ""
              } btn outline text-dark btn-small w-100 m-0
                `}
              disabled={answerConfirmed ? false : true}
              onClick={handleNext}
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
