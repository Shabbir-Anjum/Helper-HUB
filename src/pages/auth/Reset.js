import React from 'react';
import {FormGroup,CircularProgress} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import queryString from 'query-string';
import { ErrorMessage,Field, Form, Formik} from 'formik';
import { object, string,ref } from 'yup';

import AuthWrapper from '../../components/layout/authWrapper';

import { connect } from "react-redux";
import { RESET_PASSWORD } from "../../actions/authActions";

const initialValues = {
  password: '',
  passwordConfirmation: '',
}

const useStyles = makeStyles((theme) => ({
  leftSide:{
    background:'#F2FCFC',
    zIndex:1
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
  twoInOne:{
    display:'flex',
    justifyContent:"space-between"
  },
  submitButton:{
    fontSize:'1.2rem',
    width:'15rem',
    marginBottom:'1rem'
  },
  backgroundBox:{
    background:'#F2FCFC',
    width:'50%',
    height:'100%',
    top:0,
    position:'absolute'
  },
  onBoarding:{
    marginRight:'100%'
  },
  center:{
    margin:"auto"
  }
}));

function SignIn({isAuthenticated,loading,history, RESET_PASSWORD}) {
  const classes = useStyles();

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  return (
    <AuthWrapper>
        <Formik
          validationSchema={
            object({
              password: string().required('password should be minimum 8character!!!').min(8),
              passwordConfirmation:string().required()
              .oneOf([ref('password'), null], 'Passwords must match')
            })
          }
        initialValues={initialValues}
        onSubmit={async (values,{setSubmitting}) => {
          const parsed = queryString.parse(history.location.search);
          // console.log({...values,code:parsed.code});
          return RESET_PASSWORD({...values,code:parsed.code}).then(()=>history.push('/'))
          ;
        
        }}>
          {({ isSubmitting, isValidating }) => (
            <Form className={classes.form}>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="password" type="password" as={TextField} label="Your password" variant='outlined' />
                  <ErrorMessage component='div' style={{color:"red"}} name="password" />
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="passwordConfirmation" type="password" as={TextField} label="passwordConfirmation" variant='outlined' />
                  <ErrorMessage component='div' style={{color:"red"}} name="passwordConfirmation" />
                </FormGroup>
              </Box>
            
              <Button
                disabled={loading}
                type="submit"
              className={classes.submitButton} 
                variant="contained"
                color="primary"
                startIcon={
                  loading ? (
                    <CircularProgress size="1rem" />
                  ) : undefined
                }
              >
                {loading ? 'Submitting' : 'Reset Password'}
              </Button>
              <Grid container>
                <Grid item>
                  <Typography component="body2" variant="span">
                    Don't have an account yet?
                  </Typography>
                  <Link href="/register" variant="body2" style={{}}>
                    {"  Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
    </AuthWrapper>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading:state.auth.loading
});

export default connect(
  mapStateToProps,
  { RESET_PASSWORD }
)(SignIn);