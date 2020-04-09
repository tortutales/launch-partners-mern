import globals, { dimensions } from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    mainMenu: {
    },
    menuPaper: {
        backgroundSize: 'cover',
        marginTop: 65,
        transition: theme.transitions.create(['margin', 'width'], {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.easeOut
        }),
        width: dimensions.MAIN_MENU_WIDTH
    },
    menuPaperCollapsed: {
        backgroundSize: 'cover',
        marginTop: 65,
        transition: theme.transitions.create(['margin', 'width'], {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp
        }),
        width: dimensions.MAIN_MENU_COLLAPSED_WIDTH
    },
    menuItem: {
        height: 35
    },
    menuIcon: {
        marginLeft: 8
    },
    submenuItem: {
        height: 35,
        paddingLeft: theme.spacing(4)
    }
}));
