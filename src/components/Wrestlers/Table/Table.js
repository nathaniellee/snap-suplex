import _ from 'lodash';
import { Button } from 'lucid';
import React from 'react';
import './Table.css';

const {
	array,
	func,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		wrestlers: array,
		onEdit: func,
	},

	getDefaultProps() {
		return {
			wrestlers: [],
			onEdit: _.noop,
		};
	},

	render() {
		const {
			wrestlers,
			onEdit,
		} = this.props;

		return (
			<div className='WrestlersTable'>
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
									<td className='WrestlersTable-wrestler-name'>
										<div>
											<span>{name}</span>
											<Button
												kind='link'
												onClick={_.partial(onEdit, id)}
											>
												Edit
											</Button>
										</div>
									</td>
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
