// @packages
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

// @scripts
import CtrlLogDetails from './log-details';
import { config } from '../../config';
import { globalUI } from '../../core';
import { getLevelStyle } from './styles';

export const columns = [{
    format: '{0:G}',
    groupable: true,
    id: 'date',
    label: config.text.logViewer.logTable.date,
    width: 175
}, {
    groupable: true,
    id: 'level',
    label: config.text.logViewer.logTable.level,
    render: cell => <td style={getLevelStyle(cell.dataItem.level)}>{cell.dataItem.level}</td>,
    width: 80
}, {
    groupable: false,
    id: 'message',
    label: config.text.logViewer.logTable.message,
    nowrap: true,
    width: 200
}, {
    groupable: false,
    id: 'details',
    label: config.text.logViewer.logTable.details,
    nowrap: true,
    width: 400
}, {
    groupable: false,
    id: 'correlationId',
    label: config.text.logViewer.logTable.correlationId,
    width: 300
}, {
    groupable: false,
    id: 'options',
    label: config.text.common.options,
    render: (cell) => {
        if (cell.rowType === 'groupHeader') {
            return null;
        }

        const content = <CtrlLogDetails {...cell.dataItem} />;

        const handleOnClick = () => {
            globalUI.showModalDialog({
                cancelLabel: config.text.common.close,
                msg: content,
                title: config.text.logDetails.title
            });
        };

        return (
            <td style={{ padding: 0, textAlign: 'center' }}>
                <Tooltip title={config.text.common.view}>
                    <IconButton
                        color="primary"
                        id="view-details"
                        onClick={handleOnClick}
                    >
                        <Icon>visibility</Icon>
                    </IconButton>
                </Tooltip>
            </td>
        );
    },
    sortable: false,
    width: 80
}];
