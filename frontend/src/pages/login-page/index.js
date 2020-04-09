// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlHeader from '../../controls/general-purpose/ctrl-header';
import CtrlLoginForm from './login-form';
import CtrlPasswordRecovery from './password-recovery';
import { config } from '../../config';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';
import { globalUI } from '../../core';

class LoginPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleFieldOnChange = this.handleFieldOnChange.bind(this);
        this.handleOnLogIn = this.handleOnLogIn.bind(this);
        this.handleOnRecoverPassword = this.handleOnRecoverPassword.bind(this);
        this.handleOnRememberMe = this.handleOnRememberMe.bind(this);
    }

    get isFormValid() {
        return isAllPropsValid(this.state);
    }

    handleFieldOnChange({ name, isValid, value }) {
        this.setState({
            [name]: {
                isValid,
                value
            }
        });
    }

    handleOnRecoverPassword() {
        const { userProps } = this.props;

        const {
            onSendPasswordRecoveryCode,
            onUpdatePasswordUsingRecoveryToken,
            onVerifyPasswordRecoveryCode
        } = userProps;

        const content = (
            <CtrlPasswordRecovery
                id="login-page-recover-password"
                onChangePassword={onUpdatePasswordUsingRecoveryToken}
                onSendCode={onSendPasswordRecoveryCode}
                onVerifyCode={onVerifyPasswordRecoveryCode}
            />
        );

        globalUI.showModalDialog({
            msg: content,
            showCancel: false,
            title: config.text.passwordRecovery.title
        });
    }

    handleOnRememberMe({ value }) {
        this.props.userProps.onRememberMe(value);
    }

    handleOnLogIn() {
        if (this.isFormValid) {
            const { userProps } = this.props;
            const { user, password } = this.state;

            userProps
                .onLogin({
                    email: user.value,
                    password: password.value
                }).then(() => {
                    globalUI.navigateToDefaultUrl();
                }).catch(() => {});
        } else {
            this.setState({ showErrors: true });
        }
    }

    render() {
        const {
            classes,
            userProps: { rememberMe }
        } = this.props;

        const { password, showErrors, user } = this.state;

        return (
            <div
                className={classes.loginPage}
                id="login-page"
            >
                <CtrlHeader
                    className={classes.header}
                    id="login-page-header"
                    leftContent={config.settings.appName}
                />
                <CtrlLoginForm
                    id="login-page-form"
                    onFieldChange={this.handleFieldOnChange}
                    onLogin={this.handleOnLogIn}
                    onRecoverPassword={this.handleOnRecoverPassword}
                    onRememberMe={this.handleOnRememberMe}
                    passwordValue={password.value}
                    rememberMeValue={rememberMe}
                    showErrors={showErrors}
                    userValue={user.value}
                />
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    userProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        onLogin: PropTypes.func.isRequired,
        onRememberMe: PropTypes.func.isRequired,
        onSendPasswordRecoveryCode: PropTypes.func.isRequired,
        onUpdatePasswordUsingRecoveryToken: PropTypes.func.isRequired,
        onVerifyPasswordRecoveryCode: PropTypes.func.isRequired,
        rememberMe: PropTypes.bool.isRequired
    }).isRequired
};

export default withStyles(styles)(LoginPage);
