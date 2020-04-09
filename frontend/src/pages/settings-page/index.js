// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

// @scripts
import CtrlSelectField from '../../controls/general-purpose/ctrl-select-field';
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';
import { isAllPropsValid } from '../../util';
import { initialState } from './state';

// @styles
import styles from './styles';

class SettingsPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleFieldOnChange = this.handleFieldOnChange.bind(this);
        this.handleOnUpdateMyPassword = this.handleOnUpdateMyPassword.bind(this);
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

    handleOnUpdateMyPassword() {
        const {
            currentPassword,
            newPassword
        } = this.state;

        const params = {
            currentPassword: currentPassword.value,
            newPassword: newPassword.value
        };

        if (this.isFormValid) {
            this.props.userProps.onUpdateMyPassword(params)
                .then(() => this.setState(initialState));
        }

        this.setState({ showErrors: true });
    }

    render() {
        const {
            classes,
            languageProps
        } = this.props;

        const {
            confirmPassword,
            currentPassword,
            newPassword,
            showErrors
        } = this.state;

        return (
            <div id="setings-page" className={classes.settingsPage}>
                <Grid container spacing={10}>
                    <Grid className={classes.languageSelect} item xs={6}>
                        <CtrlSelectField
                            id="settings-page-language-select"
                            itemValProp="code"
                            items={languageProps.list}
                            label={config.text.settingsPage.language}
                            onChange={({ value }) => { languageProps.onChange(value); }}
                            value={languageProps.value}
                            variant="standard"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <CtrlTextField
                            id="settings-page-current-password"
                            label={config.text.settingsPage.currentPassword}
                            name="currentPassword"
                            onEnter={this.handleOnUpdateMyPassword}
                            onChange={this.handleFieldOnChange}
                            required
                            showErrors={showErrors}
                            type="password"
                            value={currentPassword.value}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <CtrlTextField
                            id="settings-page-new-password"
                            label={config.text.settingsPage.newPassword}
                            name="newPassword"
                            onEnter={this.handleOnUpdateMyPassword}
                            onChange={this.handleFieldOnChange}
                            required
                            showErrors={showErrors}
                            type="password"
                            value={newPassword.value}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <CtrlTextField
                            expectedValue={newPassword.value}
                            id="settings-page-confirm-password"
                            label={config.text.settingsPage.confirmPassword}
                            name="confirmPassword"
                            onChange={this.handleFieldOnChange}
                            onEnter={this.handleOnUpdateMyPassword}
                            required
                            showErrors={showErrors}
                            type="password"
                            value={confirmPassword.value}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={10}>
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
                            onClick={this.handleOnUpdateMyPassword}
                            variant="contained"
                        >
                            {config.text.settingsPage.updatePassword}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

SettingsPage.propTypes = {
    classes: PropTypes.object.isRequired,
    languageProps: PropTypes.shape({
        list: PropTypes.arrayOf(PropTypes.shape({
            description: PropTypes.string.isRequired,
            code: PropTypes.string.isRequired
        })).isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired
    }).isRequired,
    userProps: PropTypes.shape({
        onUpdateMyPassword: PropTypes.func.isRequired
    }).isRequired
};

export default withStyles(styles)(SettingsPage);
