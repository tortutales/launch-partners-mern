// @packages
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

// @scripts
import globals from '../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    logViewerPage: {},
    logFilter: {},
    cell: {
        paddingLeft: 10,
        paddingRight: 10
    },
    searchButton: {
        textAlign: 'center'
    },
    subTitle: {
        fontWeight: 500
    },
    logDetails: {},
    levelDebug: {
        backgroundColor: grey[50],
        padding: 2,
        textAlign: 'center',
        width: 100
    },
    levelError: {
        backgroundColor: red[300],
        color: grey[50],
        padding: 2,
        textAlign: 'center',
        width: 100
    },
    levelInfo: {
        backgroundColor: blue[300],
        color: grey[50],
        padding: 2,
        textAlign: 'center',
        width: 100
    },
    levelWarning: {
        backgroundColor: orange[300],
        color: grey[50],
        padding: 2,
        textAlign: 'center',
        width: 100
    },
    buttonWidth: {
        width: '95%'
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    }
}));

export const getLevelStyle = (level) => {
    let levelStyle = {
        borderBottom: `1px solid ${grey[200]}`
    };

    switch (level) {
        case 'Error':
            levelStyle = Object.assign({}, levelStyle, {
                backgroundColor: red[300],
                color: grey[50]
            });
            break;
        case 'Info':
            levelStyle = Object.assign({}, levelStyle, {
                backgroundColor: blue[300],
                color: grey[50]
            });
            break;
        case 'Warning':
            levelStyle = Object.assign({}, levelStyle, {
                backgroundColor: orange[300],
                color: grey[50]
            });
            break;
        default:
        case 'Debug':
            levelStyle = Object.assign({}, levelStyle, {
                backgroundColor: grey[50]
            });
            break;
    }

    return levelStyle;
};
