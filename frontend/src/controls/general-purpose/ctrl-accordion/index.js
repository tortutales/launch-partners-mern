// @packages
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlAccordionItem from './accordion-item';

// @styles
import styles from './styles';

const CtrlAccordion = ({
    className,
    classes,
    expandedValues,
    id,
    itemDesProp,
    itemValProp,
    items,
    onCollapse,
    onExpand,
    renderContent,
    visible
}) => {
    if (!visible) {
        return null;
    }

    const accordionClass = classNames(
        className,
        classes.accordion
    );

    return (
        <div id={id} className={accordionClass}>
            {
                items.map((accordionItem, index) => (
                    <CtrlAccordionItem
                        expandedValues={expandedValues}
                        id={`${id}-accordionitem-${index}`}
                        key={index}
                        onCollapse={onCollapse}
                        onExpand={onExpand}
                        title={accordionItem[itemDesProp]}
                        value={accordionItem[itemValProp]}
                    >
                        {renderContent(accordionItem)}
                    </CtrlAccordionItem>
                ))
            }
        </div>
    );
};

CtrlAccordion.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    expandedValues: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    itemDesProp: PropTypes.string,
    itemValProp: PropTypes.string,
    items: PropTypes.array.isRequired,
    onCollapse: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
    renderContent: PropTypes.func.isRequired,
    visible: PropTypes.bool
};

CtrlAccordion.defaultProps = {
    className: null,
    itemDesProp: 'description',
    itemValProp: 'id',
    visible: true
};

export default withStyles(styles)(CtrlAccordion);
