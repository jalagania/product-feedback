import "./Suggestion.css";

function Suggestion(props) {
  function handleUpvote() {
    console.log("voted");
  }

  function handleSuggestionBox(event) {
    if (!event.target.closest(".suggestion-upvote")) {
      console.log("I am a box");
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
        <span className="comment-amount">{props.comments?.length}</span>
      </div>
    </div>
  );
}

export default Suggestion;
