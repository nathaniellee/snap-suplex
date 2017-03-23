import _ from 'lodash';
import { Panel } from 'lucid';
import React from 'react';
import './RoundSummary.css';

const {
	number,
	object,
} = React.PropTypes;

const RoundSummary = ({
	damage = null,
	loser,
	roundNumber = 1,
	winner,
	pinAttempt,
	submissionAttempt,
}) => {
	let summaryText = damage
		? `${winner.name} inflicted ${damage} damage to ${loser.name}.`
		: `${winner.name} did not inflict any damage to ${loser.name}.`;

	if (!_.isNull(pinAttempt)) {
		const { count } = pinAttempt;
		let pinText = ` ${winner.name} makes the cover!`
		if (count === 0) {
			pinText = `${pinText} And ${loser.name} kicks out right away!`;
		} else if (count === 1) {
			pinText = `${pinText} 1... and a kick out!`;
		} else if (count === 2) {
			pinText = `${pinText} 1... 2... and ${loser.name} just manages to get the shoulder up!`;
		}
		pinText = `${pinText} 1... 2... 3! DING DING DING!!`;
		summaryText = `${summaryText} ${pinText}`;
	}

	if (!_.isNull(submissionAttempt)) {
		const {
			cycles,
			submitted,
		} = submissionAttempt;
		const durationText = cycles === 0
			? ` immediately`
			: ` after ${cycles} cycles in that submission hold`;
		const submissionText = submitted
			? ` ${loser.name} taps out ${durationText}!`
			: ` ${loser.name} escapes ${durationText}.`;
		summaryText = `${summaryText} ${submissionText}`;
	}

	return (
		<Panel className='RoundSummary'>
			<div>
				<span>{roundNumber}</span>
				<span>{summaryText}</span>
			</div>
		</Panel>
	);
};

RoundSummary.propTypes = {
	damage: number,
	loser: object.isRequired,
	roundNumber: number,
	winner: object.isRequired,
};

export default RoundSummary;
