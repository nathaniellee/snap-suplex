import _ from 'lodash';
import React from 'react';
import {
// 	defaultDqRating,
	defaultNumRounds,
// 	defaultRefScore,
} from '../../constants/defaults';
import CurrentRound from './CurrentRound/ConnectedCurrentRound';
import RoundSummary from './RoundSummary/RoundSummary';
import WrestlerSummary from './WrestlerSummary/WrestlerSummary';
import './Match.css';

const {
	array,
	number,
	object,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		attackerId: number,
		defenderId: number,
		// dqRating: number,
		numRounds: number,
		// refScore: number,
		roundNumber: number,
		rounds: array,
		winnerId: number,
		wrestlers: object,
	},

	getDefaultProps() {
		return {
			// dqRating: defaultDqRating,
			numRounds: defaultNumRounds,
			// refScore: defaultRefScore,
			roundNumber: 1,
			rounds: [],
			wrestlers: {},
		};
	},

	render() {
		const {
			attackerId,
			defenderId,
			// dqRating,
			numRounds,
			// refScore,
			roundNumber,
			rounds,
			strategies,
			winnerId,
			wrestlers,
		} = this.props;
		const timeLimitReached = roundNumber === numRounds + 1;

		return (
			<div className='Match'>
				<div className='Match-wrestler-summaries'>
					{_.map(wrestlers, ({
						id,
						name,
						health,
						stats: {
							str,
							bra,
							dex,
							tec,
							sta,
						},
					}) => (
						<WrestlerSummary
							key={id}
							name={name}
							isAttacker={id === attackerId}
							isDefender={id === defenderId}
							health={health}
							str={str}
							bra={bra}
							dex={dex}
							tec={tec}
							sta={sta}
						/>
					))}
				</div>
				{_.isNil(winnerId) && !timeLimitReached ? (
					<div>
						<CurrentRound
							initialStrategies={strategies}
							roundNumber={roundNumber}
						/>
					</div>
				) : null}
				<div className='Match-rounds'>
					{_.map(_.reverse([...rounds]), ({
						damage,
						loserId,
						numPinAttemptFailures,
						roundNumber,
						targetStat,
						winnerId,
					}) => (
						<RoundSummary
							key={roundNumber}
							damage={damage}
							loser={_.get(wrestlers, loserId)}
							numPinAttemptFailures={numPinAttemptFailures}
							roundNumber={roundNumber}
							targetStat={targetStat}
							winner={_.get(wrestlers, winnerId)}
						/>
					))}
				</div>
			</div>
		);
	},
});
