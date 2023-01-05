import "./AddEditFeedback.css";
import { useEffect, useState } from "react";
import ButtonWithBackground from "./ButtonWithBackground";
import { useDispatch, useSelector } from "react-redux";
import dataSlice from "../store/dataSlice";
import suggestionDetailsSlice from "../store/suggestionDetailsSlice";
import editFeedbackSlice from "../store/editFeedbackSlice";
import addFeedbackSlice from "../store/addFeedbackSlice";
import suggestionsPageSlice from "../store/suggestionsPageSlice";
import roadmapPageSlice from "../store/roadmapPageSlice";

function AddEditFeedback(props) {
  const dispatch = useDispatch();
  const { suggestionID, pageBeforeSuggestionDetails } = useSelector(
    (store) => store.suggestionDetails
  );
  const suggestion = useSelector((store) =>
    store.data.appData.productRequests.find(
      (request) => request.id === suggestionID
    )
  );
  const { pageBeforeAddFeedback } = useSelector(
    (store) => store.addFeedbackPage
  );
  const { addFeedback, deleteFeedback, editFeedback } = dataSlice.actions;
  const { showSuggestionDetailsPage } = suggestionDetailsSlice.actions;
  const { hideAddFeedbackPage } = addFeedbackSlice.actions;
  const { hideEditFeedbackPage } = editFeedbackSlice.actions;
  const { showSuggestionsPage } = suggestionsPageSlice.actions;
  const { showRoadmapPage } = roadmapPageSlice.actions;

  const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const statusItems = ["Suggestion", "Planned", "In-Progress", "Live"];
  const newFeedbackID = useSelector(
    (store) =>
      store.data.appData.productRequests.slice().sort((a, b) => b.id - a.id)[0]
        .id
  );

  const [title, setTitle] = useState(
    props.name === "new" ? "" : suggestion.title
  );
  const [comment, setComment] = useState(
    props.name === "new" ? "" : suggestion.description
  );
  const [category, setCategory] = useState(
    props.name === "new" ? "Feature" : suggestion.category
  );
  const [showCategories, setShowCategories] = useState(false);
  const [status, setStatus] = useState(suggestion?.status);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorComment, setErrorComment] = useState(false);

  function handleTitleChange(event) {
    if (event.target.value.length <= 50) {
      setTitle(event.target.value);
    }
  }

  function handleCategoryMenu() {
    setShowCategories(!showCategories);
  }

  function handleMenuItem(event) {
    setCategory(event.target.textContent);
    setShowCategories(false);
  }

  function handleStatusMenu() {
    setShowStatusMenu(!showStatusMenu);
  }

  function handleStatusItem(event) {
    setStatus(event.target.textContent);
    setShowStatusMenu(false);
  }

  function handleCommentChange(event) {
    if (event.target.value.length <= 250) {
      setComment(event.target.value);
    }
  }

  function handleButton(event) {
    if (event.target.textContent === "Delete") {
      dispatch(deleteFeedback(suggestionID));
      dispatch(hideEditFeedbackPage());
      if (pageBeforeSuggestionDetails === "suggestionsPage") {
        dispatch(showSuggestionsPage());
      } else {
        dispatch(showRoadmapPage());
      }
    }

    if (event.target.textContent === "Cancel") {
      if (props.name === "new") {
        dispatch(hideAddFeedbackPage());
        resetAll();
        if (pageBeforeAddFeedback === "suggestionsPage") {
          dispatch(showSuggestionsPage());
        } else {
          dispatch(showRoadmapPage());
        }
      } else {
        dispatch(hideEditFeedbackPage());
        dispatch(showSuggestionDetailsPage());
      }
    }

    if (
      event.target.textContent === "Add Feedback" ||
      event.target.textContent === "Save Changes"
    ) {
      if (title === "") {
        setErrorTitle(true);
      } else {
        setErrorTitle(false);
      }

      if (comment === "") {
        setErrorComment(true);
      } else {
        setErrorComment(false);
      }
    }

    if (title !== "" && comment !== "") {
      if (event.target.textContent === "Add Feedback") {
        const newFeedback = {
          id: newFeedbackID + 1,
          title: title,
          category:
            category.length === 2
              ? category.toUpperCase()
              : category.toLowerCase(),
          upvotes: 0,
          upvoted: false,
          status: "suggestion",
          description: comment,
          comments: [],
        };
        dispatch(addFeedback(newFeedback));
        dispatch(hideAddFeedbackPage());
        resetAll();
        if (pageBeforeAddFeedback === "suggestionsPage") {
          dispatch(showSuggestionsPage());
        } else {
          dispatch(showRoadmapPage());
        }
      }

      if (event.target.textContent === "Save Changes") {
        const newFeedback = {
          title: title,
          category:
            category.length === 2
              ? category.toUpperCase()
              : category.toLowerCase(),
          status: status.toLowerCase(),
          description: comment,
        };
        dispatch(editFeedback([suggestionID, newFeedback]));
        dispatch(hideEditFeedbackPage());
        dispatch(showSuggestionDetailsPage());
      }
    }
  }

  function resetAll() {
    setTitle("");
    setCategory("Feature");
    setComment("");
  }

  useEffect(() => {
    function closeCategoryMenu(event) {
      if (
        !event.target.closest(".btn-feedback-category") &&
        !event.target.closest(".category-menu")
      ) {
        setShowCategories(false);
      }
    }
    document.addEventListener("click", closeCategoryMenu);

    function closeStatusMenu(event) {
      if (
        !event.target.closest(".btn-feedback-status") &&
        !event.target.closest(".category-menu")
      ) {
        setShowStatusMenu(false);
      }
    }
    document.addEventListener("click", closeStatusMenu);

    return () => {
      document.removeEventListener("click", closeCategoryMenu);
      document.removeEventListener("click", closeStatusMenu);
    };
  }, []);

  return (
    <div className="create-feedback-box">
      <img
        className="new-feedback-icon"
        src={
          process.env.PUBLIC_URL +
          `./assets/shared/icon-${props.name}-feedback.svg`
        }
        alt={props.name}
      />
      {props.name === "new" ? (
        <h1>Create New Feedback</h1>
      ) : (
        <h1>Editing '{suggestion.title}'</h1>
      )}
      <h4>Feedback Title</h4>
      <p className="instruction-text">Add a short, descriptive headline</p>
      <input
        className={errorTitle ? "error-border" : ""}
        type="text"
        value={title}
        onChange={handleTitleChange}
      />
      {errorTitle && <p className="error-text">Can't be empty</p>}
      <h4>Category</h4>
      <p className="instruction-text">Choose a category for your feedback</p>
      <div className="category-menu-box">
        <button
          className={`btn-feedback-category ${
            showCategories ? "blue-border" : ""
          }`}
          onClick={handleCategoryMenu}
        >
          <span>{category}</span>
          <img
            className={showCategories ? "rotate" : ""}
            src={process.env.PUBLIC_URL + "./assets/shared/icon-arrow-down.svg"}
            alt="down arrow"
          />
        </button>
        <ul className={`category-menu ${showCategories ? "" : "hidden"}`}>
          {categories.map((item, index) => {
            return (
              <li
                className="category-menu-item"
                key={index}
                onClick={handleMenuItem}
              >
                <p>{item}</p>
                <img
                  className={
                    category.toLowerCase() === item.toLowerCase()
                      ? ""
                      : "hidden"
                  }
                  src={process.env.PUBLIC_URL + "/assets/shared/icon-check.svg"}
                  alt="check"
                />
              </li>
            );
          })}
        </ul>
      </div>
      {props.name === "edit" && (
        <div className="status-container">
          <h4>Update Status</h4>
          <p className="instruction-text">Change feature state</p>
          <div className="status-menu-box">
            <button
              className={`btn-feedback-status ${
                showStatusMenu ? "blue-border" : ""
              }`}
              onClick={handleStatusMenu}
            >
              <span>{status}</span>
              <img
                className={showStatusMenu ? "rotate" : ""}
                src={
                  process.env.PUBLIC_URL + "./assets/shared/icon-arrow-down.svg"
                }
                alt="down arrow"
              />
            </button>
            <ul className={`category-menu ${showStatusMenu ? "" : "hidden"}`}>
              {statusItems.map((item, index) => {
                return (
                  <li
                    className="category-menu-item"
                    key={index}
                    onClick={handleStatusItem}
                  >
                    <p>{item}</p>
                    <img
                      className={
                        status.toLowerCase() === item.toLowerCase()
                          ? ""
                          : "hidden"
                      }
                      src={
                        process.env.PUBLIC_URL + "/assets/shared/icon-check.svg"
                      }
                      alt="check"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <h4>Feedback Detail</h4>
      <p className="instruction-text">
        Include any specific comments on what should be improved, added, etc.
      </p>
      <textarea
        className={errorComment ? "error-border" : ""}
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      {errorComment && <p className="error-text">Can't be empty</p>}
      <div className="feedback-buttons-box">
        <ButtonWithBackground
          name="Delete"
          class={props.name === "new" ? "delete invisible" : "delete"}
          handleButton={handleButton}
        />
        <ButtonWithBackground
          name="Cancel"
          class="cancel"
          handleButton={handleButton}
        />
        <ButtonWithBackground
          name={`${props.name === "new" ? "Add Feedback" : "Save Changes"}`}
          class="add-feedback"
          handleButton={handleButton}
        />
      </div>
    </div>
  );
}

export default AddEditFeedback;
