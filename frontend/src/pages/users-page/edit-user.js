// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlAvatarField from '../../controls/general-purpose/ctrl-avatar-field';
import CtrlCheckField from '../../controls/general-purpose/ctrl-check-field';
import CtrlSelectField from '../../controls/general-purpose/ctrl-select-field';
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { isAllPropsValid, toEditableObject } from '../../util';
import { newUserState } from './state';

// @styles
import styles from './styles';
import { DEFAULT_FIELD_VARIANT } from '../../styles/globals';

class CtrlEditUser extends PureComponent {
    constructor(props) {
        super(props);

        if (this.props.user) {
            const editUserState = toEditableObject(this.props.user);
            this.state = Object.assign({}, newUserState, editUserState);
        } else {
            this.state = Object.assign({}, newUserState);
        }

        this.handleOnFieldChange = this.handleOnFieldChange.bind(this);
        this.handleOnPasswordChange = this.handleOnPasswordChange.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
    }

    get isAdding() {
        return !this.state.userId;
    }

    get isEditing() {
        return !this.isAdding;
    }

    get isFormValid() {
        return isAllPropsValid(this.state);
    }

    get user() {
        const { state } = this;

        const user = {
            avatarUrl: state.avatarUrl.value,
            email: state.email.value,
            languageCode: state.languageCode.value,
            name: state.name.value,
            password: state.password.value === ''
                ? null
                : state.password.value
        };

        if (this.isEditing) {
            Object.assign(user, {
                lockoutEnabled: state.lockoutEnabled.value,
                userId: state.userId.value
            });
        }

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
            this.props.onSave(this.user)
                .then(this.props.onClose)
                .catch(() => {});
        } else {
            this.setState({ showErrors: true });
        }
    }

    render() {
        const {
            avatarMaxSizeMb,
            classes,
            id,
            lang,
            languageList,
            onClose,
            variant,
            visible
        } = this.props;

        if (!visible) {
            return null;
        }

        const {
            avatarUrl,
            checkPassword,
            email,
            languageCode,
            lockoutEnabled,
            name,
            password,
            showErrors
        } = this.state;

        return (
            <Grid container id={id} spacing={16}>
                <Grid item xs={6}>
                    <CtrlTextField
                        autoFocus
                        id={`${id}-name`}
                        label={lang.users.name}
                        maxLength={100}
                        minLength={3}
                        name="name"
                        onChange={this.handleOnFieldChange}
                        required
                        showErrors={showErrors}
                        textTransform="uppercase"
                        type="name"
                        value={name.value}
                        variant={variant}
                    />
                    <CtrlTextField
                        id={`${id}-email`}
                        label={lang.users.email}
                        maxLength={256}
                        name="email"
                        onChange={this.handleOnFieldChange}
                        required
                        showErrors={showErrors}
                        textTransform="lowercase"
                        type="email"
                        value={email.value}
                        variant={variant}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CtrlAvatarField
                        className={classes.bigAvatar}
                        id={`${id}-avatar-url`}
                        lang={lang}
                        maxSizeMb={avatarMaxSizeMb}
                        name="avatarUrl"
                        onChange={this.handleOnFieldChange}
                        showErrors={showErrors}
                        tooltip={lang.users.changeAvatar}
                        value={avatarUrl.value}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CtrlSelectField
                        id={`${id}-language-code`}
                        itemValProp="code"
                        items={languageList}
                        label={lang.users.language}
                        name="languageCode"
                        onChange={this.handleOnFieldChange}
                        required
                        showErrors={showErrors}
                        value={languageCode.value}
                        variant={variant}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CtrlCheckField
                        id={`${id}-lockout-enabled`}
                        label={lang.users.locked}
                        name="lockoutEnabled"
                        onChange={this.handleOnFieldChange}
                        showErrors={showErrors}
                        value={lockoutEnabled.value}
                        visible={this.isEditing}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CtrlTextField
                        id={`${id}-password`}
                        label={lang.users.password}
                        name="password"
                        onChange={this.handleOnFieldChange}
                        showErrors={showErrors}
                        type="password"
                        value={password.value}
                        variant={variant}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CtrlTextField
                        expectedValue={password.value}
                        id={`${id}-check-password`}
                        label={lang.users.confirmPassword}
                        name="checkPassword"
                        onChange={this.handleOnFieldChange}
                        showErrors={showErrors}
                        type="password"
                        value={checkPassword.value}
                        variant={variant}
                    />
                </Grid>
                <Grid item xs={12} className={classes.gblAlignRight}>
                    <Button
                        color="secondary"
                        id={`${id}-cancel-button`}
                        onClick={onClose}
                    >
                        {lang.common.cancel}
                    </Button>
                    <Button
                        color="primary"
                        id={`${id}-save-button`}
                        onClick={this.handleOnSave}
                    >
                        {lang.common.save}
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

CtrlEditUser.propTypes = {
    avatarMaxSizeMb: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    lang: PropTypes.shape({
        common: PropTypes.shape({
            cancel: PropTypes.string.isRequired,
            save: PropTypes.string.isRequired
        }),
        users: PropTypes.shape({
            avatarSizeExceeded: PropTypes.string.isRequired,
            changeAvatar: PropTypes.string.isRequired,
            confirmPassword: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            language: PropTypes.string.isRequired,
            locked: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired
        })
    }).isRequired,
    languageList: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })).isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    user: PropTypes.shape({
        avatarUrl: PropTypes.string,
        email: PropTypes.string.isRequired,
        languageCode: PropTypes.string.isRequired,
        lockoutEnabled: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired
    }),
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    visible: PropTypes.bool
};

CtrlEditUser.defaultProps = {
    user: null,
    variant: DEFAULT_FIELD_VARIANT,
    visible: true
};

export default withStyles(styles)(CtrlEditUser);
