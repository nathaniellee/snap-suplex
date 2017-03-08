import _ from 'lodash';
import { Accordion } from 'lucid';
import React from 'react';
import Parameters from './Parameters/ConnectedParameters';
import Referee from './Referee/ConnectedReferee';
import './Match.css';

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
		component: <p>Hey now!</p>,
	},
	{
		label: 'Strategies',
		component: <p>Say what?</p>,
	},
];

export default React.createClass({
	getInitialState() {
		return { stepIndex: 0 };
	},

	onSelectStep(stepIndex) {
		this.setState({ stepIndex });
	},

	render() {
		const { stepIndex } = this.state;

		return (
			<div className='Match'>
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
			</div>
		);
	},
});