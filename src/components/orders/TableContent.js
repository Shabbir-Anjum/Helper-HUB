import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PaginationHead from './PaginationHead';
import clsx from 'clsx';
import Export from './ExportDialog'

import {
	Table,
	TableRow,
	TableCell,
	TablePagination,
	TableFooter,
	TableContainer,
	Typography
} from '@material-ui/core';

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
	bold:{
		fontWeight:'bold',
		[theme.breakpoints.up('md')]: {
			fontSize:'0.95vw'
		}
	},
	cell:{
		[theme.breakpoints.up('md')]: {
			fontSize:'1.1vw'
		}
	},
	footer: {
		fontSize: 'larger',
		marginTop: '1rem',
	},
	statusButton:{
		fontSize:'0.7rem',
		padding:'0.1rem'
	},
	statusActive:{
		background:'rgba(11, 199, 202, 0.1)',
		opticity:"0.1",
		padding:`${theme.spacing(1)}px`,
		borderRadius:'10%',
		textAlign:'center',
		fontWeight:'bold',
		[theme.breakpoints.up('md')]: {
			fontSize:'1.1vw'
		}
	},
	description:{
		// fontSize
	},
	address:{
		color:"#C8CBCB",
		[theme.breakpoints.up('md')]: {
			fontSize:'.70vw'
		}
	}
}));

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const sortedRowInformation = (rowArray, comparator) => {
	const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
	stabilizedRowArray.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedRowArray.map((el) => el[0]);
};

const TableContent = ({type,orderList}) => {
	const classes = useStyles();

	const [orderDirection, setOrderDirection] = useState('asc');
	const [valueToOrderBy, SetValueToOrderBy] = useState('ID');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleRequestSort = (event, property) => {
		const isAccessending =
			valueToOrderBy === property && orderDirection === 'asc';
		SetValueToOrderBy(property);
		setOrderDirection(isAccessending ? 'desc' : 'asc');
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value), 10);
		setPage(0);
	};
	
	return (
		<div>
			{orderList ? (
				<>
					<TableContainer>
						<Table>
							<PaginationHead
								valueToOrderBy={valueToOrderBy}
								orderDirection={orderDirection}
								handleRequestSort={handleRequestSort}
							/>
							{sortedRowInformation(
								orderList,
								getComparator(orderDirection, valueToOrderBy)
							)
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((item, index) => (
									<RenderRow index={index} item={item}/>
								))}
						</Table>
					</TableContainer>
					<TableFooter>
						<TablePagination
							className={classes.footer}
							color='primary'
							rowsPerPageOptions={[1, 5, 10]}
							component='div'
							count={orderList.length}
							rowsPerPage={rowsPerPage}
							// showFirstButton
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</TableFooter>
				</>
			) : (
				<h3>Loading... Mrs {type} </h3>
			)}
		</div>
	);
};

const RenderRow=({index, item})=>{
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

  const handleOpen = (index) => {
    setOpen(true);
		console.log('open'+index)
  };

  const handleClose = () => {
    setOpen(false);
		console.log('closing')
  };

	return <TableRow key={index}
				// onMouseOut={handleClose}
				// onClick={()=>handleOpen(index)}
			>
				<TableCell 
				onClick={()=>handleOpen(index)}
				>
					<Typography variant='body1' className={classes.bold}>
						{item.time.substring(0, 5)}
					</Typography>
				</TableCell>
				<TableCell className={classes.cell}
				onClick={()=>handleOpen(index)}
				>
					{item.date || ''}
				</TableCell>
				<TableCell className={classes.cell}
				onClick={()=>handleOpen(index)}

				>
					{item.duration} Days
				</TableCell>
				<TableCell
				onClick={()=>handleOpen(index)}

				>
					<Typography variant='h6' className={clsx(classes.statusActive)}>
						{item.status || 'ACTIVE'}
					</Typography>
				</TableCell>
				<TableCell
				onClick={()=>handleOpen(index)}

				>
					<Typography variant='h6' className={clsx(classes.description,classes.cell)}>
						{item.instructions.substring(0, 30)}
					</Typography>
					<Typography variant='body2' className={classes.address}>
					{item.address}
					</Typography>
					
				</TableCell>
				{/* <TableCell
				onClick={()=>handleOpen(index)}

				>
					<Typography className={classes.bold}>
						{item.cleaner? `${item?.cleaner?.firstName} ${item?.cleaner?.lastName}` : 'No cleaner Assigned'}
					</Typography>
				</TableCell> */}
				<TableCell className={classes.cell} style={{alignItems:'center'}}
				>
					  {item.amount?.toFixed(2) || 'Anonymous'}PKR
					<Export item={item} open={open} handleOpen={handleOpen} handleClose={handleClose}/>
				</TableCell>
			</TableRow>	
}

const mapStateToProps = state => ({
  orderList:state.order.orderList,
	loading:state.order.loading,
	type:state.auth.user.role.name
});

export default connect(
	mapStateToProps,
	{ }
)(TableContent);
