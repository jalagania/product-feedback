import "./ButtonWithBackground.css";

function ButtonWithBackground(props) {
  return (
    <button className={`btn ${props.class}`} onClick={props.handleButton}>
      {props.name}
    </button>
  );
}

export default ButtonWithBackground;
