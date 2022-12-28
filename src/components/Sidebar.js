import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-box">
      <div className="logo-box">
        <p className="logo-text">Frontend Mentor</p>
        <p className="logo-subtext">Feedback Board</p>
      </div>
      <div className="keywords-box">
        <button className="keyword">All</button>
        <button className="keyword">UI</button>
        <button className="keyword">UX</button>
        <button className="keyword">Enhancement</button>
        <button className="keyword">Bug</button>
        <button className="keyword">Feature</button>
      </div>
      <div className="roadmap-box">
        <div className="roadmap-title-box">
          <p className="title">Roadmap</p>
          <button className="view">View</button>
        </div>
        <ul className="roadmap-list">
          <li className="planned">
            <p className="item-name">Planned</p>
            <p className="item-amount">0</p>
          </li>
          <li className="progress">
            <p className="item-name">In-Progress</p>
            <p className="item-amount">0</p>
          </li>
          <li className="live">
            <p className="item-name">Live</p>
            <p className="item-amount">0</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
