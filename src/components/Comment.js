import "./Comment.css";
import { useEffect, useRef, useState } from "react";
import ButtonWithBackground from "./ButtonWithBackground";
import { useDispatch, useSelector } from "react-redux";
import dataSlice from "../store/dataSlice";

function Comment(props) {
  const dispatch = useDispatch();
  const { addReply } = dataSlice.actions;
  const { currentUser } = useSelector((store) => store.data.appData);
  const { suggestionID } = useSelector((store) => store.suggestionDetails);

  const textareaRef = useRef();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyInput, setReplyInput] = useState("");

  function handleReplyInput(event) {
    setReplyInput(event.target.value);
  }

  function handleReplyButton() {
    setShowReplyInput(true);
  }

  function handlePostReply() {
    if (replyInput !== "") {
      const newReply = {
        content: replyInput,
        replyingTo: props.comment.user.username,
        user: { ...currentUser },
      };
      dispatch(addReply([suggestionID, props.id, newReply]));
      setShowReplyInput(false);
      setReplyInput("");
    }
  }

  useEffect(() => {
    textareaRef.current?.focus();
  }, [showReplyInput]);

  return (
    <div className={`comment-box ${props.class ? "reply" : ""}`}>
      <img src={props.comment.user.image} alt="user" />
      <div className="comment-details">
        <div className="user-info">
          <div className="user-credentials">
            <p className="name">{props.comment.user.name}</p>
            <p className="username">{props.comment.user.username}</p>
          </div>
          <button className="btn-reply" onClick={handleReplyButton}>
            Reply
          </button>
        </div>
        <p className="content">
          {props.class && (
            <span className="reply-to">{props.comment.replyingTo} </span>
          )}
          {props.comment.content}
        </p>
        {showReplyInput && (
          <div className="reply-input-box">
            <textarea
              className="reply-input"
              placeholder="Type your reply here"
              value={replyInput}
              onChange={handleReplyInput}
              ref={textareaRef}
            ></textarea>
            <ButtonWithBackground
              name="Post Reply"
              class="post-reply"
              handleButton={handlePostReply}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
