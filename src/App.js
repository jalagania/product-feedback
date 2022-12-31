import { useSelector } from "react-redux";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SuggestionsPage from "./components/SuggestionsPage";
import SuggestionDetailsPage from "./components/SuggestionDetailsPage";
import AddFeedbackPage from "./components/AddFeedbackPage";

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
    </div>
  );
}

export default App;
