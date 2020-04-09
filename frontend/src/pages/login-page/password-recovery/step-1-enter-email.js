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

class CtrlStep1EnterEmail extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            userEmail: {
                isValid: false,
                value: ''
            },
            showErrors: false
        };

        this.handleOnFieldChange = this.handleOnFieldChange.bind(this);
        this.handleOnNext = this.handleOnNext.bind(this);
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

    handleOnNext() {
        if (this.isFormValid) {
            this.props.onSendCode(this.state.userEmail.value)
                .then(this.props.onNext({}))
                .catch(() => {});
        } else {
            this.setState({ showErrors: true });
        }
    }

    render() {
        const {
            classes,
            id,
            onCancel
        } = this.props;

        const {
            userEmail,
            showErrors
        } = this.state;

        return (
            <div id={id}>
                <Typography className={classes.recoverPasswordText} component="p">
                    {config.text.passwordRecovery.enterEmailAddress}
                </Typography>
                <CtrlTextField
                    autoFocus
                    icon="account_circle"
                    id={`${id}-user-email`}
                    label={config.text.loginPage.userLabel}
                    name="userEmail"
                    onChange={this.handleOnFieldChange}
                    onEnter={this.handleOnNext}
                    placeholder={config.text.loginPage.userPlaceholder}
                    required
                    showErrors={showErrors}
                    type="email"
                    value={userEmail.value}
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
                        onClick={this.handleOnNext}
                        size="large"
                    >
                        {config.text.loginPage.continue}
                    </Button>
                </div>
            </div>
        );
    }
}

CtrlStep1EnterEmail.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onSendCode: PropTypes.func.isRequired
};

export default withStyles(styles)(CtrlStep1EnterEmail);
