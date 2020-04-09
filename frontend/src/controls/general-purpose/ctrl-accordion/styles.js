import globals from '../../../styles/globals';

export default theme => (Object.assign({}, globals(theme), {
    accordion: {
        width: '100%'
    },
    accordionTitle: {
        flexShrink: 0,
        fontSize: theme.typography.pxToRem(15)
    },
    accordionContent: {
        padding: '0 24px 24px 24px'
    }
}));
