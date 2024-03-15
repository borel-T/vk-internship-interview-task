import React, { useState, useRef } from "react";
import { catsApi } from "../../api";

export default function CatFact() {
  const [userInput, setUserInput] = useState("");

  const textFieldRef = useRef();

  const fetchCatFact = () => {
    fetch(catsApi.catsFacts)
      .then((response) => response.json())
      .then((data) => {
        // Update the cat fact
        console.log(data.fact);
        setUserInput(data.fact);
        textFieldRef.current.focus();
      })
      .catch((error) => console.error("Error fetching cat fact:", error));
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchCatFact();
  };

  return (
    <div className="catfact">
      <input
        className="my-text-input"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        ref={textFieldRef}
      />
      <button className="my-button" onClick={handleClick}>
        Button
      </button>
    </div>
  );
}
