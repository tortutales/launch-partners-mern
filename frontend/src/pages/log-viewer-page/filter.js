// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlDateField from '../../controls/general-purpose/ctrl-date-field';
import CtrlSelectField from '../../controls/general-purpose/ctrl-select-field';
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';
import { globalUI } from '../../core';

// @styles
import styles from './styles';

const CtrlLogFilter = ({
    className,
    classes,
    id,
    logFilter,
    onChangeLogFilter,
    onSearchLogEntries,
    variant,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const logFilterClass = classNames(
        className,
        classes.logFilter
    );

    const hoursArray = [];
    for (let i = 0; i <= 23; i++) {
        hoursArray.push({
            id: i,
            description: i.toString()
        });
    }

    const handleOnChangeLogFilter = ({ name, value }) => {
        onChangeLogFilter({ name, value });
        onSearchLogEntries(Object.assign({}, logFilter, {
            [name]: value
        }));
    };

    return (
        <Grid
            alignItems="center"
            className={logFilterClass}
            container
            direction="row"
            id={id}
        >
            <Grid item xs={3} className={classes.cell}>
                <CtrlDateField
                    icon="calendar_today"
                    id={`${id}-date`}
                    label={config.text.logViewer.date}
                    name="date"
                    onChange={handleOnChangeLogFilter}
                    type="date"
                    value={logFilter.date || new Date()}
                    variant={variant}
                />
            </Grid>
            <Grid item xs={3} className={classes.cell}>
                <CtrlSelectField
                    id={`${id}-start-hour`}
                    itemValProp="id"
                    items={hoursArray}
                    label={config.text.logViewer.startHour}
                    name="startHour"
                    onChange={handleOnChangeLogFilter}
                    value={logFilter.startHour}
                    variant={variant}
                />
            </Grid>
            <Grid item xs={3} className={classes.cell}>
                <CtrlSelectField
                    id={`${id}-end-hour`}
                    itemValProp="id"
                    items={hoursArray}
                    label={config.text.logViewer.endHour}
                    name="endHour"
                    onChange={handleOnChangeLogFilter}
                    value={logFilter.endHour}
                    variant={variant}
                />
            </Grid>
            <Grid item xs={3} className={classes.cell}>
                <CtrlSelectField
                    id={`${id}-level`}
                    itemValProp="id"
                    items={config.masterData.logLevel}
                    label={config.text.logViewer.level}
                    name="level"
                    onChange={handleOnChangeLogFilter}
                    value={logFilter.level}
                    variant={variant}
                />
            </Grid>
            <Grid item xs={3} className={classes.cell}>
                <CtrlTextField
                    id={`${id}-keyword`}
                    label={config.text.logViewer.keyword}
                    name="keyword"
                    onChange={onChangeLogFilter}
                    onEnter={() => onSearchLogEntries(logFilter)}
                    value={logFilter.keyword}
                    variant={variant}
                />
            </Grid>
            <Grid container item xs={3}>
                <Grid item xs={6}>
                    <div className={classes.searchButton}>
                        <Button
                            className={classes.buttonWidth}
                            color="primary"
                            id={`${id}-search-button`}
                            onClick={() => { onSearchLogEntries(logFilter); }}
                            size="large"
                            value={config.text.logViewer.search}
                            variant="contained"
                        >
                            <Icon className={classes.leftIcon}>search</Icon>
                            {config.text.logViewer.search}
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        className={classes.buttonWidth}
                        color="primary"
                        id={`${id}-search-button`}
                        onClick={() => { globalUI.executeExport('log'); }}
                        size="large"
                        value={config.text.common.export}
                        variant="contained"
                    >
                        <Icon className={classes.leftIcon}>save_alt</Icon>
                        {config.text.common.export}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

CtrlLogFilter.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    logFilter: PropTypes.shape({
        date: PropTypes.instanceOf(Date),
        endHour: PropTypes.number.isRequired,
        keyword: PropTypes.string,
        level: PropTypes.string,
        startHour: PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.string.isRequired,
    onChangeLogFilter: PropTypes.func.isRequired,
    onSearchLogEntries: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    visible: PropTypes.bool
};

CtrlLogFilter.defaultProps = {
    className: null,
    variant: 'standard',
    visible: true
};

export default withStyles(styles)(CtrlLogFilter);
