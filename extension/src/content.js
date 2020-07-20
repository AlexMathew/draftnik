import { getElementByXpath } from "./utils/xpath";

console.log("Draftnik.");

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations) {
  const transfersButton = getElementByXpath(
    `//button[contains(text(),'Make Transfers')]`
  );
  if (transfersButton) {
    insertSaveButton(transfersButton);
  }
});
observer.observe(document, {
  childList: true,
  subtree: true,
});

function insertSaveButton(transfersButton) {
  const existingSaveDiv = getElementByXpath(`//div[@class="draftnik"]`);
  if (!existingSaveDiv) {
    const transfersDiv = transfersButton.parentElement;
    const saveDiv = document.createElement("div");
    saveDiv.classList = "draftnik";
    saveDiv.style = "margin-top: 10px";
    const saveButton = document.createElement("button");
    saveButton.classList = transfersButton.classList;
    const saveText = document.createTextNode("Save Draft");
    saveButton.appendChild(saveText);
    saveDiv.appendChild(saveButton);
    transfersDiv.appendChild(saveDiv);

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "disabled") {
          console.log("Transfers button is", !mutation.target.disabled);
          saveButton.classList = mutation.target.classList;
        }
      });
    });
    observer.observe(transfersButton, {
      attributes: true,
    });
  }
}
