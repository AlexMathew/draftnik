export function getByXpath(path, multiple = false) {
  const nodes = document.evaluate(
    path,
    document,
    null,
    multiple
      ? XPathResult.ORDERED_NODE_ITERATOR_TYPE
      : XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );

  return multiple ? nodes : nodes.singleNodeValue;
}
