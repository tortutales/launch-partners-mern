// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { Grid as Container } from '@material-ui/core';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlPagination from './pagination';
import { config } from '../../../config';
import { dimensions } from '../../../styles/globals';
import { globalUI } from '../../../core';

import {
    addEventListener,
    getWindowInnerHeight,
    removeEventListener
} from '../../../util';

// @styles
import styles from './styles';

// @constants
export const sortDirection = {
    ASC: 'asc',
    DESC: 'desc'
};

class CtrlTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataState: {},
            windowInnerHeight: null
        };

        this.containerRef = null;
        this.containeroffsetTop = null;

        this.exportToExcel = this.exportToExcel.bind(this);
        this.updateWindowInnerHeight = this.updateWindowInnerHeight.bind(this);
    }

    componentDidMount() {
        this.updateWindowInnerHeight();
        this.containeroffsetTop = this.containerRef.offsetTop;
        addEventListener('resize', this.updateWindowInnerHeight);
        if (this.props.exportName) {
            globalUI.attachExport(this.props.exportName, this.exportToExcel);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    }

    componentWillUnmount() {
        removeEventListener('resize', this.updateWindowInnerHeight);
    }

    get height() {
        return this.props.height ||
            this.state.windowInnerHeight - this.containeroffsetTop -
                dimensions.FOOTER_HEIGHT - (this.props.pageable ? 0 : dimensions.TOP_BAR_HEIGHT);
    }

    get totalRecordCount() {
        return this.props.serverSidePagination
            ? this.props.serverSidePagination.recordCount
            : this.props.data.length;
    }

    updateWindowInnerHeight() {
        this.setState({
            windowInnerHeight: getWindowInnerHeight()
        });
    }

    handleDataStateChange(event) {
        const dataState = event.data;
        const { data } = this.props;

        this.setState({
            data: process(data, dataState),
            dataState
        });
    }

    handleExpandChange(event) {
        event.dataItem[event.target.props.expandField] = event.value;
        this.setState({
            data: Object.assign({}, this.state.data),
            dataState: this.state.dataState
        });
    }

    isColumnGroupable(column) {
        return column.groupable
            ? !((this.state.dataState.group || []).find(group => group.field === column.id))
            : false;
    }

    exportToExcel() {
        this.excelExporter.save(this.props.data, this.grid.columns);
    }

    renderServerSidePagination() {
        const { id, serverSidePagination } = this.props;

        if (serverSidePagination) {
            const {
                onChangePageNumber,
                onChangePageSize,
                pageCount,
                pageNumber,
                pageSize,
                recordCount,
                rowsPerPageOptions
            } = serverSidePagination;

            return (
                <CtrlPagination
                    id={`${id}-server-pagination`}
                    onChangePageNumber={onChangePageNumber}
                    onChangePageSize={onChangePageSize}
                    pageCount={pageCount}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    recordCount={recordCount}
                    rowsPerPageOptions={rowsPerPageOptions}
                />
            );
        }

        return null;
    }

    render() {
        const {
            className,
            classes,
            columns,
            groupable,
            id,
            pageable,
            reorderable,
            resizable,
            serverSideSorting,
            sortable,
            toolbarOptions: {
                exportToExcel
            },
            visible
        } = this.props;

        const {
            onSortChange,
            sortDirection,
            sortKey
        } = serverSideSorting || {};

        const {
            data,
            dataState
        } = this.state;

        if (!visible) {
            return null;
        }

        const tableClass = classNames(
            className,
            classes.table
        );

        return (
            <div
                id={id}
                className={tableClass}
                ref={(element) => { this.containerRef = element; }}
            >
                {exportToExcel &&
                    <Container id={`${id}-toolbar`} justify="flex-end" container>
                        <Container item>
                            <Button
                                color="primary"
                                id={`${id}-btnExcelExport`}
                                onClick={this.exportToExcel}
                            >
                                {config.text.searchOrderPage.exportToExcel}
                            </Button>
                        </Container>
                    </Container>}
                <ExcelExport ref={(exporter) => { this.excelExporter = exporter; }} />
                <Grid
                    data={data}
                    expandField="expanded"
                    groupable={groupable}
                    id={`${id}-grid`}
                    onDataStateChange={event => this.handleDataStateChange(event)}
                    onExpandChange={event => this.handleExpandChange(event)}
                    onSortChange={onSortChange ? event => onSortChange(event) : null}
                    pageable={pageable}
                    ref={(grid) => { this.grid = grid; }}
                    reorderable={reorderable}
                    resizable={resizable}
                    sort={[{ field: sortKey, dir: sortDirection }]}
                    sortable={sortable}
                    style={{ height: this.height }}
                    total={this.totalRecordCount}
                    {...dataState}
                >
                    {
                        columns.map((column) => {
                            const columnProps = {
                                field: column.id,
                                format: column.format,
                                groupable: this.isColumnGroupable(column),
                                key: column.id,
                                sortable: column.sortable,
                                locked: column.locked,
                                title: column.label,
                                width: column.width
                            };

                            if (column.render) {
                                columnProps.cell = props => column.render(props);
                            } else if (column.nowrap) {
                                columnProps.cell = props =>
                                    (
                                        <td style={{ whiteSpace: 'nowrap' }}>
                                            { props.dataItem[column.id] }
                                        </td>
                                    );
                            }

                            return <GridColumn {...columnProps} />;
                        })
                    }
                    {
                        data.length &&
                        <span>{config.text.table.noData}</span>
                    }
                </Grid>
                { this.renderServerSidePagination() }
            </div>
        );
    }
}

CtrlTable.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        format: PropTypes.string,
        groupable: PropTypes.bool,
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        locked: PropTypes.bool,
        render: PropTypes.func,
        sortable: PropTypes.bool,
        width: PropTypes.number
    })).isRequired,
    data: PropTypes.array.isRequired,
    exportName: PropTypes.string,
    groupable: PropTypes.bool,
    height: PropTypes.number,
    id: PropTypes.string.isRequired,
    pageable: PropTypes.bool,
    reorderable: PropTypes.bool,
    resizable: PropTypes.bool,
    serverSidePagination: PropTypes.shape({
        onChangePageNumber: PropTypes.func.isRequired,
        onChangePageSize: PropTypes.func.isRequired,
        pageCount: PropTypes.number.isRequired,
        pageNumber: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        recordCount: PropTypes.number.isRequired,
        rowsPerPageOptions: PropTypes.array.isRequired
    }),
    serverSideSorting: PropTypes.shape({
        onSortChange: PropTypes.func.isRequired,
        sortDirection: PropTypes.string.isRequired,
        sortKey: PropTypes.string.isRequired
    }),
    sortable: PropTypes.bool,
    toolbarOptions: PropTypes.shape({
        exportToExcel: PropTypes.bool
    }),
    visible: PropTypes.bool
};

CtrlTable.defaultProps = {
    className: null,
    exportName: null,
    groupable: false,
    height: null,
    pageable: false,
    reorderable: true,
    resizable: true,
    serverSidePagination: null,
    serverSideSorting: null,
    sortable: false,
    toolbarOptions: {},
    visible: true
};

export default withStyles(styles)(CtrlTable);
