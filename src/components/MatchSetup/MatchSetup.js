import _ from 'lodash';
import {
	Accordion,
	Button,
} from 'lucid';
import React from 'react';
import Parameters from './Parameters/ConnectedParameters';
import Participants from './Participants/ConnectedParticipants';
import Referee from './Referee/ConnectedReferee';
import Strategies from './Strategies/ConnectedStrategies';
import './MatchSetup.css';

const {
	bool,
	func,
} = React.PropTypes;

const matchSetupSteps = [
	{
		label: 'Parameters',
		component: <Parameters />,
	},
	{
		label: 'Referee',
		component: <Referee />,
	},
	{
		label: 'Participants',
		component: <Participants />,
	},
	{
		label: 'Strategies',
		component: <Strategies />,
	},
];

export default React.createClass({
	propTypes: {
		isStartDisabled: bool,
		onClickStartMatch: func,
	},

	getDefaultProps() {
		return {
			isStartDisabled: false,
			onClickStartMatch: _.noop,
		};
	},

	getInitialState() {
		return { stepIndex: 0 };
	},

	onSelectStep(stepIndex) {
		this.setState({ stepIndex });
	},

	render() {
		const {
			isStartDisabled,
			onClickStartMatch,
		} = this.props;
		const { stepIndex } = this.state;

		return (
			<div className='MatchSetup'>
				<Accordion
					selectedIndex={stepIndex}
					onSelect={this.onSelectStep}
				>
					{_.map(matchSetupSteps, ({
						component,
						label,
					}) => (
						<Accordion.Item key={label}>
							<Accordion.Header>{label}</Accordion.Header>
							{component}
						</Accordion.Item>
					))}
				</Accordion>
				<div className='MatchSetup-footer'>
					<Button
						isDisabled={isStartDisabled}
						kind='primary'
						onClick={onClickStartMatch}
					>
						Start the Match!
					</Button>
				</div>
			</div>
		);
	},
});
