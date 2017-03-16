import _ from 'lodash';
import React from 'react';
import {
	defaultDqRating,
	defaultNumRounds,
	defaultRefScore,
} from '../../constants/defaults';
import WrestlerSummary from './WrestlerSummary/WrestlerSummary';
import './Match.css';

const {
	number,
	object,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		dqRating: number,
		numRounds: number,
		refScore: number,
		wrestlers: object,
	},

	getDefaultProps() {
		return {
			dqRating: defaultDqRating,
			numRounds: defaultNumRounds,
			refScore: defaultRefScore,
			wrestlers: {},
		};
	},

	getInitialState() {
		const { wrestlers } = this.props;
		return {
			wrestlers: _.chain(wrestlers)
				.map((wrestler) => _.cloneDeep(wrestler))
				.value(),
		};
	},

	render() {
		const {
			dqRating,
			numRounds,
			refScore,
		} = this.props;
		const {
			wrestlers,
		} = this.state;

		return (
			<div className='Match'>
				<header className='Match-wrestler-summaries'>
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
							health={health}
							str={str}
							bra={bra}
							dex={dex}
							tec={tec}
						/>
					))}
				</header>
				<section>
					<p>DQ Rating: {dqRating}</p>
					<p># Rounds: {numRounds}</p>
					<p>Ref Score: {refScore}</p>
				</section>
			</div>
		);
	},
});
