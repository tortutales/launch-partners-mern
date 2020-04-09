// @packages
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import NotFoundPageContainer from '../../containers/not-found-page';
import { config } from '../../config';
import { mapComponent } from './component-mapper';
import { dimensions } from '../../styles/globals';

// @styles
import styles from './styles';

const CtrlRoutes = ({
    classes,
    mainMenuIsExpanded,
    userProps
}) => {
    const routes = userProps.isLoggedIn
        ? config.routes.filter(route => !route.requiresLogout &&
            (
                route.permission === null ||
                userProps.permissions.includes(route.permission)
            ))
        : config.routes.filter(route => route.permission === null);

    const containerClass = classNames({
        [classes.loggedInPage]: userProps.isLoggedIn
    });

    const containerMarginLeft = mainMenuIsExpanded
        ? dimensions.MAIN_MENU_WIDTH + 15
        : dimensions.MAIN_MENU_COLLAPSED_WIDTH + 15;

    return (
        <div className={containerClass} style={{ marginLeft: containerMarginLeft }}>
            <Switch>
                {
                    routes.map((route, index) => (
                        <Route
                            component={mapComponent(route.component)}
                            exact
                            key={index}
                            path={route.url}
                        />
                    ))
                }
                <Route component={NotFoundPageContainer} />
            </Switch>
        </div>
    );
};

CtrlRoutes.propTypes = {
    classes: PropTypes.object.isRequired,
    mainMenuIsExpanded: PropTypes.bool.isRequired,
    userProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        permissions: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};

export default withStyles(styles)(CtrlRoutes);
