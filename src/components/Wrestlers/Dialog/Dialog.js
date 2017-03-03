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
import MoveField from './MoveField/MoveField';
import NameField from './NameField/NameField';
import StatField from './StatField/StatField';
import TotalField from './TotalField/TotalField';
import './Dialog.css';

const {
	arrayOf,
	func,
	number,
	object,
	shape,
	string,
} = React.PropTypes;

const statLabelMap = {
	'bra': 'Brawling',
	'dex': 'Dexterity',
	'sta': 'Stamina',
	'str': 'Strength',
	'tec': 'Technical',
};

export default React.createClass({
	propTypes: {
		wrestler: shape({
			id: number,
			name: string,
			moves: shape({
				bra: arrayOf(object),
				dex: arrayOf(object),
				str: arrayOf(object),
				tec: arrayOf(object),
				fin: arrayOf(object),
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
			bra: _.get(wrestler, 'stats.bra', 1),
			dex: _.get(wrestler, 'stats.dex', 1),
			sta: _.get(wrestler, 'stats.sta', 1),
			str: _.get(wrestler, 'stats.str', 1),
			tec: _.get(wrestler, 'stats.tec', 1),
			braMoves: _.get(wrestler, 'moves.bra', []),
			dexMoves: _.get(wrestler, 'moves.dex', []),
			strMoves: _.get(wrestler, 'moves.str', []),
			tecMoves: _.get(wrestler, 'moves.tec', []),
			finisher: _.head(_.get(wrestler, 'moves.fin', [])),
		};
	},

	onChangeName(name) {
		this.setState({ name });
	},

	onChangeStat(statName, statValue) {
		this.setState({
			[statName]: statValue,
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

	onChangeMoveDescription(moveType, moveId, description) {
		const stateKey = `${moveType}Moves`;
		this.setState({
			[stateKey]: _.map(this.state[stateKey], (move) => move.id === moveId
				? {
					...move,
					description,
				}
				: move),
		});
	},

	onChangeMoveFavorites(moveType, moveId, favoriteTags) {
		const stateKey = `${moveType}Moves`;
		this.setState({
			[stateKey]: _.map(this.state[stateKey], (move) => move.id === moveId
				? {
					...move,
					favoriteTags,
				}
				: move),
		});
	},

	onSubmit() {
		const {
			id,
			name,
			bra,
			dex,
			sta,
			str,
			tec,
			braMoves,
			dexMoves,
			strMoves,
			tecMoves,
			finisher,
		} = this.state;

		this.props.onSubmit({
			id,
			name,
			stats: {
				bra,
				dex,
				sta,
				str,
				tec,
			},
			moves: {
				bra: braMoves,
				dex: dexMoves,
				str: strMoves,
				tec: tecMoves,
				fin: [finisher],
			},
		});
	},

	render() {
		const { onCancel } = this.props;
		const {
			id,
			name,
			bra,
			dex,
			sta,
			str,
			tec,
			braMoves,
			dexMoves,
			strMoves,
			tecMoves,
			finisher,
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
					<div className='WrestlerDialog-form-heading-stats'>Stats</div>
					<StatField
						cost={strCost}
						label={statLabelMap.str}
						value={str}
						onChange={this.onChangeStrength}
					/>
					<StatField
						cost={braCost}
						label={statLabelMap.bra}
						value={bra}
						onChange={this.onChangeBrawling}
					/>
					<StatField
						cost={dexCost}
						label={statLabelMap.dex}
						value={dex}
						onChange={this.onChangeDexterity}
					/>
					<StatField
						cost={tecCost}
						label={statLabelMap.tec}
						value={tec}
						onChange={this.onChangeTechnical}
					/>
					<StatField
						cost={staCost}
						label={statLabelMap.sta}
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
					<div className='WrestlerDialog-form-heading-moves'>Moves</div>
					{_.map(strMoves, (move, i) => (
						<MoveField
							description={move.description}
							favoriteTags={move.favoriteTags}
							key={move.id}
							label={`${statLabelMap.str} ${i + 1}`}
							onChangeDescription={_.partial(this.onChangeMoveDescription, 'str', move.id)}
							onChangeFavorites={_.partial(this.onChangeMoveFavorites, 'str', move.id)}
						/>
					))}
					{_.map(braMoves, (move, i) => (
						<MoveField
							description={move.description}
							favoriteTags={move.favoriteTags}
							key={move.id}
							label={`${statLabelMap.bra} ${i + 1}`}
							onChangeDescription={_.partial(this.onChangeMoveDescription, 'bra', move.id)}
							onChangeFavorites={_.partial(this.onChangeMoveFavorites, 'bra', move.id)}
						/>
					))}
					{_.map(dexMoves, (move, i) => (
						<MoveField
							description={move.description}
							favoriteTags={move.favoriteTags}
							key={move.id}
							label={`${statLabelMap.dex} ${i + 1}`}
							onChangeDescription={_.partial(this.onChangeMoveDescription, 'dex', move.id)}
							onChangeFavorites={_.partial(this.onChangeMoveFavorites, 'dex', move.id)}
						/>
					))}
					{_.map(tecMoves, (move, i) => (
						<MoveField
							description={move.description}
							favoriteTags={move.favoriteTags}
							key={move.id}
							label={`${statLabelMap.tec} ${i + 1}`}
							onChangeDescription={_.partial(this.onChangeMoveDescription, 'tec', move.id)}
							onChangeFavorites={_.partial(this.onChangeMoveFavorites, 'tec', move.id)}
						/>
					))}
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
