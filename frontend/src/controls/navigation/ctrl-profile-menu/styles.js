import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import globals, { zIndex } from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    profileMenu: {
        zIndex: zIndex.PROFILE_MENU
    },
    menuPaper: {
        minWidth: 300
    },
    userInfoCard: {
        marginBottom: 10,
        minWidth: 250,
        padding: 10,
        textAlign: 'right'
    },
    userInfoAvatar: {
        backgroundColor: deepOrange[500]
    },
    userInfoName: {
        color: grey[800],
        fontWeight: 500
    },
    userInfoEmail: {
        color: grey[600]
    }
}));
