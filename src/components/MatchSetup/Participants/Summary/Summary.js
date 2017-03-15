import _ from 'lodash';
import { Panel } from 'lucid';
import React from 'react';
import './Summary.css';

const {
	object,
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

const Summary = ({ wrestlers = {} }) => {
	const names = _.map(wrestlers, 'name');
	return (
		<div className='ParticipantsSummary'>
			<Panel>
				{_.isEmpty(names) ? (
					<span>No wrestlers selected.</span>
				) : (
					<Versus
						name1={names[0]}
						name2={names[1]}
					/>
				)}
			</Panel>
		</div>
	);
};

Summary.propTypes = {
	wrestlers: object,
};

export default Summary;
