// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlAvatarField from '../../controls/general-purpose/ctrl-avatar-field';
import CtrlTextField from '../../controls/general-purpose/ctrl-text-field';

// @styles
import styles from './styles';
import { DEFAULT_FIELD_VARIANT } from '../../styles/globals';
import { config } from '../../config';

const CtrlViewProfile = ({
    classes,
    id,
    onClose,
    user: {
        avatarUrl,
        description,
        email,
        name
    },
    variant,
    visible
}) => {
    if (!visible) {
        return null;
    }
    return (
        <Grid container id={id} spacing={4}>
            <Grid item xs={6}>
                <CtrlTextField
                    disabled
                    id={`${id}-name`}
                    label={config.text.users.name}
                    textTransform="uppercase"
                    value={name}
                    variant={variant}
                />
                <CtrlTextField
                    disabled
                    id={`${id}-email`}
                    label={config.text.users.email}
                    textTransform="lowercase"
                    value={email}
                    variant={variant}
                />
            </Grid>
            <Grid item xs={6}>
                <CtrlAvatarField
                    className={classes.bigAvatar}
                    id={`${id}-avatar-url`}
                    name="avatarUrl"
                    value={avatarUrl}
                />
            </Grid>
            <Grid item xs={12}>
                <CtrlTextField
                    disabled
                    id={`${id}-description`}
                    label={config.text.users.description}
                    value={description}
                    variant={variant}
                    rows={5}
                />
            </Grid>
            <Grid item xs={12} className={classes.gblAlignRight}>
                <Button
                    color="secondary"
                    id={`${id}-cancel-button`}
                    onClick={onClose}
                >
                    Close
                </Button>
            </Grid>
        </Grid>
    );
};

CtrlViewProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.shape({
        avatarUrl: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired
    }).isRequired,
    variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    visible: PropTypes.bool
};

CtrlViewProfile.defaultProps = {
    variant: DEFAULT_FIELD_VARIANT,
    visible: true
};

export default withStyles(styles)(CtrlViewProfile);
