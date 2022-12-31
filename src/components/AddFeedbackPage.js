import "./AddFeedbackPage.css";
import ButtonGoBack from "./ButtonGoBack";
import ButtonWithBackground from "./ButtonWithBackground";

function AddFeedbackPage() {
  function handleGoBack() {
    console.log("go fucking back");
  }

  function handleButton() {
    console.log("handle my cock");
  }

  return (
    <div className="create-feedback-container">
      <ButtonGoBack handleGoBack={handleGoBack} />
      <div className="create-feedback-box">
        <img
          className="new-feedback-icon"
          src={process.env.PUBLIC_URL + "./assets/shared/icon-new-feedback.svg"}
          alt=""
        />
        <h1>Create New Feedback</h1>
        <h4>Feedback Title</h4>
        <p className="instruction-text">Add a short, descriptive headline</p>
        <input type="text" />
        <h4>Category</h4>
        <p className="instruction-text">Choose a category for your feedback</p>
        <input type="text" className="feedback-input" />
        <h4>Feedback Detail</h4>
        <p className="instruction-text">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea></textarea>
        <div className="feedback-buttons-box">
          <ButtonWithBackground
            name="Cancel"
            class="cancel"
            handleButton={handleButton}
          />
          <ButtonWithBackground
            name="Add Feedback"
            class="add-feedback"
            handleButton={handleButton}
          />
        </div>
      </div>
    </div>
  );
}

export default AddFeedbackPage;
