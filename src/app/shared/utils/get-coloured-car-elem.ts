import createElement from '@utils/create-element';
import svgPath from '@assets/img/car.svg';

let carSvgText: string | null = null;

fetch(svgPath)
    .then(response => response.text())
    .then(svgText => (carSvgText = svgText));

export function getColorCar(color: string): HTMLElement {
    const div = createElement({ tag: 'div', style: 'car' });
    let carSvg = carSvgText;

    if (carSvgText) {
        carSvg = carSvgText.replace(`fill="none"`, `fill="${color}"`);

        div.insertAdjacentHTML('beforeend', carSvg);
    }
    return div;
}
