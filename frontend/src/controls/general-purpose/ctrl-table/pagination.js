// @packages
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Select from '@material-ui/core/Select';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { config } from '../../../config';

// @styles
import styles from './styles';

// @constants
const PAGE_SELECTOR_SIZE = 5;

class CtrlPagination extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: props.pageSize
        };
        this.handleChangePageSize = this.handleChangePageSize.bind(this);
    }

    get fromRecord() {
        const { pageNumber, pageSize } = this.props;
        return ((pageNumber - 1) * pageSize) + 1;
    }

    get toRecord() {
        const { pageNumber, pageSize, recordCount } = this.props;
        return Math.min(pageNumber * pageSize, recordCount);
    }

    get pages() {
        return Array.from(new Array(this.props.pageCount), (x, i) => i + 1)
            .slice(this.startPageNumber, this.endPageNumber);
    }

    get startPageNumber() {
        return (Math.ceil(this.props.pageNumber / PAGE_SELECTOR_SIZE) * PAGE_SELECTOR_SIZE) -
            (PAGE_SELECTOR_SIZE - 1) - 1;
    }

    get endPageNumber() {
        return Math.min(Math.ceil(((this.startPageNumber) + PAGE_SELECTOR_SIZE) - 1), this.props.pageCount) + 1;
    }

    handleChangePageSize(event) {
        const pageSize = event.target.value;
        this.setState({ pageSize });
        this.props.onChangePageSize(pageSize);
    }

    renderPageNumberSelector() {
        const {
            classes,
            onChangePageNumber,
            pageNumber
        } = this.props;

        return this.pages.map((page, index) => {
            const isDisabled = page === pageNumber;

            return (
                <Button
                    className={isDisabled ? classes.pageNumberButtonDisabled : classes.pageNumberButton}
                    color="primary"
                    key={index}
                    onClick={() => isDisabled ? null : onChangePageNumber(page)}
                    size="small"
                >
                    {page}
                </Button>
            );
        });
    }

    renderNavigationButtons() {
        const {
            classes,
            id,
            onChangePageNumber,
            pageCount,
            pageNumber
        } = this.props;

        return (
            <div id={`${id}-navigation-buttons`} className={classes.paginationButtons}>
                <Button
                    className={classes.buttonLeft}
                    disabled={pageNumber === 1}
                    id={`${id}-first-page`}
                    onClick={() => onChangePageNumber(1)}
                    size="small"
                >
                    <Icon>skip_previous</Icon>
                </Button>
                <Button
                    className={classes.buttonLeft}
                    disabled={pageNumber === 1}
                    id={`${id}-previous-page`}
                    onClick={() => onChangePageNumber(pageNumber - 1)}
                    size="small"
                >
                    <Icon>arrow_left</Icon>
                </Button>
                    {this.renderPageNumberSelector()}
                <Button
                    className={classes.buttonRight}
                    disabled={pageNumber === pageCount}
                    id={`${id}-next-page`}
                    onClick={() => onChangePageNumber(pageNumber + 1)}
                    size="small"
                >
                    <Icon>arrow_right</Icon>
                </Button>
                <Button
                    className={classes.buttonRight}
                    disabled={pageNumber === pageCount}
                    id={`${id}-last-page`}
                    onClick={() => onChangePageNumber(pageCount)}
                    size="small"
                >
                    <Icon>skip_next</Icon>
                </Button>
            </div>
        );
    }

    render() {
        const {
            className,
            classes,
            id,
            recordCount,
            rowsPerPageOptions,
            visible
        } = this.props;

        const { pageSize } = this.state;

        if (!visible) {
            return null;
        }

        const paginationClass = classNames(
            className,
            classes.pagination
        );

        return (
            <Paper id={id} elevation={0} className={paginationClass}>
                <Grid
                    alignItems="center"
                    container
                    direction="row"
                    justify="space-between"
                >
                    <Grid item>
                        {this.renderNavigationButtons()}
                    </Grid>
                    <Grid item >
                        <Select
                            id={`${id}-select`}
                            className={classes.select}
                            disableUnderline
                            onChange={this.handleChangePageSize}
                            value={pageSize}
                        >
                            {rowsPerPageOptions.map((option, index) =>
                                <MenuItem key={index} value={option}>{option}</MenuItem>)}
                        </Select>
                        <span className={classes.selectItemsPerPage}>{config.text.pagination.itemsPerPage} </span>
                    </Grid>
                    <Grid item className={classes.paginationInfo}>
                        <span>{this.fromRecord}-</span>
                        <span>{this.toRecord} {config.text.pagination.of} </span>
                        <span>{recordCount} </span>
                        <span>{config.text.pagination.items}</span>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

CtrlPagination.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onChangePageNumber: PropTypes.func.isRequired,
    onChangePageSize: PropTypes.func.isRequired,
    pageCount: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    recordCount: PropTypes.number.isRequired,
    rowsPerPageOptions: PropTypes.array.isRequired,
    visible: PropTypes.bool
};

CtrlPagination.defaultProps = {
    className: null,
    visible: true
};

export default withStyles(styles)(CtrlPagination);
