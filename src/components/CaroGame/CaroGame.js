import React, { useState } from 'react';
import CaroGamePrepare from '../CaroGamePrepare/CaroGamePrepare';
import CaroGameBoard from '../CaroGameBoard/CaroGameBoard';
import './CaroGame.styles.css';

export default function CaroGame(props) {
  const [XPlayer, setXPlayer] = useState(null);
  const [OPlayer, setOPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isPlaying, setStatusMatch] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [realBoard, setBoard] = useState([]);
  const [initBoard, setInitBoard] = useState(false);
  const { rowCount, colCount } = props;
  let board = [];

  if (!initBoard) {
    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {

      let row = [];

      for (let col = 1; col < colCount; col++) {
        row.push(null);
      }

      board.push(row);
    }
    setInitBoard(true);
    setBoard(board);
  }

  board = realBoard;

  const isWinner = (x, y) => {
    return (
      (board[x - 1][y - 1].top.count + board[x - 1][y - 1].bottom.count + 1 >= 5 &&
        (!board[x - 1][y - 1].top.blocked || !board[x - 1][y - 1].bottom.blocked))
      ||
      (board[x - 1][y - 1].left.count + board[x - 1][y - 1].right.count + 1 >= 5 &&
        (!board[x - 1][y - 1].left.blocked || !board[x - 1][y - 1].right.blocked))
      ||
      (board[x - 1][y - 1].topLeft.count + board[x - 1][y - 1].bottomRight.count + 1 >= 5 &&
        (!board[x - 1][y - 1].topLeft.blocked || !board[x - 1][y - 1].bottomRight.blocked))
      ||
      (board[x - 1][y - 1].topRight.count + board[x - 1][y - 1].bottomLeft.count + 1 >= 5 &&
        (!board[x - 1][y - 1].topRight.blocked || !board[x - 1][y - 1].bottomLeft.blocked))
    );
  }

  const fillCol = (x, y) => {
    board[x - 1][y - 1] = {
      player: currentPlayer,
      top: {
        count: 0,
        blocked: false
      },
      bottom: {
        count: 0,
        blocked: false
      },
      left: {
        count: 0,
        blocked: false
      },
      right: {
        count: 0,
        blocked: false
      },
      topLeft: {
        count: 0,
        blocked: false
      },
      topRight: {
        count: 0,
        blocked: false
      },
      bottomLeft: {
        count: 0,
        blocked: false
      },
      bottomRight: {
        count: 0,
        blocked: false
      }
    };

    calculateCellFollow(x - 1, y - 1, 'top', x - 2, y - 1, x - 2 < 0, false);
    calculateCellFollow(x - 1, y - 1, 'bottom', x, y - 1, x >= rowCount, false);
    calculateCellFollow(x - 1, y - 1, 'left', x - 1, y - 2, false, y - 2 < 0);
    calculateCellFollow(x - 1, y - 1, 'right', x - 1, y, false, y >= colCount);
    calculateCellFollow(x - 1, y - 1, 'topLeft', x - 2, y - 2, x - 2 < 0, y - 2 < 0);
    calculateCellFollow(x - 1, y - 1, 'topRight', x - 2, y, x - 2 < 0, y >= colCount);
    calculateCellFollow(x - 1, y - 1, 'bottomLeft', x, y - 2, x >= rowCount, y - 2 < 0);
    calculateCellFollow(x - 1, y - 1, 'bottomRight', x, y, x >= rowCount, y >= colCount);

    setBoard(board);

    if (isWinner(x, y)) {
      setStatusMatch(false);
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  }

  const calculateCellFollow = (xCell, yCell, followProperty, xNextCell, yNextCell, exConditionX, exConditionY) => {
    if (exConditionX || exConditionY) {
      board[xCell][yCell][followProperty].blocked = true;
    } else {
      console.log('cell', xNextCell, yNextCell, board[xNextCell][yNextCell])
      if (board[xNextCell][yNextCell]) {
        console.log('yes');
        if (board[xNextCell][yNextCell].player === currentPlayer) {
          console.log('yes');
          board[xCell][yCell][followProperty].count = 1 + board[xNextCell][yNextCell][followProperty].count;
          board[xCell][yCell][followProperty].blocked = board[xNextCell][yNextCell][followProperty].blocked;
        } else {
          board[xCell][yCell][followProperty].blocked = true;
        }
      }
    }
  }

  return (
    <React.Fragment>
      <div className="caro-game">
        <CaroGamePrepare
          className="caro-game__prepare"
          setStatusMatch={setStatusMatch}
          setXPlayer={setXPlayer}
          setOPlayer={setOPlayer}
          isPlaying={isPlaying}
          XPlayer={XPlayer}
          OPlayer={OPlayer}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          setInitBoard={setInitBoard}
        />
        <CaroGameBoard
          className="caro-game__board"
          rowCount={rowCount}
          colCount={colCount}
          isPlaying={isPlaying}
          board={realBoard}
          fillCol={fillCol}
        />
      </div>
      {
        winner
          ? (<div className="notification">
            <div className="notification__content">
              <span>Congratulate!!! {winner === 'X' ? XPlayer : OPlayer} won.</span>
              <button onClick={() => setWinner(null)}>
                Ok
              </button>
            </div>
          </div>)
          : null
      }
    </React.Fragment>
  );
}