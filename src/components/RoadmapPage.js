import "./RoadmapPage.css";
import ButtonGoBack from "./ButtonGoBack";
import ButtonWithBackground from "./ButtonWithBackground";
import { useSelector } from "react-redux";
import Suggestion from "./Suggestion";

function handleGoBack() {}

function handleAddFeedback() {}

function RoadmapPage() {
  const suggestions = useSelector(
    (store) => store.data.appData.productRequests
  );
  const planned = suggestions.filter(
    (suggestion) => suggestion.status === "planned"
  ).length;
  const progress = suggestions.filter(
    (suggestion) => suggestion.status === "in-progress"
  ).length;
  const live = suggestions.filter(
    (suggestion) => suggestion.status === "live"
  ).length;

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
          {suggestions.map((suggestion) => {
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
          {suggestions.map((suggestion) => {
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
          {suggestions.map((suggestion) => {
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
