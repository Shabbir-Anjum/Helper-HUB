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

const pages = ["Become a cleaner", "Services", "Products", "FAQ"];

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.primary.light,
    padding: "3rem",
    boxShadow: "0px 0px white",
    [theme.breakpoints.down("sm")]: {
      padding: "0.3rem",
    },
  },
  navBtn: {
    fontSize: "1.5rem",
    color: theme.palette.primary.lightDark,
    paddingRight: "2rem",
  },
  logo: {
    width: theme.spacing(18),
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
    <AppBar
      className={clsx(
        classes.appbar,
        history.location.pathname === "/pricing" && classes.pricingPage
      )}
      position="static"
      sx={{ boxShadow: "none", color: "black" }}
    >
      <Container component="main" maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <div className={classes.logo}>
              <img
                alt=""
                src="http://app.wandcleaning.pro/wandBluefav.png"
                width={"30%"}
                style={{ paddingRight: "4px" }}
              />
              <img alt="" src="wordcyan.png" width={"70%"} />
            </div>
          </NavLink>

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
              {pages.map((page) => (
                <NavLink
                  to="/pricing"
                  variant="body2"
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography style={{ color: "black" }} textAlign="center">
                      {page}
                    </Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "right",
            }}
          >
            {pages.map((page) => (
              <NavLink
                to="/pricing"
                variant="body2"
                style={{ textDecoration: "none" }}
              >
                <Button
                  key={page}
                  style={{ color: "black" }}
                  onClick={handleCloseNavMenu}
                  className={classes.navBtn}
                  sx={{ my: 2, mx: 3, display: "block" }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
