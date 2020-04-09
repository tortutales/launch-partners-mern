// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlStep1EnterEmail from './step-1-enter-email';
import CtrlStep2VerifyCode from './step-2-verify-code';
import CtrlStep3ChangePassword from './step-3-change-password';
import { globalUI } from '../../../core';

// styles
import styles from '../styles';

class CtrlPasswordRecovery extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 0,
            recoveryToken: null
        };

        this.handleOnFieldChange = this.handleOnFieldChange.bind(this);
        this.handleOnNextStep = this.handleOnNextStep.bind(this);
    }

    handleOnFieldChange({ name, isValid, value }) {
        this.setState({
            [name]: {
                isValid,
                value
            }
        });
    }

    handleOnNextStep({ recoveryToken = null }) {
        if (recoveryToken) {
            this.setState({ recoveryToken });
        }

        this.setState(prevState => ({
            currentStep: prevState.currentStep + 1
        }));
    }

    render() {
        const {
            className,
            classes,
            id,
            onSendCode,
            onVerifyCode,
            onChangePassword,
            theme,
            visible
        } = this.props;

        if (!visible) {
            return null;
        }

        const onCompleteOrCancel = () => { globalUI.hideModalDialog(); };

        const recoverPasswordFormClass = classNames(
            className,
            classes.recoverPasswordForm
        );

        return (
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                className={recoverPasswordFormClass}
                id={id}
                index={this.state.currentStep}
            >
                <div dir={theme.direction}>
                    <CtrlStep1EnterEmail
                        id={`${id}-enter-email-form`}
                        onCancel={onCompleteOrCancel}
                        onNext={this.handleOnNextStep}
                        onSendCode={onSendCode}
                    />
                </div>
                <div dir={theme.direction}>
                    <CtrlStep2VerifyCode
                        id={`${id}-verify-code-form`}
                        onCancel={onCompleteOrCancel}
                        onNext={this.handleOnNextStep}
                        onVerifyCode={onVerifyCode}
                    />
                </div>
                <div dir={theme.direction}>
                    <CtrlStep3ChangePassword
                        id={`${id}-change-password-form`}
                        onCancel={onCompleteOrCancel}
                        onChangePassword={onChangePassword}
                        onNext={onCompleteOrCancel}
                        recoveryToken={this.state.recoveryToken}
                    />
                </div>
            </SwipeableViews>
        );
    }
}

CtrlPasswordRecovery.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onSendCode: PropTypes.func.isRequired,
    onVerifyCode: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    visible: PropTypes.bool
};

CtrlPasswordRecovery.defaultProps = {
    className: null,
    visible: true
};

export default withStyles(styles, { withTheme: true })(CtrlPasswordRecovery);
