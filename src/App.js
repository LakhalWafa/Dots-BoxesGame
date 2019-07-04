import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialBoard(5);
  }

  initialBoard = size => {
    let state = {
      boardSize: size,
      numpink: 0,
      numBlue: 0,
      turn: 'pink',
      winMessage: '',
      lineCoordinates: {},
      boxColors: {}
    };
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < state.boardSize + 1; j++) {
        for (let k = 0; k < state.boardSize; k++) {
          state.lineCoordinates[i + ',' + j + ',' + k] = 0;
        }
      }
    }
    for (let i = 0; i < state.boardSize; i++) {
      for (let j = 0; j < state.boardSize; j++) {
        state.boxColors[i + ',' + j] = 'rgb(255,255,255)';
      }
    }
    return state;
  };

  fillLine = event => {
    var currentCoord = event.target.dataset.coord;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      //event.target.style.backgroundColor =  this.state.turn
      let newState = this.state.lineCoordinates;
      newState[currentCoord] = this.state.turn === 'pink' ? 1 : -1;
      this.setState(prevState => ({
        lineCoordinates: newState
      }));

      var splitCoord = currentCoord.split(',');
      var i = splitCoord[0];
      var j = splitCoord[1];
      var k = splitCoord[2];

      let newBoxColors = this.state.boxColors;

      var madeSquare = 0;

      if (i === '0') {
        if (this.checkSquare(j, k) === 4) {
          madeSquare = 1;
          newBoxColors[j + ',' + k] =
            this.state.turn === 'pink'
              ? 'rgba(255, 0, 102, 0.5)'
              : 'rgba(0, 102, 255, 0.5)';
          this.setState(prevState => ({
            numpink:
              prevState.turn === 'pink'
                ? prevState.numpink + 1
                : prevState.numpink,
            numBlue:
              prevState.turn === 'blue'
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
        if (this.checkSquare(parseFloat(j) - 1, k) === 4) {
          madeSquare = 1;
          newBoxColors[parseFloat(j) - 1 + ',' + k] =
            this.state.turn === 'pink'
              ? 'rgba(255, 0, 102, 0.5)'
              : 'rgba(0, 102, 255, 0.5)';
          this.setState(prevState => ({
            numpink:
              prevState.turn === 'pink'
                ? prevState.numpink + 1
                : prevState.numpink,
            numBlue:
              prevState.turn === 'blue'
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
      } else {
        if (this.checkSquare(k, j) === 4) {
          madeSquare = 1;
          newBoxColors[k + ',' + j] =
            this.state.turn === 'pink'
              ? 'rgba(255, 0, 102, 0.5)'
              : 'rgba(0, 102, 255, 0.5)';
          this.setState(prevState => ({
            numpink:
              prevState.turn === 'pink'
                ? prevState.numpink + 1
                : prevState.numpink,
            numBlue:
              prevState.turn === 'blue'
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
        if (this.checkSquare(k, parseFloat(j) - 1) === 4) {
          madeSquare = 1;
          newBoxColors[k + ',' + (parseFloat(j) - 1)] =
            this.state.turn === 'pink'
              ? 'rgba(255, 0, 102, 0.5)'
              : 'rgba(0, 102, 255, 0.5)';
          this.setState(prevState => ({
            numpink:
              prevState.turn === 'pink'
                ? prevState.numpink + 1
                : prevState.numpink,
            numBlue:
              prevState.turn === 'blue'
                ? prevState.numBlue + 1
                : prevState.numBlue,
            boxColors: newBoxColors
          }));
        }
      }
      if (madeSquare === 0) {
        this.setState(prevState => ({
          turn: prevState.turn === 'pink' ? 'blue' : 'pink'
        }));
      } else {
        this.checkGameOver();
      }
    }
  };

  checkSquare = (j, k) => {
    var checker1 = Math.abs(this.state.lineCoordinates['0,' + j + ',' + k]);
    var checker2 = Math.abs(
      parseFloat(j) + 1 > this.state.boardSize
        ? 0
        : this.state.lineCoordinates['0,' + (parseFloat(j) + 1) + ',' + k]
    );
    var checker3 = Math.abs(this.state.lineCoordinates['1,' + k + ',' + j]);
    var checker4 = Math.abs(
      parseFloat(k) + 1 > this.state.boardSize
        ? 0
        : this.state.lineCoordinates['1,' + (parseFloat(k) + 1) + ',' + j]
    );
    return checker1 + checker2 + checker3 + checker4;
  };

  checkGameOver = () => {
    this.setState(prevState => ({
      winMessage:
        prevState.numpink + prevState.numBlue === prevState.boardSize ** 2
          ? this.makeWinMessage(prevState)
          : ''
    }));
  };

  makeWinMessage = state => {
    var winMessage;
    if (state.numpink > state.numBlue) {
      winMessage = 'Pink wins! Select a board size to start a new game.';
    } else if (state.numpink < state.numBlue) {
      winMessage = 'Blue wins! Select a board size to start a new game.';
    } else {
      winMessage = 'Draw! Select a board size to start a new game.';
    }
    return winMessage;
  };

  changeBoardSize = event => {
    if (window.confirm('Are you sure you would like to start a new game?')) {
      var newState;
      if (event.target.id === 'small') {
        newState = this.initialBoard(5);
      } else if (event.target.id === 'medium') {
        newState = this.initialBoard(8);
      } else if (event.target.id === 'large') {
        newState = this.initialBoard(11);
      }
      this.setState(prevState => newState);
    }
  };

  selectColor = int => {
    if (int === 0) {
      return 'rgb(255,255,255)';
    } else if (int === 1) {
      return 'rgb(255,0,102)';
    } else if (int === -1) {
      return 'rgb(0,102,255)';
    }
  };

  tint = event => {
    var currentCoord = event.target.dataset.coord;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      if (this.state.turn === 'pink') {
        event.target.style.backgroundColor = 'rgba(255, 0, 102, 0.5)';
      } else {
        event.target.style.backgroundColor = 'rgba(0, 102, 255, 0.5)';
      }
    }
  };

  untint = event => {
    var currentCoord = event.target.dataset.coord;
    if (this.state.lineCoordinates[currentCoord] === 0) {
      event.target.style.backgroundColor = 'rgb(255,255,255)';
    }
  };

  makeBoard = boardSize => {
    var cols = [];
    for (let i = 0; i <= 2 * boardSize; i++) {
      var row = [];
      for (let j = 0; j <= 2 * boardSize; j++) {
        if (i % 2 === 0) {
          if (j % 2 === 0) {
            row.push(
              React.createElement(
                'div',
                {
                  className: 'dot',
                  id: 'dot' + Math.floor(i / 2) + ',' + Math.floor(j / 2)
                },
                ''
              )
            );
          } else {
            row.push(
              React.createElement(
                'div',
                {
                  className: 'horizContainer',
                  'data-coord':
                    '0,' + Math.floor(i / 2) + ',' + Math.floor(j / 2),
                  onClick: this.fillLine,
                  style: {
                    backgroundColor: this.selectColor(
                      this.state.lineCoordinates[
                        '0,' + Math.floor(i / 2) + ',' + Math.floor(j / 2)
                      ]
                    )
                  },
                  onMouseEnter: this.tint,
                  onMouseLeave: this.untint
                },
                ''
              )
            );
          }
        } else {
          if (j % 2 === 0) {
            row.push(
              React.createElement(
                'div',
                {
                  className: 'vertContainer',
                  'data-coord':
                    '1,' + Math.floor(j / 2) + ',' + Math.floor(i / 2),
                  onClick: this.fillLine,
                  style: {
                    backgroundColor: this.selectColor(
                      this.state.lineCoordinates[
                        '1,' + Math.floor(j / 2) + ',' + Math.floor(i / 2)
                      ]
                    )
                  },
                  onMouseEnter: this.tint,
                  onMouseLeave: this.untint
                },
                ''
              )
            );
          } else {
            row.push(
              React.createElement(
                'div',
                {
                  className: 'box',
                  id: 'box' + Math.floor(i / 2) + ',' + Math.floor(j / 2),
                  style: {
                    backgroundColor: this.state.boxColors[
                      Math.floor(i / 2) + ',' + Math.floor(j / 2)
                    ]
                  }
                },
                ''
              )
            );
          }
        }
      }
      cols.push(React.createElement('div', { className: 'row' }, row));
    }

    return React.createElement('div', { id: 'game-board' }, cols);
  };

  render() {
    return (
      <div id="game" className="mt-5">
        <div id="header" className="text-center">
          <h1 id="welcome" className="text-danger text-center">
            {' '}
            Dots &amp; Boxes{' '}
          </h1>
          <p id="score">
            {' '}
            Pink: {this.state.numpink}
            <br />
            Blue: {this.state.numBlue}{' '}
          </p>
          Board size : <br />
          <button
            id="small"
            type="button"
            className="btn btn-danger m-2"
            onClick={this.changeBoardSize}
          >
            {' '}
            5x5{' '}
          </button>
          <button
            id="medium"
            type="button"
            className="btn btn-danger m-2"
            onClick={this.changeBoardSize}
          >
            {' '}
            8x8{' '}
          </button>
          <button
            id="large"
            type="button"
            className="btn btn-danger m-2"
            onClick={this.changeBoardSize}
          >
            {' '}
            11x11{' '}
          </button>
          <p id="winner" className="text-danger text-center">
            {' '}
            {this.state.winMessage}{' '}
          </p>
        </div>
        <div id="board" className="mx-auto">
          {this.makeBoard(this.state.boardSize)}
        </div>
      </div>
    );
  }
}

export default App;
