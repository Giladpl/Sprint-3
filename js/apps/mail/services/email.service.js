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
