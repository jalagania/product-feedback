import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sidebarSlice from "../store/sidebarSlice";
import "./Sidebar.css";

function Sidebar() {
  const [keyword, setKeyword] = useState("All");
  const dispatch = useDispatch();
  const { filterSuggestions } = sidebarSlice.actions;
  const { appData } = useSelector((store) => store.data);

  const planned = appData.productRequests.filter(
    (request) => request.status === "planned"
  ).length;
  const progress = appData.productRequests.filter(
    (request) => request.status === "in-progress"
  ).length;
  const live = appData.productRequests.filter(
    (request) => request.status === "live"
  ).length;

  function handleKeyword(event) {
    dispatch(filterSuggestions([event.target.textContent, appData]));
    setKeyword(event.target.textContent);
  }

  return (
    <div className="sidebar-box">
      <div className="logo-box">
        <p className="logo-text">Frontend Mentor</p>
        <p className="logo-subtext">Feedback Board</p>
      </div>
      <div className="keywords-box">
        <button
          className={`keyword ${keyword === "All" ? "selected" : ""}`}
          onClick={handleKeyword}
        >
          All
        </button>
        <button
          className={`keyword ${keyword === "UI" ? "selected" : ""}`}
          onClick={handleKeyword}
        >
          UI
        </button>
        <button
          className={`keyword ${keyword === "UX" ? "selected" : ""}`}
          onClick={handleKeyword}
        >
          UX
        </button>
        <button
          className={`keyword ${keyword === "Enhancement" ? "selected" : ""}`}
          onClick={handleKeyword}
        >
          Enhancement
        </button>
        <button
          className={`keyword ${keyword === "Bug" ? "selected" : ""}`}
          onClick={handleKeyword}
        >
          Bug
        </button>
        <button
          className={`keyword ${keyword === "Feature" ? "selected" : ""}`}
          onClick={handleKeyword}
        >
          Feature
        </button>
      </div>
      <div className="roadmap-box">
        <div className="roadmap-title-box">
          <p className="title">Roadmap</p>
          <button className="view">View</button>
        </div>
        <ul className="roadmap-list">
          <li className="planned">
            <p className="item-name">Planned</p>
            <p className="item-amount">{planned}</p>
          </li>
          <li className="progress">
            <p className="item-name">In-Progress</p>
            <p className="item-amount">{progress}</p>
          </li>
          <li className="live">
            <p className="item-name">Live</p>
            <p className="item-amount">{live}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
