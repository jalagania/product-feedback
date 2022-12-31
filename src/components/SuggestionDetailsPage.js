import "./SuggestionDetailsPage.css";
import { useState } from "react";
import Suggestion from "./Suggestion";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import suggestionDetailsSlice from "../store/suggestionDetailsSlice";
import suggestionsPageSlice from "../store/suggestionsPageSlice";
import ButtonGoBack from "./ButtonGoBack";
import ButtonWithBackground from "./ButtonWithBackground";
import editFeedbackSlice from "../store/editFeedbackSlice";

function SuggestionDetailsPage() {
  const [commentInput, setCommentInput] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(250);

  const dispatch = useDispatch();
  const { suggestionID } = useSelector((store) => store.suggestionDetails);
  const suggestion = useSelector((store) =>
    store.data.appData.productRequests.find(
      (request) => request.id === suggestionID
    )
  );

  const { hideSuggestionDetailsPage } = suggestionDetailsSlice.actions;
  const { showSuggestionsPage } = suggestionsPageSlice.actions;
  const { showEditFeedbackPage } = editFeedbackSlice.actions;

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

  function handleEditFeedback() {
    dispatch(hideSuggestionDetailsPage());
    dispatch(showEditFeedbackPage());
  }

  function handleCommentInput(event) {
    if (event.target.value.length <= 250) {
      setCommentInput(event.target.value);
      setCharactersLeft(250 - event.target.value.length);
    }
  }

  function handleCommentSubmit(event) {
    event.preventDefault();
    setCommentInput("");
    console.log("submit comment");
  }

  return (
    <div className="suggestion-details-container">
      <div className="buttons-box">
        <ButtonGoBack handleGoBack={handleGoBack} />
        <ButtonWithBackground
          name="Edit Feedback"
          class="edit-feedback"
          handleButton={handleEditFeedback}
        />
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
            return (
              <div key={comment.id}>
                <Comment comment={comment} />
                {comment.replies?.map((reply, index) => {
                  return <Comment key={index} comment={reply} class="reply" />;
                })}
              </div>
            );
          })}
        </div>
      )}
      <form className="add-comment-box" onSubmit={handleCommentSubmit}>
        <h3>Add Comment</h3>
        <textarea
          className="comment-input"
          placeholder="Type your comment here"
          value={commentInput}
          onChange={handleCommentInput}
        ></textarea>
        <div className="button-box">
          <p className="characters-amount">
            <span className="amount">{charactersLeft} </span> Characters left
          </p>
          <ButtonWithBackground
            name="Post Comment"
            class="post-comment"
            handleButton={handleCommentSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default SuggestionDetailsPage;
