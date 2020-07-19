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
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.attributeName === "disabled") {
      console.log("Transfers button is", mutation.target.disabled);
    }
  });
});
observer.observe(transfersButton, {
  attributes: true, //configure it to listen to attribute changes
});

const allPictures = document.getElementsByTagName("picture");
const pictures = [...allPictures].slice(0, 15);
console.log(pictures);
pictures.forEach((picture) => {
  console.log(picture.nextSibling.firstChild.textContent);
  console.log(picture.getElementsByTagName("img")[0].src);
});
