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
		const {
			wrestler: {
				name,
				stats,
			},
		} = this.props;

		const bra = _.isNil(stats.bra) ? 1 : stats.bra;
		const braCost = getSpecialtyStatCost(bra);

		const dex = _.isNil(stats.dex) ? 1 : stats.dex;
		const dexCost = getSpecialtyStatCost(dex);

		const sta = _.isNil(stats.sta) ? 1 : stats.sta;
		const staCost = getStaminaStatCost(sta);

		const str = _.isNil(stats.str) ? 1 : stats.str;
		const strCost = getSpecialtyStatCost(str);

		const tec = _.isNil(stats.tec) ? 1 : stats.tec;
		const tecCost = getSpecialtyStatCost(tec);

		return {
			bra,
			braCost,
			dex,
			dexCost,
			name: name || '',
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
