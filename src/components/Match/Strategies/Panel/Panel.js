import _ from 'lodash';
import {
	Checkbox,
	Panel,
	SingleSelect,
	Table,
} from 'lucid';
import React from 'react';
import spotFlags from '../../../../constants/spotFlags';
import statMap from '../../../../constants/statMap';
import FavoritesSelector from './FavoritesSelector/FavoritesSelector';
import './Panel.css';

const {
	func,
	number,
	object,
} = React.PropTypes;

const {
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} = Table;

const levels = _.range(1, 5);
const stats = _.omit(statMap, 'sta');

export default React.createClass({
	propTypes: {
		numRounds: number,
		wrestler: object.isRequired,
		onSelectFavorites: func,
	},

	getDefaultProps() {
		return {
			numRounds: 1,
			onSelectFavorites: _.noop,
		};
	},

	onSelectFavorites(numFavorites) {
		this.props.onSelectFavorites(numFavorites);
	},

	render() {
		const {
			numRounds,
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
								<Th align='center'>Favorites</Th>
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
									<Td className='StrategyPanel-round-stat'>
										<SingleSelect
											hasReset={false}
											selectedIndex={0}
										>
											{_.map(stats, ({
												key,
												label,
											}) => (
												<SingleSelect.Option key={key}>{_.upperCase(key)}</SingleSelect.Option>
											))}
										</SingleSelect>
									</Td>
									<Td className='StrategyPanel-round-level'>
										<SingleSelect
											hasReset={false}
											selectedIndex={0}
										>
											{_.map(levels, (level) => (
												<SingleSelect.Option key={level}>{level}</SingleSelect.Option>
											))}
										</SingleSelect>
									</Td>
									<Td className='StrategyPanel-round-favorites'>
										<FavoritesSelector
											selectedIndex={0}
											onSelect={this.onSelectFavorites}
										/>
									</Td>
									<Td className='StrategyPanel-round-spot-flags'>
										<SingleSelect
											hasReset={false}
											selectedIndex={0}
										>
											{_.map(spotFlags, ({
												key,
												label,
											}) => (
												<SingleSelect.Option key={key}>{label}</SingleSelect.Option>
											))}
										</SingleSelect>
									</Td>
									<Td className='StrategyPanel-round-target'>
										<SingleSelect
											hasReset={false}
											selectedIndex={0}
										>
											{_.map(stats, ({
												key,
												label,
											}) => (
												<SingleSelect.Option key={key}>{_.upperCase(key)}</SingleSelect.Option>
											))}
										</SingleSelect>
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
