import "./ButtonGoBack.css";

function ButtonGoBack(props) {
  return (
    <button className="btn-go-back" onClick={props.handleGoBack}>
      <img
        src={process.env.PUBLIC_URL + "/assets/shared/icon-arrow-left.svg"}
        alt="left arrow"
      />
      <span>Go Back</span>
    </button>
  );
}

export default ButtonGoBack;
