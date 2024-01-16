import React, { useState } from "react";

const Autocomplete = ({ options }) => {
  const [input, setInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleChange = (event) => {
    const userInput = event.currentTarget.value;

    // Filter our options that don't contain the user's input
    const newFilteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(userInput);
    setFilteredOptions(newFilteredOptions);
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <ul>
        {filteredOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
