import _ from 'lodash';
import {
	Grid,
	RadioGroup,
	SingleSelect,
	TextField,
} from 'lucid';
import React from 'react';
import FlagSelector from '../../../selectors/FlagSelector/FlagSelector';
import './FinisherField.css';

const {
	func,
	number,
	string,
} = React.PropTypes;

const statLabels = [
	{
		key: 'str',
		label: 'Strength',
	},
	{
		key: 'bra',
		label: 'Brawling',
	},
	{
		key: 'dex',
		label: 'Dexterity',
	},
	{
		key: 'tec',
		label: 'Technical',
	},
];
const levelRange = _.range(1, 5);

export default React.createClass({
	propTypes: {
		description: string,
		flag: string,
		level: number,
		stat: string,
		onChangeDescription: func,
		onChangeFlag: func,
		onChangeLevel: func,
		onChangeStat: func,
	},

	getDefaultProps() {
		return {
			description: '',
			flag: null,
			level: 1,
			stat: 'str',
			onChangeDescription: _.noop,
			onChangeFlag: _.noop,
			onChangeLevel: _.noop,
			onChangeStat: _.noop,
		};
	},

	onChangeFlag(flag) {
		this.props.onChangeFlag(flag);
	},

	onChangeLevel(selectedIndex) {
		this.props.onChangeLevel(levelRange[selectedIndex]);
	},

	onChangeStat(selectedIndex) {
		this.props.onChangeStat(statLabels[selectedIndex].key);
	},

	render() {
		const {
			description,
			flag,
			level,
			stat,
			onChangeDescription,
		} = this.props;

		return (
			<div className='FinisherField'>
				<Grid isGutterless>
					<Grid.Cell is2>
						<SingleSelect
							selectedIndex={_.findIndex(statLabels, { key: stat })}
							onSelect={this.onChangeStat}
						>
							{_.map(statLabels, ({ key, label }) => (
								<SingleSelect.Option key={key}>
									{label}
								</SingleSelect.Option>
							))}
						</SingleSelect>
					</Grid.Cell>
					<Grid.Cell
						className='FinisherField-description-input'
						is5
					>
						<TextField
							value={description}
							onChange={onChangeDescription}
						/>
					</Grid.Cell>
				</Grid>
				<Grid isGutterless>
					<Grid.Cell is2>
						<FlagSelector
							flag={flag}
							onChange={this.onChangeFlag}
						/>
					</Grid.Cell>
					<Grid.Cell className='FinisherField-level-label'>
						Level:
					</Grid.Cell>
					<Grid.Cell
						className='FinisherField-level-input'
						is9
					>
						<RadioGroup
							selectedIndex={_.indexOf(levelRange, level)}
							onSelect={this.onChangeLevel}
						>
							{_.map(levelRange, (levelValue) => (
								<RadioGroup.RadioButton key={levelValue}>
									<RadioGroup.Label>{levelValue}</RadioGroup.Label>
								</RadioGroup.RadioButton>
							))}
						</RadioGroup>
					</Grid.Cell>
				</Grid>
			</div>
		);
	},
});
