// @packages
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlCheckField from '../../controls/general-purpose/ctrl-check-field';
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';

// @styles
import styles from './styles';

const CtrlLoginForm = ({
    classes,
    id,
    onFieldChange,
    onLogin,
    onRecoverPassword,
    onRememberMe,
    passwordValue,
    rememberMeValue,
    showErrors,
    userValue
}) => (
    <form
        autoComplete="off"
        className={classes.form}
        id={id}
        noValidate
    >
        <Paper className={classes.formPaper} elevation={2}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        {config.text.loginPage.formTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <CtrlTextField
                autoFocus
                icon="account_circle"
                id={`${id}-user-input`}
                label={config.text.loginPage.userLabel}
                name="user"
                onChange={onFieldChange}
                onEnter={onLogin}
                placeholder={config.text.loginPage.userPlaceholder}
                required
                showErrors={showErrors}
                type="email"
                value={userValue}
            />
            <CtrlTextField
                id={`${id}-password-input`}
                label={config.text.loginPage.password}
                name="password"
                onChange={onFieldChange}
                onEnter={onLogin}
                required
                showErrors={showErrors}
                type="password"
                value={passwordValue}
            />
            <div className={classes.formButtons}>
                <div>
                    <CtrlCheckField
                        id={`${id}-remember-check`}
                        label={config.text.loginPage.remember}
                        name="remember"
                        onChange={onRememberMe}
                        value={rememberMeValue}
                    />
                    <Button
                        color="primary"
                        id={`${id}-recover-password-button`}
                        onClick={onRecoverPassword}
                    >
                        {config.text.passwordRecovery.forgotYourPassword}
                    </Button>
                </div>
                <Button
                    color="primary"
                    id={`${id}-continue-button`}
                    onClick={onLogin}
                    value={config.text.loginPage.continue}
                    variant="contained"
                >
                    {config.text.loginPage.continue}
                </Button>
            </div>
        </Paper>
    </form>
);

CtrlLoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRecoverPassword: PropTypes.func.isRequired,
    onRememberMe: PropTypes.func.isRequired,
    passwordValue: PropTypes.string,
    rememberMeValue: PropTypes.bool.isRequired,
    showErrors: PropTypes.bool.isRequired,
    userValue: PropTypes.string
};

CtrlLoginForm.defaultProps = {
    passwordValue: null,
    userValue: null
};

export default withStyles(styles)(CtrlLoginForm);
