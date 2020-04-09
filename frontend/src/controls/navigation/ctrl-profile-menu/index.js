// @packages
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlMenuItem from './menu-item';
import CtrlUserInfo from './user-info';
import { config } from '../../../config';
import { globalUI } from '../../../core';

// @styles
import styles from './styles';

const CtrlProfileMenu = ({
    className,
    classes,
    id,
    onClose,
    target,
    userEmail,
    userName,
    userPermissions
}) => {
    const profileMenuClass = classNames(
        className,
        classes.profileMenu
    );

    const handleMenuItemOnClick = (menu) => {
        onClose();
        globalUI.navigateToUrl(menu.url);
    };

    return (
        <Menu
            anchorEl={target}
            className={profileMenuClass}
            classes={{ paper: classes.menuPaper }}
            id={id}
            onClose={onClose}
            open={Boolean(target)}
        >
            <CtrlUserInfo
                id={`${id}-user-info`}
                userEmail={userEmail}
                userName={userName}
            />
            {
                config.profileMenu.map((menuItem, index) =>
                    (
                        <CtrlMenuItem
                            icon={menuItem.icon}
                            id={`${id}-${menuItem.name.toLowerCase()}-menuitem`}
                            key={index}
                            onClick={() => { handleMenuItemOnClick(menuItem); }}
                            permission={menuItem.permission}
                            selected={menuItem.isDefault}
                            text={menuItem.description}
                            userPermissions={userPermissions}
                        />
                    ))
            }
        </Menu>
    );
};

CtrlProfileMenu.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    target: PropTypes.object,
    userEmail: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired
};

CtrlProfileMenu.defaultProps = {
    className: null,
    target: null
};

export default withStyles(styles)(CtrlProfileMenu);
