import { createContext, Dispatch, useContext, useState } from "react";

interface IProviderProps {
  children: React.ReactNode;
}

const llmResponseContext = createContext<
  | {
      llmResponse: string | null;
      setLLMResponse: Dispatch<React.SetStateAction<string | null>>;

      isLoading: boolean;
      setIsLoading: Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

const LLMResponseProvider = ({ children }: IProviderProps) => {
  const [llmResponse, setLLMResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <llmResponseContext.Provider
      value={{
        llmResponse,
        setLLMResponse,

        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </llmResponseContext.Provider>
  );
};

const useLLMResponseContext = () => {
  const context = useContext(llmResponseContext);

  if (!context) {
    throw new Error(
      "useLLMResponseContext must be used inside a LLMResponseProvider"
    );
  }

  return context;
};

export { llmResponseContext, useLLMResponseContext, LLMResponseProvider };
