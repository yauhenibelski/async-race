import createElement from '@utils/create-element';
import style from './popup.module.scss';

export const popup = {
    container: createElement({ tag: 'div', style: style.popup }),

    run(content: HTMLElement | string) {
        this.createPopup(content);
        document.body.append(this.container);
    },

    remove() {
        this.container.style.opacity = '0';
        this.container.innerHTML = '';

        document.body.style.overflow = '';

        setTimeout(() => {
            this.container.remove();
        }, 200);
    },

    createPopup(value: HTMLElement | string) {
        this.container.style.opacity = '0';
        document.body.style.overflow = 'hidden';

        const content = value instanceof HTMLElement ? value : createElement({ tag: 'h2', text: value });

        this.container.append(content);
        content.onclick = event => event.stopPropagation();

        this.container.onclick = () => this.remove();

        setTimeout(() => {
            this.container.style.opacity = '1';
        }, 100);
    },
};
