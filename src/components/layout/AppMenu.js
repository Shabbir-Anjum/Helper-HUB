import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import IconDashboard from "@material-ui/icons/Dashboard";
import IconPeople from "@material-ui/icons/People";
import IconLibraryBooks from "@material-ui/icons/LibraryBooks";
import IconShoppingCart from "@material-ui/icons/ShoppingCart";
import EmailIcon from "@material-ui/icons/Email";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import AddBoxIcon from "@material-ui/icons/AddBox";

import AppMenuItem from "./AppMenuItem";

import { connect } from "react-redux";
import { UNSET_LOADING } from "../../actions/authActions";

const appMenuItems = [
  {
    name: "Dashboard",
    link: "/service",
    Icon: IconDashboard,
  },
  // {
  //   name: 'Orders',
  //   link: '/orders',
  //   Icon: IconShoppingCart,
  // },
  {
    name: "Ad",
    link: "/ad",
    Icon: EmailIcon,
  },
  {
    name: "profileform",
    link: "/profileform",
    Icon: IconPeople,
  },
];

const AppMenu = ({ UNSET_LOADING }) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {/* <AppMenuItem {...appMenuItems[0]} /> */}
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: "100%",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: "#97c05c",
    },
  })
);

export default connect(null, { UNSET_LOADING })(AppMenu);
