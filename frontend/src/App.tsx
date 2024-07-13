import "./App.css";
import QueryInputField from "./components/query-input-field";

/**
 * The main App component of the project. This is the entry point for the React tree.
 * Renders the QueryInputField component.
 * @returns {JSX.Element}
 */
function App(): JSX.Element {
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
