import { FormEvent, useState } from "react";
import { useLLMResponseContext } from "../../_context/LLMResponseProvider";

/**
 * A component which handles submitting the users query to the Python backend.
 * @returns {JSX.Element | null}
 */
const QueryInputField = (): JSX.Element | null => {
  const [userInput, setUserInput] = useState("");

  const { setLLMResponse, setIsLoading, isLoading } = useLLMResponseContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    if (userInput.trim().length === 0) {
      alert("Your input cannot be empty");
      return;
    }

    const invokeLLMUrl = import.meta.env.VITE_INVOKE_LLM_URL;

    if (!invokeLLMUrl)
      throw new Error(
        "Backend POST url is missing from your environment variables."
      );

    const response = await fetch(invokeLLMUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: userInput,
    });
    const responseJson = await response.json();

    setIsLoading(false);
    setLLMResponse(responseJson.result);
  };

  return (
    <>
      <form className="bg-red-50" onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="h-4"
        />
        <button type="submit" className="bg-blue-600">
          Submit
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default QueryInputField;
