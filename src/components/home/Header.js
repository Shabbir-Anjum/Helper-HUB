import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  AppBar,
  Button,
  MenuItem,
  Container,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

// import icon from '/image2vector.svg'
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const pages = ["Home", "Services", "Contact", "Sign Up", "Login"];

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.primary.light,
    padding: "1rem",
    boxShadow: "0px 0px white",
    [theme.breakpoints.down("sm")]: {
      padding: "0.3rem",
    },
  },
  navBtn: {
    fontSize: "1rem",
    color: theme.palette.primary.lightDark,
    paddingRight: "2rem",
  },
  logo: {
    width: "30%",
    display: "flex",

    // padding:theme.spacing(3),
    paddingBottom: "1.2vw",
    [theme.breakpoints.down("sm")]: {
      width: "14vw",
    },
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      width: "12px",
      height: "12px",
    },
  },
  pricingPage: {
    background: "white",
  },
}));

const Header = ({ history }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const classes = useStyles();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    // <AppBar
    //   className={clsx(
    //     classes.appbar,
    //     history.location.pathname === "/pricing" && classes.pricingPage
    //   )}
    //   position="static"
    //   sx={{ boxShadow: "none", color: "black" }}
    // >
    <AppBar className={classes.appbar}>
      <Container component="main" maxWidth="xl">
        <Toolbar disableGutters>
          <HashLink
            to="#hero"
            style={{ textDecoration: "none" }}
            id="logo1"
            smooth
          >
            <div className={classes.logo} id="logo2">
              <img
                alt=""
                src="http://app.wandcleaning.pro/wandBluefav.png"
                width={"30%"}
                style={{ paddingRight: "4px" }}
              />
              <img alt="" src="wordcyan.png" width={"70%"} />
            </div>
          </HashLink>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "right",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon className={classes.icon} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                return (
                  <>
                    {page === "Services" ? (
                      <HashLink
                        to="#services"
                        variant="body2"
                        style={{ textDecoration: "none" }}
                        smooth
                      >
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography
                            style={{ color: "black" }}
                            textAlign="center"
                          >
                            {page}
                          </Typography>
                        </MenuItem>
                      </HashLink>
                    ) : page === "Contact" ? (
                      <HashLink
                        to="#footer"
                        variant="body2"
                        style={{ textDecoration: "none" }}
                        smooth
                      >
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography
                            style={{ color: "black" }}
                            textAlign="center"
                          >
                            {page}
                          </Typography>
                        </MenuItem>
                      </HashLink>
                    ) : page === "Login" ? (
                      <HashLink
                        to="/login"
                        variant="body2"
                        style={{ textDecoration: "none" }}
                        smooth
                      >
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography
                            style={{ color: "black" }}
                            textAlign="center"
                          >
                            {page}
                          </Typography>
                        </MenuItem>
                      </HashLink>
                    ) : page === "Sign Up" ? (
                      <HashLink
                        to="/register"
                        variant="body2"
                        style={{ textDecoration: "none" }}
                        smooth
                      >
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography
                            style={{ color: "black" }}
                            textAlign="center"
                          >
                            {page}
                          </Typography>
                        </MenuItem>
                      </HashLink>
                    ) : (
                      <HashLink
                        to="#hero"
                        variant="body2"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography
                            style={{ color: "black" }}
                            textAlign="center"
                          >
                            {page}
                          </Typography>
                        </MenuItem>
                      </HashLink>
                    )}
                  </>
                );
              })}
            </Menu>
          </Box>
          <Box
            id="box1"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
            }}
          >
            {pages.map((page, index) => {
              return (
                <>
                  {page === "Services" ? (
                    <HashLink
                      to="#services"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                      smooth
                    >
                      <button className="navLink">{page}</button>
                    </HashLink>
                  ) : page === "Contact" ? (
                    <HashLink
                      to="#footer"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                      smooth
                    >
                      <button className="navLink">{page}</button>
                    </HashLink>
                  ) : page === "Sign Up" ? (
                    <NavLink
                      to="/register"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      <button className="navLink">{page}</button>
                    </NavLink>
                  ) : page === "Login" ? (
                    <NavLink
                      to="/login"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      <button className="navLink">{page}</button>
                    </NavLink>
                  ) : (
                    <HashLink
                      to="#hero"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      <button className="navLink">{page}</button>
                    </HashLink>
                  )}

                  {/* <Button
                  key={page}
                  style={{ color: "black" }}
                  onClick={handleCloseNavMenu}
                  className="navLink"
                  sx={{ my: 2, mx: 3, display: "block" }}
                >
                  {page} {index}
                </Button> */}
                </>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
