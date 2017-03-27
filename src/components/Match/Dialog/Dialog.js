import _ from 'lodash';
import {
	Button,
	Dialog,
} from 'lucid';
import React from 'react';
import { Provider } from 'react-redux';
import { defaultNumRounds } from '../../../constants/defaults';
import store from '../../../utils/store';
import Match from '../ConnectedMatch';
import './Dialog.css';

const {
	func,
	number,
	object,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		matchWinnerId: number,
		numRounds: number,
		roundNumber: number,
		wrestlers: object,
		onClickConfirmMatchOver: func,
	},

	getDefaultProps() {
		return {
			numRounds: defaultNumRounds,
			roundNumber: 1,
			wrestlers: {},
			onClickConfirmMatchOver: _.noop,
		};
	},

	render() {
		const {
			matchWinnerId,
			numRounds,
			roundNumber,
			wrestlers,
			onClickConfirmMatchOver,
		} = this.props;
		const title = _.chain(wrestlers)
			.map('name')
			.join(' vs. ')
			.value();
		const timeLimitReached = roundNumber === numRounds + 1;

		return (
			<Dialog
				className='MatchDialog'
				isShown={true}
			>
				<Dialog.Header>{title}</Dialog.Header>
				<section>
					<Provider store={store}>
						<Match />
					</Provider>
				</section>
				{_.isNil(matchWinnerId) && !timeLimitReached ? null : (
					<Dialog.Footer>
						<span className='MatchDialog-result-description'>
							{_.isNil(matchWinnerId) ? (
								`Time limit draw!`
							) : (
								`${_.get(wrestlers, matchWinnerId).name} wins!`
							)}
						</span>
						<span>
							<Button
								kind='primary'
								onClick={onClickConfirmMatchOver}
							>
								OK
							</Button>
						</span>
					</Dialog.Footer>
				)}
			</Dialog>
		);
	},
});
