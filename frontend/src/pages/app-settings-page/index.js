// @packages
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlAppSettingSection from './section';
import { config } from '../../config';
import { initialState } from './state';
import { isAllPropsValid, groupArray } from '../../util';

// @styles
import styles from './styles';

class AppSettingsPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleFieldOnChange = this.handleFieldOnChange.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnDiscard = this.handleOnDiscard.bind(this);
    }

    componentDidMount() {
        this.props.onGetAppSettings().then((response) => {
            const fields = response.map(item => Object.assign({}, item, {
                isValid: true
            }));
            const originalFields = fields.map(item => Object.assign({}, item));
            this.setState({
                fields,
                originalFields
            });
        });
    }

    get isFormValid() {
        return isAllPropsValid(this.state.fields);
    }

    handleFieldOnChange({ name, isValid, value }) {
        this.setState(({ fields }) => ({
            fields: fields.map((row) => {
                if (row.settingId.toString() === name) {
                    return Object.assign({}, row, {
                        isValid,
                        value
                    });
                }
                return row;
            }),
            hasChanges: true
        }));
    }

    handleOnSave() {
        if (this.isFormValid) {
            this.props.onSaveAppSettings(this.state.fields).then(() => {
                this.setState(({ fields }) => ({
                    hasChanges: false,
                    originalFields: fields
                }));
            });
        } else {
            this.setState({ showErrors: true });
        }
    }

    handleOnDiscard() {
        const { originalFields } = this.state;

        this.setState({
            fields: originalFields,
            hasChanges: false
        });
    }

    render() {
        const { classes, userPermissions } = this.props;

        const {
            fields,
            hasChanges,
            showErrors
        } = this.state;

        return (
            <div id="app-settings-page" className={classes.appSettingsPage}>
                <form
                    autoComplete="off"
                    id="app-settings-form"
                    noValidate
                >
                    {
                        groupArray({ key: 'category', source: fields }).map(group => (
                            <CtrlAppSettingSection
                                appSettings={group.items}
                                category={group.key}
                                id={`app-settings-page-${group.key}`}
                                key={group.key}
                                onChange={this.handleFieldOnChange}
                                showErrors={showErrors}
                                userPermissions={userPermissions}
                            />
                        ))
                    }
                    <div id="app-settings-page-buttons" className={classes.buttonsContainer}>
                        <Button
                            color="primary"
                            disabled={!hasChanges}
                            id="app-settings-page-save-button"
                            onClick={this.handleOnSave}
                            size="large"
                            variant="contained"
                        >
                            <Icon className={classes.marginRightUnit}>check_circle</Icon>
                            {config.text.appSettings.saveButton}
                        </Button>
                        { hasChanges &&
                            <Button
                                className={classes.marginLeftUnit}
                                color="secondary"
                                id="app-settings-page-discard-button"
                                onClick={this.handleOnDiscard}
                                size="large"
                                variant="contained"
                            >
                                <Icon className={classes.marginRightUnit}>cancel</Icon>
                                {config.text.appSettings.discardButton}
                            </Button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

AppSettingsPage.propTypes = {
    classes: PropTypes.object.isRequired,
    onGetAppSettings: PropTypes.func.isRequired,
    onSaveAppSettings: PropTypes.func.isRequired,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AppSettingsPage);
