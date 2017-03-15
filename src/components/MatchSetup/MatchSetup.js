import _ from 'lodash';
import {
	Accordion,
	Button,
} from 'lucid';
import React from 'react';
import MatchDialog from '../Match/Dialog/ConnectedDialog';
import Parameters from './Parameters/ConnectedParameters';
import Participants from './Participants/ConnectedParticipants';
import Referee from './Referee/ConnectedReferee';
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
];

export default React.createClass({
	propTypes: {
		isMatchUnderway: bool,
		isStartDisabled: bool,
		onClickStartMatch: func,
	},

	getDefaultProps() {
		return {
			isMatchUnderway: false,
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
			isMatchUnderway,
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
				{isMatchUnderway ? (
					<MatchDialog />
				) : null}
			</div>
		);
	},
});
