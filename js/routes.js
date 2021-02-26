import homePage from './pages/home-page.cmp.js';
import emailApp from './apps/mail/pages/email-app.cmp.js';
import emailDisplay from './apps/mail/pages/email-display.cmp.js';
import keepApp from './apps/keep/pages/keep-app.cmp.js';
import bookApp from './apps/book/pages/book-app.cmp.js';
import bookDetails from './apps/book/pages/book-details.cmp.js';

const routes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/keep',
		component: keepApp,
	},
	{
		path: '/mail',
		component: emailApp,
	},
	{
		path: '/mail/:emailId',
		component: emailDisplay,
	},
	{
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];

export const myRouter = new VueRouter({ routes });
