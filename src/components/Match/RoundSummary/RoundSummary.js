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
	roundNumber = 1,
	targetStat,
	winner,
}) => {
	let description;

	if (damage) {
		description = `${winner.name} inflicted ${damage} damage to ${loser.name}.`;
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
	roundNumber: number,
	targetStat: string,
	winner: object.isRequired,
};

export default RoundSummary;
