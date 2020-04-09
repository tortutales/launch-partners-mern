import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    masterDataPage: {
    },
    leftButton: {
        margin: theme.spacing(1)
    },
    rightButton: {
        margin: theme.spacing(1),
        marginRight: 0
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    }
}));
