import _ from 'lodash';
import {
	Grid,
	TextField,
} from 'lucid';
import React from 'react';
import './NameField.css';

const {
	func,
	string,
} = React.PropTypes;

const NameField = ({
	value,
	onChange = _.noop,
}) => (
	<Grid
		className='NameField'
		isGutterless
	>
		<Grid.Cell
			className='NameField-label'
			is2
		>
			Name:
		</Grid.Cell>
		<Grid.Cell
			className='NameField-input'
			is10
		>
			<TextField
				value={value}
				onChange={onChange}
			/>
		</Grid.Cell>
	</Grid>
);

NameField.propTypes = {
	value: string,
	onChange: func,
};

export default NameField;
