import Link from "next/link";
const ScoreSummary = ({ score, handleRestart, totalQuestions }) => {
  return (
    <div className="card transparent">
      <div className="full-width w-50">
        <div className="card-head u-flex u-flex-column u-items-center p-1">
          <div className="row">
            <h3 className="col font-alt">Score: {score}</h3>
          </div>
          <div className="row">
            <h5 className="col text-gray-700 font-alt">
              {totalQuestions / 2 > score ? "Try some more!" : "Good Job!"}
            </h5>
          </div>

          <div className="u-flex u-flex-row">
            <Link href="/">
              <button
                className="m-1 btn-info outline btn-small"
              >
                New Game!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreSummary;
