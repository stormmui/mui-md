import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Route, Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none"
  }
};

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const GetParamsFromMatch = match => {
  const url = match.url;
  let result = url.split("/");
  return result[1];
};

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
  render() {
    // leave next line here just to show what props
    // from the react-router are actually available
    // const { match, location, history } = this.props

    const { match } = this.props;
    const result = GetParamsFromMatch(match);

    return (
      <div>
        <h4>Section: {result}</h4>
      </div>
    );
  }
}

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Title
            </Typography>
            <div>
              <Typography
                aria-owns={open ? "menu-appbar" : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                Menu
              </Typography>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link className={classes.link} to="/">
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link className={classes.link} to={{ pathname: "sec1" }}>
                    Sec 1
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link className={classes.link} to={{ pathname: "sec2" }}>
                    Sec 2
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link className={classes.link} to={{ pathname: "sec3" }}>
                    Sec 3
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        <div>
          <Route exact path="/" component={Home} />
          <Route path={"/sec1"} component={ShowTheLocation} />
          <Route path={"/sec2"} component={ShowTheLocation} />
          <Route path={"/sec3"} component={ShowTheLocation} />
        </div>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
