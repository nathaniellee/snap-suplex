import _ from 'lodash';
import React from 'react';
import {
	getSpecialtyStatCost,
	getStaminaStatCost,
} from '../../../utils/statCosts';
import NameField from './NameField/NameField';
import StatField from './StatField/StatField';
import TotalField from './TotalField/TotalField';
import './Form.css';

const {
	object,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		wrestler: object,
	},

	getDefaultProps() {
		return {
			wrestler: {},
		};
	},

	getInitialState() {
		const { wrestler } = this.props;

		const name = _.get(wrestler, 'name', '');

		const bra = _.get(wrestler, 'stats.bra', 1);
		const braCost = getSpecialtyStatCost(bra);

		const dex = _.get(wrestler, 'stats.dex', 1);
		const dexCost = getSpecialtyStatCost(dex);

		const sta = _.get(wrestler, 'stats.sta', 1);
		const staCost = getStaminaStatCost(sta);

		const str = _.get(wrestler, 'stats.str', 1);
		const strCost = getSpecialtyStatCost(str);

		const tec = _.get(wrestler, 'stats.tec', 1);
		const tecCost = getSpecialtyStatCost(tec);

		return {
			bra,
			braCost,
			dex,
			dexCost,
			name,
			sta,
			staCost,
			str,
			strCost,
			tec,
			tecCost,
		};
	},

	onChangeName(name) {
		this.setState({ name });
	},

	onChangeBrawling(bra) {
		this.setState({
			bra,
			braCost: getSpecialtyStatCost(bra),
		});
	},

	onChangeDexterity(dex) {
		this.setState({
			dex,
			dexCost: getSpecialtyStatCost(dex),
		});
	},

	onChangeStamina(sta) {
		this.setState({
			sta,
			staCost: getStaminaStatCost(sta),
		});
	},

	onChangeStrength(str) {
		this.setState({
			str,
			strCost: getSpecialtyStatCost(str),
		});
	},

	onChangeTechnical(tec) {
		this.setState({
			tec,
			tecCost: getSpecialtyStatCost(tec),
		});
	},

	render() {
		const {
			bra,
			braCost,
			dex,
			dexCost,
			name,
			sta,
			staCost,
			str,
			strCost,
			tec,
			tecCost,
		} = this.state;

		return (
			<div className='WrestlerForm'>
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
			</div>
		);
	},
});
