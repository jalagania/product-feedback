import "./Reply.css";

function Reply(props) {
  return (
    <div className="comment-reply-box">
      <div className="comment-box">
        <img src={props.comment.user.image} alt="user" />
        <div className="comment-details">
          <div className="user-info">
            <div className="user-credentials">
              <p className="name">{props.comment.user.name}</p>
              <p className="username">{props.comment.user.username}</p>
            </div>
            <button className="btn-reply">Reply</button>
          </div>
          <p className="content">{props.comment.content}</p>
        </div>
      </div>
      {props.comment.replies &&
        props.comment.replies.map((reply, index) => {
          return (
            <div className="comment-box reply" key={index}>
              <img src={reply.user.image} alt="user" />
              <div className="comment-details">
                <div className="user-info">
                  <div className="user-credentials">
                    <p className="name">{reply.user.name}</p>
                    <p className="username">{reply.user.username}</p>
                  </div>
                  <button className="btn-reply">Reply</button>
                </div>
                <p className="content">
                  <span className="reply-to">{reply.replyingTo} </span>
                  {reply.content}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Reply;
