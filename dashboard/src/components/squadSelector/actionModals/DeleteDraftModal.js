import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import WarningIcon from "@material-ui/icons/Warning";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { deleteDraft, closeDeleteModal } from "../../../actions";

const styles = (theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
  },
  titleText: {
    fontSize: "large",
    fontWeight: "bold",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
});

class DeleteDraftModal extends React.Component {
  render() {
    const { classes, deleteState, closeDeleteModal, deleteDraft } = this.props;
    const draft = deleteState.draft;

    return (
      <Dialog
        open={deleteState.modalOpen}
        onClose={closeDeleteModal}
        fullWidth
        maxWidth="sm"
        aria-labelledby="delete-draft-dialog"
      >
        <DialogTitle
          disableTypography
          id="delete-draft-title"
          className={classes.title}
          classes={{
            root: classes.titleText,
          }}
        >
          <Avatar className={classes.avatar}>
            <WarningIcon fontSize="small" />
          </Avatar>
          Delete "{draft.name}"?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this draft?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteModal} color="primary" autoFocus>
            No
          </Button>
          <Button
            onClick={() => {
              deleteDraft(draft);
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteDraftModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    deleteState: state.loading.delete,
  };
};

const wrappedDeleteDraftModal = connect(mapStateToProps, {
  deleteDraft,
  closeDeleteModal,
})(DeleteDraftModal);
export default withStyles(styles)(wrappedDeleteDraftModal);
