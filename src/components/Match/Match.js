import _ from 'lodash';
import { Accordion } from 'lucid';
import React from 'react';
import Parameters from './Parameters/Parameters';
import './Match.css';

export default React.createClass({
	render() {
		return (
			<div className='Match'>
				<Accordion
					selectedIndex={0}
					onSelect={_.noop}
				>
					<Accordion.Item>
						<Accordion.Header>Parameters</Accordion.Header>
						<Parameters />
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Referee</Accordion.Header>
						Oh yeah.
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Participants</Accordion.Header>
						Hey now!
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Strategies</Accordion.Header>
						Say what?
					</Accordion.Item>
				</Accordion>
			</div>
		);
	},
});
