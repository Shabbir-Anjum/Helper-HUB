import React, { useEffect } from 'react';
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Button,
} from '@material-ui/core';
import Select from '../../components/FormsUI/Selects';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { type } from '../consts';

import { connect } from "react-redux";
import { ORDER_FIND } from "../../actions/orderAction";
import { FETCH_CLEANERS_SEARCH } from '../../actions/employeeActions';
const useStyles = makeStyles((theme) => ({
  formWrapper1: {
    background:'white',
    padding:theme.spacing(2),
    borderTopLeftRadius:'13%',
    borderTopRightRadius:'13%',
    display:"grid",
    gridTemplateAreas:
    `"duration status date breakdown confirmBtn"`,
    gridTemplateColumns:'1fr 1fr 1fr 1fr 1.2fr',
    gridColumnGap:theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      gridTemplateAreas:
    `"duration status"
      "date confirmBtn"
      "breakdown no"`,
    gridTemplateColumns:'1fr 1fr',
    gridGap:theme.spacing(2)
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
  confirmBtn:{
    background:theme.palette.primary.lightDark,
    width:'70%',
    padding:'0px',
    color:"white",
    [theme.breakpoints.up('md')]: {
      height:'2.8vw',
      fontSize:'0.7vw',
    },
    [theme.breakpoints.down('md')]: {
      width:'100%',
      height:'35px',
      display:'flex',
      justifyContent:'space-between',
      padding:'0px 20px'
    },
    [theme.breakpoints.down('xs')]: {
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
  dateField:{
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    '& .MuiFormControl-marginNormal':{
      margin:'0px',
      marginLeft:'10px',
      display:'flex',
      [theme.breakpoints.down('md')]: {
        height:'35px'
      }
    },
    '& .MuiInputLabel-formControl':{
      transform:'translate(0, 15px) scale(1)',
      [theme.breakpoints.only('lg')]: {
        fontSize:'13px',
      },
      [theme.breakpoints.only('md')]: {
        fontSize:'12px',
      },
    },
    '& .MuiInput-formControl':{
      marginTop:'0px'
    },
    "& .MuiInput-underline::before":{
      border: "none",
    },
    "& .MuiSvgIcon-root":{
       transform:'translate(0, 5px) scale(1)',
       [theme.breakpoints.only('lg')]: {
        fontSize:'18px',
      },
      [theme.breakpoints.only('md')]: {
        fontSize:'12px',
      },
    }
  },
  breakdownBtn:{
    fontWeight:"bold",
    color:theme.palette.primary.lightDark,
    gridArea:'breakdown',
    bottom:'-20%',
    textDecoration:'underline',
    [theme.breakpoints.up('md')]: {
      fontSize:'.75vw',
    }
  },
  font:{
    textDecoration:'none'
  },
  flexEnd:{
    alignItems:'flex-end'
  }
}));

const allStatus={
  'ACTIVE':'ACTIVE',
  'COMPLETED':'COMPLETED'
}

const FORM_VALIDATION = Yup.object().shape({
  allStatus: Yup.string(),
  type:Yup.string().required('enter state name'),
});

const SearchForm = ({ORDER_FIND,loading,form,FETCH_CLEANERS_SEARCH}) => {
  const classes = useStyles();
  React.useEffect(()=>{
    if(form===1){
      FETCH_CLEANERS_SEARCH({type:"DRIVER"})
    }
  },[])

    const INITIAL_FORM_STATE = {
      allStatus: '',
      type: 'DRIVER',
      date:null
    };

  return (
    <>
      <Formik
        initialValues={ INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        onSubmit={values => {
          console.log(values);
         
        }}
      >
        {({ values, errors, handleSubmit, setFieldValue }) => (
          <Form>
          <div className={classes.formWrapper1}>
            {
              form!==1 &&
            <div style={{gridArea:"status"}}>
              <Select
                name="allStatus"
                label="All Status"
                options={allStatus}
                className={classes.select}
              />
            </div>
            }
          
            <div style={{gridArea:"duration"}}>
              <Select
                name="type"
                label="Type"
                options={type}
                className={classes.select}
              />
            </div>
            {
              form!==1 &&
              <div style={{gridArea:"date"}} className={classes.dateField}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    label="Select Date"
                    name='date'
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    // label="Date picker inline"
                    value={values.date}
                    onChange={value => setFieldValue("date", value)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            }

            <div style={{gridArea:"breakdown",textAlign:'start'}}>
                <Button
                  disabled={loading}
                  className={classes.breakdownBtn}
                  onClick={()=>{
                    console.log('click')
                    if(form===1){
                      debugger;
                      FETCH_CLEANERS_SEARCH(values)
                    }else{
                      ORDER_FIND(values);
                    }
                  }}
                  startIcon={
                    loading ? (
                      <CircularProgress size="1rem" />
                    ) : null
                  }
                >
                {loading ? 'Searching' : 'Search'}
              </Button>
            </div>
            {
              // form!==1 &&
              // <div>
              //   <NavLink to="/createBooking" variant="body2" className={classes.font}>
              //     <Button
              //       variant="contained"
              //       className={classes.confirmBtn}
              //       color="primary"
              //       endIcon={<AddIcon className={classes.confirmBtnIcon}/>}
              //     >
              //       Add Appointment
              //     </Button>
              //   </NavLink>
              // </div>
            }
          </div>
        </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = state => ({
  edit: state.customer.edit,
  customer:state.customer.customer,
  loading:state.customer.loading
});

export default connect(
  mapStateToProps,
  { ORDER_FIND ,FETCH_CLEANERS_SEARCH }
)(SearchForm);