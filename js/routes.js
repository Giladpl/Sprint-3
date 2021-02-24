import homePage from './pages/home-page.cmp.js'
import emailApp from './apps/mail/pages/email-app.cmp.js'
import keepApp from './apps/keep/pages/keep-app.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: emailApp
    },
    {
        path: '/keep',
        component: keepApp
    },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },
]

export const myRouter = new VueRouter({ routes })