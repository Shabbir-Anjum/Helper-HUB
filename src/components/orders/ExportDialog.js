import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Modal,Button ,IconButton,Input,FormControlLabel,Checkbox} from '@material-ui/core';
import clsx from 'clsx'
import SendIcon from '@material-ui/icons/Send';

import PersonIcon from '@material-ui/icons/Person';
// import { ModalHover } from 'react-modal-hover'
import InfoIcon from '@material-ui/icons/Info';
// import Button from '../../components/FormsUI/Buttons';
// import GetAppIcon from '@material-ui/icons/GetApp';
import { connect } from "react-redux";
import { ORDER_FIND } from "../../actions/orderAction";
import moment from 'moment';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { SEND_MESSAGE } from '../../actions/employeeActions';
import { TOGGLE_ORDER_STATUS } from "../../actions/orderAction";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '40vw',
    borderRadius:'5%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    padding:'2rem 2rem',
    [theme.breakpoints.down('sm')]: {
      width: '85vw',
      padding:'1rem 1rem',
      left:'6vw !important',
      top:'33vw !important',
      transform:'translate(0%, 0%) !important'
    }
  },
  flex:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  },
  address:{
		color: '#C8CBCB',
    fontSize:'1vw',
    [theme.breakpoints.down('sm')]: {
      fontSize:'12px',
      width:'50%'
    }
	},
  instructions:{
		fontSize:'1.8vw',
		fontWeight:"600",
		color:theme.palette.primary.lightDark,
    [theme.breakpoints.down('sm')]: {
      fontSize:'15px',
    }
	},
  statusActive:{
    fontSize:'1.8vw',
		background:theme.palette.primary.active,
		padding:'0.7vw',
		borderRadius:'30%',
		textAlign:'center',
		fontWeight:'bold',
		color:theme.palette.primary.lightDark,
		[theme.breakpoints.down('sm')]: {
      marginTop:"1.5rem",
			borderRadius:'20%',
      fontSize:'12px',
    }
	},
  heading2:{
    marginTop:'.5vw',
    marginBottom:'2.5vw',
    	[theme.breakpoints.down('sm')]: {
        marginBottom:'5vw',
      }
  },
  dot:{
    height: '8px',
    width: '8px',
    backgroundColor: theme.palette.primary.lightDark,
    borderRadius: '50%',
    display: 'inline-block',
    margin:'0px 0.8vw',
    [theme.breakpoints.down('sm')]: {
      height: '5px',
      width: '5px',
      margin:'0px 1.8vw',
    }
  },
  assignButton:{
    border:null,
    '& .MuiButton-outlined':{
      border:null,
    },
    '& .MuiButton-label':{
      fontSize:"0.76vw",
      color:theme.palette.primary.lightDark,
      [theme.breakpoints.down('sm')]: {
        fontSize:'8px'
      }
    },
    '& .MuiSvgIcon-root':{
        width:'1.1vw',
     [theme.breakpoints.down('sm')]: {
        width:'10px',
      }
    }
  },
  date:{
		fontSize:'1vw',
		fontWeight:'500',
    marginBottom:"2.5vw",
		color:theme.palette.primary.lightDark,
    [theme.breakpoints.down('sm')]: {
		  fontSize:'9px',
      marginBottom:"4.5vw",
    }
	},
  confirmBtn:{
    alignSelf:'center',
    margin:'1vw 0px',
    background:theme.palette.primary.lightDark,
    width:'30%',
    padding:'0px',
    color:"white",
    [theme.breakpoints.up('md')]: {
      height:'2vw',
      fontSize:'0.6vw',
    },
    [theme.breakpoints.down('md')]: {
      width:'30%',
      height:'25px',
      display:'flex',
      justifyContent:'space-between',
      padding:'0px 20px'
    },
    [theme.breakpoints.down('xs')]: {
      width:'100%',
      fontSize:'2.4vw',
      padding:'0px 10px'
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
  timeDots:{
    height:'1vw',
    margin:'0 0.5vw',
    [theme.breakpoints.down('sm')]: {
      height:'2vw',
    }
  },
  duration:{
		fontSize:'1vw',
		fontWeight:'500',
		color:theme.palette.primary.lightDark,
    marginBottom:'2.5vw',
    [theme.breakpoints.down('sm')]: {
		  fontSize:'9px',
      marginBottom:"4.5vw",
    }
	},
  time:{
    display:'flex',
    alignItems:'center',
		fontSize:'1vw',
		fontWeight:'bold',
		color:theme.palette.primary.lightDark,
    marginBottom:'2.5vw',
    [theme.breakpoints.down('sm')]: {
		  fontSize:'9px',
      marginBottom:"4.5vw",
    }
	},
  name:{
    fontSize:'1vw',
		fontWeight:'600',
		color:theme.palette.primary.lightDark,
    display:'flex',
    alignItems:'center',
    [theme.breakpoints.down('sm')]: {
		  fontSize:'9px',
    }
  },
  cleanerIcon:{
    fill:theme.palette.primary.lightDark,
    marginRight:'0.5vw',
		width:'1.8vw',
    [theme.breakpoints.down('sm')]: {
		  width:'2.8vw',
    }
  },
  amount:{
    color:theme.palette.primary.lightDark,
    fontSize:"1.8vw",
     [theme.breakpoints.down('sm')]: {
		  fontSize:'18px',
    }
  },
  justifyStart:{
		textAlign:'left'
	},
  flexMessageWrapper:{
    display:'flex',
    justifyContent:'space-between'
  },
    labelInput:{
    '& .MuiInputBase-input':{
      [theme.breakpoints.up('md')]: {
        fontSize:'0.75vw',
      }
    }
  },
  mobileView:{
    display:'none',
    [theme.breakpoints.down('sm')]: {
      display:'inline-block',
      
    }
  },
}));

const FORM_VALIDATION = Yup.object({
  message:Yup.string()
    .required('required')
});

const FORM_VALIDATION_RATING = Yup.object({
  rating:Yup.string()
    .required('required')
});

function SimpleModal({TOGGLE_ORDER_STATUS,item,open,handleClose,handleOpen,SEND_MESSAGE,type}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <IconButton onClick={handleOpen} className={classes.mobileView}>
        <InfoIcon/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          type==='customer' ? <div style={modalStyle} className={classes.paper}>
            <div>
              {
                item.status==='ACTIVE' && 
                <div style={{gridArea:"action",display:'flex'}}>
                  <Formik
                    initialValues={{rating:'',status:false}}
                    validationSchema={ FORM_VALIDATION_RATING }
                    onSubmit={values => {
                      TOGGLE_ORDER_STATUS({...item,...values})
                    }}
                    enableReinitialize
                  >
                    {({ values, setFieldValue }) => (
                    <Form>
                      <FormControlLabel
                        checked={values.status}
                        onChange={(event) =>{
                          setFieldValue('status',event.target.checked)
                        } }
                        control={<Checkbox className={classes.AppointmenttIcon}/>}
                        label="mark as done"
                        className={classes.mark}
                      />
                      <div> 
                        <Typography variant='body2' className={classes.time}>Rating</Typography>
                        <div className={classes.field}>
                          <Field
                            name="rating" as={Input} className={classes.labelInput}
                          />
                          <ErrorMessage component='div' style={{color:"red"}} name="rating" />
                        </div> 
                        <Button style={{gridArea:'confirmBtn'}}
                          className={classes.confirmBtn}
                          type='submit'
                          variant='contained'
                        >
                          Rate Service
                        </Button>  
                      </div>
                    </Form>
                    )}
                  </Formik>
                </div>
              }
            </div>
            </div>: 
          <div style={modalStyle} className={classes.paper}>
            <div className={classes.flex}>
              <div className={clsx(classes.justifyStart)}>
                <Typography variant='body1' className={clsx(classes.instructions)}>
                  {item.instructions}
                  {/* Debbie Sardon (Example Appointment) */}
                </Typography>
              </div>
              <div>
                <Typography variant='h5' className={clsx(classes.statusActive)}>
                  {item.status || ''}
                </Typography>
              </div>
            </div>
            <div className={clsx(classes.flex,classes.heading2)}>
              <div className={clsx(classes.justifyStart,classes.address)}>
                {item.address}
              </div>
              <Button
                className={classes.assignButton}
                startIcon={<SendIcon className={classes.assignIcon}/>}
                >
                Message to Customer
              </Button>
            </div>
              <Typography variant='body1' className={classes.date}>
                {item.date}
                <span className={classes.dot}></span>
                {moment(item.date).format('dddd')}
              </Typography>
              <div className={classes.flexMessageWrapper}>
                <div>
                  <Typography variant='body2' className={classes.time}>
                    {moment(`2017-12-14T${item.time}`).format('hh:mm A')}
                    <img src='timeDots.PNG' alt='' className={classes.timeDots}/>
                  </Typography>
                  <Typography variant='body1' className={classes.duration}>
                    {item.duration}  Days
                  </Typography>
                </div>
                <Formik
                  initialValues={{message:''}}
                  validationSchema={ FORM_VALIDATION }
                  onSubmit={values => {
                    SEND_MESSAGE({body:values.message,customerID:item.customer.id})
                  }}
                  enableReinitialize
                >
                  {({ values, setFieldValue }) => (
                  <Form>
                    <div> 
                      <Typography variant='body2' className={classes.time}>Message</Typography>
                      <div className={classes.field}>
                        <Field
                          name="message" as={Input} className={classes.labelInput}
                        />
                        <ErrorMessage component='div' style={{color:"red"}} name="message" />
                      </div> 
                      <Button style={{gridArea:'confirmBtn'}}
                        className={classes.confirmBtn}
                        type='submit'
                        variant='contained'
                      >
                        Send Message
                      </Button>  
                    </div>
                  </Form>
                  )}
                </Formik>
              </div>
  
            <div className={classes.flex}>
              <Typography variant='body2' className={classes.name}>
                <PersonIcon className={classes.cleanerIcon}/>
                {item.cleaner? `${item.cleaner.firstName}` : 'No cleaner Assigned'} <br/>
              </Typography>        
              <Typography variant='h6' className={classes.amount}>
                {item.amount?.toFixed(2)}PKR
              </Typography>
            </div>
          </div>
        }
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  loading:state.order.loading,
  type:state.auth.user.role.name
});

export default connect(
  mapStateToProps,
  { ORDER_FIND ,SEND_MESSAGE,TOGGLE_ORDER_STATUS }
)(SimpleModal);