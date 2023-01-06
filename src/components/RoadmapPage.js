import "./RoadmapPage.css";
import { useState } from "react";
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

  const [selectedStatus, setSelectedStatus] = useState("planned");

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
      <div className="roadmap-subheader">
        <h4
          className={selectedStatus === "planned" ? "selected-status" : "faded"}
          onClick={() => setSelectedStatus("planned")}
        >
          Planned ({planned})
        </h4>
        <h4
          className={
            selectedStatus === "in-progress" ? "selected-status" : "faded"
          }
          onClick={() => setSelectedStatus("in-progress")}
        >
          In-Progress ({progress})
        </h4>
        <h4
          className={selectedStatus === "live" ? "selected-status" : "faded"}
          onClick={() => setSelectedStatus("live")}
        >
          Live ({live})
        </h4>
      </div>
      <div className="roadmap-body">
        <div
          className={`planned-box ${
            selectedStatus === "planned" ? "visible" : ""
          }`}
        >
          <div className="title-box">
            <h3>Planned ({planned})</h3>
            <p>Ideas prioritized for research</p>
          </div>
          {productRequests
            .slice()
            .sort((a, b) => b.upvotes - a.upvotes)
            .filter((suggestion) => suggestion === "planned")
            .map((suggestion) => {
              return (
                <Suggestion
                  key={suggestion.id}
                  name="roadmap"
                  class="hover"
                  suggestion={suggestion}
                />
              );
            })}
        </div>
        <div
          className={`in-progress-box ${
            selectedStatus === "in-progress" ? "visible" : ""
          }`}
        >
          <div className="title-box">
            <h3>In-Progress ({progress})</h3>
            <p>Currently being developed</p>
          </div>
          {productRequests
            .slice()
            .sort((a, b) => b.upvotes - a.upvotes)
            .filter((suggestion) => suggestion === "in-progress")
            .map((suggestion) => {
              return (
                <Suggestion
                  key={suggestion.id}
                  name="roadmap"
                  class="hover"
                  suggestion={suggestion}
                />
              );
            })}
        </div>
        <div
          className={`live-box ${selectedStatus === "live" ? "visible" : ""}`}
        >
          <div className="title-box">
            <h3>Live ({live})</h3>
            <p>Released features</p>
          </div>
          {productRequests
            .slice()
            .sort((a, b) => b.upvotes - a.upvotes)
            .filter((suggestion) => suggestion === "live")
            .map((suggestion) => {
              return (
                <Suggestion
                  key={suggestion.id}
                  name="roadmap"
                  class="hover"
                  suggestion={suggestion}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage;
