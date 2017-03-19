import classnames from 'classnames';
import _ from 'lodash';
import { Panel } from 'lucid';
import React from 'react';
import { defaultStrategy } from '../../../../constants/defaults';
import FlagSelector from '../../../selectors/FlagSelector/FlagSelector';
import FavoritesSelector from '../../../selectors/FavoritesSelector/FavoritesSelector';
import LevelSelector from '../../../selectors/LevelSelector/LevelSelector';
import StatSelector from '../../../selectors/StatSelector/StatSelector';
import TargetStatSelector from '../../../selectors/TargetStatSelector/TargetStatSelector';
import './StrategyPanel.css';

const {
	bool,
	func,
	number,
	string,
} = React.PropTypes;

const StrategyField = ({
	children,
	label,
}) => (
	<div className='StrategyField'>
		<span className='StrategyField-label'>{label}</span>
		{children}
	</div>
);

export default React.createClass({
	propTypes: {
		flag: string,
		isAttacker: bool,
		isDefender: bool,
		level: number,
		numFavorites: number,
		stat: string,
		targetStat: string,
		onChangeFlag: func,
		onChangeLevel: func,
		onChangeNumFavorites: func,
		onChangeStat: func,
		onChangeTargetStat: func,
	},

	getDefaultProps() {
		return {
			...defaultStrategy,
			isAttacker: false,
			isDefender: false,
			onChangeFlag: _.noop,
			onChangeLevel: _.noop,
			onChangeNumFavorites: _.noop,
			onChangeStat: _.noop,
			onChangeTargetStat: _.noop,
		};
	},

	render() {
		const {
			flag,
			isAttacker,
			isDefender,
			level,
			numFavorites,
			stat,
			targetStat,
			onChangeFlag,
			onChangeLevel,
			onChangeNumFavorites,
			onChangeStat,
			onChangeTargetStat,
		} = this.props;

		return (
			<Panel className={classnames('StrategyPanel', {
				'StrategyPanel-is-attacker': isAttacker,
				'StrategyPanel-is-defender': isDefender,
			})}>
				<div className='StrategyPanel-fields'>
					<StrategyField label='Stat'>
						<StatSelector
							stat={stat}
							onChange={onChangeStat}
						/>
					</StrategyField>
					<StrategyField label='Level'>
						<LevelSelector
							level={level}
							onChange={onChangeLevel}
						/>
					</StrategyField>
					<StrategyField label='# Faves'>
						<FavoritesSelector
							numFavorites={numFavorites}
							onChange={onChangeNumFavorites}
						/>
					</StrategyField>
					<StrategyField label='Spot Flag'>
						<FlagSelector
							flag={flag}
							onChange={onChangeFlag}
						/>
					</StrategyField>
					<StrategyField label='Target'>
						<TargetStatSelector
							targetStat={targetStat}
							onChange={onChangeTargetStat}
						/>
					</StrategyField>
				</div>
			</Panel>
		);
	},
});
