import _ from 'lodash';
import {
	Panel,
	RadioGroup,
	// SingleSelect,
} from 'lucid';
import React from 'react';
import Round from './Round/Round';
import './Panel.css';

const {
	number,
	object,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		numRounds: number,
		wrestler: object.isRequired,
	},

	getDefaultProps() {
		return {
			numRounds: 1,
		};
	},

	render() {
		const {
			numRounds,
			wrestler,
		} = this.props;

		return (
			<Panel className='StrategyPanel'>
				<Panel.Header>{wrestler.name}</Panel.Header>
				<div>
					{_.map(_.range(1, numRounds + 1), (roundNumber) => (
						<Round
							key={roundNumber}
							roundNumber={roundNumber}
						/>
					))}
				</div>
			</Panel>
		);
	},
});
