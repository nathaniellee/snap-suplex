import _ from 'lodash';
import { Dialog } from 'lucid';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../utils/store';
import Match from '../ConnectedMatch';

const {
	object,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		wrestlers: object,
	},

	getDefaultProps() {
		return {
			wrestlers: {},
		};
	},

	render() {
		const { wrestlers } = this.props;
		const title = _.chain(wrestlers)
			.map('name')
			.join(' vs. ')
			.value();

		return (
			<Dialog isShown={true}>
				<Dialog.Header>{title}</Dialog.Header>
				<section>
					<Provider store={store}>
						<Match />
					</Provider>
				</section>
			</Dialog>
		);
	},
});
