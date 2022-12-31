import AddEditFeedback from "./AddEditFeedback";
import "./EditFeedbackPage.css";
import ButtonGoBack from "./ButtonGoBack";
import { useDispatch } from "react-redux";
import editFeedbackSlice from "../store/editFeedbackSlice";
import suggestionDetailsSlice from "../store/suggestionDetailsSlice";

function EditFeedbackPage() {
  const dispatch = useDispatch();
  const { hideEditFeedbackPage } = editFeedbackSlice.actions;
  const { showSuggestionDetailsPage } = suggestionDetailsSlice.actions;

  function handleGoBack() {
    dispatch(hideEditFeedbackPage());
    dispatch(showSuggestionDetailsPage());
  }

  return (
    <div className="edit-feedback-container">
      <ButtonGoBack handleGoBack={handleGoBack} />
      <AddEditFeedback name="edit" />
    </div>
  );
}

export default EditFeedbackPage;
