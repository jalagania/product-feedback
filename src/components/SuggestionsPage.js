import "./SuggestionsPage.css";
import { useEffect, useState } from "react";
import Suggestion from "./Suggestion";
import { useDispatch, useSelector } from "react-redux";
import suggestionsPageSlice from "../store/suggestionsPageSlice";
import ButtonWithBackground from "./ButtonWithBackground";
import addFeedbackSlice from "../store/addFeedbackSlice";

function SuggestionsPage() {
  const dispatch = useDispatch();
  const { appData } = useSelector((store) => store.data);
  const suggestions = useSelector((store) =>
    store.data.appData.productRequests.filter(
      (request) => request.status === "suggestion"
    )
  );
  const { hideSuggestionsPage } = suggestionsPageSlice.actions;
  const { keyword } = useSelector((store) => store.suggestionsPage);
  const { showAddFeedbackPage, setPageBeforeAddFeedback } =
    addFeedbackSlice.actions;

  const sortItems = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortCategory, setSortCategory] = useState("Most Upvotes");
  const [sortedData, setSortedData] = useState(suggestions);

  function filterSuggestions() {
    switch (keyword) {
      case "All":
        setSortedData(suggestions);
        break;
      case "UI":
        setSortedData(
          suggestions.filter((request) => request.category === "UI")
        );
        break;
      case "UX":
        setSortedData(
          suggestions.filter((request) => request.category === "UX")
        );
        break;
      case "Enhancement":
        setSortedData(
          suggestions.filter((request) => request.category === "enhancement")
        );
        break;
      case "Bug":
        setSortedData(
          suggestions.filter((request) => request.category === "bug")
        );
        break;
      case "Feature":
        setSortedData(
          suggestions.filter((request) => request.category === "feature")
        );
        break;
    }
  }

  function sortSuggestions() {
    if (sortCategory === "Most Upvotes") {
      setSortedData(suggestions.sort((a, b) => b.upvotes - a.upvotes));
    }

    if (sortCategory === "Least Upvotes") {
      setSortedData(suggestions.sort((a, b) => a.upvotes - b.upvotes));
    }

    if (sortCategory === "Most Comments") {
      setSortedData(
        suggestions.sort(
          (a, b) =>
            b.comments.length +
            b.comments.reduce((sum, comment) => {
              if (comment.replies) {
                return sum + comment.replies.length;
              }
              return sum;
            }, 0) -
            (a.comments.length +
              a.comments.reduce((sum, comment) => {
                if (comment.replies) {
                  return sum + comment.replies.length;
                }
                return sum;
              }, 0))
        )
      );
    }

    if (sortCategory === "Least Comments") {
      setSortedData(
        suggestions.sort(
          (a, b) =>
            a.comments.length +
            a.comments.reduce((sum, comment) => {
              if (comment.replies) {
                return sum + comment.replies.length;
              }
              return sum;
            }, 0) -
            (b.comments.length +
              b.comments.reduce((sum, comment) => {
                if (comment.replies) {
                  return sum + comment.replies.length;
                }
                return sum;
              }, 0))
        )
      );
    }
  }

  function handleSortButton() {
    setShowSortMenu(!showSortMenu);
  }

  function handleSortCategory(event) {
    setSortCategory(event.target.textContent);
    setShowSortMenu(false);
  }

  function handleAddFeedback() {
    dispatch(setPageBeforeAddFeedback("suggestionsPage"));
    dispatch(hideSuggestionsPage());
    dispatch(showAddFeedbackPage());
  }

  useEffect(() => {
    setSortedData(suggestions);
    sortSuggestions();
    filterSuggestions();
  }, [appData, keyword, sortCategory]);

  useEffect(() => {
    function closeSortMenu(event) {
      if (
        !event.target.closest(".sort-box") &&
        !event.target.closest(".sort-menu")
      ) {
        setShowSortMenu(false);
      }
    }
    document.addEventListener("click", closeSortMenu);

    return () => document.removeEventListener("click", closeSortMenu);
  }, []);

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
          <span className="suggestion-amount">{sortedData.length}</span>
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
          {sortItems.map((item, index) => {
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
        {sortedData.length > 0 &&
          sortedData.map((request) => {
            return (
              <Suggestion
                key={request.id}
                name=""
                class="hover"
                suggestion={request}
              />
            );
          })}
        {sortedData.length === 0 && (
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
