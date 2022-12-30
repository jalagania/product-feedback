import "./SuggestionDetailsPage.css";
import Suggestion from "./Suggestion";
import { useSelector } from "react-redux";
import Reply from "./Reply";

function SuggestionDetailsPage() {
  const { suggestionID } = useSelector((store) => store.suggestionDetails);
  const suggestion = useSelector((store) =>
    store.data.appData.productRequests.find(
      (request) => request.id === suggestionID
    )
  );
  const commentAmount = suggestion.comments.length;

  return (
    <div className="suggestion-details-container">
      <div className="buttons-box">
        <button className="btn-go-back">
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
