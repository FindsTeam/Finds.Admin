import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { thunks } from '../../redux/user';
import { routes } from '../../routes';
import Dashboard from './Dashboard';

class Container extends Component {
  state = {
    open: false,
    anchorEl: null,
  };

  componentDidMount = () => {
    const { auth, getUserProfile } = this.props;

    getUserProfile(auth);
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    const { history } = this.props;

    this.setState({ anchorEl: null });
    history.replace(routes.logout());
  };

  render() {
    const { open, anchorEl } = this.state;
    const { profile, match, location } = this.props;

    return (
      <Dashboard
        profile={profile}
        open={open}
        anchorEl={anchorEl}
        handleMenuOpen={this.handleMenuOpen}
        handleMenuClose={this.handleMenuClose}
        handleDrawerOpen={this.handleDrawerOpen}
        handleDrawerClose={this.handleDrawerClose}
        handleLogout={this.handleLogout}
        match={match}
        location={location}
      />
    );
  }
}

const mapState = (state) => {
  return {
    profile: state.user.profile,
  };
};

const { getUserProfile } = thunks;

const mapDispatch = {
  getUserProfile,
};

export default withRouter(connect(mapState, mapDispatch)(Container));
