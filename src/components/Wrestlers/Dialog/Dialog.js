import _ from 'lodash';
import {
	Button,
	Dialog,
} from 'lucid';
import React from 'react';
import WrestlerForm from '../Form/Form';

const {
	func,
	object,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		wrestler: object,
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

	render() {
		const {
			wrestler,
			onCancel,
			onSubmit,
		} = this.props;

		const title = _.isNull(wrestler) ? 'Create Wrestler' : 'Edit Wrestler';

		return (
			<Dialog
				className='WrestlerDialog'
				isShown
			>
				<Dialog.Header>{title}</Dialog.Header>
				<section>
					<WrestlerForm wrestler={wrestler} />
				</section>
				<Dialog.Footer>
					<Button
						kind='primary'
						onClick={onSubmit}
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
