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
		onChangeStrategies: func,
	},

	getDefaultProps() {
		return {
			strategies: [],
			wrestlerName: '',
			onChangeStrategies: _.noop,
		};
	},

	onChangeFlag(index, flag) {
		const { strategies } = this.props;
		const updatedStrategies = _.map(strategies, (strategy, i) => index === i
			? {
				...strategy,
				flag,
			}
			: strategy);
		this.props.onChangeStrategies(updatedStrategies);
	},

	onChangeNumFavorites(index, numFavorites) {
		const { strategies } = this.props;
		const updatedStrategies = _.map(strategies, (strategy, i) => index === i
			? {
				...strategy,
				numFavorites,
			}
			: strategy);
		this.props.onChangeStrategies(updatedStrategies);
	},

	onChangeLevel(index, level) {
		const { strategies } = this.props;
		const updatedStrategies = _.map(strategies, (strategy, i) => index === i
			? {
				...strategy,
				level,
			}
			: strategy);
		this.props.onChangeStrategies(updatedStrategies);
	},

	onChangeStat(index, stat) {
		const { strategies } = this.props;
		const updatedStrategies = _.map(strategies, (strategy, i) => index === i
			? {
				...strategy,
				stat,
			}
			: strategy);
		this.props.onChangeStrategies(updatedStrategies);
	},

	onChangeTargetStat(index, targetStat) {
		const { strategies } = this.props;
		const updatedStrategies = _.map(strategies, (strategy, i) => index === i
			? {
				...strategy,
				targetStat,
			}
			: strategy);
		this.props.onChangeStrategies(updatedStrategies);
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
											onChange={_.partial(this.onChangeStat, index)}
										/>
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-level'
									>
										<LevelSelector
											level={level}
											onChange={_.partial(this.onChangeLevel, index)}
										/>
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-favorites'
									>
										<FavoritesSelector
											numFavorites={numFavorites}
											onChange={_.partial(this.onChangeNumFavorites, index)}
										/>
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-spot-flags'
									>
										<FlagSelector
											flag={flag}
											onChange={_.partial(this.onChangeFlag, index)}
										/>
									</Td>
									<Td
										align='center'
										className='StrategyPanel-round-target'
									>
										<TargetStatSelector
											targetStat={targetStat}
											onChange={_.partial(this.onChangeTargetStat, index)}
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
