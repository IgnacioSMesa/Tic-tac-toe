import React, { useState } from 'react';
import './board.css';

function Square({id, value, onSquareClick}) {

    return (
      <button className="square" onClick={() => onSquareClick(id)}>
        {value}
      </button>
    );
  }

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(0);
    const [winner, setWinner] = useState(null);

    function checkWinner(squares){
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8], 
            [2, 4, 6]  
        ];
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    function handleClick(i) {
        
       if(squares[i] !== null){
            return;
       }
    
       const nextSquares = squares.slice();
       nextSquares[i] = turn === 0 ? 'X' : 'O'; 
       setSquares(nextSquares);

       const gameWinner = checkWinner(nextSquares); 
       if (gameWinner) {
           setWinner(gameWinner); 
           return;
       }

       setTurn(turn === 0 ? 1 : 0);
    }
      
   function restart(){
        setSquares(Array(9).fill(null));
        setTurn(0);
        setWinner(null);
   }
    return (
        <>
             {winner && (
                <div className="winner-message">
                    {`Winner: Player ${winner === 'X' ? 'X' : 'O'}`}
                    {<button onClick={restart}>Restart</button>}
                </div>
            )}
            <div className="board-row">
                <Square id={0} value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square id={1} value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square id={2} value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square id={3} value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square id={4} value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square id={5} value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square id={6} value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square id={7} value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square id={8} value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
  };