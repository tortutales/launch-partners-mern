import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    rolesPage: {
    },
    addButton: {
        marginRight: theme.spacing(1)
    }
}));
