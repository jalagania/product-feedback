import "./AddEditFeedback.css";
import { useState } from "react";
import ButtonWithBackground from "./ButtonWithBackground";

function AddEditFeedback(props) {
  const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const statusItems = ["Suggestion", "Planned", "In-Progress", "Live"];
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("Feature");
  const [showCategories, setShowCategories] = useState(false);
  const [status, setStatus] = useState("Cock");
  const [showStatusMenu, setShowStatusMenu] = useState(false);

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
    if (event.target.textContent === "Cancel") {
      // blabla
    }

    if (event.target.textContent === "Add Feedback") {
      const newFeedback = {
        title: title,
        category: category,
        comment: comment,
      };
    }
    resetAll();
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
        <h1>Editing ''</h1>
      )}
      <h4>Feedback Title</h4>
      <p className="instruction-text">Add a short, descriptive headline</p>
      <input type="text" value={title} onChange={handleTitleChange} />
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
                  className={category === item ? "" : "hidden"}
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
                      className={status === item ? "" : "hidden"}
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
      <textarea value={comment} onChange={handleCommentChange}></textarea>
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
