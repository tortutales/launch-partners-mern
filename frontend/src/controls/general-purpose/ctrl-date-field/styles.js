import grey from '@material-ui/core/colors/grey';
import globals from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    dateField: {
        marginBottom: 10
    },
    disabledButton: {
        marginRight: 0,
        color: grey[500]
    }
}));
