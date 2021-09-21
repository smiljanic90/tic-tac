import React, { useState } from 'react';
import Board from './Board';
import {calculateWinner} from '../whoWins'
import '../index.css';

const Game = () => {
  const [board, setBoard] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board[stepNumber]);

  const handleClick = (i) => {
    const boardPoen = board.slice(0, stepNumber + 1)
    const current = boardPoen[stepNumber]
    const squares = [...current];
    if (winner || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setBoard([...boardPoen, squares]);
    setXisNext(!xIsNext);
    setStepNumber(boardPoen.length)
  };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0)
    }

    const moves = board.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
          <div className="status">{status}</div>
        <div className="game-board">
          <Board squares={board[stepNumber]} onClick={handleClick} />
          <div className="game-info">
          <ol>{moves}</ol>
        </div>
        </div>
      </div>
    );
}

export default Game;