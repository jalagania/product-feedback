import "./AddEditFeedback.css";
import { useState } from "react";
import ButtonWithBackground from "./ButtonWithBackground";
import { useSelector } from "react-redux";

function AddEditFeedback(props) {
  const { suggestionID } = useSelector((store) => store.suggestionDetails);
  const suggestion = useSelector((store) =>
    store.data.appData.productRequests.find(
      (request) => request.id === suggestionID
    )
  );

  const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const statusItems = ["Suggestion", "Planned", "In-Progress", "Live"];
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
    if (event.target.value.length <= 150) {
      setComment(event.target.value);
    }
  }

  function handleButton(event) {
    if (event.target.textContent === "Delete") {
      // blabla
    }

    if (event.target.textContent === "Cancel") {
      if (props.name === "new") {
        // blabla
        resetAll();
      } else {
        // blabla
      }
    }

    if (
      event.target.textContent === "Add Feedback" ||
      event.target.textContent === "Save Changes"
    ) {
      const newFeedback = {
        title: title,
        category: category,
        comment: comment,
      };

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

    if (event.target.textContent === "Add Feedback") {
      //
    }

    if (event.target.textContent === "Save Changes") {
      //
    }
  }

  function resetAll() {
    setTitle("");
    setCategory("Feature");
    setComment("");
  }

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
        <button className="btn-feedback-category" onClick={handleCategoryMenu}>
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
            <button className="btn-feedback-status" onClick={handleStatusMenu}>
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
