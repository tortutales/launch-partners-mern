// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import LogViewerPage from '../pages/log-viewer-page';
import { changeLogFilter, searchLogEntries } from '../actions';

const LogViewerPageContainer = ({
    logFilter,
    logResults,
    onChangeLogFilter,
    onSearchLogEntries
}) =>
    (
        <LogViewerPage
            logFilter={logFilter}
            logResults={logResults}
            onChangeLogFilter={onChangeLogFilter}
            onSearchLogEntries={onSearchLogEntries}
        />
    );

LogViewerPageContainer.propTypes = {
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

const mapStateToProps = ({ logViewer }) => ({
    logFilter: logViewer.filter,
    logResults: logViewer.results
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onChangeLogFilter: changeLogFilter,
    onSearchLogEntries: searchLogEntries
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(LogViewerPageContainer);
