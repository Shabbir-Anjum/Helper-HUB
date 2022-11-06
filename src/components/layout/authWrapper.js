import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  container:{
    padding:theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      padding:theme.spacing(1)
    }
  },
  logo:{
    position:"absolute",
    width:theme.spacing(15),
    padding:theme.spacing(2),
    display:'flex',
    zIndex:'3',
    [theme.breakpoints.down('sm')]: {
      padding:theme.spacing(1),
      position:"relative",
      textAlign:'start'
    }
  },
  leftSide:{
    background:'#F2FCFC',
    zIndex:1,
    [theme.breakpoints.down('sm')]: {
      order:1
    }
  },
  formWrapper:{
    padding:"3rem"
  },
  img:{
    width:'100%'
  },
  backgroundBox:{
    background:'#F2FCFC',
    width:'50%',
    height:'100%',
    top:0,
    position:'absolute',
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  },
  imgCenter:{
    padding:'10vw',
    position:"relative",
    paddingBottom:'1rem',
    [theme.breakpoints.only('md')]: {
      padding:'7vw',
    },
    [theme.breakpoints.down('sm')]: {
      padding:'2rem',
    }
  },
  circle:{
    width:'60%',
    height:'60%',
    background:theme.palette.primary.main,
    position:'absolute',
    zIndex:'-1',
    borderRadius:'50%'
  },
  quote:{
    fontSize:'1.3vw',
    color:theme.palette.primary.lightDark,
    fontWeight:'600',
    [theme.breakpoints.down('sm')]: {
      fontSize:"0.8rem"
    }
  },
  title:{
    fontSize:'3.8vw',
    color:theme.palette.primary.lightDark,
    fontWeight:"bold",
    [theme.breakpoints.down('sm')]: {
      fontSize:"2rem"
    }
  },
  onBoarding:{
    fontSize:"1.4vw",
    color:theme.palette.primary.lightDark,
    fontWeight:"bold",
    textAlign:"left",
    [theme.breakpoints.down('sm')]: {
      fontSize:"0.7rem"
    }
  },
  imgLogo:{
    width:"150px",
    [theme.breakpoints.down('sm')]: {
      width:"60px",
    }
  },
  center:{
    margin:"auto"
  },
  marginBox:{
    marginBottom:theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom:theme.spacing(2),
    }
  }
}));

function AuthWrapper({isAuthenticated,title, children,history}) {
  const classes = useStyles();
  React.useEffect(() => {
    if (isAuthenticated) {
      history.push('/login');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <>
      <div className={classes.logo}>
      <NavLink to="/" variant="body2" style={{textDecoration:'none' }}>
        <div className={classes.logo}>
          <img alt='' src='http://app.wandcleaning.pro/wandBluefav.png' width='35px' style={{paddingRight:'4px'}} />
          <img alt='' src='wordcyan.png' width='90px' />
        </div>
      </NavLink>
      </div>
      <Container className={classes.container} component="main" maxWidth="xl">
      <CssBaseline />
      <Grid container spacing={8}>
          <Grid item sm={12} md={6} className={classes.leftSide}>
            <div className={classes.imgCenter}>
              <div className={classes.circle}></div>
              <img src='pablo-cleaning-up.png' alt='pablo cleaning' className={classes.img}/>
            </div>
            <Typography variant="h6" component="p" className={classes.quote}>
              better keep yourself clean and bright; you are the window through which you must see the world
            </Typography>
            <Typography variant="h6" component="h6" className={classes.quote}>
              - George Bernard Shaw
            </Typography>
          </Grid>
          <Grid container item sm={12} md={6} className={classes.formWrapper}>
            <Grid item>
              <Typography variant="h6" className={classes.onBoarding}>
                ON BOARDING
              </Typography>
              <Typography variant="h1" className={classes.title}>
                {title}
              </Typography>
            </Grid>
            {children}
          </Grid>
        </Grid>
      </Container>
      <div className={classes.backgroundBox}></div>
    </>
  );
}


export default AuthWrapper