import React, { forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TermsModal = ({ open, handleClose, handleTerms }) => (
  <div>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="terms-title"
      aria-describedby="terms-description"
    >
      <DialogTitle id="terms-title">Terms and Conditions</DialogTitle>
      <DialogContent>
        <DialogContentText id="terms-description">
          Terms and Conditions agreements act as a legal contract between you
          (the company) who has the website or mobile app and the user who
          access your website and mobile app. Having a Terms and Conditions
          agreement is completely optional. No laws require you to have one. Not
          even the super-strict and wide-reaching General Data Protection
          Regulation (GDPR).
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleTerms(false)} color="primary">
          Disagree
        </Button>
        <Button onClick={() => handleTerms(true)} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

TermsModal.defaultProps = {
  open: false
};

export default TermsModal;
