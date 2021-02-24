import homePage from './pages/home-page.cmp.js';
import emailApp from './apps/mail/pages/email-app.cmp.js';
import emailDisplay from './apps/mail/pages/email-display.cmp.js';
import keepApp from './apps/keep/pages/keep-app.cmp.js';

// import keepApp from './apps/keep/pages/keep-app.cmp.js'

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
];

export const myRouter = new VueRouter({ routes });
