// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlLogFilter from './filter';
import CtrlTable, { sortDirection } from '../../controls/general-purpose/ctrl-table';
import { columns } from './columns';

// @styles
import styles from './styles';

class LogViewerPage extends PureComponent {
    constructor(props) {
        super(props);
        this.handleChangePageNumber = this.handleChangePageNumber.bind(this);
        this.handleChangePageSize = this.handleChangePageSize.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    componentDidMount() {
        this.props.onSearchLogEntries(this.props.logFilter);
    }

    get data() {
        const { logResults: { items } } = this.props;

        const data = items.map(item => Object.assign({}, item, {
            date: new Date(item.date)
        }));

        return data;
    }

    handleChangePageNumber(pageNumber) {
        const { logFilter } = this.props;
        this.props.onSearchLogEntries(Object.assign({}, logFilter, {
            pageNumber
        }));
    }

    handleChangePageSize(pageSize) {
        const { logFilter } = this.props;
        this.props.onSearchLogEntries(Object.assign({}, logFilter, {
            pageNumber: 1,
            pageSize
        }));
    }

    handleSortChange(event) {
        const { sort } = event;
        const { logFilter } = this.props;
        let finalSortDirection;
        let finalSortKey;

        if (sort.length) {
            finalSortDirection = sort[0].dir;
            finalSortKey = sort[0].field;
        } else {
            const isAsc = logFilter.sortDirection === sortDirection.ASC;
            finalSortDirection = isAsc ? sortDirection.DESC : sortDirection.ASC;
            finalSortKey = logFilter.sortKey;
        }

        this.props.onSearchLogEntries(Object.assign({}, logFilter, {
            sortDirection: finalSortDirection,
            sortKey: finalSortKey
        }));
    }

    render() {
        const {
            logFilter,
            classes,
            onChangeLogFilter,
            onSearchLogEntries,
            logResults
        } = this.props;

        return (
            <div id="log-viewer-page" className={classes.logViewerPage}>
                <CtrlLogFilter
                    logFilter={logFilter}
                    id="log-viewer-page-filter"
                    onChangeLogFilter={onChangeLogFilter}
                    onSearchLogEntries={onSearchLogEntries}
                />
                <CtrlTable
                    columns={columns}
                    data={this.data}
                    exportName="log"
                    groupable
                    id="log-viewer-page-filter"
                    serverSidePagination={{
                        onChangePageNumber: this.handleChangePageNumber,
                        onChangePageSize: this.handleChangePageSize,
                        pageCount: logResults.pageCount > 0 ? logResults.pageCount : 0,
                        pageNumber: logFilter.pageNumber,
                        pageSize: logFilter.pageSize,
                        recordCount: logResults.recordCount,
                        rowsPerPageOptions: [5, 10, 15, 25, 50, 100]
                    }}
                    serverSideSorting={{
                        onSortChange: this.handleSortChange,
                        sortDirection: logFilter.sortDirection,
                        sortKey: logFilter.sortKey
                    }}
                />
            </div>
        );
    }
}

LogViewerPage.propTypes = {
    classes: PropTypes.object.isRequired,
    logFilter: PropTypes.shape({
        date: PropTypes.instanceOf(Date),
        endHour: PropTypes.number.isRequired,
        keyword: PropTypes.string,
        level: PropTypes.string,
        pageNumber: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        sortDirection: PropTypes.string,
        sortKey: PropTypes.string,
        startHour: PropTypes.number.isRequired
    }).isRequired,
    onChangeLogFilter: PropTypes.func.isRequired,
    onSearchLogEntries: PropTypes.func.isRequired,
    logResults: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            correlationId: PropTypes.string,
            date: PropTypes.string.isRequired,
            details: PropTypes.string,
            level: PropTypes.string.isRequired,
            message: PropTypes.string
        })),
        recordCount: PropTypes.number.isRequired
    }).isRequired
};

export default withStyles(styles)(LogViewerPage);
