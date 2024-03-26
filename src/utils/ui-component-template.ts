import createElement from '@utils/create-element';

class Component extends HTMLElement {
    protected contentWrap: HTMLElement;
    protected customTagName: string | unknown;
    protected elements: { [key: string]: HTMLElement } = {};

    constructor(style: { [key: string]: string }) {
        super();
        this.className = style.host;
        this.contentWrap = createElement({
            tag: 'div',
            style: style['content-wrap'],
        });
        this.append(this.contentWrap);
    }

    childrenElements(): { [key: string]: HTMLElement } {
        // childrenElements
        return <{ [key: string]: HTMLElement }>{};
    }

    appendElements(): void {
        // appendElements
    }

    createComponent(): void {
        // create component
    }

    connectedCallback(): void {
        // element added to page
    }

    disconnectedCallback(): void {
        //  element removed from page
    }

    adoptedCallback(): void {
        // element moved to new page
    }

    // attributeChangedCallback(name, oldValue, newValue): void {
    // Attribute ${name} has changed.
    // }

    getElement(): HTMLElement {
        return this;
    }

    render(): void {
        this.contentWrap.innerHTML = '';
        this.elements = this.childrenElements();
        this.createComponent();
    }
}
export default Component;
