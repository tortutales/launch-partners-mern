// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// @scripts
import MasterDataPage from '../pages/master-data-page';

import {
    collapseMasterDataItems,
    deleteMasterData,
    expandMasterDataItems,
    getAllMasterData,
    insertMasterData,
    updateMasterData
} from '../actions';

const MasterDataPageContainer = ({
    expandedItems,
    masterData,
    onCollapseMasterDataItems,
    onDelete,
    onExpandMasterDataItems,
    onGetAllMasterData,
    onInsert,
    onUpdate
}) =>
    (
        <MasterDataPage
            expandedItems={expandedItems}
            masterData={masterData}
            onCollapseMasterDataItems={onCollapseMasterDataItems}
            onDelete={onDelete}
            onExpandMasterDataItems={onExpandMasterDataItems}
            onGetAllMasterData={onGetAllMasterData}
            onInsert={onInsert}
            onUpdate={onUpdate}
        />
    );

MasterDataPageContainer.propTypes = {
    expandedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
    masterData: PropTypes.array.isRequired,
    onCollapseMasterDataItems: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onExpandMasterDataItems: PropTypes.func.isRequired,
    onGetAllMasterData: PropTypes.func.isRequired,
    onInsert: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

const mapStateToProps = ({
    masterData
}) => ({
    expandedItems: masterData.expandedItems,
    masterData: masterData.items
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onCollapseMasterDataItems: collapseMasterDataItems,
    onDelete: deleteMasterData,
    onExpandMasterDataItems: expandMasterDataItems,
    onGetAllMasterData: getAllMasterData,
    onInsert: insertMasterData,
    onUpdate: updateMasterData
}, dispatch);

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MasterDataPageContainer);
