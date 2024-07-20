import { LLMResponseProvider } from "./_context/LLMResponseProvider";
import "./App.css";
import LLMResponse from "./components/llm-response";
import QueryInputField from "./components/query-input-field";

/**
 * The main App component of the project. This is the entry point for the React tree.
 * Renders the QueryInputField component.
 * @returns {JSX.Element}
 */
function App(): JSX.Element {
  return (
    <div className="flex flex-col justify-between items-center">
      <div>
        <h1>DocSearchAI</h1>
        <p>A tool for retrieving documentation using natural language</p>
      </div>
      <div>
        <LLMResponseProvider>
          <div className="flex gap-3">
            <QueryInputField />
          </div>
          <div className="flex gap-3">
            <LLMResponse />
          </div>
        </LLMResponseProvider>
      </div>
    </div>
  );
}

export default App;
