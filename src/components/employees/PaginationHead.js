import React from 'react';
import {
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@material-ui/core';

const Pagination = (props) => {
	const { valueToOrderBy, orderDirection, handleRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};
	return (
		<TableHead>
			<TableRow>
				<TableCell style={{ width: '10%' }} key='id'>
					<TableSortLabel
						active={valueToOrderBy === 'id'}
						direction={valueToOrderBy === 'id' ? orderDirection : 'asc'}
						onClick={createSortHandler('id')}
					>
						ID
					</TableSortLabel>
				</TableCell>
				<TableCell style={{ width: '15%' }} key='username'>
					<TableSortLabel
						active={valueToOrderBy === 'username'}
						direction={valueToOrderBy === 'username' ? orderDirection : 'asc'}
						onClick={createSortHandler('username')}
					>
						Username
					</TableSortLabel>
				</TableCell>
				<TableCell style={{ width: '15%' }} key='email'>
					<TableSortLabel
						active={valueToOrderBy === 'email'}
						direction={valueToOrderBy === 'email' ? orderDirection : 'asc'}
						onClick={createSortHandler('email')}
					>
						Email
					</TableSortLabel>
				</TableCell>
				<TableCell style={{ width: '5%' }} key='type'>
					<TableSortLabel
						active={valueToOrderBy === 'type'}
						direction={valueToOrderBy === 'type' ? orderDirection : 'asc'}
						onClick={createSortHandler('type')}
					>
						Type
					</TableSortLabel>
				</TableCell>
				{/* <TableCell style={{ width: '15%' }}>
					<TableSortLabel
						active={valueToOrderBy === 'state'}
						direction={valueToOrderBy === 'state' ? orderDirection : 'asc'}
						onClick={createSortHandler('state')}
					>
						State
					</TableSortLabel>
				</TableCell> */}
				<TableCell style={{ width: '15%' }}>
					Actions

				</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default Pagination;
