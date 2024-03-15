import React, { useState } from "react";
import { namesApi } from "../../api";

export default function AgeGenerator() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleChange2 = (e) => {
    const value = e.target.value;
    setName(value);
    // clearing the previous timeout
    clearTimeout(timeoutId);
    // cet a new timeout to call the API after 3 seconds
    const newTimeoutId = setTimeout(() => {
      generateAge(value, "input");
    }, 3000);

    // update the timeoutId state
    setTimeoutId(newTimeoutId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateAge(name, "button");
  };

  const generateAge = (userName, y) => {
    // call fetchData function when inputValue changes
    if (name !== "" && userName !== name) {
      fetch(`${namesApi.names}?name=${userName}`)
        .then((response) => response.json())
        .then((data) => {
          // update age
          setAge(data.age);
          // stop loading
          setIsPending(false);
        })
        .catch((error) => console.error("Error fetching age:", error));
    } else {
      console.log("no calls");
    }
  };

  return (
    <section className="age-generator-section">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="my-text-input"
          type="text"
          value={name}
          onChange={handleChange2}
          placeholder="Enter your name"
        />
        <button
          className="my-button"
          type="submit"
          disabled={!name || isPending}
        >
          {isPending ? "Fetching..." : "Submit"}
        </button>
      </form>
      {age && <p>Predicted age: {age}</p>}
    </section>
  );
}
