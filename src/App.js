import React from "react";
import "./App.css";
import { arrayExpression } from "@babel/types";

let turnCounter = 0;

const NewSquare = ({ display, row, column, onNewSquareClick, isEmpty }) => {
  const handleClick = () => {
    if (isEmpty === true) {
      onNewSquareClick(row, column);
    }
  };
  return (
    <div>
      <button
        style={{
          fontSize: "large",
          height: 100,
          width: 100,
          backgroundColor: "white"
        }}
        display={null}
        onClick={handleClick}
      >
        {display}
      </button>
    </div>
  );
};

const Grid = props => {
  const { onSquareClick, grid } = props;
  return (
    <div className="board-div">
      {grid.map((row, i) => {
        return (
          <div className="row-div">
            {row.map((display, j) => {
              return (
                <NewSquare
                  row={i}
                  column={j}
                  display={grid[i][j]}
                  isEmpty={grid[i][j] === null}
                  onNewSquareClick={onSquareClick}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: "X", //Defaults X for turn 1; Determines what value is attributed to Squares; should alternate: X or O//
      complete: false, //Defaults false; Becomes true win: true, or if the board is filled; if true display Play Again? button//
      win: false, //Defaults false; Becomes true if 3 of the same value are in a row; if true alert `${value} Wins!`//
      grid: [[null, null, null], [null, null, null], [null, null, null]]
    };
  }
  turnHandler = () => {
    //This should call:
    //changeDisplayState,
    //changeTurn,
    //checkCompleteState, and
    //checkForAWin
  };

  changeDisplayState = (row, column) => {
    if (!this.state.win) {
      const newGrid = [...this.state.grid];
      newGrid[row][column] = this.state.turn;
      this.setState({ grid: newGrid });
      this.changeTurn();
      this.checkForAWin(this.state.grid, row, column);
    }
  };
  changeTurn = () => {
    if (this.state.turn === "X") this.setState({ turn: "O" });
    else if (this.state.turn === "O") this.setState({ turn: "X" });
  };

  checkCompleteState = () => {};

  checkForAWin = (gridArray, row, column) => {
    if (
      //Row Win//
      gridArray[row][column] === gridArray[row][0] &&
      gridArray[row][column] === gridArray[row][1] &&
      gridArray[row][column] === gridArray[row][2]
    ) {
      this.state.win = true;
      alert("You Won!!!");
    } else if (
      //Column Win//
      gridArray[row][column] === gridArray[0][column] &&
      gridArray[row][column] === gridArray[1][column] &&
      gridArray[row][column] === gridArray[2][column]
    ) {
      this.state.win = true;
      alert("You Won!!!");
    } else if (
      //Diagonal Win 00 - 22//
      gridArray[row][column] === gridArray[0][0] &&
      gridArray[row][column] === gridArray[1][1] &&
      gridArray[row][column] === gridArray[2][2]
    ) {
      this.state.win = true;
      alert("You Won!!!");
    } else if (
      //Diagonal Win 02 - 20//
      gridArray[row][column] === gridArray[0][2] &&
      gridArray[row][column] === gridArray[1][1] &&
      gridArray[row][column] === gridArray[2][0]
    ) {
      this.state.win = true;
      alert("You Won!!!");
    }
  };

  resetBoard = () => {
    const newGrid = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.setState({ grid: newGrid });
    this.state.win = false;
    this.state.turn = "X";
  };

  render() {
    return (
      <div>
        <script>{console.log(`It is ${this.state.turn}'s turn.`)}</script>
        <div>
          <Grid
            onSquareClick={this.changeDisplayState}
            grid={this.state.grid}
          />
          <br />
          <button id="reset-button" onClick={this.resetBoard}>
            Reset Board?
          </button>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h3>Welcome to... </h3>
        <h1>Tic Tac Toe!</h1>
      </header>
      <body className="app-body">
        <div style={{ display: "flex" }}></div>
        <br></br>
        <div>
          <GameBoard />
        </div>
        <br></br>
      </body>
    </div>
  );
}

export default App;
