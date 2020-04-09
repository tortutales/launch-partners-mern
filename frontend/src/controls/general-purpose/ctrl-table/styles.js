import globals from '../../../styles/globals';

// @constants
const lightGrey = '#f6f6f6';
const lightGreyHover = '#ededed';
const orange = '#ff6358';
const white = '#fafafa';

export default theme => (Object.assign({}, globals(theme), {
    table: {
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: '100%'
    },
    pagination: {
        backgroundColor: lightGrey,
        border: '0.8px solid #dadada',
        borderTop: 0,
        fontSize: '14px',
        height: 47,
        padding: 8,
        width: '100%'
    },
    select: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '14px',
        fontWeight: 900,
        lineHeight: '1.375em'
    },
    selectItemsPerPage: {
        color: '#656565'
    },
    paginationInfo: {
        color: '#656565',
        fontSize: '14px',
        marginRight: 10
    },
    buttonLeft: {
        '&:disabled': {
            backgroundColor: lightGrey
        },
        '&:hover': {
            backgroundColor: lightGreyHover,
            color: orange
        },
        color: '#656565',
        fontSize: '11px',
        height: 30,
        minWidth: 30,
        width: 30
    },
    buttonRight: {
        '&:disabled': {
            backgroundColor: lightGrey
        },
        '&:hover': {
            backgroundColor: lightGreyHover,
            color: orange
        },
        color: '#656565',
        fontSize: '11px',
        height: 30,
        minWidth: 30,
        width: 30
    },
    pageNumberButtonDisabled: {
        '&:hover': {
            backgroundColor: lightGreyHover,
            color: orange
        },
        backgroundColor: orange,
        borderRadius: 0,
        color: white,
        height: 30,
        minWidth: 30,
        width: 30
    },
    pageNumberButton: {
        '&:disabled': {
            backgroundColor: orange,
            color: white
        },
        '&:hover': {
            backgroundColor: lightGreyHover,
            color: orange
        },
        backgroundColor: lightGrey,
        borderRadius: 0,
        color: orange,
        height: 30,
        minWidth: 30,
        width: 30
    },
    paginationButtons: {
    }
}));
