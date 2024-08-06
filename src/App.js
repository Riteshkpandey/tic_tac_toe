import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [totalBox, setTotalBox] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const winMap = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
  ];
  const [winnerName, setWinnerName] = useState(null);
  const [xCount, setXcount] = useState(0);
  const [oCount, setOcount] = useState(0);

  const checkWins = (board) => {
    winMap.forEach((element) => {
      const [a, b, c] = [...element];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinnerName(totalBox[a]);
        const winner = totalBox[a];
        if (winner === "X") setXcount(xCount + 1);
        else setOcount(oCount + 1);

        return board[a];
      }
    });
    return null;
  };

  const handleEvent = (index) => {
    if (totalBox[index] || winnerName) return;
    const pair = isX ? "X" : "O";
    const newBoard = [...totalBox];
    newBoard[index] = pair;
    setTotalBox(newBoard);
    setIsX(!isX);
    checkWins(newBoard);
  };
  const handleReset = () => {
    setWinnerName(null);
    setTotalBox(Array(9).fill(null));
  };
  return (
    <div className="App">
      <div>Winner is {winnerName}</div>
      <div className="main-box">
        {totalBox.map((item, index) => (
          <div key={index} className="box" onClick={() => handleEvent(index)}>
            {totalBox[index]}
          </div>
        ))}
      </div>
      <button onClick={handleReset}>reset</button>
      <div>X winning :{xCount}</div>
      <div>O winning :{oCount}</div>
    </div>
  );
}
