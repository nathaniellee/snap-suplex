import _ from 'lodash';
import {
	DataTable,
	Paginator,
} from 'lucid';
import React from 'react';
import statMap from '../../../constants/statMap';
import Summary from './Summary/ConnectedSummary';
import './Participants.css';

const {
	array,
	func,
	number,
} = React.PropTypes;

export default React.createClass({
	propTypes: {
		pageIndex: number,
		selectableWrestlers: array,
		totalCount: number,
		onSelectPage: func,
	},

	getDefaultProps() {
		return {
			pageIndex: 0,
			selectableWrestlers: [],
			totalCount: 0,
			onSelectPage: _.noop,
		};
	},

	render() {
		const {
			pageIndex,
			selectableWrestlers,
			totalCount,
			onSelectPage,
			onSelectWrestler,
		} = this.props;

		return (
			<div className='Participants'>
				<div className='Participants-available'>
					<div className='Participants-table'>
						<DataTable
							data={selectableWrestlers}
							isActionable
							onRowClick={onSelectWrestler}
						>
							<DataTable.Column
								field='name'
								width={200}
							>
								Name
							</DataTable.Column>
							{_.map(statMap, ({
								key,
								label,
							}) => (
								<DataTable.Column
									align='center'
									field={`stats.${key}`}
									key={key}
								>
									{label}
								</DataTable.Column>
							))}
						</DataTable>
					</div>
					<div className='Participants-paginator'>
						<Paginator
							selectedPageIndex={pageIndex}
							totalCount={totalCount}
							onPageSelect={onSelectPage}
						/>
					</div>
				</div>
				<Summary />
			</div>
		);
	},
});
