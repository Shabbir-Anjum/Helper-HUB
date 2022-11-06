import React from "react";
// import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/home/Header";
import HeroSection from "../components/home/HeroSection";
import HowWork from "../components/home/HowWork";
import Payment from "../components/home/payment";
import SuperEasy from "../components/home/SuperEasy";
import GetInApp from "../components/home/GetInApp";
import Footer from "../components/home/Footer";
import { connect } from "react-redux";
import BluishOverlay from "../components/home/BluishOverlay";

const useStyles = makeStyles((theme) => ({
  homepageContainer: {},
}));

function Dashboard({ history }) {
  const classes = useStyles();

  return (
    <div className={classes.homepageContainer}>
      <Header history={history} />
      <HeroSection />
      <HowWork />
      <BluishOverlay />
      <Payment />
      <SuperEasy />
      <GetInApp />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.order.loading,
});

export default connect(mapStateToProps, {})(Dashboard);
