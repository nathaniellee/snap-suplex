import React from 'react';
import WrestlersTable from './Table/ConnectedTable';

export default React.createClass({
	render() {
		return (
			<div className='Wrestlers'>
				<WrestlersTable />
			</div>
		);
	},
});
