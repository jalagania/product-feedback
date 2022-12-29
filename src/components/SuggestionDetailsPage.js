import "./SuggestionDetailsPage.css";
import Suggestion from "./Suggestion";
import { useSelector } from "react-redux";

function SuggestionDetailsPage() {
  const { suggestionID } = useSelector((store) => store.suggestionDetails);
  const suggestion = useSelector((store) =>
    store.data.appData.productRequests.find(
      (request) => request.id === suggestionID
    )
  );

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
      <div className="comments-box">
        <h3>
          <span>4</span>
          <span> Comments</span>
        </h3>
      </div>
    </div>
  );
}

export default SuggestionDetailsPage;
