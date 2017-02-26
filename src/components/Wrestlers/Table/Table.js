import _ from 'lodash';
import React from 'react';
import WrestlerDialog from '../Dialog/ConnectedDialog';
import './Table.css';

const {
	array,
} = React.PropTypes;

const resetEditId = () => ({ editId: null });
const setEditId = (editId) => ({ editId });

const hideDialog = () => ({ isDialogShown: false });
const showDialog = () => ({ isDialogShown: true });

export default React.createClass({
	propTypes: {
		wrestlers: array,
	},

	getDefaultProps() {
		return {
			wrestlers: [],
		};
	},

	getInitialState() {
		return {
			editId: null,
			isDialogShown: false,
		};
	},

	onWrestlerDialogCancel() {
		this.setState(hideDialog);
	},

	onWrestlerDialogSubmit() {
		this.setState(resetEditId);
		this.setState(hideDialog);
	},

	onWrestlerEditClick(editId) {
		this.setState(_.partial(setEditId, editId));
		this.setState(showDialog);
	},

	render() {
		const { wrestlers } = this.props;
		const {
			editId,
			isDialogShown,
		} = this.state;

		return (
			<div className='WrestlersTable'>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>STR</th>
							<th>BRA</th>
							<th>DEX</th>
							<th>TEC</th>
							<th>STA</th>
						</tr>
					</thead>
					<tbody>
						{_.isEmpty(wrestlers) ? (
							<tr>
								<td colSpan={6}>No wrestlers</td>
							</tr>
						) : (
							_.map(wrestlers, ({
								id,
								name,
								stats,
							}) => (
								<tr key={id}>
									<td className='WrestlersTable-wrestler-name'>
										<div>
											<span>{name}</span>
											<span
												className='WrestlersTable-edit-link'
												onClick={_.partial(this.onWrestlerEditClick, id)}
											>
												Edit
											</span>
										</div>
									</td>
									<td>{stats.str}</td>
									<td>{stats.bra}</td>
									<td>{stats.dex}</td>
									<td>{stats.tec}</td>
									<td>{stats.sta}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
				{isDialogShown ? (
					<WrestlerDialog
						id={editId}
						onCancel={this.onWrestlerDialogCancel}
						onSubmit={this.onWrestlerDialogSubmit}
					/>
				) : null}
			</div>
		);
	},
});
