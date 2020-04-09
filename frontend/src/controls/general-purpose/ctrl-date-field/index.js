// @packages
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../../config';

import {
    MAX_DATE_VALUE,
    MIN_DATE_VALUE,
    removeTime
} from '../../../util';

// @styles
import styles from './styles';
import { DEFAULT_FIELD_VARIANT } from '../../../styles/globals';

// @constants
const EMPTY_ERROR = ' ';

const CtrlDateField = ({
    autoFocus,
    className,
    classes,
    disabled,
    icon,
    id,
    label,
    maxValue,
    minValue,
    name,
    onBlur,
    onChange,
    onFocus,
    required,
    showErrors,
    value,
    variant,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const dateFieldClass = classNames(
        className,
        classes.dateField
    );

    const getErrorMsg = (value) => {
        if (required && !value) {
            return config.text.validations.required;
        }

        return EMPTY_ERROR;
    };

    const getMaxValue = () => {
        const date = maxValue !== null
            ? maxValue
            : MAX_DATE_VALUE;
        return removeTime(date);
    };

    const getMinValue = () => {
        const date = minValue !== null
            ? minValue
            : MIN_DATE_VALUE;
        return removeTime(date);
    };

    const handleInputOnChange = (momentDate) => {
        const date = momentDate.startOf('day').toDate();

        if (!onChange) {
            return;
        }

        onChange({
            isValid: getErrorMsg(date) === EMPTY_ERROR,
            name: name || id,
            value: date
        });
    };

    const inputProps = () => icon ? {
        endAdornment: (
            <InputAdornment id={id} position="end" variant="filled">
                <Icon className={classes.disabledButton}>
                    {icon}
                </Icon>
            </InputAdornment>
        )
    } : {};

    const errorMsg = getErrorMsg(value);
    const hasError = showErrors && errorMsg !== EMPTY_ERROR;
    const helperText = hasError ? errorMsg : EMPTY_ERROR;

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
                InputProps={inputProps()}
                autoFocus={autoFocus}
                autoOk
                className={dateFieldClass}
                disabled={disabled}
                error={hasError}
                fullWidth
                helperText={helperText}
                id={id}
                label={label}
                maxDate={getMaxValue()}
                minDate={getMinValue()}
                onBlur={onBlur}
                onChange={handleInputOnChange}
                onFocus={onFocus}
                value={value}
                variant={variant}
            />
        </MuiPickersUtilsProvider>
    );
};

CtrlDateField.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    maxValue: PropTypes.instanceOf(Date),
    minValue: PropTypes.instanceOf(Date),
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    required: PropTypes.bool,
    showErrors: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    visible: PropTypes.bool
};

CtrlDateField.defaultProps = {
    autoFocus: false,
    className: null,
    disabled: false,
    icon: null,
    label: null,
    maxValue: null,
    minValue: null,
    name: null,
    onBlur: null,
    onChange: null,
    onFocus: null,
    required: false,
    showErrors: true,
    value: null,
    variant: DEFAULT_FIELD_VARIANT,
    visible: true
};

export default withStyles(styles)(CtrlDateField);
