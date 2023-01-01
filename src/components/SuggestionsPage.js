import "./SuggestionsPage.css";
import { useEffect } from "react";
import Suggestion from "./Suggestion";
import { useDispatch, useSelector } from "react-redux";
import suggestionsPageSlice from "../store/suggestionsPageSlice";
import dataSlice from "../store/dataSlice";
import ButtonWithBackground from "./ButtonWithBackground";
import addFeedbackSlice from "../store/addFeedbackSlice";

function SuggestionsPage() {
  const dispatch = useDispatch();
  const { sortData } = dataSlice.actions;
  const { filteredData } = useSelector((store) => store.data);
  const { hideSuggestionsPage, toggleSortMenu, setSortCategory } =
    suggestionsPageSlice.actions;
  const { keyword, showSortMenu, sortCategory } = useSelector(
    (store) => store.suggestionsPage
  );
  const { showAddFeedbackPage } = addFeedbackSlice.actions;

  const sotrItems = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];

  function handleSortButton() {
    dispatch(toggleSortMenu());
  }

  function handleSortCategory(event) {
    dispatch(setSortCategory(event.target.textContent));
  }

  function handleAddFeedback() {
    dispatch(hideSuggestionsPage());
    dispatch(showAddFeedbackPage());
  }

  useEffect(() => {
    dispatch(sortData(sortCategory));
  }, [keyword, sortCategory]);

  return (
    <div className="suggestions-page">
      <header>
        <div className="suggestions-text-box">
          <img
            src={
              process.env.PUBLIC_URL +
              "/assets/suggestions/icon-suggestions.svg"
            }
            alt="bulb"
            className="bulb-icon"
          />
          <span className="suggestion-amount">{filteredData.length}</span>
          <span className="suggestion-text">Suggestions</span>
        </div>
        <button className="sort-box" onClick={handleSortButton}>
          <span className="sort-text">Sort by :</span>
          <span className="sort-category">{sortCategory}</span>
          <svg
            className={showSortMenu ? "rotate" : ""}
            width="10"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1l4 4 4-4"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <ul className={`sort-menu ${showSortMenu ? "" : "hidden"}`}>
          {sotrItems.map((item, index) => {
            return (
              <li
                className="menu-item"
                key={index}
                onClick={handleSortCategory}
              >
                <p>{item}</p>
                <img
                  className={sortCategory === item ? "" : "hidden"}
                  src={process.env.PUBLIC_URL + "/assets/shared/icon-check.svg"}
                  alt="check"
                />
              </li>
            );
          })}
        </ul>
        <ButtonWithBackground
          name="+ Add Feedback"
          class="add-feedback"
          handleButton={handleAddFeedback}
        />
      </header>
      <div className="suggestions-container">
        {filteredData.length > 0 &&
          filteredData.map((request) => {
            return (
              <Suggestion
                key={request.id}
                name=""
                class="hover"
                suggestion={request}
              />
            );
          })}
        {filteredData.length === 0 && (
          <div className="no-feedback-box">
            <img
              src={
                process.env.PUBLIC_URL +
                "assets/suggestions/illustration-empty.svg"
              }
              alt="empty illustration"
            />
            <h2 className="no-feedback-title">There is no feedback yet.</h2>
            <p className="no-feedback-text">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
            <ButtonWithBackground
              name="+ Add Feedback"
              class="add-feedback"
              handleButton={handleAddFeedback}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SuggestionsPage;
