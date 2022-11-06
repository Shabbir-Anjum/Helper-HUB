import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Button,Container } from '@material-ui/core';
import { NavLink } from 'react-router-dom'
// import wangIcon from 'WandWhite.svg'
import {
  Facebook,
  Instagram,
  Twitter} from '@material-ui/icons';

import clsx from 'clsx'
const useStyles = makeStyles((theme) => ({
  outer:{
    background:theme.palette.primary.light,
  },
  mainContainer:{
    marginBottom:theme.spacing(12),
    paddingTop:theme.spacing(12),
    paddingBottom:theme.spacing(12),
    textAlign:'left',
    display:'grid',
    gridTemplateAreas:"hero image",
    gridTemplateColumns:'6fr 5fr',
    justifyContent:'space-between',
    [theme.breakpoints.down('sm')]: {
      display:'grid',
      gridTemplateAreas:"hero",
      gridTemplateColumns:'6fr 0fr',
      marginBottom:theme.spacing(2),
      paddingTop:theme.spacing(2),
      paddingBottom:theme.spacing(2),
    }
  },
  container:{
    background:`${theme.palette.primary.light}`,
    padding: theme.spacing(4),
    display:'flex',
    flexDirection:"column",
    textAlign:'left',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    }
  },

  logo:{
    paddingBottom:theme.spacing(6)
  },
  heading:{
    fontWeight:'bold',
    paddingBottom:theme.spacing(4),
    color:theme.palette.primary.lightDark,
    [theme.breakpoints.down('sm')]: {
      fontSize:'1.2rem',
    }
  },
  headingBlue:{
    color:theme.palette.primary.main
  },
  heading2:{
    textTransform:"uppercase",
    color:theme.palette.primary.lightDark,
    paddingBottom:theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      paddingBottom:theme.spacing(3),
    }
  },
  font:{
    textDecoration:'none'
  },
  buttons:{
    paddingBottom:theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      paddingBottom:theme.spacing(2),
    }
  },
  Button:{
    width:'15rem',
    marginBottom:'1rem',
    color:'white',
    fontSize:'1.8rem',
    [theme.breakpoints.down('sm')]: {
      width:'7rem',
      marginBottom:'1rem',
      color:'white',
      fontSize:'0.5rem',
    }
  },
  icons:{
    paddingBottom:theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      paddingBottom:theme.spacing(5),
    }
  },
  iconFill:{
    fill:theme.palette.primary.main,
    marginRight:'1rem',
    width:"1.5rem",
    height:"1.5rem",
    [theme.breakpoints.down('sm')]: {
      marginRight:'0.7rem',
      width:"1rem",
      height:"1rem",
    }
  },
  borderNull:{
    border:'0px',
    color:'black',
    fontWeight:'bold',
    fontSize:'1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize:'0.5rem',
    }
  },
  imgContainer:{
    minWidth:"500px",
    alignSelf:'right',
    display:'grid',
    alignItems:"center",
    [theme.breakpoints.down('xs')]: {
      display:'none'
    }
  }
}))


const HeroSection = () => {

  const classes = useStyles();
  return (
    <div className={classes.outer}>
      <Container className={classes.mainContainer} component="main" maxWidth="xl">
        <div className={classes.container}>
          <Typography variant='h4' className={classes.heading}>
            Simplify Your Maid Service With This Simple  
            <span className={classes.headingBlue}> Scheduling Software </span>
          </Typography>
          <Typography variant='h6' className={classes.heading2}>
            DISCOVER HOW YOU CAN CLEAN MORE HOMES AND<br/> MAKE MORE MONEY THAN EVER BEFORE
          </Typography>
          <div className={classes.buttons}>
            <NavLink to="/login" variant="body2" className={classes.font}>
              <Button
                className={classes.Button}
                variant="contained"
                color="primary"
              >
                GET STARTED
              </Button>
            </NavLink>
            <Button
              className={clsx(classes.Button,classes.borderNull)}
              variant="outlined"
            >
              How it works?
            </Button>
          </div>
          <div className={classes.icons}>
            <Facebook className={classes.iconFill}/>
            <Instagram className={classes.iconFill}/>
            <Twitter className={classes.iconFill}/>
          </div>
        </div>
        <div className={classes.imgContainer}>
          <img width='100%' alt='' src='Mask-Group-1.png'/>
        </div>
      </Container>

    </div>
  )
}

export default HeroSection