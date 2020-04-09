// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlHeader from '../../controls/general-purpose/ctrl-header';
import CtrlLoginForm from './login-form';
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
        const { classes } = this.props;
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
                    passwordValue={password.value}
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
        onLogin: PropTypes.func.isRequired
    }).isRequired
};

export default withStyles(styles)(LoginPage);
