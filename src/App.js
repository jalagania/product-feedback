import "./App.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import SuggestionsPage from "./components/SuggestionsPage";
import SuggestionDetailsPage from "./components/SuggestionDetailsPage";
import AddFeedbackPage from "./components/AddFeedbackPage";
import EditFeedbackPage from "./components/EditFeedbackPage";
import RoadmapPage from "./components/RoadmapPage";
import Attribution from "./components/Attribution";

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
  const { roadmapPageVisible } = useSelector((store) => store.roadmapPage);

  useEffect(() => {
    document.body.scrollIntoView();
  }, [
    suggestionsPageVisible,
    addFeedbackPageVisible,
    suggestionDetailsPageVisible,
    editFeedbackPageVisible,
    roadmapPageVisible,
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
      {roadmapPageVisible && <RoadmapPage />}
      <Attribution />
    </div>
  );
}

export default App;
