// @scripts
import globals, { zIndex, dimensions } from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    loginPage: {
        backgroundColor: '#fafafa',
        backgroundSize: 'cover',
        height: '100vh',
        marginLeft: `-${dimensions.MAIN_MENU_WIDTH + 15}px`
    },
    header: {
        position: 'fixed',
        width: '100%',
        zIndex: zIndex.TOP_BAR
    },
    form: {
        left: '50%',
        maxWidth: 400,
        position: 'relative',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    formPaper: {
        padding: 20,
        paddingTop: 90
    },
    formTitle: {
        marginBottom: 20,
        textAlign: 'center'
    },
    formButtons: {
        textAlign: 'right'
    }
}));
