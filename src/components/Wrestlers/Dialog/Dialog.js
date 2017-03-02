import _ from 'lodash';
import {
	Button,
	Dialog,
} from 'lucid';
import React from 'react';
import {
	getSpecialtyStatCost,
	getStaminaStatCost,
} from '../../../utils/statCosts';
import NameField from './NameField/NameField';
import StatField from './StatField/StatField';
import TotalField from './TotalField/TotalField';
import './Dialog.css';

const {
	arrayOf,
	func,
	number,
	shape,
	string,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		wrestler: shape({
			id: number,
			name: string,
			moves: shape({
				bra: arrayOf(number),
				dex: arrayOf(number),
				str: arrayOf(number),
				tec: arrayOf(number),
				fin: arrayOf(number),
			}),
			stats: shape({
				bra: number,
				dex: number,
				sta: number,
				str: number,
				tec: number,
			}),
		}),
		onCancel: func,
		onSubmit: func,
	},

	getDefaultProps() {
		return {
			wrestler: null,
			onCancel: _.noop,
			onSubmit: _.noop,
		};
	},

	getInitialState() {
		const { wrestler } = this.props;
		return {
			id: _.get(wrestler, 'id', null),
			name: _.get(wrestler, 'name', ''),
			moves: {
				bra: _.get(wrestler, 'moves.bra', []),
				dex: _.get(wrestler, 'moves.dex', []),
				str: _.get(wrestler, 'moves.str', []),
				tec: _.get(wrestler, 'moves.tec', []),
				fin: _.get(wrestler, 'moves.fin', []),
			},
			stats: {
				bra: _.get(wrestler, 'stats.bra', 1),
				dex: _.get(wrestler, 'stats.dex', 1),
				sta: _.get(wrestler, 'stats.sta', 1),
				str: _.get(wrestler, 'stats.str', 1),
				tec: _.get(wrestler, 'stats.tec', 1),
			},
		};
	},

	onChangeName(name) {
		this.setState({ name });
	},

	onChangeStat(statName, statValue) {
		const { stats } = this.state;
		this.setState({
			stats: {
				...stats,
				[statName]: statValue,
			},
		});
	},

	onChangeBrawling(value) {
		this.onChangeStat('bra', value);
	},

	onChangeDexterity(value) {
		this.onChangeStat('dex', value);
	},

	onChangeStamina(value) {
		this.onChangeStat('sta', value);
	},

	onChangeStrength(value) {
		this.onChangeStat('str', value);
	},

	onChangeTechnical(value) {
		this.onChangeStat('tec', value);
	},

	onSubmit() {
		this.props.onSubmit(this.state);
	},

	render() {
		const { onCancel } = this.props;
		const {
			id,
			// moves,
			name,
			stats: {
				bra,
				dex,
				sta,
				str,
				tec,
			},
		} = this.state;

		const title = _.isNull(id) ? 'Create Wrestler' : 'Edit Wrestler';

		const braCost = getSpecialtyStatCost(bra);
		const dexCost = getSpecialtyStatCost(dex);
		const staCost = getStaminaStatCost(sta);
		const strCost = getSpecialtyStatCost(str);
		const tecCost = getSpecialtyStatCost(tec);

		return (
			<Dialog
				className='WrestlerDialog'
				isShown
			>
				<Dialog.Header>{title}</Dialog.Header>
				<section className='WrestlerDialog-form'>
					<NameField
						value={name}
						onChange={this.onChangeName}
					/>
					<StatField
						cost={strCost}
						label='Strength'
						value={str}
						onChange={this.onChangeStrength}
					/>
					<StatField
						cost={braCost}
						label='Brawling'
						value={bra}
						onChange={this.onChangeBrawling}
					/>
					<StatField
						cost={dexCost}
						label='Dexterity'
						value={dex}
						onChange={this.onChangeDexterity}
					/>
					<StatField
						cost={tecCost}
						label='Technical'
						value={tec}
						onChange={this.onChangeTechnical}
					/>
					<StatField
						cost={staCost}
						label='Stamina'
						value={sta}
						onChange={this.onChangeStamina}
					/>
					<TotalField
						total={_.sum([
							braCost,
							dexCost,
							staCost,
							strCost,
							tecCost,
						])}
					/>
				</section>
				<Dialog.Footer>
					<Button
						kind='primary'
						onClick={this.onSubmit}
					>
						Submit
					</Button>
					<Button
						kind='link'
						onClick={onCancel}
					>
						Cancel
					</Button>
				</Dialog.Footer>
			</Dialog>
		);
	},
});
