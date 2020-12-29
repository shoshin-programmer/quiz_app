interface Props {
  question: string;
  answers: string[];
  questionNumber: number;
  totalQuestions: number;
  category: string;
  isValidating: boolean;
  // callback: any;
  // userAnswer: any;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  questionNumber,
  totalQuestions,
  category,
  isValidating,
  // userAnswer,
}) => {
  return (
    <>
      <div className="card transparent">
        <div className="card-head">
          <p className="font-bold px-3">Score: $</p>
          <p className="font-bold px-3">
            {isValidating ? (
              ""
            ) : (
              <>
                Question: {questionNumber} / {totalQuestions}
              </>
            )}
          </p>
        </div>
        <div className="content full-width pl-5 pr-5 pt-2">
          {isValidating ? (
            ""
          ) : (
            <p dangerouslySetInnerHTML={{ __html: question }} />
          )}
        </div>
        <div className="card-footer level content full-width pl-5 text-dark">
          {category}
        </div>
        {isValidating ? (
          ""
        ) : (
          <div className="u-center action-bar row">
            {answers.map((answer, idx) => (
              <div className="col-6 u-center" key={idx}>
                <button
                  // onClick={callback}
                  // disabled={userAnswer ? true : false}
                  className={`btn btn-dark mb-1 w-100 btn-small ${
                    answer ? "btn-success" : "outline"
                  }`}
                >
                  <b dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionCard;
