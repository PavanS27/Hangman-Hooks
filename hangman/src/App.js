import React, { useState, useEffect } from "react";
import "./App.css";
import Figure from "./components/Figure";
import Header from "./components/Header";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  useEffect(() => {
    const handleKeydown = (e) => {
      const { key, keyCode } = e;

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((correctLetters) => [...correctLetters, letter]);
          } else {
            //  showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            // showNotification();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);
  return (
    <div>
      <Header />
      <div className="game-container">
        <Figure />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
    </div>
  );
}

export default App;
