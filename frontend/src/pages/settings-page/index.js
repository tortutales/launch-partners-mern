// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlAvatarField from '../../controls/general-purpose/ctrl-avatar-field';
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';
import { globalUI } from '../../core';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';

class SettingsPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.handleOnFieldChange = this.handleOnFieldChange.bind(this);
        this.handleOnPasswordChange = this.handleOnPasswordChange.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
    }

    get initialState() {
        const {
            avatarUrl,
            description,
            name,
            userId
        } = this.props.user;

        return {
            avatarUrl: {
                isValid: true,
                value: avatarUrl
            },
            checkPassword: {
                isValid: true,
                value: ''
            },
            description: {
                isValid: true,
                value: description
            },
            name: {
                isValid: true,
                value: name
            },
            password: {
                isValid: true,
                value: ''
            },
            userId: {
                isValid: true,
                value: userId
            },
            showErrors: false
        };
    }

    get isFormValid() {
        return isAllPropsValid(this.state);
    }

    get user() {
        const { state } = this;

        const user = {
            avatarUrl: state.avatarUrl.value,
            description: state.description.value,
            name: state.name.value,
            password: state.password.value === ''
                ? null
                : state.password.value,
            userId: state.userId.value
        };

        return user;
    }

    handleOnFieldChange({ isValid, name, value }) {
        if (name === 'password') {
            this.handleOnPasswordChange({ isValid, value });
        } else {
            this.setState({
                [name]: {
                    isValid,
                    value
                }
            });
        }
    }

    handleOnPasswordChange({ isValid, value }) {
        this.setState(({ checkPassword }) => ({
            password: {
                isValid,
                value
            },
            checkPassword: {
                isValid: (value || '') === (checkPassword.value || ''),
                value: checkPassword.value
            }
        }));
    }

    handleOnSave() {
        if (this.isFormValid) {
            this.props
                .onUpdateUser(this.user)
                .then(() => {
                    globalUI.showToastNotificationSuccess(
                        config.text.settingsPage.profileUpdated
                    );
                });
        } else {
            this.setState({ showErrors: true });
        }
    }

    render() {
        const { classes } = this.props;
        const { showErrors } = this.state;

        const {
            avatarUrl,
            checkPassword,
            description,
            name,
            password
        } = this.state;

        return (
            <div id="setings-page" className={classes.settingsPage}>
                <Grid container>
                    <Grid item xs={6}>
                        <CtrlTextField
                            autoFocus
                            id="settings-page-name"
                            label={config.text.users.name}
                            maxLength={100}
                            minLength={3}
                            name="name"
                            onChange={this.handleOnFieldChange}
                            required
                            showErrors={showErrors}
                            type="name"
                            value={name.value}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <CtrlTextField
                            id="settings-page-description"
                            label={config.text.users.description}
                            maxLength={2000}
                            name="description"
                            onChange={this.handleOnFieldChange}
                            rows={5}
                            showErrors={showErrors}
                            value={description.value}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CtrlAvatarField
                            className={classes.bigAvatar}
                            id="settings-page-avatar"
                            maxSizeMb={3}
                            name="avatarUrl"
                            onChange={this.handleOnFieldChange}
                            showErrors={showErrors}
                            tooltip={config.text.users.changeAvatar}
                            value={avatarUrl.value}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <CtrlTextField
                            id="settings-page-password"
                            label={config.text.users.password}
                            name="password"
                            onChange={this.handleOnFieldChange}
                            showErrors={showErrors}
                            type="password"
                            value={password.value}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <CtrlTextField
                            expectedValue={password.value}
                            id="settings-page-check-password"
                            label={config.text.users.confirmPassword}
                            name="checkPassword"
                            onChange={this.handleOnFieldChange}
                            showErrors={showErrors}
                            type="password"
                            value={checkPassword.value}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid
                        alignContent="flex-end"
                        alignItems="flex-end"
                        container
                        item
                        justify="flex-end"
                        xs={6}
                    >
                        <Button
                            color="primary"
                            id="settings-page-update-password-button"
                            onClick={this.handleOnSave}
                            variant="contained"
                        >
                            {config.text.common.save}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

SettingsPage.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.shape({
        avatarUrl: PropTypes.string,
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired
    }).isRequired,
    onUpdateUser: PropTypes.func.isRequired
};

export default withStyles(styles)(SettingsPage);
