import AddEditFeedback from "./AddEditFeedback";
import "./AddFeedbackPage.css";
import ButtonGoBack from "./ButtonGoBack";

function AddFeedbackPage() {
  function handleGoBack() {
    console.log("go fucking back");
  }

  return (
    <div className="create-feedback-container">
      <ButtonGoBack handleGoBack={handleGoBack} />
      <AddEditFeedback name="new" />
    </div>
  );
}

export default AddFeedbackPage;
