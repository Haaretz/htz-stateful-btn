/**
 *  HTZ STATEFUL BTN
 *
 * Manage buttons with state
 *
 * @module htz-stateful-btn
 * @license MIT
 */

import dispatchEvent from 'htz-dispatch-event';
import wrapInner from './lib/wrap-inner';

const allInstances = [];

/**
 * Manage buttons with state.
 * Wrap the content of a button with a `span` element.
 *
 * @param {HTMLElement} btn - The button to manage.
 * @param {String} [inStateText] - Text used as a label for accessibility purposes. Can also
 *     be alternatively provided by means of a `data-in-state-text` attribute on the `btn`
 *     element. If provided both in the html and as an argument
 *     to the function, the js argument takes precedence.
 * @param {String} [inStateClass] - Class(es) to add when enabling state. Can also be alternatively
 *     provided by means of a `data-in-state-class` attribute on the `btn` element.
 *     If provided both in the html and as an argument to the function, the js
 *     argument takes precedence.
 *
 * @return {module:htz-stateful-btn#API} - Instance methods and properties.
 */
export default function statefulBtn(btn, inStateText, inStateClass) {
  // State
  let isInState = false;
  let isInit = false;

  // Props
  let a11yText;
  let inStateClassName;

  // Elements
  let wrapper;


  // Initialization
  init();

  // ----- Methods ----- //
  /**
   * Initialize or reinitialize an instance
   *
   * @callback module:htz-stateful-btn~init
   */
  function init() {
    if (isInit) {
      destroy();
    }

    // Store only the returned wrapper
    [, wrapper] = wrapInner(btn, 'span');


    a11yText = inStateText || btn.getAttribute('data-in-state-text');
    inStateClassName = inStateClass || btn.getAttribute('data-in-state-class');

    // Help assitive tech announce changes
    btn.setAttribute('aria-live', 'polite');

    isInit = true;
  }

  /**
   * Destroy an instance
   *
   * @callback module:htz-stateful-btn~destroy
   */
  function destroy() {
    if (isInit) {
      btn.removeAttribute('aria-live');
      btn.removeAttribute('aria-label');
      btn.classList.remove(...inStateClassName.split(' '));

      // Unwrap elements
      while (wrapper.firstChild) btn.insertBefore(wrapper.firstChild, wrapper);
      btn.removeChild(wrapper);

      wrapper = undefined;
      isInit = false;
      isInState = false;
    }
  }


  /**
   * Enable button state
   *
   * @callback module:htz-stateful-btn~enableState
   *
   * @fires module:htz-stateful-btn#stateful-btn:enable-before
   * @fires module:htz-stateful-btn#stateful-btn:enable-after
   */
  function enableState() {
    if (isInit) {
      /**
       * A custom event fired before a button's state is enabled.
       * Stops execution if any of its handlers calls `event.preventDefault`.
       *
       * @event module:htz-stateful-btn#stateful-btn:enable-before
       * @type {Object}
       * @prop {Object} details
       * @prop {Boolean} details.isInState - Indicates if the button is currently
       *     stateful
       */
      const allowed = dispatchEvent(btn, 'stateful-btn:enable-before', { isInState });

      if (allowed) {
        wrapper.setAttribute('aria-hidden', 'true');

        if (a11yText) btn.setAttribute('aria-label', a11yText);
        if (inStateClassName) btn.classList.add(...inStateClassName.split(' '));

        isInState = true;

        /**
        * A custom event fired after a button's state has been enabled.
        *
        * @event module:htz-stateful-btn#stateful-btn:enable-after
        * @type {Object}
        * @prop {Object} details
        * @prop {Boolean} details.isInState - Indicates if the button is currently
        *     stateful
        */
        dispatchEvent(btn, 'stateful-btn:enable-after', { isInState });
      }
    }
  }

  /**
   * Disable button state
   *
   * @callback module:htz-stateful-btn~disableState
   *
   * @fires module:htz-stateful-btn#stateful-btn:disable-before
   * @fires module:htz-stateful-btn#stateful-btn:disable-after
   */
  function disableState() {
    if (isInit) {
      /**
       * A custom event fired before a button's state is disabled.
       * Stops execution if any of its handlers calls `event.preventDefault`.
       *
       * @event module:htz-stateful-btn#stateful-btn:disable-before
       * @type {Object}
       * @prop {Object} details
       * @prop {Boolean} details.isInState - Indicates if the button is currently stateful
       */
      const allowed = dispatchEvent(btn, 'htz-stateful-btn:disable-before', { isInState });

      if (allowed) {
        if (a11yText) btn.removeAttribute('aria-label');
        if (inStateClassName) {
          btn.classList.remove(...inStateClassName.split(' '));
        }

        wrapper.removeAttribute('aria-hidden');
        isInState = false;

        /**
        * A custom event fired after a button's state has been disabled.
        *
        * @event module:htz-stateful-btn#stateful-btn:disable-after
        * @type {Object}
        * @prop {Object} details
        * @prop {Boolean} details.isInState - Indicates if the button is currently stateful
        */
        dispatchEvent(btn, 'htz-stateful-btn:disable-after', { isInState });
      }
    }
  }

  /**
   * Toggle a button's state on and off
   *
   * @callback module:htz-stateful-btn~toggle
   */
  function toggle() {
    if (isInit) {
      if (isInState) disableState(btn, wrapper);
      else enableState(btn, wrapper, a11yText);
    }
  }


  /**
   * Instance methods and properties.
   *
   * @typedef {Object} module:htz-stateful-btn#API
   *
   * @prop {HTMLElement} btn - The stateful button element
   * @prop {Getter} wrapper - Returns the element wrapping the button's content.
   * @prop {Getter} isStateActive - Returns a `boolean` indicating if the button's state
   *     is currently active.
   * @prop {Getter} isInit - Returns a `boolean` indicating if the stateful button is initialized.
   * @prop {Getter|Setter} a11yText - Get or set the text used to declare the state to
   *     assistive technology.
   * @prop {Getter|Setter} stateClass - Get or set the class added to the button when in-state.
   * @prop {module:htz-stateful-btn~init} init - Initialize or reinitialize the instance.
   * @prop {module:htz-stateful-btn~destroy} destroy - destroy the instance.
   * @prop {module:htz-stateful-btn~toggle} toggle - Toggle a button's state on and off.
   * @prop {module:htz-stateful-btn~enableState} enableState - enable button state
   * @prop {module:htz-stateful-btn~disableState} disableState - Disable button state.
   */
  const instance = {
    // Elements
    btn,
    get wrapper() { return wrapper; },

    // State
    get isStateActive() { return isInState; },
    get isInit() { return isInit; },

    // Methods
    get a11yText() { return a11yText; },
    set a11yText(text) { a11yText = text; },
    get stateClass() { return inStateClassName; },
    set stateClass(className) { inStateClassName = className; },
    init,
    destroy,
    toggle,
    enableState,
    disableState,
  };

  if (allInstances.indexOf(instance) < 0) allInstances.push(instance);

  return instance;
}


/**
 * Get the instance API of a statful button.
 *
 * @memberof module:htz-stateful-btn
 * @static
 *
 * @param {String|HTMLElement} btn - A stateful button `HTMLElement` or the `id` of one.
 *
 * @return {module:htz-stateful-btn#API} - The API to control the instance.
 */
function getInstance(btn) {
  const instanceType = (
    Object
    .prototype
    .toString
    .call(btn)
    .match(/^\[object\s+(.*?)\]$/)[1]
    || ''
  ).toLowerCase();

  const elem = instanceType === 'string' ? document.getElementById(btn) : btn;
  const instance = allInstances.filter(item => item.btn === elem)[0];

  return instance;
}

// Assign `getInstance as a static method`
statefulBtn.getInstance = getInstance;
