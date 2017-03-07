import _ from 'lodash';
import {
	Grid,
	RadioGroup,
} from 'lucid';
import React from 'react';
import './Parameters.css';

const roundLimits = _.range(10, 70, 10);

export default React.createClass({
	render() {
		return (
			<div className='Parameters'>
				<Grid isGutterless>
					<Grid.Cell
						className='Parameters-match-type-label'
						is2
					>
						Match type:
					</Grid.Cell>
					<Grid.Cell
						className='Parameters-match-type-input'
						is10
					>
						<RadioGroup
							selectedIndex={0}
							onSelect={_.noop}
						>
							<RadioGroup.RadioButton>
								<RadioGroup.Label>Singles</RadioGroup.Label>
							</RadioGroup.RadioButton>
							<RadioGroup.RadioButton isDisabled>
								<RadioGroup.Label>Tag Team</RadioGroup.Label>
							</RadioGroup.RadioButton>
						</RadioGroup>
					</Grid.Cell>
				</Grid>
				<Grid isGutterless>
					<Grid.Cell
						className='Parameters-round-limit-label'
						is2
					>
						Number of rounds:
					</Grid.Cell>
					<Grid.Cell
						className='Parameters-round-limit-input'
						is10
					>
						<RadioGroup
							selectedIndex={0}
							onSelect={_.noop}
						>
							{_.map(roundLimits, (limit) => (
								<RadioGroup.RadioButton
									key={limit}
								>
									<RadioGroup.Label>{limit}</RadioGroup.Label>
								</RadioGroup.RadioButton>
							))}
						</RadioGroup>
					</Grid.Cell>
				</Grid>
			</div>
		);
	},
});
