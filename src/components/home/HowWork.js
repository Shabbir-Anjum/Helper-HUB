import React from 'react';

import clsx from 'clsx';
// import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Grid,Container} from '@material-ui/core';
import {
  Payment,
  Beenhere,
  ThumbUpAlt,
  Build
} from '@material-ui/icons';
import Sliders from './Slider';

import CardOutlined from './CardOutlined'

  const useStyles = makeStyles((theme) => ({
    mainContainer:{
      paddingTop:theme.spacing(1),
      paddingBottom:theme.spacing(8),
      textAlign:'left',
      [theme.breakpoints.down('sm')]: {
        paddingTop:theme.spacing(2),
        paddingBottom:theme.spacing(2),
      }
    },
    bold:{
      fontWeight:"bold",
      paddingBottom:theme.spacing(1),
      color:theme.palette.primary.dark,
      [theme.breakpoints.down('sm')]: {
        fontSize:'0.7rem',
      }
    },
    heading2:{
      paddingBottom:theme.spacing(10),
      paddingTop:theme.spacing(4),
      color:theme.palette.primary.dark,
      [theme.breakpoints.down('sm')]: {
        fontSize:'1.5rem',
        paddingBottom:theme.spacing(0),
        paddingTop:theme.spacing(1),
      }
    },
    headingBlue:{
      color:theme.palette.primary.main,
      display:'block'
    },
    cardRoot:{
      minWidth: 275,
    },
    icon:{
      fill:'white',
      [theme.breakpoints.down('sm')]: {
        width:"0.6rem"
      }
    },
    mobileView:{
      display:'none',
      [theme.breakpoints.down('sm')]: {
        display:'inline-block',
        
      }
    },
    desktopView:{
      [theme.breakpoints.down('sm')]: {
        display:'none'
      }
    }
  }));

const Payments = () => {
  const classes = useStyles();

  const cards=[
    {
      heading:"Easily find new Cleaning Job",
      body:'Easily view all of your local cleaners ready for for a one time job, or recurring visits.',
      icon:<Payment  className={classes.icon}/>
    },
    {
      heading:"notify & dispatch cleaning crews in real time",
      body:'Securely book & pay right inside of the app',
      icon:<Beenhere className={classes.icon}/>
    },
    {
      heading:"Manage time, location, and other job details",
      body:'In app reviews let you know exactly who you are working with',
      icon:<ThumbUpAlt className={classes.icon}/>
    },
    {
      heading:"Look up job & customer history on any device",
      body:'Anytime you need anything, give our 24/7 customer support a call',
      icon:<Build className={classes.icon}/>
    }
  ]

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xl" id='services'>
      <Typography variant='h5' className={classes.bold}>
        HOW WE WORK
      </Typography>
      <Typography variant='h2' className={clsx(classes.bold,classes.heading2)}>
      Find Work Easily By 
      <span className={classes.headingBlue}>
        {" HelperHub"}
      </span>
      </Typography>
      <div className={classes.desktopView}>
        <Grid container>
          {
            cards.map((val,i)=>{
              return <Grid item md={4}><CardOutlined key={i} val={val}/></Grid>
            })
          }
        </Grid>
      </div>
      <div className={classes.mobileView}><Sliders outlined cards={cards}/></div>
    </Container>
  )
}

export default Payments