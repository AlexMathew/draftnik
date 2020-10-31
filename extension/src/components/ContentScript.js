import React from "react";
import DraftDialog from "./content/DraftDialog";
import { connect } from "react-redux";
import { getByXpath } from "../utils/xpath";

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

class ContentScript extends React.Component {
  state = {
    modalOpen: false,
    modalState: {
      error: {
        name: "",
      },
    },
  };

  handleOpen = () => {
    this.setState({ modalOpen: true, modalState: { error: { name: "" } } });
  };

  handleClose = () => {
    this.setState({ modalOpen: false, modalState: { error: { name: "" } } });
  };

  setDialogError = (error) => {
    this.setState({ modalState: { error } });
  };

  insertSaveButton = (transfersButton) => {
    const existingSaveDiv = getByXpath(`//div[@class="draftnik"]`);
    if (!existingSaveDiv) {
      const transfersDiv = transfersButton.parentElement;
      const saveDiv = document.createElement("div");
      saveDiv.classList = "draftnik";
      saveDiv.style = "margin-top: 10px";
      const saveButton = document.createElement("button");
      saveButton.disabled = transfersButton.disabled;
      saveButton.classList = transfersButton.classList;
      saveButton.onclick = this.handleOpen;
      const saveText = document.createTextNode("Save Draft");
      saveButton.appendChild(saveText);
      saveDiv.appendChild(saveButton);
      transfersDiv.appendChild(saveDiv);

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName === "disabled") {
            saveButton.disabled = mutation.target.disabled;
            saveButton.classList = mutation.target.classList;
          }
        });
      });
      observer.observe(transfersButton, {
        attributes: true,
      });
    }
  };

  componentDidMount() {
    console.log("Draftnik");

    var observer = new MutationObserver(() => {
      const initialButton = getByXpath(
        `//button[contains(text(),'Enter Squad')]`
      );
      const transfersButton = getByXpath(
        `//button[contains(text(),'Make Transfers')]`
      );
      if (initialButton || transfersButton) {
        this.insertSaveButton(initialButton || transfersButton);
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }

  render() {
    return (
      <DraftDialog
        open={this.state.modalOpen}
        modalState={this.state.modalState}
        handleClose={this.handleClose}
        setDialogError={this.setDialogError}
      />
    );
  }
}

export default connect(null)(ContentScript);
