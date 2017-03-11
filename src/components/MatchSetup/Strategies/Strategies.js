import _ from 'lodash';
import React from 'react';
import Panel from './Panel/Panel';
import './Strategies.css';

const {
	array,
	oneOf,
} = React.PropTypes;

const maxRoundsOptions = _.range(10, 70, 10);

export default React.createClass({
	propTypes: {
		maxRounds: oneOf(maxRoundsOptions),
		selectedWrestlers: array,
	},

	getDefaultProps() {
		return {
			maxRounds: 10,
			selectedWrestlers: [],
		};
	},

	render() {
		const {
			maxRounds,
			selectedWrestlers,
		} = this.props;

		return (
			<div className='Strategies'>
				{_.size(selectedWrestlers) < 2 ? (
					<p>Please finish selecting participants.</p>
				) : (
					<div className='Strategies-panels'>
						{_.map(selectedWrestlers, (wrestler) => (
							<Panel
								key={wrestler.id}
								numRounds={maxRounds}
								wrestler={wrestler}
							/>
						))}
					</div>
				)}
			</div>
		);
	},
});
