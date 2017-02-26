import _ from 'lodash';
import { Grid } from 'lucid';
import React from 'react';
import './TotalField.css';

const { number } = React.PropTypes;

const TotalField = ({ total }) => (
	<Grid
		className='TotalField'
		isGutterless
	>
		<Grid.Cell is11 />
		<Grid.Cell className='TotalField-cost'>
			<span>Total:</span>
			<span>{total}</span>
		</Grid.Cell>
	</Grid>
);

TotalField.propTypes = { total: number };

export default TotalField;
