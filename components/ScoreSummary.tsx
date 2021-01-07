import SmallLoading from "./SmallLoading";
import "css.gg/icons/css/home-alt.css";
import "css.gg/icons/css/sync.css";
import "css.gg/icons/css/check-o.css";
import "css.gg/icons/css/close-o.css";
import Link from "next/link";
const QuestionCard: React.FC = ({
}) => {
  return (
    <div>
      <div className="card transparent">
        {isValidating ? (
          <SmallLoading />
        ) : (
          <>
            <div className="card-head u-flex u-justify-space-between u-items-center p-1">
              <div className="row">
                <span className="font-bold px-3 col">Score: </span>
                <span className="font-bold px-3 col">
                  Question:
                </span>
              </div>
              <div className="u-flex u-flex-row">
                <button
                  className="px-3 bg-none tooltip tooltip--bottom"
                  onClick={() => {}}
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
              {/* <p dangerouslySetInnerHTML={{ __html: question }} /> */}
            </div>

            <div className="card-footer level content full-width pl-5 text-dark">
            </div>

            <div className="u-left action-bar row">
                <div className="col-6">
                  <button >
                    {/* <b dangerouslySetInnerHTML={{ __html: choice }} /> */}
                  </button>
                </div>
            </div>
          </>
        )}
        <hr />
        <div className="row">
          <div className="col-6 offset-3 p-1">
            <button>
              Confirm Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
