import _ from 'lodash';
import {
	Grid,
	SingleSelect,
} from 'lucid';
import React from 'react';
import './Referee.css';

const {
	func,
	oneOf,
} = React.PropTypes;

const dqRatingValues = _.range(1, 11);
const refScoreValues = _.range(1, 11);

export default React.createClass({
	propTypes: {
		dqRating: oneOf(dqRatingValues),
		refScore: oneOf(refScoreValues),
		onChangeDqRating: func,
		onChangeRefScore: func,
	},

	getDefaultProps() {
		return {
			dqRating: 5,
			refScore: 5,
			onChangeDqRating: _.noop,
			onChangeRefScore: _.noop,
		};
	},

	onChangeDqRating(selectedIndex) {
		this.props.onChangeDqRating(dqRatingValues[selectedIndex]);
	},

	onChangeRefScore(selectedIndex) {
		this.props.onChangeRefScore(refScoreValues[selectedIndex]);
	},

	render() {
		const {
			dqRating,
			refScore,
		} = this.props;

		return (
			<div className='Referee'>
				<Grid isGutterless>
					<Grid.Cell
						className='Referee-ref-score-label'
						is2
					>
						Ref score:
					</Grid.Cell>
					<Grid.Cell
						className='Referee-ref-score-input'
						is10
					>
						<SingleSelect
							hasReset={false}
							selectedIndex={_.indexOf(refScoreValues, refScore)}
							onSelect={this.onChangeRefScore}
						>
							{_.map(refScoreValues, (refScoreValue) => (
								<SingleSelect.Option key={refScoreValue}>
									{refScoreValue}
								</SingleSelect.Option>
							))}
						</SingleSelect>
					</Grid.Cell>
				</Grid>
				<Grid isGutterless>
					<Grid.Cell
						className='Referee-dq-rating-label'
						is2
					>
						DQ rating:
					</Grid.Cell>
					<Grid.Cell
						className='Referee-dq-rating-input'
						is10
					>
						<SingleSelect
							hasReset={false}
							selectedIndex={_.indexOf(dqRatingValues, dqRating)}
							onSelect={this.onChangeDqRating}
						>
							{_.map(dqRatingValues, (dqRatingValue) => (
								<SingleSelect.Option key={dqRatingValue}>
									{dqRatingValue}
								</SingleSelect.Option>
							))}
						</SingleSelect>
					</Grid.Cell>
				</Grid>
			</div>
		);
	},
});
