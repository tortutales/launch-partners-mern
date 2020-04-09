// @packages
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Grid, Button, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlEditMasterData from './edit-master-data';
import CtrlTreeView from '../../controls/general-purpose/ctrl-tree-view';
import { config } from '../../config';
import { format, getMasterDataParents } from '../../util';
import { globalUI } from '../../core';

// @styles
import styles from './styles';

class MasterDataPage extends PureComponent {
    constructor(props) {
        super(props);

        this.handleOnExpandedAll = this.handleOnExpandedAll.bind(this);
        this.handleOnCollapseAll = this.handleOnCollapseAll.bind(this);
        this.handleOnInsert = this.handleOnInsert.bind(this);
        this.handleOnUpdate = this.handleOnUpdate.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
    }

    componentDidMount() {
        this.props.onGetAllMasterData();
    }

    handleOnExpandedAll() {
        const { masterData, onExpandMasterDataItems } = this.props;
        const parents = getMasterDataParents(masterData);
        onExpandMasterDataItems(parents);
    }

    handleOnCollapseAll() {
        this.props.onCollapseMasterDataItems();
    }

    handleOnInsert(parent) {
        const onConfirm = payload =>
            this.props.onInsert(payload).then(() =>
                this.props.onExpandMasterDataItems(parent.masterDataId));

        const content = (
            <CtrlEditMasterData
                id="master-data-page-insert-popup"
                onConfirm={onConfirm}
                parent={parent}
            />
        );

        globalUI.showModalDialog({
            msg: content,
            okLabel: config.text.common.save,
            title: `${config.text.common.new} '${parent.description}'`,
            width: 400
        });
    }

    handleOnUpdate(item) {
        const onConfirm = payload =>
            this.props.onUpdate(payload).then(() =>
                this.props.onExpandMasterDataItems(item.masterDataId));

        const content = (
            <CtrlEditMasterData
                id="master-data-page-update-popup"
                item={item}
                onConfirm={onConfirm}
            />
        );

        globalUI.showModalDialog({
            msg: content,
            okLabel: config.text.common.save,
            title: config.text.common.edit,
            width: 400
        });
    }

    handleOnDelete(item) {
        globalUI.showModalDialog({
            msg: format(config.text.common.confirmDelete, item.description),
            onConfirm: () => this.props.onDelete(item.masterDataId)
        });
    }

    render() {
        const {
            classes,
            expandedItems,
            masterData,
            onCollapseMasterDataItems,
            onExpandMasterDataItems
        } = this.props;

        const itemActions = [
            {
                icon: 'add',
                onClick: this.handleOnInsert,
                tooltip: config.text.common.new
            },
            {
                icon: 'edit',
                onClick: this.handleOnUpdate,
                tooltip: config.text.common.edit
            },
            {
                icon: 'delete',
                onClick: this.handleOnDelete,
                tooltip: config.text.common.delete
            }
        ];

        const renderItem = (item, level) => (
            level > 1
                ? <Grid container style={{ padding: 12 }}>
                    <Grid item>{item.id}</Grid>
                    <Grid item style={{ paddingLeft: 5 }}>{item.code}</Grid>
                    <Grid item style={{ paddingLeft: 5 }}>{item.description}</Grid>
                  </Grid>
                : <Grid container style={{ padding: 12 }}>
                    <Grid item>{item.description}</Grid>
                  </Grid>
        );

        return (
            <div id="master-data-page" className={classes.masterDataPage}>
                <Grid container alignContent="flex-end" justify="flex-end">
                    <Grid item>
                        <Button
                            className={classes.leftButton}
                            color="primary"
                            id="master-data-page-expand-button"
                            onClick={this.handleOnExpandedAll}
                            variant="contained"
                        >
                            <Icon className={classes.leftIcon}>
                                add
                            </Icon>
                            {config.text.masterDataPage.expandAll}
                        </Button>
                        <Button
                            className={classes.rightButton}
                            color="primary"
                            id="master-data-page-collapse-button"
                            onClick={this.handleOnCollapseAll}
                            variant="contained"
                        >
                            <Icon className={classes.leftIcon}>
                                remove
                            </Icon>
                            {config.text.masterDataPage.collapseAll}
                        </Button>
                    </Grid>
                </Grid>
                <CtrlTreeView
                    actions={itemActions}
                    collapseLabel={config.text.common.collapse}
                    expandLabel={config.text.common.expand}
                    expandedItems={expandedItems}
                    id="master-data-page-tree-view"
                    itemValProp="masterDataId"
                    items={masterData}
                    onCollapseItem={onCollapseMasterDataItems}
                    onExpandItem={onExpandMasterDataItems}
                    renderItem={renderItem}
                />
            </div>
        );
    }
}

MasterDataPage.propTypes = {
    classes: PropTypes.object.isRequired,
    expandedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
    masterData: PropTypes.array.isRequired,
    onCollapseMasterDataItems: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onExpandMasterDataItems: PropTypes.func.isRequired,
    onGetAllMasterData: PropTypes.func.isRequired,
    onInsert: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default withStyles(styles)(MasterDataPage);
