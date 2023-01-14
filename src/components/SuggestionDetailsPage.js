import "./SuggestionDetailsPage.css";
import { useEffect, useRef, useState } from "react";
import Suggestion from "./Suggestion";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import suggestionDetailsSlice from "../store/suggestionDetailsSlice";
import suggestionsPageSlice from "../store/suggestionsPageSlice";
import ButtonGoBack from "./ButtonGoBack";
import ButtonWithBackground from "./ButtonWithBackground";
import editFeedbackSlice from "../store/editFeedbackSlice";
import roadmapPageSlice from "../store/roadmapPageSlice";
import dataSlice from "../store/dataSlice";

function SuggestionDetailsPage() {
  const textareaRef = useRef();
  const [commentInput, setCommentInput] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(250);

  const dispatch = useDispatch();
  const { suggestionID, pageBeforeSuggestionDetails } = useSelector(
    (store) => store.suggestionDetails
  );
  const suggestion = useSelector((store) =>
    store.data.appData.productRequests.find(
      (request) => request.id === suggestionID
    )
  );
  const { currentUser } = useSelector((store) => store.data.appData);

  const { hideSuggestionDetailsPage } = suggestionDetailsSlice.actions;
  const { showSuggestionsPage } = suggestionsPageSlice.actions;
  const { showEditFeedbackPage } = editFeedbackSlice.actions;
  const { showRoadmapPage } = roadmapPageSlice.actions;
  const { addComment } = dataSlice.actions;

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
    if (pageBeforeSuggestionDetails === "suggestionsPage") {
      dispatch(showSuggestionsPage());
    } else {
      dispatch(showRoadmapPage());
    }
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

  function handleCommentSubmit() {
    if (commentInput !== "") {
      const id =
        suggestion.comments.length > 0
          ? suggestion.comments.slice(-1)[0].id + 1
          : 1;
      const newComment = {
        id: id,
        content: commentInput,
        user: { ...currentUser },
      };
      dispatch(addComment([suggestionID, newComment]));
      setCommentInput("");
      setCharactersLeft(250);
    }
  }

  useEffect(() => {
    function handleEnterPress(event) {
      if (
        document.activeElement === textareaRef.current &&
        event.key === "Enter" &&
        !event.shiftKey
      ) {
        handleCommentSubmit();
      }
    }
    document.addEventListener("keydown", handleEnterPress);

    return () => document.removeEventListener("keydown", handleEnterPress);
  }, []);

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
      <Suggestion name="" suggestion={suggestion} />
      {suggestion.comments.length > 0 && (
        <div className="comments-container">
          <h3>
            <span>{commentAmount}</span>
            <span> Comments</span>
          </h3>
          {suggestion.comments.map((comment) => {
            return (
              <div className="comment-reply-wrapper" key={comment.id}>
                <Comment comment={comment} id={comment.id} />
                {comment.replies?.map((reply, index) => {
                  return (
                    <Comment
                      key={index}
                      id={comment.id}
                      comment={reply}
                      class="reply"
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      <form
        className="add-comment-box"
        onSubmit={(event) => {
          event.preventDefault();
          handleCommentSubmit();
        }}
      >
        <h3>Add Comment</h3>
        <textarea
          className="comment-input"
          placeholder="Type your comment here"
          value={commentInput}
          onChange={handleCommentInput}
          ref={textareaRef}
        ></textarea>
        <div className="button-box">
          <p className="characters-amount">
            <span className="amount">{charactersLeft} </span>Characters left
          </p>
          <ButtonWithBackground name="Post Comment" class="post-comment" />
        </div>
      </form>
    </div>
  );
}

export default SuggestionDetailsPage;
