// @packages
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

// @constants
const COLLAPSED_TITLE_COLOR = 'default';
const EXPANDED_TITLE_COLOR = 'primary';

const CtrlAccordionItem = ({
    children,
    classes,
    expandedValues,
    id,
    onCollapse,
    onExpand,
    title,
    value
}) => {
    const isExpanded = expandedValues.find(
        expandedValue => expandedValue === value
    ) !== undefined;

    const titleColor = isExpanded
        ? EXPANDED_TITLE_COLOR
        : COLLAPSED_TITLE_COLOR;

    const onChange = (_evt, expanded) => {
        if (expanded) {
            onExpand(value);
        } else {
            onCollapse(value);
        }
    };

    return (
        <ExpansionPanel
            expanded={isExpanded}
            id={id}
            onChange={onChange}
        >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon id={`${id}-expander`} />}>
                <Typography
                    className={classes.accordionTitle}
                    color={titleColor}
                    id={`${id}-title`}
                >
                    {title}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                className={classes.accordionContent}
                id={`${id}-content`}
            >
                {children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

CtrlAccordionItem.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    expandedValues: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    onCollapse: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
};

export default withStyles(styles)(CtrlAccordionItem);
