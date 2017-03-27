import _ from 'lodash';
import React from 'react';
import {
	defaultNumRounds,
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
		matchWinnerId: number,
		numRounds: number,
		roundNumber: number,
		rounds: array,
		wrestlers: object,
	},

	getDefaultProps() {
		return {
			numRounds: defaultNumRounds,
			roundNumber: 1,
			rounds: [],
			wrestlers: {},
		};
	},

	render() {
		const {
			attackerId,
			defenderId,
			matchWinnerId,
			numRounds,
			roundNumber,
			rounds,
			strategies,
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
				{_.isNil(matchWinnerId) && !timeLimitReached ? (
					<div>
						<CurrentRound
							initialStrategies={strategies}
							roundNumber={roundNumber}
						/>
					</div>
				) : null}
				<div className='Match-rounds'>
					{_.map(_.reverse([...rounds]), ({
						loserId,
						roundNumber,
						winnerId,
						...rest,
					}) => (
						<RoundSummary
							key={roundNumber}
							loser={_.get(wrestlers, loserId)}
							roundNumber={roundNumber}
							winner={_.get(wrestlers, winnerId)}
							{...rest}
						/>
					))}
				</div>
			</div>
		);
	},
});
