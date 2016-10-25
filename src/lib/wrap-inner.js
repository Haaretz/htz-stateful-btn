/**
 * WRAP INNER
 *
 * Wrap all contents of an element with a new element.
 *
 * @module wrap-inner
 * @license MIT
 */

/**
 * Wrap all contents of an element with a new element.
 *
 * @param {HTMLElement} parent - The element whose content will be wrapped.
 * @param {HTMLElement|String} wrapper - The element to wrap the content of `parent` with.
 * @param {Object} [attrs] - `key`: `value` pairs of attributes to add to the `wrapper` element.
 *
 * @return {HTMLElement[]} The modified parent element, and the wrapper elemnet.
 */
export default function wrapInner(parent, wrapper, attrs) {
  const wrapperElem = typeof wrapper === 'string' ? document.createElement(wrapper) : wrapper;

  for (const attr in attrs) {
    if ({}.hasOwnProperty.call(attrs, attr)) {
      wrapperElem.setAttribute(attr, attrs[attr]);
    }
  }

  parent.appendChild(wrapperElem);

  while (parent.firstChild !== wrapperElem) {
    wrapperElem.appendChild(parent.firstChild);
  }

  return [parent, wrapperElem];
}
