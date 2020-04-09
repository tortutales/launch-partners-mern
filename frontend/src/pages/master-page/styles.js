import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    masterPage: {
    },
    loggedInPage: {
        marginLeft: 265,
        marginRight: 15,
        marginTop: 80
    }
}));
