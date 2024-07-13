import { FormEvent, useState } from "react";

const QueryInputField = () => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(userInput);
  };

  return (
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
  );
};

export default QueryInputField;
