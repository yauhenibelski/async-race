export const delay = (conditionCallBack: () => boolean) => {
    return new Promise<void>(resolve => {
        const interval = setInterval(() => {
            if (conditionCallBack()) {
                resolve();
                clearInterval(interval);
            }
        });
    });
};
