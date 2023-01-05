import "./RoadmapPage.css";
import ButtonGoBack from "./ButtonGoBack";
import ButtonWithBackground from "./ButtonWithBackground";
import { useDispatch, useSelector } from "react-redux";
import Suggestion from "./Suggestion";
import addFeedbackSlice from "../store/addFeedbackSlice";
import roadmapPageSlice from "../store/roadmapPageSlice";
import suggestionsPageSlice from "../store/suggestionsPageSlice";

function RoadmapPage() {
  const dispatch = useDispatch();
  const { productRequests } = useSelector((store) => store.data.appData);
  const planned = productRequests.filter(
    (suggestion) => suggestion.status === "planned"
  ).length;
  const progress = productRequests.filter(
    (suggestion) => suggestion.status === "in-progress"
  ).length;
  const live = productRequests.filter(
    (suggestion) => suggestion.status === "live"
  ).length;
  const { showSuggestionsPage } = suggestionsPageSlice.actions;
  const { hideRoadmapPage } = roadmapPageSlice.actions;
  const { showAddFeedbackPage, setPageBeforeAddFeedback } =
    addFeedbackSlice.actions;

  function handleGoBack() {
    dispatch(hideRoadmapPage());
    dispatch(showSuggestionsPage());
  }

  function handleAddFeedback() {
    dispatch(setPageBeforeAddFeedback("roadmapPage"));
    dispatch(showAddFeedbackPage());
    dispatch(hideRoadmapPage());
  }

  return (
    <div className="roadmap-container">
      <div className="roadmap-header">
        <div className="button-title-box">
          <ButtonGoBack handleGoBack={handleGoBack} />
          <h2>Roadmap</h2>
        </div>
        <ButtonWithBackground
          name="+ Add Feedback"
          class="add-feedback"
          handleButton={handleAddFeedback}
        />
      </div>
      <div className="roadmap-body">
        <div className="planned-box">
          <div className="title-box">
            <h3>Planned ({planned})</h3>
            <p>Ideas prioritized for research</p>
          </div>
          {productRequests
            .slice()
            .sort((a, b) => b.upvotes - a.upvotes)
            .map((suggestion) => {
              if (suggestion.status === "planned") {
                return (
                  <Suggestion
                    key={suggestion.id}
                    name="roadmap"
                    class="hover"
                    suggestion={suggestion}
                  />
                );
              }
            })}
        </div>
        <div className="in-progress-box">
          <div className="title-box">
            <h3>In-Progress ({progress})</h3>
            <p>Currently being developed</p>
          </div>
          {productRequests
            .slice()
            .sort((a, b) => b.upvotes - a.upvotes)
            .map((suggestion) => {
              if (suggestion.status === "in-progress") {
                return (
                  <Suggestion
                    key={suggestion.id}
                    name="roadmap"
                    class="hover"
                    suggestion={suggestion}
                  />
                );
              }
            })}
        </div>
        <div className="live-box">
          <div className="title-box">
            <h3>Live ({live})</h3>
            <p>Released features</p>
          </div>
          {productRequests
            .slice()
            .sort((a, b) => b.upvotes - a.upvotes)
            .map((suggestion) => {
              if (suggestion.status === "live") {
                return (
                  <Suggestion
                    key={suggestion.id}
                    name="roadmap"
                    class="hover"
                    suggestion={suggestion}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage;
