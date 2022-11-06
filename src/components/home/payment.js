import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Grid,Container} from '@material-ui/core';
import {
  Work,
  // CurrencyPound,
  LocalAtm,
  Sync,
} from '@material-ui/icons';
import Sliders from './Slider';
import Card from './Card'

  const useStyles = makeStyles((theme) => ({
    mainContainer:{
      paddingTop:theme.spacing(12),
      paddingBottom:theme.spacing(12),
      textAlign:'left',
      [theme.breakpoints.down('xs')]: {
        paddingTop:theme.spacing(2),
        paddingBottom:theme.spacing(2),
      }
    },
    bold:{
      fontWeight:"bold",
      color:theme.palette.primary.dark,
      [theme.breakpoints.down('sm')]: {
        fontSize:'0.7rem',
      }
    },
    heading2:{
      paddingBottom:theme.spacing(10),
      paddingTop:theme.spacing(4),
      color:theme.palette.primary.dark,
      [theme.breakpoints.down('xs')]: {
        fontSize:'1.5rem',
        paddingBottom:theme.spacing(0),
        paddingTop:theme.spacing(1),
      }
    },
    headingBlue:{
      color:theme.palette.primary.dark,
    },
    icon:{
      fill:'white',
      [theme.breakpoints.down('sm')]: {
        width:"0.6rem"
      }
    },
    cardRoot:{
      minWidth: 275,
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

const Payment = () => {
  const classes = useStyles();

  const cards=[
    {
      heading:"Convert Estimates to Jobs",
      body:'Wipe down flat surfaces and hung surfaces, make bed if unmade.',
      icon:<Work className={classes.icon}/>
    },
    {
      heading:"Offer recurring service agreements",
      body:'Surface wipe down, mirrors, toilet and shower cleaning. Booked as full or half.',
      icon:<Work  className={classes.icon}/>
    },
    {
      heading:"Take credit cards, debit",
      body:'Clean sink, counters and empty and load dishwasher if present.',
      icon:<LocalAtm  className={classes.icon}/>
    },
    {
      heading:"Sync with QuickBooks Online/Desktop",
      body:'Wipe down flat surfaces and hung surfaces, make bed if unmade.',
      icon:<Sync  className={classes.icon}/>
    },
  ]

  return (
    <Container className={classes.mainContainer} component="main" maxWidth="xl">
      <Typography variant='h5' className={classes.bold}>
        CLEANING
      </Typography>
      <Typography variant='h2' className={clsx(classes.bold,classes.heading2)}>
        Home Cleaning Estimates,<br/> Invoices, & Payments
      </Typography>
      <div className={classes.desktopView}>
        <Grid container>
        {
          cards.map((val,i)=>{
            return <Grid item md={4}><Card key={i} val={val}/></Grid>
          })
        }
        </Grid>
      </div>
      <div className={classes.mobileView}><Sliders cards={cards}/></div>
    </Container>
  )
}

export default Payment