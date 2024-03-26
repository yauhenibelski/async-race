// import localStorage from '@shared/local-storage/local-storage';
// import { redirectTo } from './utils/redirect';
// import { renderPage } from './utils/render-page';
// import { Routes } from './routes.const';

// export const router = (): void => {
// if (localStorage.userLogged()) {
//     redirectTo(Routes.startScreen);
//     renderPage(Routes.startScreen);
// }

// if (!localStorage.userLogged()) {
//     redirectTo(Routes.login);
//     renderPage(Routes.login);
// }

// window.onhashchange = () => {
// const hash = window.location.hash.slice(1);
// const routes = <Array<string>>Object.values(Routes);

// if (routes.includes(hash)) {
//     if (localStorage.userLogged()) {
//         renderPage(hash as Routes);
//     } else {
//         renderPage(Routes.login);
//     }
// }
//     };
// };
