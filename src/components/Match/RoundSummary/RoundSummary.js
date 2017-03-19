import _ from 'lodash';
import { Panel } from 'lucid';
import React from 'react';
import './RoundSummary.css';

const {
	number,
	object,
	string,
} = React.PropTypes;

const RoundSummary = ({
	damage = null,
	loser,
	numPinAttemptFailures = null,
	roundNumber = 1,
	targetStat,
	winner,
}) => {
	let description;

	if (damage) {
		description = `${winner.name} inflicted ${damage} damage to ${loser.name}.`;
		if (_.isNumber(numPinAttemptFailures)) {
			description = `${description} ${winner.name} makes the cover!`;
			if (numPinAttemptFailures === 0) {
				description = `${description} And ${loser.name} kicks out right away!`;
			}
			if (numPinAttemptFailures === 1) {
				description = `${description} 1... and a kick out!`;
			}
			if (numPinAttemptFailures === 2) {
				description = `${description} 1... 2... and ${loser.name} just manages to get the shoulder up!`;
			}
			if (numPinAttemptFailures === 3) {
				description = `${description} 1... 2... 3! DING DING DING!!`;
			}
		}
	} else {
		description = `${winner.name} did not inflict any damage to ${loser.name}.`;
	}

	return (
		<Panel className='RoundSummary'>
			<div>
				<span>{roundNumber}</span>
				<span>{description}</span>
			</div>
		</Panel>
	);
};

RoundSummary.propTypes = {
	damage: number,
	loser: object.isRequired,
	numPinAttemptFailures: number,
	roundNumber: number,
	targetStat: string,
	winner: object.isRequired,
};

export default RoundSummary;
