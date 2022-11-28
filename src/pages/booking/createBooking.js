import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Moment from "react-moment";
import "./date.css";
import { Input, Button, Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import SearchForm from "../../components/orders/SearchForm";

import Test from "../test";

import clsx from "clsx";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import Layout from "../../components/layout/Index";

import { connect } from "react-redux";
import { NEW_ORDER, FETCH_CLEANER } from "../../actions/orderAction";
import { handleInput } from "concurrently/src/defaults";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  gridWrapper: {
    display: "grid",
    gridTemplateAreas: `"heading heading confirmBtn" 
    "searchForm searchForm searchForm"
    "serviceDetial serviceDetial serviceDetial" 
    "type type comment"
    "dateTime dateTime dateTime"`,
    gridTemplateColumns: "5fr 4fr 3fr",
    gridTemplateRows: "0.2fr 0.2fr 0.8fr 1fr",
    gridColumnGap: theme.spacing(2),
    gridColumnRow: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      gridTemplateRows: "0fr",
      gridTemplateColumns: "1.2fr 1fr",
      gridTemplateAreas: `"heading confirmBtn" 
      "searchForm searchForm"
      "serviceDetial serviceDetial"
      "type type"
      "dateTime dateTime" 
      "comment comment"`,
    },
  },
  bold: {
    fontWeight: "bold",
  },

  cleanerWrapper: {
    display: "grid",
    gridTemplateAreas: `"pic name hourlyRate" 
    "pic phoneNumber email"
    "about address qualification"
    "day date time"`,
    gridTemplateColumns: "5fr 4fr 3fr",
    gridTemplateRows: "1fr 1fr 1fr",
    gridColumnGap: theme.spacing(2),
    gridColumnRow: theme.spacing(2),
  },

  cardHeading: {
    color: theme.palette.primary.lightDark,
    paddingBottom: theme.spacing(1),
    fontSize: "1.05vw",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  },
  font: {
    textDecoration: "none",
  },
  card: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    marginTop: theme.spacing(3),
    borderRadius: theme.spacing(2),
    background: "white",
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(3),
    textAlign: "left",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  flexComp: {
    display: "flex",
  },
  emailWrapper: {
    width: "70%",
  },
  justifyStart: {
    justifySelf: "start",
  },
  header: {
    alignSelf: "center",
    justifySelf: "Start",
    fontSize: "3.2vw",
    color: theme.palette.primary.lightDark,
    [theme.breakpoints.down("sm")]: {
      fontSize: "4vw",
      textAlign: "left",
      marginTop: "1rem",
      paddingBottom: "0.8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "4.8vw",
    },
  },
  headerFirst: {
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  confirmBtn: {
    alignSelf: "center",
    background: theme.palette.primary.lightDark,
    width: "70%",
    padding: "0px",
    color: "white",
    [theme.breakpoints.up("md")]: {
      height: "2.8vw",
      fontSize: "0.7vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "70%",
      height: "35px",
      display: "flex",
      justifyContent: "space-between",
      padding: "0px 20px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      fontSize: "2.4vw",
      padding: "0px 10px",
    },
  },
  confirmBtnIcon: {
    fill: "white",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
  },
  dot: {
    height: "8px",
    width: "8px",
    backgroundColor: "black",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "1rem",
  },
  datewrapper: {
    display: "grid",
    gridTemplateAreas: `"day month year"`,
    justifyContent: "flex-start",
  },
  dayChip: {
    gridArea: "day",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: "white",
    background: theme.palette.primary.dark,
    width: "7rem",
    padding: theme.spacing(0.5),
    textAlign: "center",
    borderRadius: theme.spacing(2),
  },
  dateTimeInput: {
    [theme.breakpoints.up("md")]: {
      fontSize: "4vw",
    },
  },
  label: {
    textAlign: "left",
    color: theme.palette.primary.lightDark,
    fontWeight: "600",
    [theme.breakpoints.up("md")]: {
      fontSize: "0.75vw",
    },
  },
  labelInput: {
    "& .MuiInputBase-input": {
      [theme.breakpoints.up("md")]: {
        fontSize: "0.75vw",
      },
    },
  },
  typeBody: {
    [theme.breakpoints.up("md")]: {
      fontSize: "0.77vw",
      display: "inline-block",
    },
  },
  typeHeading: {
    "& .MuiTypography-body1": {
      fontWeight: "600",
      fontSize: "13px",
      color: theme.palette.primary.lightDark,
      [theme.breakpoints.up("md")]: {
        fontSize: "0.85vw",
        display: "inline-block",
      },
    },
  },
  field: {
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  },
  addressField: {
    width: "66%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  infoField: {
    fontSize: "0.85vw",
    [theme.breakpoints.up("md")]: {
      fontSize: "0.75vw",
    },
  },
  rightFeild: {
    marginRight: "10rem",
  },
  fontLight: {
    color: "#004A6B",
  },
  desktopView: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  available: {
    width: "1vw",
    height: "1vw",
    backgroundColor: "green",
    borderRadius: "50%",
    marginLeft: "2vw",
  },
  unAvailable: {
    width: "1vw",
    height: "1vw",
    backgroundColor: "red",
    borderRadius: "50%",
    marginLeft: "2vw",
  },
}));

export const types = [
  {
    label: "Vacation Rental Service",
    value: 1.2,
    body: "Lorem ipsum dolor sit amet, pellentesque quam dolor aenean ullamcorper lorem, auctor accumsan magna nam nunc.",
  },
  {
    label: "COVID -19 Disinfectant",
    value: 1.5,
    body: "Lorem ipsum dolor sit amet, pellentesque quam dolor aenean ullamcorper lorem, auctor accumsan magna nam nunc.",
  },
  {
    label: "Standard cleaning",
    value: 1,
    body: "Lorem ipsum dolor sit amet, pellentesque quam dolor aenean ullamcorper lorem, auctor accumsan magna nam nunc.",
  },
  {
    label: "Deep cleaning",
    value: 1.3,
    body: "Lorem ipsum dolor sit amet, pellentesque quam dolor aenean ullamcorper lorem, auctor accumsan magna nam nunc.",
  },
];

const FORM_VALIDATION = Yup.object({
  instructions: Yup.string().required(),
  type: Yup.string().required(),
  duration: Yup.string().required(),
  hour: Yup.string().required(),
  address: Yup.string().required(),
});

const CompanyInfo = ({
  NEW_ORDER,
  FETCH_CLEANER,
  type,
  customer,
  edit,
  history,
  employee,
}) => {
  const classes = useStyles();
  React.useEffect(() => {
    if (type === "customer") {
      // FETCH_CLEANER()
    } else if (type === "premium" || type === "Authenticated") {
      history.push("/orders");
      toast.warn("only customers can create Bookings");
    }
    // eslint-disable-next-line
  }, []);

  const formState = () => {
    const INITIAL_FORM_STATE = {
      address: "lahore",
      pets: false,
      date: null,
      time: null,
      instructions: "",
      type: "Vacation Rental Service",
      duration: "7",
      hour: "8",
      ratePerHour: employee?.service?.ratePerHour || 30,
    };

    const EDIT_FORM_STATE = {
      bathroomCount: customer?.firstName || "",
      kitchenCount: customer?.lastName || "",
      bedroomCount: customer?.email || "",
      pets: customer?.contactNo1 || "",
    };

    if (!edit) {
      return INITIAL_FORM_STATE;
    } else {
      return EDIT_FORM_STATE;
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={formState()}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          // console.log(values);
          // if(edit) {
          //   CUSTOMER_UPDATE(values);
          // }else{

          NEW_ORDER({ values, history });
          // }
        }}
        enableReinitialize
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form>
            <div className={classes.gridWrapper}>
              <Typography
                variant="h4"
                style={{ gridArea: "heading" }}
                className={classes.header}
              >
                <span className={classes.headerFirst}> Create a Booking</span>
                <span className={classes.desktopView}>{" - "}</span>
                Personal Details
              </Typography>
              <Button
                style={{ gridArea: "confirmBtn" }}
                className={classes.confirmBtn}
                type="submit"
                variant="contained"
                endIcon={
                  <ArrowRightAltIcon className={classes.confirmBtnIcon} />
                }
              >
                Proceed to Payment
              </Button>
              <div style={{ gridArea: "searchForm" }}>
                <SearchForm form={1} />
              </div>
              <div
                style={{ gridArea: "serviceDetial" }}
                className={classes.card}
              >
                <Typography variant="body1" className={classes.cardHeading}>
                  What home would you like to be cleaned?
                </Typography>
                <Test />
              </div>

              {/* comment  */}
              <div style={{ gridArea: "comment" }} className={classes.card}>
                <Typography variant="body1" className={classes.cardHeading}>
                  Any extra comments you’d like to add?
                </Typography>
                <Typography variant="subtitle2">
                  Write your comments or any additional Notes here
                </Typography>
                <div className={classes.field}>
                  <Field
                    name="instructions"
                    placeholder="instructions"
                    as={Input}
                    className={classes.labelInput}
                  />
                  <ErrorMessage
                    component="div"
                    style={{ color: "red" }}
                    name="instructions"
                  />
                </div>
                <Typography variant="subtitle2">Duration(days)</Typography>
                <div className={classes.field}>
                  <Field
                    name="duration"
                    placeholder="duration"
                    as={Input}
                    className={classes.labelInput}
                  />
                  <ErrorMessage
                    component="div"
                    style={{ color: "red" }}
                    name="duration"
                  />
                </div>
                <Typography variant="subtitle2">Duration(hours)</Typography>
                <div className={classes.field}>
                  <Field
                    name="hour"
                    placeholder="hour"
                    as={Input}
                    className={classes.labelInput}
                  />
                  <ErrorMessage
                    component="div"
                    style={{ color: "red" }}
                    name="hour"
                  />
                </div>
                <Typography variant="subtitle2">Address</Typography>
                <div className={classes.field}>
                  <Field
                    name="address"
                    placeholder="address"
                    as={Input}
                    className={classes.labelInput}
                  />
                  <ErrorMessage
                    component="div"
                    style={{ color: "red" }}
                    name="address"
                  />
                </div>
              </div>

              {/* type section */}
              <div style={{ gridArea: "type" }} className={classes.card}>
                <Typography variant="body1" className={classes.cardHeading}>
                  Cleaner Info
                </Typography>
                <div className={classes.cleanerWrapper}>
                  <div
                    style={{
                      gridArea: "pic",
                      width: "10vw",
                      height: "10vw",
                      backgroundSize: "cover",
                    }}
                  >
                    <img src={employee?.pic?.url} width="100%" height="100%" />
                  </div>
                  {/* Date Start  */}
                  <div style={{ gridArea: "date" }}>
                    <Typography variant="body1" className={clsx(classes.label)}>
                      PICK A DATE
                    </Typography>
                    <div className={classes.datewrapper}>
                      <DatePicker
                        inputClass="day-input"
                        value={values.date}
                        format="DD"
                        onChange={(value) => {
                          setFieldValue("date", value.toDate());
                        }}
                      />
                      <DatePicker
                        inputClass="month-input"
                        value={values.date}
                        format="MMM"
                        onChange={(value) => {
                          setFieldValue("date", value.toDate());
                        }}
                      />
                      <DatePicker
                        inputClass="year-input"
                        value={values.date}
                        format="YYYY"
                        onChange={(value) => {
                          setFieldValue("date", value.toDate());
                        }}
                      />
                    </div>
                  </div>
                  <Typography
                    variant="body1"
                    className={classes.dayChip}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Hire me
                  </Typography>
                  <div style={{ gridArea: "time" }}>
                    <Typography variant="body1" className={clsx(classes.label)}>
                      PICK A TIME
                    </Typography>
                    <div>
                      <DatePicker
                        inputClass="month-input"
                        disableDayPicker
                        format="HH"
                        className={classes.dateTimeInput}
                        value={values.time}
                        onChange={(value) => {
                          setFieldValue("time", value);
                        }}
                        plugins={[<TimePicker hideSeconds />]}
                      />
                      <DatePicker
                        inputClass="month-input"
                        disableDayPicker
                        format="mm"
                        className={classes.dateTimeInput}
                        value={values.time}
                        onChange={(value) => {
                          setFieldValue("time", value);
                        }}
                        plugins={[<TimePicker hideSeconds />]}
                      />
                    </div>
                  </div>

                  {/* Date End  */}
                  <div style={{ gridArea: "name" }}>
                    <Typography variant="body2" className={classes.label}>
                      Name
                    </Typography>
                    <Typography variant="body1" className={classes.infoField}>
                      {employee?.firstName} {employee?.lastName}
                      {employee?.schedule?.available ? (
                        <span className={classes.available}>' '</span>
                      ) : (
                        <span className={classes.unAvailable}>' '</span>
                      )}
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    style={{ gridArea: "available" }}
                    className={classes.infoField}
                  >
                    {employee?.schedule?.available}{" "}
                  </Typography>
                  <div style={{ gridArea: "hourlyRate" }}>
                    <Typography variant="body2" className={classes.label}>
                      Hourly Rate
                    </Typography>
                    <Typography variant="body1" className={classes.infoField}>
                      {employee?.service?.ratePerHour}{" "}
                    </Typography>
                  </div>
                  <div style={{ gridArea: "phoneNumber" }}>
                    <Typography variant="body2" className={classes.label}>
                      Phone Number
                    </Typography>
                    <Typography variant="body1" className={classes.infoField}>
                      {employee?.phoneNumber}{" "}
                    </Typography>
                  </div>
                  <div style={{ gridArea: "email" }}>
                    <Typography variant="body2" className={classes.label}>
                      Email
                    </Typography>
                    <Typography variant="body1" className={classes.infoField}>
                      {employee?.user?.email}{" "}
                    </Typography>
                  </div>
                  <div style={{ gridArea: "about" }}>
                    <Typography variant="body2" className={classes.label}>
                      Work Experience
                    </Typography>
                    <Typography variant="body1" className={classes.infoField}>
                      {employee?.business?.about}{" "}
                    </Typography>
                  </div>
                  {/* <div style={{gridArea:'education'}}>
                        <Typography variant='body2' className={classes.label}>
                          Education
                        </Typography>
                        <Typography variant='body1' className={classes.infoField}>
                          {employee?.business?.companyWebsite} {" "}
                        </Typography>
                      </div> */}
                  <div style={{ gridArea: "qualification" }}>
                    <Typography variant="body2" className={classes.label}>
                      Qualification
                    </Typography>
                    <Typography variant="body1" className={classes.infoField}>
                      {employee?.business?.cleaningService}{" "}
                    </Typography>
                  </div>
                  <div style={{ gridArea: "address" }}>
                    <Typography variant="body2" className={classes.label}>
                      Address
                    </Typography>
                    <Typography variant="body1" className={classes.infoField}>
                      {employee?.business?.address1}{" "}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            {/* address  */}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  edit: state.customer.edit,
  customer: state.customer.customer,
  loading: state.customer.loading,
  type: state.auth.user.role.name,
  employee: state.employee?.employee,
});

export default connect(mapStateToProps, { NEW_ORDER, FETCH_CLEANER })(
  CompanyInfo
);
