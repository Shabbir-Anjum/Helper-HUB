import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Typography,
	Checkbox,
  FormControlLabel,
	MenuItem,
	FormControl ,
	TextField,
	CircularProgress
} from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import Layout from '../components/layout/Index';
import Revenue from '../components/dashboard/revenue'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ClearIcon from '@material-ui/icons/Clear';

import { connect } from "react-redux";
import { FETCH_APPOINTLIST,FETCH_STATS,ORDER_FEATURED,TOGGLE_ORDER_STATUS } from "../actions/orderAction";

const useStyles = makeStyles((theme) => ({
	formWrapper: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		display:'grid',
		gridTemplateAreas:`
		"heading" 
		"bar" 
		"charts"`,
		gridTemplateColumns:'1fr',
		gridTemplateRows:'0.5fr 0.8fr 3fr',
		gridGap:theme.spacing(3),
		[theme.breakpoints.down('md')]: {
			gridTemplateRows:'0.3fr 0.7fr 3fr',
		},
		[theme.breakpoints.down('sm')]: {
			gridTemplateRows:'0fr',
		}
	},
	barGrid:{
		gridArea:'bar',
		display:'grid',
		gridTemplateColumns:'12% auto 25% 25%',
		gridTemplateAreas:`
		"stat1 stat2 stat3 stat4"`,
		alignItems:'center',
		[theme.breakpoints.down('sm')]: {
			gridTemplateAreas:`
			"stat1 stat2" "stat3 stat4"`,
			gridTemplateColumns:'1fr 1fr',
		}
	},
	chartsGrid:{
		gridArea:'charts',
		display:'grid',
		gridTemplateColumns:'1fr 1fr',
		gridGap:theme.spacing(3),
		gridTemplateAreas:`
		"chart1 chart2"`,
		alignItems:'center',
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns:'1fr',
			gridTemplateAreas:`
			"chart1" "chart2"`,
		}
	},
	card:{
		padding:`${theme.spacing(3)}px ${theme.spacing(2)}px`,
		borderRadius:theme.spacing(2),
		background:'white',
		gridColumnGap:theme.spacing(2),
		gridRowGap:theme.spacing(3),
		[theme.breakpoints.up('md')]: {
      padding:`1.5vw 1.5vw`,
      gridColumnGap:'1vw',
      gridRowGap:'1.5vw',
    },
		[theme.breakpoints.down('sm')]: {
			marginTop:theme.spacing(1),
			gridGap:theme.spacing(1),
		}
	},
	chart:{
		textAlign:'left',
		height:'100%'
	},
	cardChip:{
		background:theme.palette.primary.light,
		fontSize:"1.1rem",
		fontWeight:'bold',
		marginLeft:'2rem',
		borderRadius:'1rem',
		padding:'0.7rem',
		color:theme.palette.primary.main,
			[theme.breakpoints.up('md')]: {
				fontSize:"1vw",
				marginLeft:'1.6vw',
				padding:'0.7vw',
			}
	},
	icon:{
		fill:theme.palette.primary.main,
				fontSize:"1rem",
			[theme.breakpoints.up('md')]: {
				fontSize:"1.1vw",
			}
	},
	moneyIcon:{
		fontSize:'2.5rem',
		marginRight:'-8px',
		fill:theme.palette.primary.main,
		[theme.breakpoints.up('md')]: {
			fontSize:"2.3vw",
		}
	},
	cardHeading:{
		color:theme.palette.primary.lightDark,
	 	paddingBottom:theme.spacing(1),
    fontSize:"1.05vw",
    fontWeight:'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize:"18px",
    },
	},
	statHead:{
		color:theme.palette.primary.lightDark,
		fontSize:'0.9vw',
		[theme.breakpoints.down('sm')]: {
			textAlign:'left',
			fontSize:'13px',
		}
	},
	mobileStatHeadTwo:{
		[theme.breakpoints.down('sm')]: {
			textAlign:'right',
		}
	},
	statVal:{
		fontSize:'2.2vw',
		fontWeight:'bold',
		display:'flex',
		justifyContent:'center',
		alignItems:'center',
		[theme.breakpoints.down('sm')]: {
			justifyContent:'left',
			fontSize:'33px',
		}
	},
	mobileStatTwo:{
		[theme.breakpoints.down('sm')]: {
			marginLeft:'auto',
			justifyContent:'end'
		}
	},
	itemBoldVal:{
		fontWeight:"bold",
		color:theme.palette.primary.lightDark,
		fontSize:theme.spacing(1.8)
	},
	header:{
		textAlign:'Start',
		paddingBottom:theme.spacing(1),
		color:theme.palette.primary.lightDark,
		fontSize:"1.5vw",
		fontWeight:"bold",
		[theme.breakpoints.down('sm')]:{
			fontSize:'1.3rem'
		}
	},
	name:{
		fontSize:"3vw",
		[theme.breakpoints.down('sm')]:{
			fontSize:'2.3rem'
		}
	},
	select:{
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none",
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    },
    "& .MuiSelect-outlined":{},
    "& .MuiOutlinedInput-input":{
      [theme.breakpoints.only('lg')]: {
        fontSize:'15px',
        padding:'11px 12px',
        paddingRight:'32px',
      },
      [theme.breakpoints.down('md')]: {
        fontSize:'13px',
        padding:'9.5px 10px',
				paddingRight:'30px',
      },
      [theme.breakpoints.down('sm')]: {
        padding:'14.5px 10px',
				paddingRight:'32px',
      },
    },
    "& .MuiInputLabel-outlined": {
      [theme.breakpoints.down('lg')]: {
        transform:'translate(14px, 14px) scale(1)',
      },
      [theme.breakpoints.only('lg')]: {
        fontSize:'13px',
      },
      [theme.breakpoints.only('md')]: {
        fontSize:'12px',
      },
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
      transform:'translate(14px, -6px) scale(0.75)',
    }
  },
	formControl:{
		marginRight:'18px'
	},
	item:{
		justifyContent:'space-between',
		alignItems:'center',
		padding:theme.spacing(2),
		display:'grid',
		gridTemplateColumns:'1fr 0.8fr 1.2fr',
		gridTemplateAreas:`
		"name time action"`,
		boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px',
		[theme.breakpoints.down('sm')]:{
			gridTemplateColumns:'1fr 0.6fr 1.5fr',
		}
	},
	appointmentHead:{
		[theme.breakpoints.down('sm')]:{
			display:'flex',
			alignItems:'center',
			justifyContent:'space-between',
			paddingBottom:'1rem'
		},
		[theme.breakpoints.between(0,400)]:{
			flexDirection:'column',
			alignItems:'start',
		}
	},
	firstName:{
		fontSize:"14px",
		fontWeight:'bold',
		color:theme.palette.primary.lightDark,
		[theme.breakpoints.up('md')]:{
			fontSize:'.8vw'
		}
	},
	companyName:{
		fontSize:"10px",
		fontWeight:'500',
		color:theme.palette.primary.lightDark,
		[theme.breakpoints.up('md')]:{
			fontSize:'.6vw'
		}
	},
	justifyStart:{
		textAlign:'left'
	},

	delete:{
		display:'flex',
		alignItems:'center',
		marginRight:"1rem",
		fontSize:"8px",
		fontWeight:'500',
		color:theme.palette.primary.lightDark,
		"& .MuiSvgIcon-root":{
				height:"0.7rem",
				width:"0.7rem",
			[theme.breakpoints.up('md')]:{
				height:"0.7vw",
				width:"0.7vw",
				margin:'9px'
			}
		},
		[theme.breakpoints.up('md')]:{
			fontSize:'.7vw'
		}
	},
	mark:{
		"& .MuiTypography-body1":{
			fontSize:"8px",
			fontWeight:'500',
			color:theme.palette.primary.lightDark,
			[theme.breakpoints.up('md')]:{
				fontSize:'.7vw'
			}
		}
	},
	AppointmenttIcon:{
		"& .MuiSvgIcon-root":{
				height:"0.7rem",
				width:"0.7rem",
			[theme.breakpoints.up('md')]:{
				height:"0.7vw",
				width:"0.7vw"
			}
		}
	}
}));

const Dashboard = ({appointmentList,FETCH_STATS,stats,ORDER_FEATURED,firstName,FETCH_APPOINTLIST,TOGGLE_ORDER_STATUS,loading,type,history}) => {
	const classes = useStyles();
	const [select,setSelect] = React.useState('ACTIVE');
	const [monthList,setMonthList]=React.useState([]);
	const [startDate,setStartDate]=React.useState();
	const [endDate,setEndDate]=React.useState();
	React.useEffect(()=>{
		if(type==='customer'){
			history.push('/createBooking')
		}else{
			FETCH_APPOINTLIST(select)
		}
		// eslint-disable-next-line
	},[select])
	React.useEffect(()=>{
		dateListSetter();
		ORDER_FEATURED()
		FETCH_STATS()
		// eslint-disable-next-line
	},[])

	const dateListSetter=()=>{
		var arr=[];
		var b;
		const today = moment().startOf('month')
		// debugger
		for(var a=0;a<12;a++){
			if(a===0){
				b=0;
			}else{
				b=1
			}
			
			var val = today.subtract(b,'months').format('YYYY-MM-DD')
			if(a===0){
				setStartDate(val)
			}else if(a===11){
				setEndDate(val)
			}
			var key = today.format('MMM:YYYY')
			arr.push({
				key,
				val
			})
		}
		setMonthList(arr);
	}


	return (
		<Layout>
			{type!=='customer' &&
			<div className={classes.formWrapper}>
				<div style={{gridArea:"heading"}}>
					<Typography variant='h4' className={classes.header}>	Welcome Back
					</Typography>
					<Typography variant='h1' className={clsx(classes.header,classes.name)}>			
						{firstName}
					</Typography>
				</div>
				<div className={clsx(classes.card,classes.barGrid)}>
					<div style={{gridArea:'stat1'}}>
						<Typography variant='body1' className={classes.statHead}>
							Total Bookings
						</Typography>
						<Typography variant='h5' className={classes.statVal}>
							{stats?.totalBookings} 
							<span className={classes.cardChip}>
								25% <ArrowUpwardIcon className={classes.icon}/>
							</span>
						</Typography>
					</div>
					<div style={{gridArea:'stat2'}} className={classes.mobileStatTwo}>
						<Typography variant='body1' className={clsx(classes.statHead,classes.mobileStatHeadTwo)}>
							Forecast Revenue
						</Typography>
						<Typography variant='h5' className={clsx(classes.statVal,classes.mobileStatTwo)}>	
							{stats?.forcastRevenue?.toFixed(1)} PKR
						</Typography>
					</div>
					<div style={{gridArea:'stat3'}}>
						<Typography variant='body1' className={classes.statHead}>
							Total Revenue
						</Typography>
						<Typography variant='h5' className={classes.statVal}>
							{stats?.totalRevenue?.toFixed(1)}
						</Typography>
					</div>
					<div style={{gridArea:'stat4'}} className={classes.mobileStatTwo}>
						<Typography variant='body1' className={clsx(classes.statHead,classes.mobileStatHeadTwo)}>
							Uncompleted Tasks
						</Typography>
						<Typography variant='h5' className={clsx(classes.statVal,classes.mobileStatTwo)}>
							{stats?.unCompletedCount}
						</Typography>
					</div>

				</div>
				<div className={clsx(classes.chartsGrid)}>
					<div style={{gridArea:"chart1"}} className={clsx(classes.chart,classes.card)}>
						<Typography variant='body1' className={classes.cardHeading}>
							ACTUAL REVENUE THIS MONTH
						</Typography>
						{
							monthList.length>2 && <>
							<FormControl variant="outlined" className={classes.formControl}>
								<TextField
									className={classes.select}
									value={startDate}
									select
									variant= 'outlined'
									fullWidth
									onChange={(e)=>{
										setStartDate(e.target.value)
										ORDER_FEATURED({startDate:e.target.value,endDate})
									}}>
										{monthList.map((val,i)=>{
											return <MenuItem key={i} value={val.val}>{val.key}</MenuItem>
										}
										)}
									</TextField>
							</FormControl>
								<FormControl variant="outlined" className={classes.formControl}>
									<TextField
									className={classes.select}
									select
									variant= 'outlined'
									fullWidth
									value={endDate}
									onChange={(e)=>{
										setEndDate(e.target.value)
										ORDER_FEATURED({startDate,endDate:e.target.value})
									}}>
										{monthList.map((val,i)=>{
											return <MenuItem key={i} value={val.val}>{val.key}</MenuItem>
										})}
									</TextField>
								</FormControl>
							</>
						}
							{/* <Revenue/> */}
					</div>
					<div style={{gridArea:"chart2"}} className={clsx(classes.chart,classes.card)}>
						<div className={classes.appointmentHead}>
							<Typography variant='body1' className={classes.cardHeading}>
								APPOINTMENT's
							</Typography>
							<FormControl variant="outlined" className={classes.formControl}>
								<TextField
									select
									variant= 'outlined'
									fullWidth
									value={select}
									className={classes.select}
									onChange={(e)=>{
										setSelect(e.target.value)
									}}>
									<MenuItem value={'ACTIVE'}>Active Appointments</MenuItem>
									<MenuItem value={'COMPLETED'}>Completed Appointments</MenuItem>
								</TextField>
							</FormControl>
						</div>
						{
							loading && <CircularProgress/>
						}
						{
							appointmentList.map((val,i)=>{
								return <div key={i} className={classes.item}>
									<div style={{gridArea:"name"}}>
										<Typography variant='body1' className={classes.firstName}>
											{val.type}
										</Typography>
										<Typography variant='body2' className={classes.companyName}>
											{val.customer?.phoneNumber}
										</Typography>
									</div>
									<Typography variant='body1' style={{gridArea:"time"}} className={classes.firstName}>
										{val.time.substring(0,5)}
									</Typography>
									{
										val.status==='ACTIVE' && 
										<div style={{gridArea:"action",display:'flex'}}>
											<Typography variant='subtitle2' className={classes.delete}>
												{`Duration ${val?.duration}`}
											</Typography>
										</div>
									}
									{
										val.status==='COMPLETED' && 
										<Typography variant='body2'>
												{`${val?.duration} Days `}
										</Typography>
									}
								</div>
							})
						}
					</div>
				</div>
			</div>
			
			}
		</Layout>
		);
	};
	
	const mapStateToProps = state => ({
		loading:state.order.loading,
		type:state.auth.user.role.name,
		appointmentList:state.order.appointmentList,
		firstName:state.auth.user.cleaner?.firstName,
		stats:state.order.stats
	});
	
	export default connect(
		mapStateToProps,
		{ FETCH_APPOINTLIST,TOGGLE_ORDER_STATUS,FETCH_STATS,ORDER_FEATURED}
		)(Dashboard);