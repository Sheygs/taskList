const createElement = (HTMLElement) => document.createElement(HTMLElement);
const setClassName = (HTMLElement, className) => (HTMLElement.className = className);
const createTextNode = (text) => document.createTextNode(text);
const appendChild = (HTMLElement, child) => HTMLElement.appendChild(child);
const setAttribute = (HTMLElement, attrName, attrValue) =>
  HTMLElement.setAttribute(attrName, attrValue);
const innerHTML = (HTMLElement, string) => (HTMLElement.innerHTML = string);

const clearTaskInLocalStorage = () => localStorage.clear();

export {
  createElement,
  setClassName,
  createTextNode,
  appendChild,
  setAttribute,
  innerHTML,
  clearTaskInLocalStorage,
};
