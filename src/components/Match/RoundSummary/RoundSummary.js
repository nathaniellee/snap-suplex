import { Panel } from 'lucid';
import React from 'react';
import './RoundSummary.css';

const {
	bool,
	number,
	object,
	string,
} = React.PropTypes;

const RoundSummary = ({
	attemptPin = false,
	attemptSubmission = false,
	damage = null,
	loser,
	roundNumber = 1,
	targetStat,
	winner,
}) => {
	let description;

	if (damage) {
		description = `${winner.name} inflicted ${damage} damage to ${loser.name}.`;
		if (attemptPin) {
			description = `${description} ${winner.name} makes the cover...`;
		}
		if (attemptSubmission) {
			description = `${description} The referee checks for submission...`;
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
	attemptPin: bool,
	attemptSubmission: bool,
	damage: number,
	loser: object.isRequired,
	roundNumber: number,
	targetStat: string,
	winner: object.isRequired,
};

export default RoundSummary;
