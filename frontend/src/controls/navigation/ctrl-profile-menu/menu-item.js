// @packages
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class CtrlMenuItem extends PureComponent {
    render() {
        const {
            icon,
            id,
            onClick,
            permission,
            selected,
            text,
            userPermissions
        } = this.props;

        const isVisible =
            !permission ||
            userPermissions.includes(permission);

        return (isVisible &&
            <MenuItem id={id} selected={selected} onClick={onClick}>
                <ListItemIcon>
                    <Icon id={`${id}-icon`}>{icon}</Icon>
                </ListItemIcon>
                <ListItemText id={`${id}-label`} inset primary={text} />
            </MenuItem>
        );
    }
}

CtrlMenuItem.propTypes = {
    icon: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    permission: PropTypes.string,
    selected: PropTypes.bool,
    text: PropTypes.string.isRequired,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired
};

CtrlMenuItem.defaultProps = {
    permission: null,
    selected: false
};

export default CtrlMenuItem;
