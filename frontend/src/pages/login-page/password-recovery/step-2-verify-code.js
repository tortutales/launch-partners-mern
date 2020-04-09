// @packages
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlTextField from '../../../controls/general-purpose/ctrl-text-field';
import { config } from '../../../config';
import { isAllPropsValid } from '../../../util';

// @styles
import styles from '../styles';

class CtrlStep2VerifyCode extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            verificationCode: {
                isValid: false,
                value: ''
            },
            showErrors: false
        };

        this.handleOnFieldChange = this.handleOnFieldChange.bind(this);
        this.handleOnVerifyCode = this.handleOnVerifyCode.bind(this);
    }

    get isFormValid() {
        return isAllPropsValid(this.state);
    }

    handleOnFieldChange({ name, isValid, value }) {
        this.setState({
            [name]: {
                isValid,
                value
            }
        });
    }

    handleOnVerifyCode() {
        if (this.isFormValid) {
            this.props.onVerifyCode(this.state.verificationCode.value)
                .then(response => this.props.onNext({ recoveryToken: response.recoveryToken }))
                .catch(() => {});
        } else {
            this.setState({ showErrors: true });
        }
    }

    render() {
        const { verificationCode, showErrors } = this.state;

        const {
            classes,
            id,
            onCancel
        } = this.props;

        return (
            <div id={id}>
                <Typography className={classes.recoverPasswordText} component="p">
                    {config.text.passwordRecovery.verifyIdentityMessage}
                </Typography>
                <CtrlTextField
                    autoFocus
                    className={classes.recoverPasswordVerificationCode}
                    icon="check"
                    id={`${id}-verification-code`}
                    label={config.text.passwordRecovery.verificationCode}
                    name="verificationCode"
                    onChange={this.handleOnFieldChange}
                    onEnter={this.handleOnVerifyCode}
                    required
                    showErrors={showErrors}
                    type="numeric"
                    value={verificationCode.value}
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
                        onClick={this.handleOnVerifyCode}
                        size="large"
                    >
                        {config.text.loginPage.continue}
                    </Button>
                </div>
            </div>
        );
    }
}

CtrlStep2VerifyCode.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onVerifyCode: PropTypes.func.isRequired
};

export default withStyles(styles)(CtrlStep2VerifyCode);
