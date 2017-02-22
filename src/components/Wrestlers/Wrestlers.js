import React from 'react';
import WrestlersGrid from './Grid/ConnectedGrid';

export default React.createClass({
	render() {
		return (
			<div className='Wrestlers'>
				<WrestlersGrid />
			</div>
		);
	},
});
