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

	onCancelEditWrestler() {
		this.setState(resetEditId);
		this.setState(hideDialog);
	},

	onClickCreateWrestler() {
		this.setState(showDialog);
	},

	onClickEditWrestler(editId) {
		this.setState(_.partial(setEditId, editId));
		this.setState(showDialog);
	},

	onSubmitEditWrestler() {
		this.setState(resetEditId);
		this.setState(hideDialog);
	},

	render() {
		const {
			editId,
			isDialogShown,
		} = this.state;

		return (
			<div className='Wrestlers'>
				<Button
					onClick={this.onClickCreateWrestler}
				>
					Create Wrestler
				</Button>
				<WrestlersTable
					onEdit={this.onClickEditWrestler}
				/>
				{isDialogShown ? (
					<WrestlerDialog
						id={editId}
						onCancel={this.onCancelEditWrestler}
						onSubmit={this.onSubmitEditWrestler}
					/>
				) : null}
			</div>
		);
	},
});
