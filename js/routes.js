import homePage from './pages/home-page.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },
    // {
    //     path: '/about',
    //     component: about
    // },
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },
]

export const myRouter = new VueRouter({ routes })