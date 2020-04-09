// @packages
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const CtrlUserInfo = ({
    classes,
    id,
    userEmail,
    userName
}) => (
    <Grid
        alignItems="flex-end"
        className={classes.userInfoCard}
        container
        id={id}
    >
        <Grid item xs={4}>
            <Avatar className={classes.userInfoAvatar}>
                <Icon id={`${id}-avatar-icon`}>account_circle</Icon>
            </Avatar>
        </Grid>
        <Grid item xs={8}>
            <div
                className={classes.userInfoName}
                id={`${id}-name-label`}
            >
                {userName}
            </div>
            <div
                className={classes.userInfoEmail}
                id={`${id}-email-label`}
            >
                {userEmail}
            </div>
        </Grid>
    </Grid>
);

CtrlUserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired
};

export default withStyles(styles)(CtrlUserInfo);
