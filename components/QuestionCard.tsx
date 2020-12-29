import SmallLoading from "./SmallLoading";

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
            <div className="card-head">
              <p className="font-bold px-3">Score: {score}</p>
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
              {choices.map((choice) => (
                <div className="col-6" key={choice}>
                  <button
                    onClick={(e) => setAnswer(e)}
                    disabled={answerConfirmed ? true : false}
                    className={`
                      btn mb-1 w-100 btn-small m-0
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
                    <b dangerouslySetInnerHTML={{ __html: choice }} />
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
