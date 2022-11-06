import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import StripeContainer from '../../components/Booking/StripeContainer'
import {
  Avatar,
  Button,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import MoneyOutlinedIcon from '@material-ui/icons/MoneyOutlined';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Select from '../../components/FormsUI/Selects'

import {types} from './createBooking'

import Layout from '../../components/layout/Index'
import StarRatings from 'react-star-ratings';

import { connect } from "react-redux";
import { BOOKING_PAYMENT, REVIEW } from "../../actions/orderAction";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  gridWrapper:{
    display:'grid',
    gridTemplateColumns:'5fr 4fr 1fr 4fr',
    gridTemplateAreas:`"heading heading no confirmBtn" 
    "cleanerInfo breakdown no empty" 
    "paymentInfo breakdown no empty"`,
    gridTemplateRows:'0.6 1fr 1fr',
    gridColumnGap:theme.spacing(2),
    gridColumnRow:theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
    gridTemplateColumns:'5fr 4fr 4fr',
    gridTemplateAreas:`"heading heading confirmBtn" 
    "cleanerInfo breakdown empty" 
    "paymentInfo breakdown empty"`,
    },
    [theme.breakpoints.down('md')]: {
    gridTemplateColumns:'1.2fr 1.2fr 1fr 1fr',
    gridTemplateAreas:`"heading heading confirmBtn confirmBtn" 
    "cleanerInfo cleanerInfo breakdown breakdown" 
    "paymentInfo paymentInfo empty empty"`,
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns:'1fr 0.7fr',
      gridTemplateRows:'',
      gridTemplateAreas:`"heading confirmBtn" 
      "cleanerInfo cleanerInfo" 
      "paymentInfo paymentInfo"
      "breakdown breakdown"`,
    }
  },
  bold:{
    fontWeight:"bold",
    color:theme.palette.primary.lightDark
  },
  card:{
    padding:`${theme.spacing(4)}px ${theme.spacing(3)}px`,
    marginTop:theme.spacing(3),
    borderRadius:theme.spacing(2),
    background:'white',
    gridColumnGap:theme.spacing(2),
    gridRowGap:theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding:`1.5vw 1.5vw`,
      marginTop:'1.5vw',
      gridColumnGap:'1vw',
      gridRowGap:'1.5vw',
    },
    [theme.breakpoints.down('sm')]: {
      padding:`5vw`,
		}
  },
  breakHeading:{
    paddingBottom:theme.spacing(4),
    textAlign:'left'
  },
  breakdownCat:{
    color:theme.palette.primary.lightDark,
    [theme.breakpoints.up('md')]: {
      fontSize:'1vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize:'13px',
    },
  },
  flex:{
    display:'flex',
    justifyContent:"space-between",
    paddingBottom:theme.spacing(1)
  },
  flexComp:{
    display:"flex",
    justifyContent:'center',
    alignItems:'center'
  },
  emailWrapper:{
    width:'70%'
  },
  justifyStart:{
    textAlign:'left'
  },
  header:{
    alignSelf:'center',
    justifySelf:'Start',
    fontSize:'2.5vw',
    color:theme.palette.primary.lightDark,
    [theme.breakpoints.down('sm')]: {
      fontSize:"1.3rem",
      textAlign:'left',
      marginTop:"1rem",
      paddingBottom:'0.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize:"1.1rem",
    }
  },
  headerFirst:{
    fontWeight:"bold",
    [theme.breakpoints.down('sm')]: {
      display:'block'
    },
  },
  confirmBtn:{
    alignSelf:'center',
    marginLeft:'auto',
    background:theme.palette.primary.lightDark,
    width:'70%',
    padding:'0px',
    color:"white",
    [theme.breakpoints.up('md')]: {
      height:'2.8vw',
      fontSize:'0.7vw',
    },
    [theme.breakpoints.down('md')]: {
      width:'70%',
      height:'35px',
      display:'flex',
      justifyContent:'space-between',
      padding:'0px 20px',
      fontSize:'1vw'
    },
    [theme.breakpoints.down('xs')]: {
      width:'100%',
      fontSize:'2.4vw',
      padding:'0px 10px'
    }
  },
  confirmBtnIcon:{
    fill:'white',
    [theme.breakpoints.down('md')]: {
      fontSize:'2rem',
    },
  },
  dot:{
    height: '8px',
    width: '8px',
    backgroundColor: 'black',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight:'0.8vw'
  },
  avatar:{
    [theme.breakpoints.down('sm')]: {
      height:'1.7rem',
      width:'1.7rem',
    },
  },
  cleanerHeader:{
    paddingBottom:theme.spacing(2),
    fontWeight:'bold',
    color:theme.palette.primary.lightDark,
    [theme.breakpoints.up('md')]: {
      fontSize:'1.2vw',
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom:theme.spacing(0),
    },
  },
  cleanerName:{
    fontWeight:'bold',
    color:theme.palette.primary.lightDark,
    [theme.breakpoints.up('md')]: {
      fontSize:'1.2vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize:'11px',
    },
  },
  cleanerVerified:{
    fontWeight:'bold',
    color:theme.palette.primary.lightDark,
    [theme.breakpoints.up('md')]: {
      fontSize:'0.75vw',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize:'8px',
    },
  },
  review:{
    [theme.breakpoints.down('sm')]: {
      fontSize:'11px',
    },
  },
  select:{
    [theme.breakpoints.down('sm')]: {
      marginTop:'1rem'
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none",
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    },
    "& .MuiSelect-outlined":{},
    "& .MuiOutlinedInput-input":{
      [theme.breakpoints.only('lg')]: {
        fontSize:'15px',
        padding:'11px 12px'
      },
      [theme.breakpoints.down('md')]: {
        fontSize:'13px',
        padding:'9.5px 10px'
      },
      [theme.breakpoints.down('sm')]: {
        padding:'14.5px 10px'
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
  breakDownIcon:{
    fill:theme.palette.primary.lightDark,
    [theme.breakpoints.up('md')]: {
      width:'1vw',
      height:'1vw',
    }
  },
  fontLight:{
    color:"#004A6B"
  },
  hide:{
    background:'white'
  },
  nameCert:{
    paddingLeft:theme.spacing(1)
  },
  desktopView:{
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  }
}));

const CompanyInfo = ({BOOKING_PAYMENT,service,order,business,onBoarding,employee,review,REVIEW}) => {
  const classes = useStyles();
  React.useEffect(()=>{
    REVIEW({id:employee.id})
    // eslint-disable-next-line
  },[])

  const pricer=()=>{
    var price= types.filter((val)=>{
      return val.label===order.type
    })
    return price[0]?.value
  }

  const totalCal = ()=>{
    return order?.duration * service?.ratePerHour * order?.hour;
  }

  const breakdown =[
    {icon:<TableChartOutlinedIcon className={classes.breakDownIcon}/>,
    category:'duration',
    price:`${order.duration} days`},
    {icon:<TableChartOutlinedIcon className={classes.breakDownIcon}/>,
    category:'hour',
    price:`${order?.hour} hours`},
    {icon:<ReportProblemOutlinedIcon className={classes.breakDownIcon}/>,
    category:`Rate Per Hour`,
    price:`${employee.service?.ratePerHour}`},
    {
    //  icon:<MoneyOutlinedIcon/>,
    // category:'hourly Rate',
    // price:`${service.ratePerHour}usd`
    },{},
    {icon:<MoneyOutlinedIcon/>,
    category:'total',
    price:`${totalCal()?.toFixed(2)} Rupees`},
  ]

  const paidBy={
    BY_HAND:'ByHand',
    STRIPE:'Stripe',
  }

  const FORM_VALIDATION = Yup.object().shape({
    paidBy: Yup.string()
    .required('Required')
    .test((paidBy,_)=>{
      if(paidBy==='STRIPE' && onBoarding!==true){
        return new Yup.ValidationError(
          `Can not pay via strape, please choose By_hand`,
          undefined,
          'paidBy'
        );
      }
      return true;
    })
  });

  const formState=()=>{
    const INITIAL_FORM_STATE = {
      paidBy:''
    };

    // if(!edit){
      return INITIAL_FORM_STATE;
    // }else{
    //   return EDIT_FORM_STATE;
    // }
  }

  return (
    <Layout>
            <Formik
              initialValues={ formState()}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                // console.log(values);
                // if(edit) {
                //   CUSTOMER_UPDATE(values);
                // }else{
                  BOOKING_PAYMENT(values)
                  // }
              }}
              enableReinitialize
            >
              {({ values, errors, isSubmitting, isValid }) => (
              <Form>
                <div className={classes.gridWrapper}>
                  <Typography variant='h4' style={{gridArea:'heading'}} className={clsx(classes.header,classes.justifyStart)}>
                    <span className={classes.headerFirst}> Create a Booking</span>
                    <span className={classes.desktopView}>{" - "}</span>
                    Payment Information
                  </Typography>
                  <Button style={{gridArea:'confirmBtn'}}
                    className={classes.confirmBtn}
                    type='submit'
                    variant='contained'
                    endIcon={<ArrowRightAltIcon style={{fill:'white'}}/>}
                  >
                    Confirm Booking  
                  </Button>  

                  <div style={{gridArea:"cleanerInfo"}} className={classes.card}>
                    <div className={classes.flex}>
                      <Typography variant='h6' className={classes.cleanerHeader}>
                        Cleaner Info  
                      </Typography>
                      <Typography variant='h6' className={classes.cleanerHeader}>
                        {employee?.service?.ratePerHour}rupees/hour
                      </Typography>
                    </div>
                    <div className={classes.flex}>
                      <div className={classes.flexComp}>
                        <Avatar className={classes.avatar} src={employee?.pic ? employee?.pic?.url:'employee.png'}/>
                        <div className={classes.nameCert}>
                          <Typography variant='h6' className={classes.cleanerName}>
                            {employee?.firstName}
                          </Typography>
                          <Typography variant='body2' className={clsx(classes.cleanerVerified)}>
                            HelperHub certified
                          </Typography>
                        </div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <StarRatings
                          rating={review?.review || 0}
                          starRatedColor='#005051'
                          starDimension="12px"
                          starSpacing="0px"
                          numberOfStars={5}
                          name='rating'
                        />
                        <Typography variant='body1' className={classes.review}>
                          <span  className={classes.bold}>{review?.total}</span>
                            {" reviews"}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* payment  */}
                  <div style={{gridArea:"paymentInfo"}} className={classes.card}>
                    <Typography variant='h6' className={clsx(classes.cleanerHeader,classes.breakHeading)}>
                      Add Payment Information</Typography>
                    <Select
                      className={classes.select}
                      name="paidBy"
                      label="Paid By"
                      options={paidBy}
                    />
                    {values.paidBy==='STRIPE' && 
                    <StripeContainer/>  
                    }
                  </div>

                  {/* breakdown  */}
                  <div style={{gridArea:"breakdown"}} className={classes.card}>
                    <Typography variant='h6' 
                      className={clsx(classes.cleanerHeader,classes.breakHeading)}>
                        Breakdown
                    </Typography>
                    {breakdown.map((val,i)=>(<div key={i} className={classes.flex}>
                        <div className={classes.flexComp}>
                        {val.category &&  <span className={clsx(classes.dot,val.category==='total' && classes.hide)}></span>}
                          {val.icon}
                          <Typography variant='body1' className={classes.breakdownCat} style={{paddingLeft:'0.5rem'}}>{val.category}</Typography>
                        </div>
                        <Typography variant='body1' className={classes.breakdownCat}>
                          {val.price}  
                        </Typography>
                      </div>))}
                      
                  </div>

                </div>
                {/* address  */}
              </Form>
              )}
            </Formik>
    </Layout>
  );
};

const mapStateToProps = state => ({
  edit: state.customer.edit,
  business:state.employee.employee?.business,
  loading:state.order.loading,
  service:state.employee.employee?.service,
  onBoarding:false,
  order:state.order.order,
  employee:state.employee.employee,
  review:state.order?.review
});

export default connect(
  mapStateToProps,
  { BOOKING_PAYMENT,REVIEW }
)(CompanyInfo);