import React from 'react';
import {
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	lighten:{
		fontSize:'1.2rem',
		color:'#BDBDBD',
		[theme.breakpoints.up('md')]: {
			fontSize:'1vw'
		}
	}
}));

const Pagination = (props) => {
	const classes = useStyles();

	const { valueToOrderBy, orderDirection, handleRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		handleRequestSort(event, property);
	};
	return (
		<TableHead>
			<TableRow>
				<TableCell style={{ width: '5%',borderBottom:'none' }} key='id'>
					<TableSortLabel
						active={valueToOrderBy === 'id'}
						direction={valueToOrderBy === 'id' ? orderDirection : 'asc'}
						onClick={createSortHandler('id')}
					>
						<Typography variant='h5' className={classes.lighten}>
							Time
						</Typography>
					</TableSortLabel>
				</TableCell>
				<TableCell style={{ width: '8%',borderBottom:'none' }} key='firstName'>
					<TableSortLabel
						active={valueToOrderBy === 'firstName'}
						direction={valueToOrderBy === 'firstName' ? orderDirection : 'asc'}
						onClick={createSortHandler('firstName')}
					>
						<Typography variant='h5' className={classes.lighten}>
							Date
						</Typography>
					</TableSortLabel>
				</TableCell>
				<TableCell style={{ width: '8%',borderBottom:'none' }} key='email'>
					<TableSortLabel
						active={valueToOrderBy === 'email'}
						direction={valueToOrderBy === 'email' ? orderDirection : 'asc'}
						onClick={createSortHandler('email')}
					>
						<Typography variant='h5' className={classes.lighten}>
							Duration
						</Typography>
					</TableSortLabel>
				</TableCell>
				<TableCell style={{ width: '8%',borderBottom:'none' }} key='vehicleRegNo'>
					<TableSortLabel
						active={valueToOrderBy === 'vehicleRegNo'}
						direction={valueToOrderBy === 'vehicleRegNo' ? orderDirection : 'asc'}
						onClick={createSortHandler('vehicleRegNo')}
					>
						<Typography variant='h5' className={classes.lighten}>
							Status
						</Typography>
					</TableSortLabel>
				</TableCell>
				<TableCell style={{ width: '14%',borderBottom:'none' }}>
					<TableSortLabel
						active={valueToOrderBy === 'price'}
						direction={valueToOrderBy === 'price' ? orderDirection : 'asc'}
						onClick={createSortHandler('price')}
					>
						<Typography variant='h5' className={classes.lighten}>
							Description and address
							
						</Typography>
					</TableSortLabel>
				</TableCell>
				{/* <TableCell style={{ width: '12%',borderBottom:'none' }}>
					<TableSortLabel
						active={valueToOrderBy === 'addedBy'}
						direction={valueToOrderBy === 'addedBy' ? orderDirection : 'asc'}
						onClick={createSortHandler('addedBy')}
					>
						<Typography variant='h5' className={classes.lighten}>
							
							Assigned Cleaner
						</Typography>
					</TableSortLabel>
				</TableCell> */}
				<TableCell style={{ width: '5%',borderBottom:'none' }}>
					<TableSortLabel
						active={valueToOrderBy === 'status'}
						direction={valueToOrderBy === 'status' ? orderDirection : 'asc'}
						onClick={createSortHandler('status')}
					>
						<Typography variant='h5' className={classes.lighten}>
							Amount
							
						</Typography>
					</TableSortLabel>
				</TableCell>
				<TableCell style={{ width: '0%',borderBottom:'none' }}>
					<TableSortLabel
						active={valueToOrderBy === 'status'}
						direction={valueToOrderBy === 'status' ? orderDirection : 'asc'}
						onClick={createSortHandler('status')}
					>
						<Typography variant='h5' className={classes.lighten}>
						
							
						</Typography>
					</TableSortLabel>
				</TableCell>
				
			</TableRow>
		</TableHead>
	);
};

export default Pagination;
