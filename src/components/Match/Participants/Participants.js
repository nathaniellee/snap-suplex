import _ from 'lodash';
import {
	DataTable,
	Paginator,
	Panel,
} from 'lucid';
import React from 'react';
import statLabels from '../../../constants/statLabels';
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
		selectedWrestlers: array,
		totalCount: number,
		onSelectPage: func,
	},

	getDefaultProps() {
		return {
			pageIndex: 0,
			selectableWrestlers: [],
			selectedWrestlers: [],
			totalCount: 0,
			onSelectPage: _.noop,
		};
	},

	render() {
		const {
			pageIndex,
			selectableWrestlers,
			selectedWrestlers,
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
							{_.map(statLabels, (label, key) => (
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
				<div className='Participants-summary'>
					<Panel>
						{_.isEmpty(selectedWrestlers) ? (
							<span>No wrestlers selected</span>
						) : _.map(selectedWrestlers, ({
							id,
							name,
						}) => (
							<p key={id}>{name}</p>
						))}
					</Panel>
				</div>
			</div>
		);
	},
});
