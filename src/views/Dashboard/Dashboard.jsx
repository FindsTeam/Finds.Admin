import React from 'react';
import cn from 'classcat';
import {
  Switch, Route, Link, Redirect,
} from 'react-router-dom';
import {
  CssBaseline,
  Avatar,
  Typography,
  withStyles,
  SwipeableDrawer as Drawer,
  AppBar, Toolbar,
  Menu, MenuItem,
  Divider,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon,
  AccountCircle as AccountCircleIcon,
  Map as MapIcon,
  Comment as CommentIcon,
} from '@material-ui/icons';
import FeedbackManagement from '../FeedbackManagement';
import MarkersManagement from '../MarkersManagement';

import { routes } from '../../routes';
import styles from './styles';

const Dashboard = (props) => {
  const {
    classes,
    theme,
    profile,
    open,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleDrawerOpen,
    handleDrawerClose,
    handleLogout,
    match,
    location,
  } = props;

  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar
          position="sticky"
          className={cn(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={cn(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              {'Finds.Admin'}
            </Typography>
            <div className={classes.profile}>
              <Typography variant="subtitle1" color="inherit" noWrap>
                {profile.nickname}
              </Typography>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                {profile.picture
                  ? <Avatar alt={profile.username} src={profile.picture} />
                  : <AccountCircleIcon />
                  }
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <section className={classes.inner}>
          <Drawer
            classes={{
              paper: cn(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
            onClose={handleDrawerClose}
            onOpen={handleDrawerOpen}
          >
            <div className={classes.Toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem component={Link} to={`${match.url}${routes.feedback()}`} button key="Feedback">
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItem>
              <ListItem component={Link} to={`${match.url}${routes.markers()}`} button key="Markers">
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary="Markers" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.Toolbar} />

            <Switch location={location}>
              <Route
                exact
                path={`${match.path}`}
                render={({ match }) => {
                  return <Redirect to={`${match.path}${routes.feedback()}`} />;
                }}
              />
              <Route
                path={`${match.path}${routes.feedback()}`}
                render={() => {
                  return <FeedbackManagement />;
                }}
              />
              <Route
                path={`${match.path}${routes.markers()}`}
                render={() => {
                  return <MarkersManagement />;
                }}
              />
            </Switch>
          </main>
        </section>
      </div>
    </>
  );
};

Dashboard.defaultProps = {
  anchorEl: null,
  profile: {
    nickname: '',
    picture: null,
  },
};

export default withStyles(styles, { withTheme: true })(Dashboard);