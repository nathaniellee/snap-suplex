import _ from 'lodash';
import { Accordion } from 'lucid';
import React from 'react';
import Parameters from './Parameters/ConnectedParameters';
import Referee from './Referee/ConnectedReferee';
import './Match.css';

const matchSetupSteps = {
	parameters: {
		index: 0,
		label: 'Parameters',
		component: <Parameters />,
	},
	referee: {
		index: 1,
		label: 'Referee',
		component: <Referee />,
	},
	participants: {
		index: 2,
		label: 'Participants',
		component: <p>Hey now!</p>,
	},
	strategies: {
		index: 3,
		label: 'Strategies',
		component: <p>Say what?</p>,
	},
};

export default React.createClass({
	getInitialState() {
		return {
			step: 'parameters',
		};
	},

	onSelectStep(index) {
		this.setState({
			step: _.findKey(matchSetupSteps, { index }),
		});
	},

	render() {
		const { step } = this.state;

		return (
			<div className='Match'>
				<Accordion
					selectedIndex={matchSetupSteps[step].index}
					onSelect={this.onSelectStep}
				>
					{_.map(matchSetupSteps, ({
						component,
						index,
						label,
					}) => (
						<Accordion.Item key={index}>
							<Accordion.Header>{label}</Accordion.Header>
							{component}
						</Accordion.Item>
					))}
				</Accordion>
			</div>
		);
	},
});
