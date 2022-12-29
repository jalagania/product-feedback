import { useDispatch, useSelector } from "react-redux";
import suggestionDetailsSlice from "../store/suggestionDetailsSlice";
import suggestionsPageSlice from "../store/suggestionsPageSlice";
import "./Suggestion.css";

function Suggestion(props) {
  const dispatch = useDispatch();
  const { hideSuggestionsPage } = suggestionsPageSlice.actions;
  const { suggestionsPageVisible } = useSelector(
    (store) => store.suggestionsPage
  );
  const { showSuggestionDetailsPage, getSuggestionDetailsID } =
    suggestionDetailsSlice.actions;

  const comments = props.comments.length;
  const replies = props.comments.reduce((sum, comment) => {
    if (comment.replies) {
      return sum + comment.replies.length;
    }
    return sum;
  }, 0);
  const commentAmount = comments + replies;

  function handleUpvote() {
    console.log("voted");
  }

  function handleSuggestionBox(event) {
    if (suggestionsPageVisible && !event.target.closest(".suggestion-upvote")) {
      dispatch(getSuggestionDetailsID(props.id));
      dispatch(hideSuggestionsPage());
      dispatch(showSuggestionDetailsPage());
    }
  }

  return (
    <div className="suggestion-container" onClick={handleSuggestionBox}>
      <button className="suggestion-upvote" onClick={handleUpvote}>
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
        <p className="upvote-amount">{props.upvotes}</p>
      </button>
      <div className="suggestion-text-box">
        <h3 className="suggestion-title">{props.title}</h3>
        <p className="suggestion-description">{props.description}</p>
        <span className="suggestion-category">{props.category}</span>
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
