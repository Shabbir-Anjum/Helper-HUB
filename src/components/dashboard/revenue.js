import { merge } from 'lodash';
import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../components/charts';
import { connect } from "react-redux";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  color:theme.palette.primary.lightDark,
  fontWeight:'bold',
  revenue:{
    "& .MuiTypography-h5":{
      fontSize:"1.05vw",
      [theme.breakpoints.down('sm')]: {
        fontSize:"18px",
      },
    }
  }
}))


const AppWebsiteVisits=({revenueData,loading,customerYearly})=> {
	const classes = useStyles();

  // if(loading || !revenueData || customerYearly?.customers.length<1){
  //   return <div>Loading...</div>
  // }

  const CHART_DATA = [
    {
      name: 'Orders',
      type: 'column',
      data: revenueData.length
    },
    {
      name: 'Revenue',
      type: 'area',
      data: revenueData.revenues
    },
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: revenueData.months,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <>
    {
      loading || !revenueData || customerYearly?.customers.length<1 ?
      <div>Loading...</div>:
      <Card>
        <CardHeader title="Revenue in 12months" className={classes.revenue}/>
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
        </Box>
      </Card>
    }
    </>
  );
}

const mapStateToProps = state => ({
  revenueData: state.order.revenueData,
  customerYearly: state.customer.customerYearly,
  loading:state.order.loading
});

export default connect(
  mapStateToProps,
  null
)(AppWebsiteVisits);