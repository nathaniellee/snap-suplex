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

const refScoreValues = _.range(1, 11);

export default React.createClass({
	propTypes: {
		refScore: oneOf(refScoreValues),
		onChangeRefScore: func,
	},

	getDefaultProps() {
		return {
			refScore: 10,
			onChangeRefScore: _.noop,
		};
	},

	onChangeRefScore(selectedIndex) {
		this.props.onChangeRefScore(refScoreValues[selectedIndex]);
	},

	render() {
		const {
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
			</div>
		);
	},
});
