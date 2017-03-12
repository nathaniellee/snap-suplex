import _ from 'lodash';
import {
	Checkbox,
	Panel,
	Table,
} from 'lucid';
import React from 'react';
import FlagSelector from '../../../selectors/FlagSelector/FlagSelector';
import FavoritesSelector from '../../../selectors/FavoritesSelector/FavoritesSelector';
import LevelSelector from '../../../selectors/LevelSelector/LevelSelector';
import StatSelector from '../../../selectors/StatSelector/StatSelector';
import TargetStatSelector from '../../../selectors/TargetStatSelector/TargetStatSelector';
import './Panel.css';

const {
	array,
	func,
	string,
} = React.PropTypes;

const {
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} = Table;

export default React.createClass({
	propTypes: {
		strategies: array,
		wrestlerName: string,
		onChangeFlag: func,
		onChangeLevel: func,
		onChangeNumFavorites: func,
		onChangeStat: func,
		onChangeTargetStat: func,
	},

	getDefaultProps() {
		return {
			strategies: [],
			wrestlerName: '',
			onChangeFlag: _.noop,
			onChangeLevel: _.noop,
			onChangeNumFavorites: _.noop,
			onChangeStat: _.noop,
			onChangeTargetStat: _.noop,
		};
	},

	onChangeFlag(flag) {
		this.props.onChangeFlag(flag);
	},

	onChangeNumFavorites(numFavorites) {
		this.props.onChangeNumFavorites(numFavorites);
	},

	onChangeLevel(level) {
		this.props.onChangeLevel(level);
	},

	onChangeStat(stat) {
		this.props.onChangeStat(stat);
	},

	onChangeTargetStat(targetStat) {
		this.props.onChangeTargetStat(targetStat);
	},

	render() {
		const {
			strategies,
			wrestlerName,
		} = this.props;

		return (
			<Panel className='StrategyPanel'>
				<Panel.Header>{wrestlerName}</Panel.Header>
				<div>
					<Table>
						<Thead>
							<Tr>
								<Th align='center'>Round</Th>
								<Th align='center'>Stat</Th>
								<Th align='center'>Level</Th>
								<Th align='center'># Favorites</Th>
								<Th align='center'>Spot Flag</Th>
								<Th align='center'>Target</Th>
								<Th align='center'>Finisher</Th>
							</Tr>
						</Thead>
						<Tbody>
							{_.map(strategies, ({
								flag,
								level,
								numFavorites,
								stat,
								targetStat,
							}, index) => (
								<Tr key={index}>
									<Td
										align='right'
										className='StrategyPanel-round-number'
									>
										{index + 1}
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-stat'
									>
										<StatSelector
											stat={stat}
											onChange={this.onChangeStat}
										/>
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-level'
									>
										<LevelSelector
											level={level}
											onChange={this.onChangeLevel}
										/>
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-favorites'
									>
										<FavoritesSelector
											numFavorites={numFavorites}
											onChange={this.onChangeFavorites}
										/>
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-spot-flags'
									>
										<FlagSelector
											flag={flag}
											onChange={this.onChangeFlag}
										/>
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-target'
									>
										<TargetStatSelector
											targetStat={targetStat}
											onChange={this.onChangeTargetStat}
										/>
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-use-finisher'
									>
										<Checkbox />
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</div>
			</Panel>
		);
	},
});
