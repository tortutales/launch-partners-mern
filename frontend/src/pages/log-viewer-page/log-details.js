// @packages
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../config';
import { toLongDateTimeString } from '../../util';

// @styles
import styles from './styles';

const CtrlLogDetails = ({
    className,
    classes,
    correlationId,
    date,
    details,
    level,
    message,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const logDetailsClass = classNames(
        className,
        classes.logDetails
    );

    const levelClass = classNames(
        level === 'Debug' && classes.levelDebug,
        level === 'Error' && classes.levelError,
        level === 'Info' && classes.levelInfo,
        level === 'Warning' && classes.levelWarning
    );

    return (
        <div className={logDetailsClass}>
            <Grid
                container
                direction="row"
                justify="space-between"
                spacing={40}
            >
                <Grid className={classes.subTitle} item>
                    {config.text.logViewer.logTable.date}
                </Grid>
                <Grid item>
                    {toLongDateTimeString(date)}
                </Grid>
            </Grid>
            <hr />
            <Grid
                container
                direction="row"
                justify="space-between"
                spacing={40}
            >
                <Grid className={classes.subTitle} item>
                    {config.text.logViewer.logTable.level}
                </Grid>
                <Grid item>
                    <div className={levelClass}>{level}</div>
                </Grid>
            </Grid>
            <hr />
            <Grid
                container
                direction="row"
                justify="space-between"
                spacing={40}
            >
                <Grid className={classes.subTitle} item>
                    {config.text.logViewer.logTable.message}
                </Grid>
                <Grid item>
                    {message}
                </Grid>
            </Grid>
            <hr />
            <Grid
                container
                direction="row"
                justify="space-between"
                spacing={40}
            >
                <Grid className={classes.subTitle} item>
                    {config.text.logViewer.logTable.correlationId}
                </Grid>
                <Grid item>
                    {correlationId}
                </Grid>
            </Grid>
            <hr />
            <Grid
                container
                direction="row"
                justify="space-between"
                spacing={40}
            >
                <Grid style={{ width: '100%' }} className={classes.subTitle} item>
                    {config.text.logViewer.logTable.details}
                    <pre style={{ whiteSpace: 'normal' }}>{details}</pre>
                </Grid>
            </Grid>
        </div>
    );
};

CtrlLogDetails.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    correlationId: PropTypes.string,
    date: PropTypes.object.isRequired,
    details: PropTypes.string,
    level: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    visible: PropTypes.bool
};

CtrlLogDetails.defaultProps = {
    className: null,
    correlationId: null,
    details: null,
    visible: true
};

export default withStyles(styles)(CtrlLogDetails);
