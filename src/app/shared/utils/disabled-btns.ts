export const disabledBtns = (boolean: boolean): void => {
    const main = <HTMLElement | undefined>document.querySelector('main');
    const buttons = <HTMLButtonElement[] | undefined>main?.querySelectorAll('button');

    buttons?.forEach(btn => (btn.disabled = boolean));
};
