function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

const transfersButton = getElementByXpath(
  `//button[contains(text(),'Make Transfers')]`
);
const transfersDiv = transfersButton.parentElement;

const saveDiv = document.createElement("div");
saveDiv.style = "margin-top: 10px";
const saveButton = document.createElement("button");
saveButton.classList = transfersButton.classList;
saveButton.style = "background: blue";
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

const allPictures = document.getElementsByTagName("picture");
const pictures = [...allPictures].slice(0, 15);
console.log(pictures);
pictures.forEach((picture) => {
  console.log(picture.nextSibling.firstChild.textContent);
  console.log(picture.getElementsByTagName("img")[0].src);
});

function getElementsByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.ORDERED_NODE_ITERATOR_TYPE,
    null
  );
}

const squadPicturesXpath = `//div[contains(@class, 'Pitch-')]//picture`;
const pictures = getElementsByXpath(squadPicturesXpath);
try {
  let picture = pictures.iterateNext();
  while (picture) {
    console.log(picture);
    picture = pictures.iterateNext();
  }
} catch (e) {
  console.log(e);
}
