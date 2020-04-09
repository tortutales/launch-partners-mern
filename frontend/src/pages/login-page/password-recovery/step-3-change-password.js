// @packages
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlTextField from '../../../controls/general-purpose/ctrl-text-field';
import { config } from '../../../config';
import { isAllPropsValid } from '../../../util';

// @styles
import styles from '../styles';

class CtrlStep3ChangePassword extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: {
                isValid: true,
                value: ''
            },
            checkPassword: {
                isValid: true,
                value: ''
            },
            showErrors: false
        };

        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnFieldChange = this.handleOnFieldChange.bind(this);
    }

    get isFormValid() {
        return isAllPropsValid(this.state);
    }

    handleOnChangePassword() {
        if (this.isFormValid) {
            const params = {
                newPassword: this.state.newPassword.value,
                recoveryToken: this.props.recoveryToken
            };

            this.props.onChangePassword(params)
                .then(this.props.onNext({}))
                .catch(() => {});
        } else {
            this.setState({ showErrors: true });
        }
    }

    handleOnFieldChange({ name, isValid, value }) {
        this.setState({
            [name]: {
                isValid,
                value
            }
        });
    }

    render() {
        const {
            classes,
            id,
            onCancel
        } = this.props;

        const {
            newPassword,
            checkPassword,
            showErrors
        } = this.state;

        return (
            <div id={id}>
                <CtrlTextField
                    autoFocus
                    id={`${id}-new-password`}
                    label={config.text.passwordRecovery.newPassword}
                    name="newPassword"
                    onChange={this.handleOnFieldChange}
                    onEnter={this.handleOnChangePassword}
                    required
                    showErrors={showErrors}
                    type="password"
                    value={newPassword.value}
                />
                <CtrlTextField
                    expectedValue={newPassword.value}
                    id={`${id}-check-password`}
                    label={config.text.passwordRecovery.reEnterPassword}
                    name="checkPassword"
                    onChange={this.handleOnFieldChange}
                    onEnter={this.handleOnChangePassword}
                    required
                    showErrors={showErrors}
                    type="password"
                    value={checkPassword.value}
                />
                <div className={classes.recoverPasswordButtons}>
                    <Button
                        className={classes.recoverPasswordButton}
                        color="secondary"
                        id={`${id}-cancel-button`}
                        onClick={onCancel}
                        size="large"
                    >
                        {config.text.modalDialog.cancel}
                    </Button>
                    <Button
                        className={classes.recoverPasswordButton}
                        color="primary"
                        id={`${id}-continue-button`}
                        onClick={this.handleOnChangePassword}
                        size="large"
                    >
                        {config.text.loginPage.continue}
                    </Button>
                </div>
            </div>
        );
    }
}

CtrlStep3ChangePassword.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    recoveryToken: PropTypes.string
};

CtrlStep3ChangePassword.defaultProps = {
    recoveryToken: null
};

export default withStyles(styles)(CtrlStep3ChangePassword);
