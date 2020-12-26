import Link from "next/link";

const QuestionCard = () => {
  return (
    <>
      <div className="card transparent">
        <div className="card-head">
          <p className="font-bold px-3">Score: $</p>
        </div>
        <div className="content full-width pl-5 pr-5 pt-2">
          <p>
            Question goes here. Question goes here. Question goes here. Question
            goes here. Question goes here. Question goes here.
            <br />
            <a href="!#">#category_here</a>
            <a href="!#">#category_here</a>
          </p>
        </div>
        <div className="card-footer level content full-width pl-5 text-dark">
          Created by: mark the dev
        </div>
        <div className="u-center action-bar row">
          <Choice choice={"Choice"} />
          <Choice choice={"Choice"} answer={true} />
          <Choice choice={"Choice"} />
          <Choice choice={"Choice"} />
        </div>
      </div>
      <Link href="/">
        <button className="btn btn-xsmall btn-danger">From the Start</button>
      </Link>
    </>
  );
};

const Choice = (props) => {
  return (
    <div className="col-6 u-center">
      <button
        className={`btn btn-dark mb-1 w-100 ${
          props.answer ? "btn-success" : "outline"
        }`}
      >
        <b>{props.choice}</b>
      </button>
    </div>
  );
};

export default QuestionCard;
