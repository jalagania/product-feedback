import "./App.css";
import Sidebar from "./components/Sidebar";
import SuggestionsPage from "./components/SuggestionsPage";

function App() {
  return (
    <div className="container">
      <div className="suggestions-page-wrapper">
        <Sidebar />
        <SuggestionsPage />
      </div>
    </div>
  );
}

export default App;
