import React, {Component} from 'react';
import Cell from './Cell';

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncolumns: 5,
		chanceLightStartsOn: 0.25
	};

	constructor(props) {
		super(props);

		this.state = {
			hasWon: false,
			board: this.createBoard()
		};
	}

	flipCellsAround(...coords) {
		let {nrows, ncolumns} = this.props;
		let board = [...this.state.board];
		let [y, x] = coords;

		let flipCell = (y, x) => {
			if (y >= 0 && y < nrows && x >=0 && x < ncolumns) {
				board[y][x] = !board[y][x];
			}
		};

		let isWinner = (board) => {
			return board.every(row => row.every(cell => !cell));
		};

		flipCell(y, x);

		flipCell(y-1, x);
		flipCell(y+1, x);
		flipCell(y, x-1);
		flipCell(y, x+1);

		let hasWon = isWinner(board);

		this.setState({ board, hasWon });
	}

	createBoard() {
		let board = [];
		let { nrows, ncolumns, chanceLightStartsOn } = this.props;

		for (let y = 0; y < nrows; y++) {
			let row = [];

			for (let x = 0; x < ncolumns; x++) {
				row.push(Math.random() < chanceLightStartsOn);
			}

			board.push(row);
		}

		return board;
	}

	render() {
		let { board, hasWon } = this.state;

		if (hasWon) {
			return <h1>You won!!!</h1>;
		}

		let tblBoard = board.map((row, rowIdx) =>
			<tr key={rowIdx}>{ row.map((isLit, cellIdx) =>
				<Cell
					key={`${rowIdx}-${cellIdx}`}
					isLit={isLit}
					flipCellsAroundMe={this.flipCellsAround.bind(this, rowIdx, cellIdx)}
				/>)
			}</tr>
		);

		return (
			<table className='Board'>
				<tbody>{tblBoard}</tbody>
			</table>
		);
	}
}

export default Board;