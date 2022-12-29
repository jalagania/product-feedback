import { useSelector } from "react-redux";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SuggestionsPage from "./components/SuggestionsPage";
import SuggestionDetailsPage from "./components/SuggestionDetailsPage";

function App() {
  const { suggestionsPageVisible } = useSelector(
    (store) => store.suggestionsPage
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
      {suggestionDetailsPageVisible && <SuggestionDetailsPage />}
    </div>
  );
}

export default App;
