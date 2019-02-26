import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './userAckConfirmation.css';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
    success : {
        backgroundColor: '#43a047',
        color : 'white'
    },    
    warning : {
        backgroundColor: '#ffa000',
        color : 'white'
    },    
    error : {
        backgroundColor: '#d32f2f',
        color : 'white'
    }
});

class UserAcknowledgeSnack extends Component {
    render() {
        let { classes } = this.props;
        let messageInfo = this.props.snackGetMessageInfo;
        return (
            <Snackbar
                key={messageInfo.key}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.snackShow}
                autoHideDuration={5000}
                onClose={this.props.snackCloseHandler}
                onExited={this.props.snackExitHandler}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
            >
                <SnackbarContent
                    classes={{
                        root: classes[messageInfo.variant],
                    }}
                    message={<span id="message-id" >{messageInfo.message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            onClick={this.props.snackCloseHandler}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        );
    }

}

UserAcknowledgeSnack.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAcknowledgeSnack);