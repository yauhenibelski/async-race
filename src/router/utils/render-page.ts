// import LoginPage from '@pages/login/login-page';
// import StartPage from '@pages/start-screen/start-screen';
// import StatisticsPage from '@pages/statistics/statistics';
// import FieldPage from '@pages/field-page/field-page';
// import { Routes } from '../routes.enum';

// const pages = {
//     logIn: new LoginPage().getElement(),
//     startPage: new StartPage().getElement(),
//     statistics: new StatisticsPage().getElement(),
//     field: new FieldPage().getElement(),
// };

// export const renderPage = (path: Routes) => {
//     const routOutput = <HTMLElement>document.querySelector('.router');
//     // const currentPage = <HTMLElement>routOutput.firstElementChild;
//     let nextPage: HTMLElement | null = null;

//     routOutput.innerHTML = '';

//     if (path === Routes.login) nextPage = pages.logIn;
//     if (path === Routes.statistics) nextPage = pages.statistics;

//     if (nextPage) {
//         routOutput.append(nextPage);
//     }
// };
