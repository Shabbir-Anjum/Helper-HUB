import React from 'react';
import {FormGroup,CircularProgress} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import { ErrorMessage,Field, Form, Formik} from 'formik';
import { object, string, ref, number } from 'yup';
import AuthWrapper from '../../components/layout/authWrapper';
import Selects from '../../components/FormsUI/Selects'

import { connect } from "react-redux";
import { SIGN_UP,SIGN_UP_CUSTOMER } from "../../actions/authActions";

const initialValues = {
  name:'',
  email: '',
  password: '',
  confirmPassword:'',
  age:'',
  phoneNumber:'',
  userRole:'HELPER'
}

const userRole={
  'HELPER':'HELPER',
  'RECRUITER':'RECRUITER',
}


const useStyles = makeStyles((theme) => ({
  logo:{
    'position':"absolute",
    zIndex:'3',
    [theme.breakpoints.down('sm')]: {
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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img:{
    width:'100%'
  },
  select:{
    textAlign:'left',
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "none",
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
    },
  },
  twoInOne:{
    display:'flex',
    justifyContent:"space-between"
  },
  firstBox:{
    marginRight:theme.spacing.apply(1)
  },
  submitButton:{
    fontSize:'1.2rem',
    width:'15rem',
    marginBottom:'1rem'
  },
  Button:{
    width:'15vw',
    marginBottom:'1rem',
    color:'white',
    fontSize:'1.5vw',
    [theme.breakpoints.down('sm')]: {
      width:'11rem',
      fontSize:'.8rem',
      marginBottom:'1rem',
      color:'white',
    }
  },
  field:{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':{
      border: "none",
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 4px 8px',
      height:"6rem",
      [theme.breakpoints.only('lg')]: {
        height:"5rem",
      },
      [theme.breakpoints.only('md')]: {
        height:"3.5rem",
      },
      [theme.breakpoints.down('sm')]: {
        height:"4rem",
      },
    },
    '& .MuiInputLabel-outlined':{
      fontSize:'1.5rem',
      marginTop:"0.7vw",
      [theme.breakpoints.only('lg')]: {
        fontSize:'1rem',
      },
      [theme.breakpoints.only('md')]: {
        fontSize:'0.7rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize:'0.7rem',
        marginTop:".3rem",
      }
    },
    '& .MuiInputBase-input':{
      height:"4rem",
      [theme.breakpoints.only('lg')]: {
        height:"3rem",
      },
      [theme.breakpoints.only('md')]: {
        height:"1.8rem",
      },
      [theme.breakpoints.down('sm')]: {
        height:"2rem",
      }
    },
    '& .MuiOutlinedInput-input':{
      fontSize:'1.5rem',
      [theme.breakpoints.only('lg')]: {
        fontSize:'1rem',
      },
      [theme.breakpoints.only('md')]: {
        fontSize:'0.7rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize:'0.7rem',
      }
    }
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
  fifty:{
    width:'50%'
  },
  onBoarding:{
    marginRight:'100%'
  },
  center:{
    margin:"auto"
  },
  marginBox:{
    marginBottom:theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom:theme.spacing(2),
    }
  },
  justifyStart:{
    textAlign:'left'
  }
}));

function SignUp({isAuthenticated,loading,history, SIGN_UP,SIGN_UP_CUSTOMER}) {
  const classes = useStyles();
  React.useEffect(() => {
    if (isAuthenticated) {
      history.push('/login');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);




  return (
    <AuthWrapper title="Welcome Here">
      <Formik
        validationSchema={
          object({
            username: string().required('First Name is mandatory!!!').min(1).max(100),                 
            email: string().email('Must be a valid email').max(255).required('Email is required'),
            password: string().required('password should be minimum 8character!!!').min(8),
            confirmPassword:string().oneOf([ref('password'), null], 'Passwords must match'),
            userRole: string().required("Required!!!"),
            age:number().integer().typeError('Please enter a valid Age').required('Age is mandatory'),
            phoneNumber: number().integer().typeError('Please enter a valid phone number').required('Must provide Address'),
          })
        }
      initialValues={initialValues}
      onSubmit={async (values) => {
        if(values.userRole==='HELPER'){
          SIGN_UP({...values,history});
        }else{
          SIGN_UP_CUSTOMER({...values,history})
        }
      
      }}>
          {({ isSubmitting, isValidating }) => (
            <Form className={classes.form}>
                <Box  className={clsx(classes.marginBox)}>
                  <FormGroup>
                    <Field name="username" as={TextField} label="Name" variant='outlined'  className={classes.field}/>
                    <ErrorMessage component='div' style={{color:"red"}} name="username" />
                  </FormGroup>
                </Box>
              <Box  className={classes.marginBox}>
                <FormGroup>
                  <Field name="email" as={TextField} label="Your Email Address" variant='outlined'  className={classes.field}/>
                  <ErrorMessage component='div' style={{color:"red"}} name="email" />
                </FormGroup>
              </Box>
              <Box className={classes.marginBox}>
                <FormGroup>
                  <Field name="password" type="password" as={TextField} label="Your password" variant='outlined'  className={classes.field}/>
                  <ErrorMessage component='div' style={{color:"red"}} name="password" />
                </FormGroup>
              </Box>
              <Box className={classes.marginBox}>
                <FormGroup>
                  <Field name="confirmPassword" type="password" as={TextField} label="Confirm password" variant='outlined' className={classes.field}/>
                  <ErrorMessage component='div' style={{color:"red"}} name="confirmPassword"  />
                </FormGroup>
              </Box>
              <Box className={classes.marginBox}>
                <Selects  style={{gridArea:'emailDrop'}}
                  name="userRole"
                  options={userRole}
                  className={classes.select}
                />
              </Box>
              <div className={classes.twoInOne}>
                <Box className={clsx(classes.firstBox,classes.fifty,classes.marginBox)}>
                  <FormGroup>
                    <Field name="age" as={TextField} label="Age" variant='outlined'  className={classes.field}/>
                    <ErrorMessage component='div' style={{color:"red"}} name="age" />
                  </FormGroup>
                </Box>
                <Box  className={clsx(classes.fifty,classes.marginBox)}>
                  <FormGroup>
                    <Field name="phoneNumber" as={TextField} label="Phone Number" variant='outlined' className={classes.field}/>
                    <ErrorMessage component='div' style={{color:"red"}} name="phoneNumber" />
                  </FormGroup>
                </Box>
              </div>
            
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.Button}
                startIcon={
                  loading ? (
                    <CircularProgress size="1rem" />
                  ) : undefined
                }
              >
                {loading ? 'Submitting' : 'Sign Up'}
              </Button>
              <div>
                <Grid container>
                  <Grid item className={classes.center}>
                    <Typography component="span">
                      Already has an account?
                    </Typography>
                    <Link href="/login" variant="h6" style={{margin:'auto'}}>
                      {"  Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Form>
          )}
      </Formik>
    </AuthWrapper>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated || false,
  loading:state.auth.loading
});

export default connect(
  mapStateToProps,
  { SIGN_UP,SIGN_UP_CUSTOMER }
)(SignUp);