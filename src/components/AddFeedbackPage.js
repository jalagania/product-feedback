import { useDispatch, useSelector } from "react-redux";
import addFeedbackSlice from "../store/addFeedbackSlice";
import suggestionsPageSlice from "../store/suggestionsPageSlice";
import AddEditFeedback from "./AddEditFeedback";
import "./AddFeedbackPage.css";
import ButtonGoBack from "./ButtonGoBack";
import roadmapPageSlice from "../store/roadmapPageSlice";

function AddFeedbackPage() {
  const dispatch = useDispatch();
  const { pageBeforeAddFeedback } = useSelector(
    (store) => store.addFeedbackPage
  );
  const { showSuggestionsPage } = suggestionsPageSlice.actions;
  const { hideAddFeedbackPage } = addFeedbackSlice.actions;
  const { showRoadmapPage } = roadmapPageSlice.actions;

  function handleGoBack() {
    dispatch(hideAddFeedbackPage());
    if (pageBeforeAddFeedback === "suggestionsPage") {
      dispatch(showSuggestionsPage());
    } else {
      dispatch(showRoadmapPage());
    }
  }

  return (
    <div className="add-feedback-container">
      <ButtonGoBack handleGoBack={handleGoBack} />
      <AddEditFeedback name="new" />
    </div>
  );
}

export default AddFeedbackPage;
