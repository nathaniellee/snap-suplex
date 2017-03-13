import _ from 'lodash';
import { Dialog } from 'lucid';
import React from 'react';

const {
	array,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		selectedWrestlers: array,
	},

	getDefaultProps() {
		return {
			selectedWrestlers: [],
		};
	},

	render() {
		const { selectedWrestlers } = this.props;
		const title = _.chain(selectedWrestlers)
			.map('name')
			.join(' vs. ')
			.value();

		return (
			<Dialog isShown={true}>
				<Dialog.Header>{title}</Dialog.Header>
				<section />
			</Dialog>
		);
	},
});
