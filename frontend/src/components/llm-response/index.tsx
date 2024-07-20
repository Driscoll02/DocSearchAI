import { useLLMResponseContext } from "../../_context/LLMResponseProvider";

const LLMResponse = () => {
  const { llmResponse } = useLLMResponseContext();

  return (
    <div className="flex gap-3">
      <p>{llmResponse}</p>
    </div>
  );
};

export default LLMResponse;
