import React, { useState, useEffect, useRef } from "react";
import { catsApi } from "../../api";
import { FormItem, Input, Button, Spinner } from "@vkontakte/vkui";

export default function CatFact() {
  //  consts
  const textFieldRef = useRef(null);

  // states
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // get facts
  const fetchCatFact = async () => {
    setLoading(true);
    fetch(catsApi.catsFacts)
      .then((response) => response.json())
      .then((data) => {
        // Update the cat fact
        setUserInput(data.fact);
        setSubmitted(true);
      })
      .catch((error) => console.error("Error fetching cat fact:", error))
      .finally(() => {
        setLoading(false);
      });
  };

  // places cursor after the first word of the text-input-field
  const placeCursorAfterTextFieldFirstWord = (text) => {
    const firstSpace = text.indexOf(" ");
    const newPosition = firstSpace >= 0 ? firstSpace + 1 : text.length;
    textFieldRef.current.setSelectionRange(newPosition, newPosition);
    textFieldRef.current.focus();
    setSubmitted(false);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchCatFact();
  };

  useEffect(() => {
    if (userInput !== "") {
      placeCursorAfterTextFieldFirstWord(userInput);
    }
  }, [submitted]);

  return (
    <form className="form-wrap">
      <FormItem top="Текст" htmlFor="name" onSubmit={handleSubmit}>
        <Input
          className="my-text-input"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          getRef={textFieldRef}
        />
      </FormItem>
      <FormItem>
        {loading && (
          <Spinner color="white" size="small" style={{ marginRight: "5px" }} />
        )}
        {!loading && (
          <Button type="submit" onClick={handleSubmit}>
            {"Нажмите, чтобы узнать больше о кошках."}
          </Button>
        )}
      </FormItem>
    </form>
  );
}
