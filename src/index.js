import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
	return (
		<button className="square" onClick={() => props.onClick()}>
			{props.value}
		</button>
	);
}



const Board = (props) => {
  const renderSquare = (i) => {
    return <Square
    					onClick={props.onClick(i)}
    					value={props.squares[i]} />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );

}


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null)
			}],
			stepNumber: 0,
			xIsNext: true
		};
	}
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
	  const current = history[history.length - 1];
	  const squares = current.squares.slice();

	  if (calculateWinner(squares) || squares[i]) {
	    return;
	  }

	  squares[i] = this.state.xIsNext ? 'X' : 'O';

	  this.setState({
	    history: history.concat([{
	      squares: squares
	    }]),
	    xIsNext: !this.state.xIsNext,
	    stepNumber: history.length
	  });
	}
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) ? false : true
		});
	}
  render() {
  	const history = this.state.history;
  	const current = history[this.state.stepNumber];
  	const winner = calculateWinner(current.squares);

  	let status = winner ?
  		('Winner: ' + winner) :
  		('Next player: ' + (this.state.xIsNext ? 'X' : 'O'));


  	const moves = history.map((step, move) => {
  		const desc = move ? 'Move #' + move : 'Game start';

  		return (
  			<li key={move} >
  				<a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
  			</li>
  		)
  	})


    return (
      <div className="game">
        <div className="game-board">
          <Board 
          	onClick={(i) => this.handleClick.bind(this, i)}
          	squares={current.squares} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
