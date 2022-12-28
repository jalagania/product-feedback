import "./AddFeedback.css";

function AddFeedback() {
  function handleAddFeedback() {
    console.log("fuck");
  }

  return (
    <button className="btn-add-feedback" onClick={handleAddFeedback}>
      + Add Feedback
    </button>
  );
}

export default AddFeedback;
