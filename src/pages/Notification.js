import React from 'react';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Input,
  Button,
  Typography,
	Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import Layout from '../components/layout/Index'

import { connect } from "react-redux";
import { FETCH_NOTIFICATION } from "../actions/employeeActions";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({

  bold:{
    fontWeight:"bold"
  },
  notificationWrapper:{
    background:theme.palette.primary.light,
    display:'flex',
    justifyContent:'space-between',
    margin:'1vw'
  },
  cleanerWrapper:{
    display:'grid',
    gridTemplateAreas:
    `"pic name available" 
    "no phoneNumber email"
    "no serviceDetial hourlyRate"`,
    gridTemplateColumns:'5fr 4fr 3fr',
    gridTemplateRows:'2fr 1fr 1fr',
    gridColumnGap:theme.spacing(2),
    gridColumnRow:theme.spacing(2),
  },

  cardHeading:{
    color:theme.palette.primary.lightDark,
    paddingBottom:theme.spacing(1),
    fontSize:"1.05vw",
    fontWeight:'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize:"15px",
    },
  },
  font:{
    textDecoration:"none"
  },
  card:{
    padding:`${theme.spacing(4)}px ${theme.spacing(3)}px`,
    marginTop:theme.spacing(3),
    borderRadius:theme.spacing(2),
    background:'white',
    gridColumnGap:theme.spacing(2),
    gridRowGap:theme.spacing(3),
    textAlign:'left'
  },
  flex:{
    display:'flex',
    justifyContent:"space-between",
    [theme.breakpoints.down('sm')]: {
      flexDirection:"column"
    }
  },
  flexComp:{
    display:"flex",
    
  },
  emailWrapper:{
    width:'70%'
  },
  justifyStart:{
    justifySelf:'start'
  },
  header:{
    alignSelf:'center',
    justifySelf:'Start',
    fontSize:'3.2vw',
    color:theme.palette.primary.lightDark,
    [theme.breakpoints.down('sm')]: {
      fontSize:"4vw",
      textAlign:'left',
      marginTop:"1rem",
      paddingBottom:'0.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize:"4.8vw",
    },
  },
  headerFirst:{
    fontWeight:"bold",
    [theme.breakpoints.down('sm')]: {
      display:'block'
    },
  },
  confirmBtn:{
    alignSelf:'center',
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
      padding:'0px 20px'
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
    marginRight:'1rem'
  },
  datewrapper:{
    display:'grid',
    gridTemplateAreas:
    `"day month year"`,
  },
  dayChip:{
    marginTop:theme.spacing(3),
    marginBottom:theme.spacing(3),
    color:"white",
    background:theme.palette.primary.dark,
    width:"7rem",
    padding:theme.spacing(0.5),
    textAlign:'center',
    borderRadius:theme.spacing(2)
  },
  dateTimeInput:{
    [theme.breakpoints.up('md')]: {
      fontSize:'4vw'
    }
  },
  label:{
    textAlign:'left',
    color:theme.palette.primary.lightDark,
    fontWeight:"600",
    [theme.breakpoints.up('md')]: {
      fontSize:'0.75vw',
    }
  },
  labelInput:{
    '& .MuiInputBase-input':{
      [theme.breakpoints.up('md')]: {
        fontSize:'0.75vw',
      }
    }
  },
  typeBody:{
    [theme.breakpoints.up('md')]: {
      fontSize:'0.77vw',
      display:'inline-block'
    }
  },
  typeHeading:{
    "& .MuiTypography-body1":{
      fontWeight:'600',
      fontSize:'13px',
      color:theme.palette.primary.lightDark,
      [theme.breakpoints.up('md')]: {
        fontSize:'0.85vw',
        display:'inline-block'
      }
    }
  },
  field:{
    marginBottom:"1rem",
    [theme.breakpoints.down('sm')]: {
      width:'80vw'
    }
  },
  addressField:{
    width:'66%',
    [theme.breakpoints.down('sm')]: {
      width:'100%'
    }
  },
  rightFeild:{
    marginRight:"10rem"
  },
  fontLight:{
    color:"#004A6B"
  },
  desktopView:{
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  }
}));


const CompanyInfo = ({notificationlist,FETCH_NOTIFICATION,type}) => {
  const classes = useStyles();
  React.useEffect(()=>{
    if(type==='customer'){
      FETCH_NOTIFICATION()
    }else if(type==='premium' || type==='Authenticated'){
      // history.push('/orders');
      // toast.warn('only customers can create Bookings')
    }
    // eslint-disable-next-line
  },[])


  return (
    <Layout>
      <div className={classes.gridWrapper}>
        <Typography variant='h4' style={{gridArea:'heading'}} className={classes.header}>
          <span className={classes.headerFirst}> Notification</span>
        </Typography>

        <div style={{gridArea:"serviceDetial"}} className={classes.card}>
            <Typography variant='body1' className={classes.cardHeading}>
              Notification sent to You
            </Typography>
            {
              notificationlist.map((val,i)=>{
                return <div className={classes.notificationWrapper}>
                  <Typography variant='body1' className={classes.cardHeading}>
                    {val.body}
                </Typography>
                <Typography variant='body1' className={classes.cardHeading}>
                    {moment(val.created_at).format('YYYY-MM-DD')}
                </Typography>
              </div>
              })
            }
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  notificationlist:state.employee.notificationlist,
  type:state.auth.user.role.name
});

export default connect(
  mapStateToProps,
  { FETCH_NOTIFICATION }
)(CompanyInfo);