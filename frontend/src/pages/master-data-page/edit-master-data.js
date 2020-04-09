// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';
import { config } from '../../config';
import { globalUI } from '../../core';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';

class CtrlEditMasterData extends PureComponent {
    constructor(props) {
        super(props);

        this.state = initialState;

        if (this.isEditingExistingItem) {
            this.state.editItem.code.value = props.item.code;
            this.state.editItem.code.valid = true;
            this.state.editItem.description.value = props.item.description;
            this.state.editItem.description.valid = true;
            this.state.editItem.id.value = props.item.id;
        }
        if (this.isEditingExistingItem || props.parent.autoId) {
            this.state.editItem.id.valid = true;
        }

        this.handleOnFieldChange = this.handleOnFieldChange.bind(this);
        this.handleOnConfirm = this.handleOnSave.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }

    get isAddingNewItem() {
        return !this.props.item;
    }

    get isEditingExistingItem() {
        return Boolean(this.props.item);
    }

    get isFormValid() {
        return isAllPropsValid(this.state.editItem);
    }

    get isAutoId() {
        return (this.props.item && this.props.item.autoId) ||
            (this.props.parent);
    }

    handleOnFieldChange({ isValid, name, value }) {
        this.setState(({ editItem }) => ({
            editItem: Object.assign({}, editItem, {
                [name]: {
                    isValid,
                    value
                }
            })
        }));
    }

    handleOnSave() {
        if (this.isFormValid) {
            const { editItem } = this.state;

            const payload = {
                code: editItem.code.value,
                description: editItem.description.value
            };

            if (this.isAddingNewItem) {
                payload.parentId = this.props.parent.masterDataId;
            } else {
                payload.masterDataId = this.props.parentId;
            }

            /*
                TODO: NOT SAVING
                if
                id: parseInt(editItem.id.value, 10)

                if (this.props.ite)


                masterDataId: parent.masterDataId,
                    parentId: isEditing ? item.parentId : parent.masterDataId

                this.props.onConfirm(payload).then(globalUI.hideModalDialog);
            */
        } else {
            this.setState({ showErrors: true });
        }
    }

    handleOnKeyPress(evt) {
        if (evt.key === 'Enter') {
            this.handleOnSave();
        }
    }

    render() {
        const { item, showErrors } = this.state;
        const {
            className,
            classes,
            id,
            parent: {
                autoId
            },
            isEditing,
            variant,
            visible
        } = this.props;

        if (!visible) {
            return null;
        }

        const masterDataDetailsClass = classNames(
            className,
            classes.masterDataDetails
        );

        return (
            <Grid
                className={masterDataDetailsClass}
                container
                direction="row"
                id={id}
                onKeyPress={this.handleOnKeyPress}
            >
                {!autoId && (
                    <Grid item xs={12}>
                        <CtrlTextField
                            autoFocus={!autoId || isEditing}
                            disabled={isEditing}
                            id={`${id}-id`}
                            label={config.text.masterDataPage.popup.id}
                            maxValue={Number.MAX_SAFE_INTEGER}
                            minValue={1}
                            name="id"
                            onChange={this.handleOnFieldChange}
                            required
                            showErrors={showErrors}
                            type="numeric"
                            value={item.id.value}
                            variant={variant}
                        />
                    </Grid>)}
                <Grid item xs={12}>
                    <CtrlTextField
                        autoFocus={autoId || isEditing}
                        id={`${id}-code`}
                        label={config.text.masterDataPage.popup.code}
                        maxLength={50}
                        minLength={1}
                        name="code"
                        onChange={this.handleOnFieldChange}
                        required
                        showErrors={showErrors}
                        type="text"
                        value={item.code.value}
                        variant={variant}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CtrlTextField
                        id={`${id}-description`}
                        label={config.text.masterDataPage.popup.description}
                        maxLength={256}
                        minLength={1}
                        name="description"
                        onChange={this.handleOnFieldChange}
                        required
                        showErrors={showErrors}
                        type="text"
                        value={item.description.value}
                        variant={variant}
                    />
                </Grid>
                <Grid item xs={12} className={classes.gblAlignRight}>
                    <Button
                        color="secondary"
                        id={`${id}-cancel-button`}
                        onClick={() => globalUI.hideModalDialog()}
                    >
                        {config.text.masterDataPage.popup.cancel}
                    </Button>
                    <Button
                        color="primary"
                        id={`${id}-ok-button`}
                        onClick={() => this.handleOnSave()}
                    >
                        {config.text.masterDataPage.popup.save}
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

CtrlEditMasterData.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    item: PropTypes.object.isRequired,
    // onConfirm: PropTypes.func.isRequired,
    parent: PropTypes.object.isRequired,
    parentId: PropTypes.number,
    variant: PropTypes.string,
    visible: PropTypes.bool
};

CtrlEditMasterData.defaultProps = {
    className: null,
    isEditing: false,
    parentId: null,
    variant: 'standard',
    visible: true
};

export default withStyles(styles)(CtrlEditMasterData);
