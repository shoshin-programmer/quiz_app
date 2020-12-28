interface Props {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <>
      <div className="card transparent">
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
          Created by: mark the dev
        </div>
        <div className="u-center action-bar row">
          {answers.map((answer, idx) => (
            <div className="col-6 u-center" key={idx}>
              <button
                onClick={callback}
                disabled={userAnswer ? true : false}
                className={`btn btn-dark mb-1 w-100 btn-small ${
                  answer ? "btn-success" : "outline"
                }`}
              >
                <b dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
