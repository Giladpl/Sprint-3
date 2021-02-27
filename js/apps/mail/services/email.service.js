import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

export const emailService = {
	query,
	getById,
	removeEmail,
	saveEmail,
	getEmptySentEmail,
};

const gEmails = [
	{
		id: storageService._makeId(),
		sender: 'Oren',
		subject: 'Wassap daloooooooor?',
		body: 'Did you see the new dalooor?',
		isRead: false,
		sentAt: 1551133930594,
		isSent: false,
	},
	{
		id: storageService._makeId(),
		sender: 'Avocode ',
		subject: `Your Avocode free trial is over`,
		body: `The free trial has ended. Please log in and purchase a subscription within 14 days to keep working on your design projects.`,
		isRead: false,
		sentAt: 1551133930594,
		isSent: false,
	},
	{
		id: storageService._makeId(),
		sender: `GitGuardian`,
		subject: `Google Key exposed on GitHub`,
		body: 'Pick up!',
		isRead: false,
		sentAt: 1551133930594,
		isSent: false,
	},
	{
		id: storageService._makeId(),
		sender: `Font Awesome`,
		subject: `Confirm Your Font Awesome Account Email Address
    `,
		body: `You're so close to using your first Font Awesome Kit!
    We just need you to confirm your email address and finish setting up a new Font Awesome account we created just for you. You can do it super-quickly!`,
		isRead: false,
		sentAt: 1551133930594,
		isSent: false,
	},
	{
		id: storageService._makeId(),
		sender: `Twitter `,
		subject: `"California’s coronavirus strain looks increasingly dangerous"`,
		body: `
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium sequi nostrum possimus! Consectetur ad dolores saepe asperiores perferendis! Architecto porro minus suscipit commodi, provident nihil. Rem dignissimos veritatis officia!
    Voluptatem blanditiis officiis ducimus minima placeat et minus? Ad vel, dicta recusandae, possimus laboriosam eos architecto eum similique facere ab, vitae unde ipsa tempore porro officia nemo vero minus dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium sequi nostrum possimus! Consectetur ad dolores saepe asperiores perferendis! Architecto porro minus suscipit commodi, provident nihil. Rem dignissimos veritatis officia!
    Voluptatem blanditiis officiis ducimus minima placeat et minus? Ad vel, dicta recusandae, possimus laboriosam eos architecto eum similique facere ab, vitae unde ipsa tempore porro officia nemo vero minus dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium sequi nostrum possimus! Consectetur ad dolores saepe asperiores perferendis! Architecto porro minus suscipit commodi, provident nihil. Rem dignissimos veritatis officia!
    Voluptatem blanditiis officiis ducimus minima placeat et minus? Ad vel, dicta recusandae, possimus laboriosam eos architecto eum similique facere ab, vitae unde ipsa tempore porro officia nemo vero minus dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium sequi nostrum possimus! Consectetur ad dolores saepe asperiores perferendis! Architecto porro minus suscipit commodi, provident nihil. Rem dignissimos veritatis officia!
    Voluptatem blanditiis officiis ducimus minima placeat et minus? Ad vel, dicta recusandae, possimus laboriosam eos architecto eum similique facere ab, vitae unde ipsa tempore porro officia nemo vero minus dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium sequi nostrum possimus! Consectetur ad dolores saepe asperiores perferendis! Architecto porro minus suscipit commodi, provident nihil. Rem dignissimos veritatis officia!
    Voluptatem blanditiis officiis ducimus minima placeat et minus? Ad vel, dicta recusandae, possimus laboriosam eos architecto eum similique facere ab, vitae unde ipsa tempore porro officia nemo vero minus dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium sequi nostrum possimus! Consectetur ad dolores saepe asperiores perferendis! Architecto porro minus suscipit commodi, provident nihil. Rem dignissimos veritatis officia!
    Voluptatem blanditiis officiis ducimus minima placeat et minus? Ad vel, dicta recusandae, possimus laboriosam eos architecto eum similique facere ab, vitae unde ipsa tempore porro officia nemo vero minus dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium sequi nostrum possimus! Consectetur ad dolores saepe asperiores perferendis! Architecto porro minus suscipit commodi, provident nihil. Rem dignissimos veritatis officia!
    Voluptatem blanditiis officiis ducimus minima placeat et minus? Ad vel, dicta recusandae, possimus laboriosam eos architecto eum similique facere ab, vitae unde ipsa tempore porro officia nemo vero minus dignissimos!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium sequi nostrum possimus! Consectetur ad dolores saepe asperiores perferendis! Architecto porro minus suscipit commodi, provident nihil. Rem dignissimos veritatis officia!
    Voluptatem blanditiis officiis ducimus minima placeat et minus? Ad vel, dicta recusandae, possimus laboriosam eos architecto eum similique facere ab, vitae unde ipsa tempore porro officia nemo vero minus dignissimos!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium sequi nostrum possimus! Consectetur ad dolores saepe asperiores perferendis! Architecto porro minus suscipit commodi, provident nihil. Rem dignissimos veritatis officia!
    Voluptatem blanditiis officiis ducimus minima placeat et minus? Ad vel, dicta recusandae, possimus laboriosam eos architecto eum similique facere ab, vitae unde ipsa tempore porro officia nemo vero minus dignissimos!`,
		isRead: true,
		sentAt: 1551133930594,
		isSent: false,
	},
	{
		id: storageService._makeId(),
		sender: `Amazon.com`,
		subject: `Deals have landed for Cyber Monday Week!
    `,
		body: `New deals that you really don't need to waste you money on!`,
		isRead: true,
		sentAt: 1551133930594,
		isSent: false,
	},
	{
		id: storageService._makeId(),
		sender: `School of Calisthenics`,
		subject: `💥 Get 25% OFF Annual Memberships 💥
    `,
		body: `It's nearly the start of a new decade + a great opportunity to think about investing in yourself and your future. Forget about yo-yo diets and programme hopping, and commit to consistency and invest in your physical pension.

		GET 50% OFF ANNUAL MEMBERSHIPS
		
		Grab yourself a Standard Annual Membership for £74.25 (saving £24.75) or our V.I.P Annual Membership for £187.50 (saving £62.50).
		
		USE CODE: NEWDECADE
		Offer ends 10 January 2021.
		We hope to see you in class!
		
		Tim and Jacko`,
		isRead: false,
		sentAt: 1551133930594,
		isSent: false,
	},
	{
		id: storageService._makeId(),
		sender: `OWM Team
`,
		subject: `OpenWeatherMap Account confirmation
    `,
		body: `Dear Customer!

		Thank you for choosing OpenWeatherMap!
		
		Please confirm your email address to help us ensure your account is always protected.
		 
		Verify your email
		For further technical questions and support, please contact us at info@openweathermap.org
		
		
		We are looking forward to cooperating with you!
		
		
		Best Regards,
		OpenWeather team`,
		isRead: true,
		sentAt: 1551133930594,
		isSent: false,
	},
	{
		id: storageService._makeId(),
		sender: `
		egghead
`,
		subject: `Sign-in link for egghead

    `,
		body: `Hi! 👋

		You asked us to send you a sign-in link for egghead.
		
		this link expires in 24 hours. After that you will need to request another link.
		this link can only be used once. After you click the link it will no longer work.
		you can always request another link!
		==> Click here to access egghead
		
		This link expires in 24 hours and can only be used once. You can always request another link to be sent if this one has been used or is expired.`,
		isRead: true,
		sentAt: 1551133930594,
		isSent: false,
	},
	{
		id: storageService._makeId(),
		sender: 'Me',
		subject: `Pinky and the brain`,
		to: `Brain`,
		body: `HI guys, what are we going to do tonight? Again trying to take over the world?`,
		sentAt: Date.now(),
		isSent: true,
		isRead: true,
	},
	{
		id: storageService._makeId(),
		sender: 'Me',
		subject: `Best of Hodor's quotes:`,
		to: `David Benioff`,
		body: `“Hodor. Hodor hodor, hodor. Hodor hodor hodor hodor hodor. Hodor. Hodor! Hodor hodor, hodor; hodor hodor hodor. Hodor. Hodor hodor; hodor hodor - hodor, hodor, hodor hodor. Hodor, hodor. Hodor. Hodor, hodor hodor hodor; hodor hodor; hodor hodor hodor! Hodor hodor HODOR! Hodor hodor... Hodor hodor hodor...
		`,
		sentAt: Date.now(),
		isSent: true,
		isRead: true,
	},
	{
		id: storageService._makeId(),
		sender: 'Me',
		subject: `Best of Hodor's quotes:`,
		to: `Cpt. Hook`,
		body: `Ahoy matey, yar lorem ipsum text is awash with brigands, bilge and more. Get swashbuckling with this trendy looking pirate placeholder text generator.

		Lookout flogging bilge rat main sheet bilge water nipper fluke to go on account heave down clap of thunder. Reef sails six pounders skysail code of conduct sloop cog Yellow Jack gunwalls grog blossom starboard. Swab black jack ahoy Brethren of the Coast schooner poop deck main sheet topmast furl marooned.
		`,
		sentAt: Date.now(),
		isSent: true,
		isRead: true,
	},
	{
		id: storageService._makeId(),
		sender: 'Me',
		subject: `Coffee`,
		to: `Coffe-Beans`,
		body: `I love you so much coffee-beans!! You are the best!
		`,
		sentAt: Date.now(),
		isSent: true,
		isRead: true,
	},
	{
		id: storageService._makeId(),
		sender: 'Me',
		subject: `Smurfs`,
		to: `Gargamel`,
		body: `Yo Bro, what's up with you and stinky Hathatul? What about leaving the smurfs alone?
		`,
		sentAt: Date.now(),
		isSent: true,
		isRead: true,
	},
];

const EMAILS_KEY = 'emails';

function query() {
	return storageService.query(EMAILS_KEY).then((emails) => {
		if (!emails.length) {
			utilService.saveToStorage(EMAILS_KEY, gEmails);
			var emails = gEmails;
		}
		return emails;
	});
}

function getEmptySentEmail() {
	return {
		// id: storageService._makeId(),
		sender: 'Me',
		subject: null,
		to: null,
		body: null,
		sentAt: Date.now(),
		isSent: true,
		isRead: true,
	};
}

function getById(id) {
	return storageService.get(EMAILS_KEY, id);
}

function removeEmail(emailId) {
	return storageService.remove(EMAILS_KEY, emailId);
}

function saveEmail(email) {
	if (email.id) {
		return storageService.put(EMAILS_KEY, email);
	} else {
		return storageService.post(EMAILS_KEY, email);
	}
}
