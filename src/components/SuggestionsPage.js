import "./SuggestionsPage.css";
import AddFeedback from "./AddFeedback";
import Suggestion from "./Suggestion";
import { useSelector } from "react-redux";

function SuggestionsPage() {
  const { appData } = useSelector((store) => store.data);
  const { filteredData } = useSelector((store) => store.sidebar);

  return (
    <div className="suggestions-page">
      <header>
        <div className="suggestions-text-box">
          <img
            src={
              process.env.PUBLIC_URL +
              "/assets/suggestions/icon-suggestions.svg"
            }
            alt="bulb"
            className="bulb-icon"
          />
          <span className="suggestion-amount">6</span>
          <span className="suggestion-text">Suggestions</span>
        </div>
        <button className="sort-box">
          <span className="sort-text">Sort by :</span>
          <span className="sort-category">Most Upvotes</span>
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1l4 4 4-4"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <AddFeedback />
      </header>
      <div className="suggestions-container">
        {appData.productRequests.length > 0 &&
          filteredData.map((request) => {
            return (
              <Suggestion
                key={request.id}
                upvotes={request.upvotes}
                title={request.title}
                description={request.description}
                category={request.category}
                comments={request.comments}
              />
            );
          })}
        {appData.productRequests.length === 0 && (
          <div className="no-feedback-box">
            <img
              src={
                process.env.PUBLIC_URL +
                "assets/suggestions/illustration-empty.svg"
              }
              alt="empty illustration"
            />
            <h2 className="no-feedback-title">There is no feedback yet.</h2>
            <p className="no-feedback-text">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
            <AddFeedback />
          </div>
        )}
      </div>
    </div>
  );
}

export default SuggestionsPage;
