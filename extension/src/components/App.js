import React from "react";
import { getByXpath } from "../utils/xpath";
import { getPlayers } from "../utils/players";
import draftnik from "../api/draftnik";

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

class App extends React.Component {
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
      saveButton.onclick = this.saveDraft;
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

  saveDraft = () => {
    const squad = getPlayers();
    draftnik
      .post("/save/", { squad })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    console.log("Draftnik");

    var observer = new MutationObserver(() => {
      const transfersButton = getByXpath(
        `//button[contains(text(),'Make Transfers')]`
      );
      if (transfersButton) {
        this.insertSaveButton(transfersButton);
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }

  render() {
    return null;
  }
}

export default App;
