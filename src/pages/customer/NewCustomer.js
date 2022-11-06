import React from 'react';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Input,
  CircularProgress,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Select from '../../components/FormsUI/Selects'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AddIcon from '@material-ui/icons/Add';

import Layout from '../../components/layout/Index'

import { connect } from "react-redux";
import { NEW_CUSTOMER } from "../../actions/customerAction";


const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  gridContainer:{
    display:'grid',
    gridTemplateColumns:'2fr 1fr',
    gridTemplateRows:'0.2fr 1.7fr 1.4fr' ,
    gridGap:theme.spacing(3),
    gridTemplateAreas:`
    "heading confirmBtn" 
    "personal billing" 
    "address address"`,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns:'1.2fr 1fr',
      gridTemplateRows:'0fr' ,
      gridTemplateAreas:`
      "heading confirmBtn" 
      "personal personal"
      "billing billing" 
      "address address"`,
    }
  },
  header:{
    alignSelf:'center',
    justifySelf:'Start',
    fontWeight:"bold",
    color:theme.palette.primary.lightDark,
    fontSize:'3.2vw',
    [theme.breakpoints.down('sm')]: {
      padding:'0.7rem 0px',
      fontSize:"1.3rem",
      textAlign:'left',
    }
  },
  confirmBtn:{
    alignSelf:'center',
    background:theme.palette.primary.lightDark,
    width:'70%',
    padding:'0px',
    color:"white",
    "& .MuiButton-label":{
      width:'100%'
    },
    [theme.breakpoints.up('xl')]: {
      height:'2.8vw',
      fontSize:'0.7vw',
    },
    [theme.breakpoints.up('lg')]: {
      height:'2.8vw',
      fontSize:'0.9vw',
    },
    [theme.breakpoints.down('md')]: {
      height:'3vw',
      width:'100%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize:'0.7rem',
      height:'4vw',
      width:'60%',
      display:'flex',
      padding:'5px',
      justifyContent:'space-around',
      marginLeft:'auto',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize:'0.55rem',
      height:'7vw',
      width:'100%',
    }
  },
  confirmBtnIcon:{
    fill:'white',
    [theme.breakpoints.down('md')]: {
      fontSize:'2rem',
    },
  },
  cardHeading:{
    // fontSize:"18px",
    color:theme.palette.primary.lightDark,
    fontSize:"0.9vw",
    fontWeight:'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize:"18px",
    },
  },
  customerGrid:{
    gridArea:'personal',
    display:'grid',
    gridTemplateColumns:'1fr 1fr 1fr 1fr',
    gridTemplateRows:'0.5fr 1fr 1fr 1fr' ,
    gridTemplateAreas:`
    "heading heading heading heading"
    "title no no no" 
    "firstName lastName phoneNumber email"
    "companyName preferredMethod marketingSource marketingSource"`,
    gridColumnGap:theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      minHeight:'20vw'
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns:'1fr 1fr',
      gridTemplateRows:'' ,
      gridTemplateAreas:`
      "heading heading"
      "title no"
      "firstName lastName"
      "phoneNumber email"
      "companyName preferredMethod"
      "marketingSource marketingSource"`,
      gridGap:theme.spacing(4)
    }
  },
  locationGrid:{
    gridArea:'address',
    display:'grid',
    gridTemplateColumns:'1fr 1fr 1fr',
    gridTemplateRows:'0.5fr 1fr 1fr' ,
    gridGap:theme.spacing(1),
    gridTemplateAreas:`
    "addHeading addHeading addHeading" 
    "address1 address2 address2"
    "city region zipCode"`,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns:'1fr 1fr',
      gridTemplateAreas:`
      "addHeading addHeading" 
      "address1 address1"
      "address2 address2"
      "city region" 
      "zipCode no"`,
      gridGap:theme.spacing(4),
    }
  },
  billingGrid:{
    gridArea:"billing",
    display:'grid',
    gridTemplateRows:'0.6fr 1fr 0.6fr 1fr' ,
    gridTemplateColumns:'1fr',
    textAlign:'left',
    gridTemplateAreas:`
    "billHeading"
    "line1" 
    "addAddress"
    "notes"`,
    [theme.breakpoints.up('md')]: {
      gridTemplateRows:'0.3fr 0.6fr 0.6fr 1fr' ,
    }
  },
  select:{
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
  bold:{
    fontWeight:'bold'
  },
  marketSource:{
    width:"66%",
    [theme.breakpoints.down('sm')]: {
      textAlign:'right',
      marginLeft:'0px',
    }
  },
  sameAsWrapper:{
    margin:'1.2vw 0px',
    display:'flex',
    alignItems:"center",
    '& .MuiFormControlLabel-root':{
      marginRight:'5px',
    },
  },
  sameAs:{
    color:theme.palette.primary.lightDark,
    fontWeight:"600",
    [theme.breakpoints.up('md')]: {
      fontSize:'0.75vw',
    }
  },
  sameAsIcon:{
    '& .MuiSvgIcon-root':{
      fontSize:'1.2vw',
      [theme.breakpoints.down('sm')]: {
        fontSize:'24px'
      }
    }
  },
  addNewWrapper:{
    display:'flex',
    alignItems:"center",
    "& .MuiIconButton-root":{
      padding:'0px',
      paddingRight:'12px',
    }
  },
  addNew:{
    color:theme.palette.primary.lightDark,
    fontWeight:"400",
    [theme.breakpoints.up('md')]: {
      fontSize:'0.70vw',
    }
  },
  addNewIcon:{
    fontSize:'1.2vw',
    [theme.breakpoints.down('sm')]: {
      fontSize:'24px'
    }
  },
  card:{
    padding:`${theme.spacing(4)}px ${theme.spacing(3)}px`,
    borderRadius:theme.spacing(2),
    background:'white',
    gridColumnGap:theme.spacing(3),
  },
  justifyStart:{
    textAlign:'left'
  },
  desktopView:{
    [theme.breakpoints.down('sm')]: {
      display:'none'
    }
  }
}));



const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  phoneNumber: Yup.number()
  .integer()
  .typeError('Please enter a valid phone number')
  .required('Required'),
  email: Yup.string()
  .email('Invalid email.')
  .required('Required'),
  // password: Yup.string().required('password should be minimum 8character!!!').min(8),
  // confirmPassword:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
  companyName: Yup.string()
    .required('Required'),
  preferredMethod: Yup.string()
    .required('Required'),
  address1: Yup.string()
    .required('Required'),
  city: Yup.string()
    .required('Required'),
  region: Yup.string()
    .required('Required'),
  zipCode: Yup.number()
    .integer()
    .typeError('Please enter a valid zipCode')
    .required('Required'),
});


const NewCustomer = ({type,history,NEW_CUSTOMER,customer,loading,edit}) => {
  const classes = useStyles();
  React.useEffect(()=>{
    if(type==='customer'){
			history.push('/createBooking')
		}
    // eslint-disable-next-line
  },[])

  const pets={
    'facebook':'facebook',
    'google':'google',
  }

  const formState=()=>{
    const INITIAL_FORM_STATE = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      companyName: '',
      preferredMethod: '',
      password:'12341234',
      confirmPassword:'12341234',
      marketSource: '',
      termsCheck:true,
      billingAddress: '',
      notes: '',
      address1:'',
      address2:'',
      city:'',
      region:'',
      zipCode:'',
    
    };

    const EDIT_FORM_STATE={
      firstName:customer?.firstName || '',
      lastName:customer?.lastName || '',
      phoneNumber:customer?.contactNo1 || '',
      email:customer?.email || '',
      companyName:customer?.contactNo2 || '',
      preferredMethod:customer?.address || '',
      marketSource:customer?.DOB || '',
      notes:customer?.notes || '',
      billingAddress:customer?.billingAddress || '',
    }

    if(!edit){
      return INITIAL_FORM_STATE;
    }else{
      return EDIT_FORM_STATE;
    }
  }

  return (
    <Layout>
        {/* <Container maxWidth="lg"> */}
            <Formik
              initialValues={ formState()}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                // console.log(values);
                // if(edit) {
                  // CUSTOMER_UPDATE(values);
                // }else{
                  NEW_CUSTOMER(values)
                  // }
              }}
              enableReinitialize
            >
              {({ values, setFieldValue,handleSubmit }) => (
              <Form>
                <div className={classes.gridContainer}>
                  <Typography variant='h4' style={{gridArea:'heading'}} className={classes.header}>
                    Add <span className={classes.desktopView}>  New   </span> Customer
                  </Typography>
                    {/* <NavLink to="/bookingPayment" variant="body2" className={classes.font}> */}
                    <Button style={{gridArea:'confirmBtn'}}
                      disabled={loading}
                      className={classes.confirmBtn}
                      type='submit'
                      variant='contained'
                      startIcon={
                        loading ? (
                          <CircularProgress size="1rem" />
                        ) : undefined
                      }
                      endIcon={<ArrowRightAltIcon className={classes.confirmBtnIcon}/>}
                    >
                      Create Customer
                    </Button>  
                  {/* </NavLink> */}
                  <div className={clsx(classes.customerGrid,classes.card)}>
                      <Typography variant='body1' className={clsx(classes.justifyStart,classes.cardHeading)} style={{gridArea:'heading'}}>personal Detail</Typography>
                      <div style={{gridArea:"title",alignSelf:'flex-start'}}>
                        <Select
                          name="title"
                          label="Title"
                          options={pets}
                          className={classes.select}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="marketSource" />
                      </div>
                      <div style={{gridArea:"firstName"}}>
                        <Typography variant='body2' className={classes.label}>
                          First Name
                        </Typography>
                        <Field
                          name="firstName" as={Input} className={classes.labelInput}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="firstName" />
                      </div>
                      <div style={{gridArea:"lastName"}}>
                        <Typography variant='body2' className={classes.label}>
                          Last Name
                        </Typography>
                        <Field
                          name="lastName" as={Input} className={classes.labelInput}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="lastName" />
                      </div>
                      <div style={{gridArea:"phoneNumber"}}>
                        <Typography variant='body2' className={classes.label}>
                          Phone Number
                        </Typography>
                        <Field
                          name="phoneNumber" as={Input} className={classes.labelInput}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="phoneNumber" />
                      </div>
                      <div style={{gridArea:"email"}}>
                        <Typography variant='body2' className={classes.label}>
                          Email
                        </Typography>
                        <Field
                          name="email" as={Input} className={classes.labelInput}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="email" />
                      </div>
                      <div style={{gridArea:"companyName"}}>
                        <Typography variant='body2' className={classes.label}>
                          Company Name
                        </Typography>
                        <Field
                          name="companyName" as={Input} className={classes.labelInput}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="companyName" />
                      </div>
                      <div style={{gridArea:"preferredMethod"}}>
                        <Typography variant='body2' className={classes.label}>
                          Preferred Method
                        </Typography>
                        <Field
                          name="preferredMethod" as={Input} className={classes.labelInput}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="preferredMethod" />
                      </div>
                      {/* <div style={{gridArea:"password"}}>
                        <Field
                          name="password"  type="password" variant='standard' placeholder="password" as={TextField}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="password" />
                      </div>
                      <div style={{gridArea:"confirmPassword"}}>
                        <Field
                          name="confirmPassword" type="password" variant='standard' placeholder="confirmPassword" as={TextField}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="confirmPassword" />
                      </div> */}
                      <div style={{gridArea:"marketingSource",alignSelf:'center'}} className={classes.marketSource}>
                        <Select
                          name="marketSource"
                          label="MarketSource"
                          options={pets}
                          className={clsx(classes.select)}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="marketSource" />
                      </div>

                  </div>
                  <div className={clsx(classes.billingGrid,classes.card)}>
                    <Typography  variant='body1' className={classes.cardHeading} style={{gridArea:"billHeading"}}>
                      Billing Address
                    </Typography>  
                    <div style={{gridArea:'line1'}}>
                      <div className={classes.sameAsWrapper}>
                        <FormControlLabel
                          checked={values.termsCheck}
                          onChange={() => setFieldValue("termsCheck", !values.termsCheck)}
                          className={classes.sameAsIcon}
                          control={<Checkbox />}
                        />
                        <Typography variant='body2' className={classes.sameAs}>
                          Same as Service Address 1
                        </Typography>
                      </div>
                      <div className={classes.addNewWrapper}>
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <AddIcon className={classes.addNewIcon}/>
                      </IconButton>
                      <Typography variant='body2' className={classes.addNew}>
                        Add an additional service location
                      </Typography>
                      </div>
                    </div>
                    {!values.termsCheck &&
                      <div style={{gridArea:"addAddress",paddingBottom:'0.8rem'}}>
                        <Field
                          name="billingAddress" placeholder="billingAddress" as={Input} className={classes.labelInput}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="billingAddress" />
                      </div>
                    }
                    <div style={{gridArea:"notes"}}>
                      <Typography variant='body2' className={classes.cardHeading}>
                        Notes and Other Information
                      </Typography> 
                      <div >
                        <Field
                          name="notes" placeholder="notes" as={Input} className={classes.labelInput}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="notes" />
                      </div>
                    </div>
                  </div>
                  <div className={clsx(classes.locationGrid,classes.card)}>
                    <Typography variant='body1' className={clsx(classes.justifyStart,classes.cardHeading)} style={{gridArea:'addHeading'}}>Address Detail</Typography>
                    <div style={{gridArea:'address1'}} className={classes.justifyStart}>
                      <Typography variant='body2' className={classes.label}>
                        Address1
                      </Typography>
                      <Field
                        name="address1" as={Input} className={classes.labelInput}
                      />
                      <ErrorMessage component='div' style={{color:"red"}} name="address1" />
                    </div>  
                    <div style={{gridArea:'address2'}} className={classes.justifyStart}>
                      <Typography variant='body2' className={classes.label}>
                        Address2
                      </Typography>
                      <Field
                        name="address2" as={Input} className={classes.labelInput}
                      />
                      <ErrorMessage component='div' style={{color:"red"}} name="address2" />
                    </div>  
                    <div style={{gridArea:'city'}} className={classes.justifyStart}>
                      <Typography variant='body2' className={classes.label}>
                        City
                      </Typography>
                      <Field
                        name="city" as={Input} className={classes.labelInput}
                      />
                      <ErrorMessage component='div' style={{color:"red"}} name="city" />
                    </div>  
                    <div style={{gridArea:'region'}} className={classes.justifyStart}>
                      <Typography variant='body2' className={classes.label}>
                        Region
                      </Typography>
                      <Field
                        name="region" as={Input} className={classes.labelInput}
                      />
                      <ErrorMessage component='div' style={{color:"red"}} name="region" />  
                    </div>  
                    <div style={{gridArea:'zipCode'}} className={classes.justifyStart}>
                    <Typography variant='body2' className={classes.label}>
                        Zip Code
                      </Typography>
                      <Field
                        name="zipCode" as={Input} className={classes.labelInput}
                      />
                      <ErrorMessage component='div' style={{color:"red"}} name="zipCode" />
                    </div>  
                  </div>
                </div>
              </Form>
              )}
            </Formik>
        {/* </Container> */}
    </Layout>
  );
};

const mapStateToProps = state => ({
  type:state.auth.user.role.name,
  edit: state.customer.edit,
  customer:state.customer.customer,
  loading:state.customer.loading,
  success:state.customer.success,
});

export default connect(
  mapStateToProps,
  { NEW_CUSTOMER }
)(NewCustomer);