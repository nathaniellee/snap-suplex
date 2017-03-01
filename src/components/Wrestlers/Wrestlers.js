import _ from 'lodash';
import { Button } from 'lucid';
import React from 'react';
import WrestlerDialog from './Dialog/ConnectedDialog';
import WrestlersTable from './Table/ConnectedTable';
import './Wrestlers.css';

const {
	func,
} = React.PropTypes;

const resetEditId = () => ({ editId: null });
const setEditId = (editId) => ({ editId });

const hideDialog = () => ({ isDialogShown: false });
const showDialog = () => ({ isDialogShown: true });

export default React.createClass({
	propTypes: {
		onAddWrestler: func,
		onUpdateWrestler: func,
	},

	getDefaultProps() {
		return {
			onAddWrestler: _.noop,
			onUpdateWrestler: _.noop,
		};
	},

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

	onSubmitEditWrestler(wrestler) {
		const isNewWrestler = _.isNull(wrestler.id);

		this.setState(resetEditId);
		this.setState(hideDialog);

		if (isNewWrestler) {
			this.props.onAddWrestler(wrestler);
		} else {
			this.props.onUpdateWrestler(wrestler);
		}
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
