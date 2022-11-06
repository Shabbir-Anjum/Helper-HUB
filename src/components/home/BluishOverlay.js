import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Button,Container } from '@material-ui/core';
import clsx from 'clsx';

  const useStyles = makeStyles((theme) => ({
    mainContainer:{
      background: `url(Group-10.png)`,
      color:'white',
      padding:theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        paddingTop:theme.spacing(6),
        padding:theme.spacing(4),
      }
    },
    innerContainer:{

    },
    img:{
      padding:theme.spacing(6),
      [theme.breakpoints.down('sm')]: {
        display:'flex',
        justifyContent:'center',
        width:"100%",
        padding:theme.spacing(0),
        paddingBottom:theme.spacing(3),
      }
    },
    heading:{
      paddingBottom:theme.spacing(10),
      fontWeight:'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize:"1rem",
        paddingBottom:theme.spacing(3),
      }
    },
    para:{
      // fontSize:'1.4rem'
      fontWeight:'normal',
      [theme.breakpoints.down('sm')]: {
        fontSize:"0.6rem"
      }
    },
    Button:{
      width:'22rem',
      height:'5rem',
      fontSize:'1.8rem',
      marginBottom:'1rem',
      color:'white',
      [theme.breakpoints.down('sm')]: {
        width:theme.spacing(11),
        height:theme.spacing(3),
        fontSize:'.4rem',
        padding:theme.spacing(0.5)
      }
    },
    buttonContained:{
      color:theme.palette.primary.main,
      background:"white"
    },
    borderNull:{
      border:'0px'
    }
  }));

const BluishOverlay = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Container className={classes.innerContainer} component="main" maxWidth="xl">
        <div className={classes.img}>
          <img src='WandWhite.png' alt='' width='110px'/>
        </div>
        <Typography variant='h2' className={classes.heading}>
          You and Your Maid Service Deserve<br/> a Little Peace & Quiet
        </Typography>
        <Typography variant='h4' className={clsx(classes.heading,classes.para)}>
          The Easiest-to-Use and the Best Rated Maid Software on Capterra.<br/> Rated 5 stars by Owners just like YOU!
        </Typography>
        <div className={classes.buttons}>
          <Button
            className={clsx(classes.Button,classes.buttonContained)}
            variant="contained"
            color="primary"
          >
            GET STARTED
          </Button>
          <Button
            className={clsx(classes.Button,classes.borderNull)}
            variant="outlined"
          >
            How it works?
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default BluishOverlay