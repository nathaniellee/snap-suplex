import _ from 'lodash';
import {
	Checkbox,
	Panel,
	Table,
} from 'lucid';
import React from 'react';
import favoritesMap from '../../../../constants/favoritesMap';
import roundLevelMap from '../../../../constants/roundLevelMap';
import statMap from '../../../../constants/statMap';
import FlagSelector from '../../../selectors/FlagSelector/FlagSelector';
import FavoritesSelector from '../../../selectors/FavoritesSelector/FavoritesSelector';
import LevelSelector from '../../../selectors/LevelSelector/LevelSelector';
import StatSelector from '../../../selectors/StatSelector/StatSelector';
import TargetStatSelector from '../../../selectors/TargetStatSelector/TargetStatSelector';
import './Panel.css';

const {
	func,
	number,
	object,
	string,
} = React.PropTypes;

const {
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} = Table;

const stats = _.chain(statMap.allIds)
	.map((id) => _.find(statMap.byId, { id }).value)
	.reject((value) => value === 'sta')
	.value();
const favorites = _.map(favoritesMap.allIds, (id) =>
	_.find(favoritesMap.byId, { id }).value);
const roundLevels = _.map(roundLevelMap.allIds, (id) =>
	_.find(roundLevelMap.byId, { id }).value);

export default React.createClass({
	propTypes: {
		flag: string,
		level: number,
		numFavorites: number,
		numRounds: number,
		stat: string,
		targetStat: string,
		wrestler: object.isRequired,
		onChangeFlag: func,
		onChangeLevel: func,
		onChangeNumFavorites: func,
	},

	getDefaultProps() {
		return {
			flag: null,
			level: _.head(roundLevels).value,
			numFavorites: _.head(favorites).value,
			numRounds: 1,
			stat: _.head(stats).value,
			targetStat: null,
			onChangeFlag: _.noop,
			onChangeLevel: _.noop,
			onChangeNumFavorites: _.noop,
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
			flag,
			level,
			numFavorites,
			numRounds,
			stat,
			targetStat,
			wrestler,
		} = this.props;

		return (
			<Panel className='StrategyPanel'>
				<Panel.Header>{wrestler.name}</Panel.Header>
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
							{_.map(_.range(1, numRounds + 1), (roundNumber) => (
								<Tr key={roundNumber}>
									<Td
										align='right'
										className='StrategyPanel-round-number'
									>
										{roundNumber}
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
