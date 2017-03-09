import _ from 'lodash';
import { Panel } from 'lucid';
import React from 'react';
import './Summary.css';

const {
	array,
	string,
} = React.PropTypes;

const Versus = ({
	name1 = '???',
	name2 = '???',
}) => (
	<div className='ParticipantsSummary-versus'>
		<span>{name1}</span>
		<span>vs.</span>
		<span>{name2}</span>
	</div>
);

Versus.propTypes = {
	name1: string,
	name2: string,
};

const Summary = ({ selectedWrestlers = [] }) => {
	return (
		<div className='ParticipantsSummary'>
			<Panel>
				{_.isEmpty(selectedWrestlers) ? (
					<span>No wrestlers selected</span>
				) : (
					<Versus
						name1={_.get(selectedWrestlers, '[0].name')}
						name2={_.get(selectedWrestlers, '[1].name')}
					/>
				)}
			</Panel>
		</div>
	);
};

Summary.propTypes = {
	selectedWrestlers: array,
};

export default Summary;
