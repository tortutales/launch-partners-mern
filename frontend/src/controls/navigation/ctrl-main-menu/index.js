// @packages
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlMenuItem from './menu-item';
import { config } from '../../../config';

// @styles
import styles from './styles';

const CtrlMainMenu = ({
    className,
    classes,
    currentUrl,
    expandedItems,
    id,
    isExpanded,
    onCollapseItem,
    onExpandItem,
    userPermissions,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const mainMenuClass = classNames(
        className,
        classes.mainMenu
    );

    const paperClass = isExpanded
        ? classes.menuPaper
        : classes.menuPaperCollapsed;

    return (
        <Collapse id={`${id}-menu-collapser`} in timeout="auto">
            <Drawer
                className={mainMenuClass}
                classes={{ paper: paperClass }}
                id={id}
                open
                variant="persistent"
            >
                {
                    config.mainMenu.map((menuItem, index) => (
                        <CtrlMenuItem
                            currentUrl={currentUrl}
                            icon={menuItem.icon}
                            id={`${id}-${menuItem.name.toLowerCase()}-menuitem`}
                            isExpanded={expandedItems.includes(menuItem.name)}
                            key={index}
                            label={menuItem.description}
                            name={menuItem.name}
                            onCollapseItem={onCollapseItem}
                            onExpandItem={onExpandItem}
                            permission={menuItem.permission}
                            submenuItems={menuItem.submenuItems}
                            url={menuItem.url}
                            userPermissions={userPermissions}
                        />
                    ))
                }
            </Drawer>
        </Collapse>
    );
};

CtrlMainMenu.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    currentUrl: PropTypes.string,
    expandedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onCollapseItem: PropTypes.func.isRequired,
    onExpandItem: PropTypes.func.isRequired,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    visible: PropTypes.bool
};

CtrlMainMenu.defaultProps = {
    className: null,
    currentUrl: null,
    visible: true
};

export default withStyles(styles)(CtrlMainMenu);
