import _ from 'lodash';
import React from 'react';
import Panel from './Panel/Panel';
import './Strategies.css';

const {
	array,
	func,
	object,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		selectedWrestlers: array,
		strategies: object,
		onChangeStrategies: func,
	},

	getDefaultProps() {
		return {
			selectedWrestlers: [],
			strategies: {},
			onChangeStrategies: _.noop,
		};
	},

	onChangeStrategies(wrestlerId, updatedStrategies) {
		this.props.onChangeStrategies({
			...this.props.strategies,
			[wrestlerId]: updatedStrategies,
		});
	},

	render() {
		const {
			selectedWrestlers,
			strategies: strategiesById,
		} = this.props;

		return (
			<div className='Strategies'>
				{_.size(selectedWrestlers) < 2 ? (
					<p>Please finish selecting participants.</p>
				) : (
					<div className='Strategies-panels'>
						{_.map(selectedWrestlers, ({
							id,
							name,
						}) => {
							const strategies = _.get(strategiesById, id);
							return (
								<Panel
									key={id}
									strategies={strategies}
									wrestlerName={name}
									onChangeStrategies={_.partial(this.onChangeStrategies, id)}
								/>
							);
						})}
					</div>
				)}
			</div>
		);
	},
});
