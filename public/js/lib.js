/**
 *
 * @param {typeof CustomElement} constructor
 * @param {ElementDefinitionOptions} options
 * @returns {Promise<void>}
 */
function register(constructor, options) {
  if (constructor.is === undefined) {
    return Promise.reject(new Error("No defined name"));
  }

  if (!window.customElements) {
    return Promise.reject(new Error("window.customElements not available"));
  }

  const is = constructor.is;
  const promise = window.customElements.whenDefined(is);
  const isDefined = window.customElements.get(is) !== undefined;

  if (!isDefined) {
    window.customElements.define(is, constructor, options);
  }

  return promise;
}

export class CustomElement extends HTMLElement {
  /**
   * @throws {Error} When element isn't named
   * @returns {string}
   */
  static get is() {
    throw new Error("Custom element not named");
  }

  /**
   * @returns {Promise<void>}
   */
  static register() {
    return register(this);
  }

  /**
   * @throws {Error} When element template isn't defined
   * @returns {string}
   */
  get templateSource() {
    throw new Error("Custom element's template not defined");
  }

  constructor() {
    super();

    this.template = document.getElementById(this.templateSource);
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.template || !this.shadowRoot || !this.isConnected) {
      return;
    }

    this.shadowRoot.appendChild(
      this.template.content.cloneNode(true),
    );
  }
}
