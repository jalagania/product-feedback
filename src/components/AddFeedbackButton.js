import "./AddFeedbackButton.css";

function AddFeedbackButton() {
  function handleAddFeedbackButton() {
    console.log("fuck");
  }

  return (
    <button className="btn-add-feedback" onClick={handleAddFeedbackButton}>
      + Add Feedback
    </button>
  );
}

export default AddFeedbackButton;
