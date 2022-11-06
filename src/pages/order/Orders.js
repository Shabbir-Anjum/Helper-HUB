import React from 'react'
import { Paper, makeStyles,Typography } from '@material-ui/core';

import TableContent from '../../components/orders/TableContent'
import SearchForm from '../../components/orders/SearchForm';
import { connect } from "react-redux";
import clsx from 'clsx';
import { ORDER_LIST,ORDER_LIST_CUSTOMER } from "../../actions/orderAction";
import Layout from '../../components/layout/Index'
import Export from '../../components/orders/ExportDialog'
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(theme => ({
	pageContent: {
		padding: theme.spacing(3),
		background:'white',
		// background:theme.palette.primary.light,
		boxShadow:'none',
		[theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    }
	},
	searchInput: {
		width: '75%'
	},
	itemWrapper:{
		paddingTop:theme.spacing(3),
		paddingBottom:theme.spacing(3),
	},
	flex:{
		display:'flex',
		justifyContent:'space-between',
		paddingBottom:theme.spacing(3)
	},
	address:{
		color: '#C8CBCB'
	},
	bold:{
		fontWeight:'bold',
		color:theme.palette.primary.lightDark,
		fontSize:'12px'
	},
	time:{
		fontSize:'11px',
		fontWeight:'600',
		color:theme.palette.primary.lightDark
	},
	instructions:{
		fontSize:'15px',
		fontWeight:"600",
		color:theme.palette.primary.lightDark
	},
	statusButton:{
		fontSize:'0.7rem',
		padding:'0.1rem'
	},
	statusActive:{
		background:theme.palette.primary.light,
		padding:`${theme.spacing(1)}px`,
		borderRadius:'50%',
		textAlign:'center',
		fontWeight:'bold',
		color:theme.palette.primary.lightDark,
		[theme.breakpoints.down('sm')]: {
      marginTop:"1.5rem",
			borderRadius:'20%',
    }
	},
	name:{
		color:theme.palette.primary.lightDark,
		fontSize:'11px',
		fontWeight:'600'
	},
	line:{
    borderTop:'2px red solid',
    borderTopColor:theme.palette.primary.lightDark,
    // width:'5rem',
    margin:'auto',
    padding:theme.spacing(2),
  },
	justifyStart:{
		textAlign:'left'
	},
	mobileView:{
    display:'none',
    [theme.breakpoints.down('sm')]: {
      display:'block'
    }
  },
  desktopView:{
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  }
}))

function ORDER_List({type, ORDER_LIST,history,loading,orderList,ORDER_LIST_CUSTOMER}) {

	const classes = useStyles();

	React.useEffect(()=>{
		if(type==='customer'){
			// history.push('/createBooking')
			ORDER_LIST_CUSTOMER()
		}else{
			ORDER_LIST();
		}
		// ORDER_COUNT();
		  // eslint-disable-next-line
	},[])

	return (
		<Layout>
			{
				type!=='customer' &&
				<SearchForm/>
			}
			<Paper className={classes.pageContent}>
				<div className={classes.desktopView}>
					<TableContent history={history}/>
				</div>
					{orderList ? (
						<div className={classes.mobileView}>
						{
							orderList.map((item,i)=>(
								<RenderRow item={item} i={i}/>
							))
						}
						</div>
					): (
						<h3 className={classes.mobileView}>Loading... </h3>
					)
				}
			</Paper>
		</Layout>
	)
}

const RenderRow=({i, item})=>{
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

  const handleOpen = (index) => {
    setOpen(true);
		console.log('open'+index)
  };

  const handleClose = () => {
    setOpen(false);
  };

	return (
		<div key={i} className={classes.itemWrapper} 	
		// onClick={()=>handleOpen(i)}
		>
					 {/* <ClickAwayListener onClickAway={()=>console.log('click away lister')}> */}

				<div className={classes.flex}>
					<div className={clsx(classes.justifyStart,classes.address)}>
						<Typography variant='body1' className={clsx(classes.instructions)}>
							{item.instructions.substring(0, 30)}
						</Typography>
						{item.address}
					</div>
					<Typography variant='h5' className={clsx(classes.statusActive)}>
						{item.status || 'ACTIVE'}
					</Typography>
				</div>
				<div className={classes.flex}>
					<Typography variant='body1' className={classes.bold}>
						{item.time.substring(0, 5)}
					</Typography>
					<Typography variant='body1' className={classes.time}>
						{item.date}  <br/>
						{item.duration}  Days
					</Typography>
					<Typography variant='body2' className={classes.name}>
						{item.cleaner? `${item?.cleaner?.firstName} ${item?.cleaner?.lastName}` : 'No cleaner Assigned'} <br/>
							{item.amount?.toFixed(2)}PKR
						<Export item={item} open={open} handleOpen={handleOpen} handleClose={handleClose}/>
					</Typography>
				</div>
				<div className={clsx(classes.flex,classes.line)}></div>
			 {/* </ClickAwayListener> */}
		</div>)
}


const mapStateToProps = state => ({
	orderList:state.order.orderList,
	loading:state.order.loading,
	type:state.auth.user.role.name
});

export default connect(
	mapStateToProps,
	{ ORDER_LIST,ORDER_LIST_CUSTOMER }
)(ORDER_List);
