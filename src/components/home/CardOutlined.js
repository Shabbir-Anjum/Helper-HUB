import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
  root: {
    margin:theme.spacing(5),
    padding:theme.spacing(5),
    borderRadius:"1rem",
    position:'relative',
    border:`1px solid ${theme.palette.primary.main}`,
    overflow:'inherit',
    [theme.breakpoints.down('sm')]:{
      padding:theme.spacing(0),
      margin:theme.spacing(2),
      '& .MuiCardContent-root':{
        padding:theme.spacing(1),
      }
    }
  },
  title: {
    // fontSize: '1.2rem',
    paddingBottom:theme.spacing(2),
    fontWeight:'bold',
    [theme.breakpoints.down('sm')]:{
      paddingBottom:theme.spacing(0.3),
    }
  },
  body:{
    [theme.breakpoints.down('sm')]:{
      fontSize:"0.6rem"
    }
  },
  iconWrapper:{
    position:'absolute',
    top:theme.spacing(-6),
    background:theme.palette.primary.main,
    border:"0.7rem solid white ",
    borderRadius:'100%',
    padding:theme.spacing(3),
    [theme.breakpoints.down('sm')]:{
      padding:`0px ${theme.spacing(1)}px`,
      top:theme.spacing(-3),
      border:"0.3rem solid white ",
    }
  },
}));

export default function SimpleCard({val}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant='h6'>
          {val.heading}
        </Typography>
        <Typography variant="h6" className={classes.body}> 
          {val.body}
        </Typography>
      </CardContent>
      <div className={classes.iconWrapper}>
        {val.icon}
      </div>
    </Card>
  );
}
