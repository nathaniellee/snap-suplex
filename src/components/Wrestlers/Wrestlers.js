import _ from 'lodash';
import { Button } from 'lucid';
import React from 'react';
import WrestlerDialog from './Dialog/ConnectedDialog';
import WrestlersTable from './Table/ConnectedTable';
import './Wrestlers.css';

const resetEditId = () => ({ editId: null });
const setEditId = (editId) => ({ editId });

const hideDialog = () => ({ isDialogShown: false });
const showDialog = () => ({ isDialogShown: true });

export default React.createClass({
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

	onEditWrestler(editId) {
		this.setState(_.partial(setEditId, editId));
		this.setState(showDialog);
	},

	render() {
		const {
			editId,
			isDialogShown,
		} = this.state;

		return (
			<div className='Wrestlers'>
				<Button>
					Add Wrestler
				</Button>
				<WrestlersTable
					onEdit={this.onEditWrestler}
				/>
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
