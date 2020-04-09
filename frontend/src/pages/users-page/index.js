// @packages
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlTable from '../../controls/general-purpose/ctrl-table';
import { getColumns } from './columns';

// @styles
import styles from './styles';

class UsersPage extends PureComponent {
    componentDidMount() {
        this.props.onGetAllUsers();
    }

    render() {
        const {
            classes,
            onHideModal,
            users
        } = this.props;

        const userColumns = getColumns({
            classes,
            onHideModal
        });

        return (
            <Grid
                className={classes.usersPage}
                container
                id="users-page"
            >
                <Grid item xs={10} />
                <Grid item xs={12}>
                    <CtrlTable
                        columns={userColumns}
                        data={users}
                        id="users-page-table"
                        pageable
                        sortable
                    />
                </Grid>
            </Grid>
        );
    }
}

UsersPage.propTypes = {
    classes: PropTypes.object.isRequired,
    onGetAllUsers: PropTypes.func.isRequired,
    onHideModal: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        avatarUrl: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired
    })).isRequired
};

export default withStyles(styles)(UsersPage);
