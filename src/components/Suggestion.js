import "./Suggestion.css";
import { useDispatch, useSelector } from "react-redux";
import roadmapPageSlice from "../store/roadmapPageSlice";
import suggestionDetailsSlice from "../store/suggestionDetailsSlice";
import suggestionsPageSlice from "../store/suggestionsPageSlice";
import dataSlice from "../store/dataSlice";

function Suggestion(props) {
  const dispatch = useDispatch();
  const { hideSuggestionsPage } = suggestionsPageSlice.actions;
  const { suggestionsPageVisible } = useSelector(
    (store) => store.suggestionsPage
  );
  const {
    showSuggestionDetailsPage,
    getSuggestionDetailsID,
    setPageBeforeSuggestionDetails,
  } = suggestionDetailsSlice.actions;
  const { upvote } = dataSlice.actions;
  const { hideRoadmapPage } = roadmapPageSlice.actions;

  const suggestion = props.suggestion;
  const comments = suggestion.comments.length;
  const replies = suggestion.comments.reduce((sum, comment) => {
    if (comment.replies) {
      return sum + comment.replies.length;
    }
    return sum;
  }, 0);
  const commentAmount = comments + replies;

  function handleUpvote() {
    dispatch(upvote(suggestion.id));
  }

  function handleSuggestionBox(event) {
    if (!event.target.closest(".suggestion-upvote")) {
      dispatch(getSuggestionDetailsID(suggestion.id));
      dispatch(showSuggestionDetailsPage());
      if (suggestionsPageVisible) {
        dispatch(hideSuggestionsPage());
        dispatch(setPageBeforeSuggestionDetails("suggestionsPage"));
      } else {
        dispatch(hideRoadmapPage());
        dispatch(setPageBeforeSuggestionDetails("roadmapPage"));
      }
    }
  }

  return (
    <div
      className={`suggestion-box ${props.name} ${props.class ? "hover" : ""}`}
      onClick={handleSuggestionBox}
    >
      <button
        className={`suggestion-upvote ${
          suggestion.upvoted === true ? "upvoted" : ""
        }`}
        onClick={handleUpvote}
      >
        <svg
          className="upvote-icon"
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6l4-4 4 4"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <p className="upvote-amount">{suggestion.upvotes}</p>
      </button>
      <div className="suggestion-text-box">
        {props.name === "roadmap" && (
          <p className={`suggestion-status-roadmap ${suggestion.status}`}>
            {suggestion.status}
          </p>
        )}
        <h3 className="suggestion-title">{suggestion.title}</h3>
        <p className="suggestion-description">{suggestion.description}</p>
        <span className="suggestion-category">{suggestion.category}</span>
      </div>
      <div className="suggestion-comments">
        <img
          src={process.env.PUBLIC_URL + "/assets/shared/icon-comments.svg"}
          alt="comment"
        />
        <span className="comment-amount">{commentAmount}</span>
      </div>
    </div>
  );
}

export default Suggestion;
