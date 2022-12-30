import "./SuggestionDetailsPage.css";
import Suggestion from "./Suggestion";
import { useDispatch, useSelector } from "react-redux";
import Reply from "./Reply";
import suggestionDetailsSlice from "../store/suggestionDetailsSlice";
import suggestionsPageSlice from "../store/suggestionsPageSlice";

function SuggestionDetailsPage() {
  const dispatch = useDispatch();
  const { suggestionID } = useSelector((store) => store.suggestionDetails);
  const suggestion = useSelector((store) =>
    store.data.appData.productRequests.find(
      (request) => request.id === suggestionID
    )
  );
  const { hideSuggestionDetailsPage } = suggestionDetailsSlice.actions;
  const { showSuggestionsPage } = suggestionsPageSlice.actions;

  const comments = suggestion.comments.length;
  const replies = suggestion.comments.reduce((sum, comment) => {
    if (comment.replies) {
      return sum + comment.replies.length;
    }
    return sum;
  }, 0);
  const commentAmount = comments + replies;

  function handleGoBack() {
    dispatch(hideSuggestionDetailsPage());
    dispatch(showSuggestionsPage());
  }

  return (
    <div className="suggestion-details-container">
      <div className="buttons-box">
        <button className="btn-go-back" onClick={handleGoBack}>
          <img
            src={process.env.PUBLIC_URL + "/assets/shared/icon-arrow-left.svg"}
            alt="left arrow"
          />
          <span>Go Back</span>
        </button>
        <button className="btn-edit-feedback">Edit Feedback</button>
      </div>
      <Suggestion
        upvotes={suggestion.upvotes}
        title={suggestion.title}
        description={suggestion.description}
        category={suggestion.category}
        comments={suggestion.comments}
      />
      {suggestion.comments.length > 0 && (
        <div className="comments-container">
          <h3>
            <span>{commentAmount}</span>
            <span> Comments</span>
          </h3>
          {suggestion.comments.map((comment) => {
            return <Reply key={comment.id} comment={comment} />;
          })}
        </div>
      )}
      <form className="add-comment-box">
        <h3>Add Comment</h3>
        <textarea
          className="comment-input"
          placeholder="Type your comment here"
        ></textarea>
        <div className="button-box">
          <p className="characters-amount">
            <span className="amount">250 </span> Characters left
          </p>
          <button className="btn-post-comment">Post Comment</button>
        </div>
      </form>
    </div>
  );
}

export default SuggestionDetailsPage;
