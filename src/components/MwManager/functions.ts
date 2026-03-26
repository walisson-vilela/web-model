export const getElementByXPath = (path: string, root: Node): Node | null => {
  return document.evaluate(
    path,
    root,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue
}

export const isObject = <T = unknown>(value: unknown): value is T => {
  return Object.prototype.toString.call(value) === '[object Object]'
}
