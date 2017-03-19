import _ from 'lodash';
import React from 'react';
import {
	defaultDqRating,
	defaultNumRounds,
	defaultRefScore,
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
		dqRating: number,
		numRounds: number,
		refScore: number,
		rounds: array,
		wrestlers: object,
	},

	getDefaultProps() {
		return {
			dqRating: defaultDqRating,
			numRounds: defaultNumRounds,
			refScore: defaultRefScore,
			rounds: [],
			wrestlers: {},
		};
	},

	render() {
		const {
			attackerId,
			defenderId,
			dqRating,
			numRounds,
			refScore,
			roundNumber,
			rounds,
			strategies,
			wrestlers,
		} = this.props;

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
						/>
					))}
				</div>
				<div>
					<CurrentRound
						initialStrategies={strategies}
						roundNumber={roundNumber}
					/>
				</div>
				<div className='Match-rounds'>
					{_.map(_.reverse([...rounds]), ({
						attemptPin,
						attemptSubmission,
						damage,
						loserId,
						roundNumber,
						targetStat,
						winnerId,
					}) => (
						<RoundSummary
							key={roundNumber}
							attemptPin={attemptPin}
							attemptSubmission={attemptSubmission}
							damage={damage}
							loser={_.get(wrestlers, loserId)}
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
