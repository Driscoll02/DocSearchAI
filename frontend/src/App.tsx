import "./App.css";
import QueryInputField from "./components/query-input-field";

function App() {
  return (
    <>
      <h1>DocSearchAI</h1>
      <p>A tool for retrieving documentation using natural language</p>
      <div className="flex gap-3">
        <QueryInputField />
      </div>
    </>
  );
}

export default App;
