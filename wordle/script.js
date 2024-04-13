const answer = "moody";
const guesses = ["might", "flood", "stray", "", "", ""];

/**
 * Represents the title of the game.
 * @param {Object} props The properties passed to the component.
 * @param {string} props.title The text to be displayed as the title.
 * @returns {React.Element} A React element displaying the game's title.
 */
function Title(props) {
  return (
    <div id="title" className="merriweather-bold">
      {props.title}
    </div>
  );
}

/**
 * Represents a single square on the game board.
 * @param {Object} props The properties passed to the component.
 * @param {string} props.letter The letter to be displayed in the square.
 * @param {string} props.status The color status of the square, influencing its styling (e.g., 'green', 'yellow', 'gray').
 * @returns {React.Element} A React element representing a square on the game board.
 */
function GameSquare(props) {
  return <div className={"box " + props.status}>{props.letter}</div>;
}

/**
 * Represents the game board displaying all the guesses.
 * @param {Object} props The properties passed to the component.
 * @param {string[]} props.guesses An array of strings representing the player's guesses.
 * @param {string} props.answer The correct answer for the game.
 * @returns {React.Element} A React element representing the full game board with all evaluations.
 */
function GameBoard(props) {
  let allSquares = [];
  for (let guess of props.guesses) {
    const evaluation = guess.split("").map((letter, index) => {
      if (props.answer[index] === letter) return "green";
      if (props.answer.includes(letter)) return "yellow";
      return "gray";
    });
    while (evaluation.length < 5) {
      evaluation.push("empty");
    }

    allSquares = allSquares.concat(evaluation);
  }
  while (allSquares.length < 30) {
    allSquares.push("empty");
  }

  return (
    <div id="gameboard">
      {allSquares.map((status, index) => (
        <GameSquare
          key={index}
          letter={
            index < props.guesses.join("").length
              ? props.guesses.join("")[index].toUpperCase()
              : ""
          }
          status={status !== "empty" ? status : ""}
        />
      ))}
    </div>
  );
}

/**
 * Represents the virtual keyboard for the game.
 * @returns {React.Element} A React element displaying the virtual keyboard with keys that can indicate actions like 'enter' or 'delete'.
 */
function KeyboardComponent() {
  // Note: pointer is turned off in the CSS as there is no interactivity right now.
  const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "on_delete"],
  ];

  return (
    <div>
      {keyboardRows.map((row) => (
        <div className="keyboard-row">
          {row.map((key) =>
            key === "on_delete" ? (
              <div className="keyboard-key">
                <i className="fa-solid fa-delete-left"></i>
              </div>
            ) : (
              <div className="keyboard-key">{key.toUpperCase()}</div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * The main App component that aggregates the GameBoard and KeyboardComponent, effectively composing the game's UI.
 * @returns {React.Element} A React element representing the full application, including the game board and the keyboard.
 */
function App() {
  return (
    <div>
      <Title title="Wordle" />
      <GameBoard guesses={guesses} answer={answer} />
      <KeyboardComponent />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
