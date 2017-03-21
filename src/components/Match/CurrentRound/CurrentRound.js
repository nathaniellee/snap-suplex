import _ from 'lodash';
import {
	Button,
	Panel,
} from 'lucid';
import React from 'react';
import StrategyPanel from './StrategyPanel/StrategyPanel';
import './CurrentRound.css';

const {
	func,
	number,
	object,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		attackerId: number,
		defenderId: number,
		strategies: object,
		roundNumber: number,
		onChangeStrategies: func,
		onResolve: func,
	},

	getDefaultProps() {
		return {
			strategies: {},
			onChangeStrategies: _.noop,
			onResolve: _.noop,
		};
	},

	onChangeStrategyField(id, name, value) {
		const {
			strategies,
			onChangeStrategies,
		} = this.props;
		onChangeStrategies({
			...strategies,
			[id]: {
				..._.get(strategies, id),
				[name]: value,
			},
		});
	},

	onChangeFlag(id, flag) {
		this.onChangeStrategyField(id, 'flag', flag);
	},

	onChangeLevel(id, level) {
		this.onChangeStrategyField(id, 'level', level);
	},

	onChangeNumFavorites(id, numFavorites) {
		this.onChangeStrategyField(id, 'numFavorites', numFavorites);
	},

	onChangeStat(id, stat) {
		this.onChangeStrategyField(id, 'stat', stat);
	},

	onChangeTargetStat(id, targetStat) {
		this.onChangeStrategyField(id, 'targetStat', targetStat);
	},

	onClickResolve() {
		this.props.onResolve();
	},

	render() {
		const {
			attackerId,
			defenderId,
			roundNumber,
			strategies,
		} = this.props;

		return (
			<Panel className='CurrentRound'>
				<Panel.Header>Round {roundNumber}</Panel.Header>
				<div>
					<div className='CurrentRound-strategies'>
						{_.map(strategies, ({
							flag,
							level,
							numFavorites,
							stat,
							targetStat,
						}, id) => (
							<StrategyPanel
								key={id}
								flag={flag}
								isAttacker={_.toNumber(id) === attackerId}
								isDefender={_.toNumber(id) === defenderId}
								level={level}
								numFavorites={numFavorites}
								stat={stat}
								targetStat={targetStat}
								onChangeFlag={_.partial(this.onChangeFlag, id)}
								onChangeLevel={_.partial(this.onChangeLevel, id)}
								onChangeNumFavorites={_.partial(this.onChangeNumFavorites, id)}
								onChangeStat={_.partial(this.onChangeStat, id)}
								onChangeTargetStat={_.partial(this.onChangeTargetStat, id)}
							/>
						))}
					</div>
				</div>
				<Panel.Footer>
					<Button
						kind='success'
						onClick={this.onClickResolve}
					>
						Resolve
					</Button>
				</Panel.Footer>
			</Panel>
		);
	},
});
