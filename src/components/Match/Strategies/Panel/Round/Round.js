import {
	RadioGroup,
} from 'lucid';
import React from 'react';
import './Round.css';

const {
	number,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		roundNumber: number,
	},

	getDefaultProps() {
		return {
			roundNumber: 1,
		};
	},

	getInitialState() {
		return {
			selectedWorkflowIndex: 0,
		};
	},

	onSelectWorkflow(selectedWorkflowIndex) {
		this.setState({ selectedWorkflowIndex });
	},

	render() {
		const {
			roundNumber,
		} = this.props;
		const {
			selectedWorkflowIndex,
		} = this.state;

		return (
			<div className='StrategyRound'>
				<header>Round {roundNumber}</header>
					<RadioGroup
						className='StrategyRound-workflow'
						selectedIndex={selectedWorkflowIndex}
						onSelect={this.onSelectWorkflow}
					>
						<RadioGroup.RadioButton>
							<RadioGroup.Label>
								<span>Customize</span>
							</RadioGroup.Label>
						</RadioGroup.RadioButton>
						<RadioGroup.RadioButton>
							<RadioGroup.Label>
								<span>Select a move</span>
							</RadioGroup.Label>
						</RadioGroup.RadioButton>
					</RadioGroup>
			</div>
		);
	},
});
