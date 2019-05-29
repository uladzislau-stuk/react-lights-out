import React from 'react';
import PropTypes from 'prop-types';
import './Cell.css';

function Cell(props) {
	const { isLit, flipCellsAroundMe } = props;

	return <td onClick={flipCellsAroundMe} className={isLit ? 'Cell Cell-lit' : 'Cell'} />;
}

Cell.propTypes = {
	isLit: PropTypes.bool.isRequired,
	flipCellsAroundMe: PropTypes.func.isRequired
};

export default Cell;