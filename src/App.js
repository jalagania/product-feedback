import { useSelector } from "react-redux";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SuggestionsPage from "./components/SuggestionsPage";
import SuggestionDetailsPage from "./components/SuggestionDetailsPage";
import AddFeedbackPage from "./components/AddFeedbackPage";
import EditFeedbackPage from "./components/EditFeedbackPage";
import { useEffect } from "react";

function App() {
  const { suggestionsPageVisible } = useSelector(
    (store) => store.suggestionsPage
  );
  const { addFeedbackPageVisible } = useSelector(
    (store) => store.addFeedbackPage
  );
  const { suggestionDetailsPageVisible } = useSelector(
    (store) => store.suggestionDetails
  );
  const { editFeedbackPageVisible } = useSelector(
    (store) => store.editFeedbackPage
  );

  useEffect(() => {
    document.body.scrollIntoView();
  }, [
    suggestionsPageVisible,
    addFeedbackPageVisible,
    suggestionDetailsPageVisible,
    editFeedbackPageVisible,
  ]);

  return (
    <div className="container">
      {suggestionsPageVisible && (
        <div className="suggestions-page-wrapper">
          <Sidebar />
          <SuggestionsPage />
        </div>
      )}
      {addFeedbackPageVisible && <AddFeedbackPage />}
      {suggestionDetailsPageVisible && <SuggestionDetailsPage />}
      {editFeedbackPageVisible && <EditFeedbackPage />}
    </div>
  );
}

export default App;
