import _ from 'lodash';
import React from 'react';
import './Grid.css';

const {
	array,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		wrestlers: array,
	},

	getDefaultProps() {
		return {
			wrestlers: [],
		};
	},

	render() {
		const { wrestlers } = this.props;

		return (
			<div className='WrestlersGrid'>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>STR</th>
							<th>BRA</th>
							<th>DEX</th>
							<th>TEC</th>
							<th>STA</th>
						</tr>
					</thead>
					<tbody>
						{_.isEmpty(wrestlers) ? (
							<tr>
								<td colSpan={6}>No wrestlers</td>
							</tr>
						) : (
							_.map(wrestlers, ({
								id,
								name,
								stats,
							}) => (
								<tr key={id}>
									<td className='WrestlersGrid-wrestler-name'>{name}</td>
									<td>{stats.str}</td>
									<td>{stats.bra}</td>
									<td>{stats.dex}</td>
									<td>{stats.tec}</td>
									<td>{stats.sta}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		);
	},
});
