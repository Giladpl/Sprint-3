import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailSideMenu from '../cmps/email-side-menu.cmp.js';

export default {
	template: `
        <section class="email-app">
			<email-filter @filtered="setFilter" />
			<email-side-menu class="email-side-app" @onInbox="updateInbox" @onSent="updateSent"/>
			<email-list @deleteEmail="deleteEmail" @emailRead="changeToRead" :emails="emailsToShow"/>
        </section>
    `,
	data() {
		return {
			emails: null,
			filterBy: null,
			emailType: 'inbox',
		};
	},
	methods: {
		loadEmails() {
			emailService.query().then((emails) => {
				console.log('load', this.emailType);
				if (this.emailType === 'inbox')
					this.emails = emails.filter((email) => !email.isSent);
				else if (this.emailType === 'sent')
					this.emails = emails.filter((email) => email.isSent);
			});
		},
		deleteEmail(email) {
			emailService.removeEmail(email.id).then(this.loadEmails);
		},
		setFilter(filterBy) {
			this.filterBy = filterBy;
		},
		changeToRead(email) {
			email.isRead = true;
			emailService.saveEmail(email);
		},
		emailConditions(email, txt) {
			return (
				email.sender.toLowerCase().includes(txt) ||
				email.subject.toLowerCase().includes(txt) ||
				email.body.toLowerCase().includes(txt)
			);
		},
		updateInbox(type) {
			this.emailType = type;
			// console.log(this.emailType);
			this.loadEmails();
		},
		updateSent(type) {
			this.emailType = type;
			// console.log(this.emailType);
			this.loadEmails();
		},
		typeDisplay(type) {
			this.emailType = type;
			// console.log('display', this.emailType);
			this.loadEmails();
		},
	},
	computed: {
		emailsToShow() {
			if (!this.filterBy) return this.emails;
			const byTxt = this.filterBy.txt.toLowerCase();
			return this.emails.filter((email) => {
				if (this.filterBy.filterType === 'all')
					return this.emailConditions(email, byTxt);
				else if (this.filterBy.filterType === 'read')
					return this.emailConditions(email, byTxt) && email.isRead;
				else if (this.filterBy.filterType === 'unread')
					return this.emailConditions(email, byTxt) && !email.isRead;
			});
		},
	},
	created() {
		console.log('create', this.emailType);
		eventBus.$on('emailType', this.typeDisplay);
		this.loadEmails();
	},
	destroyed() {
		// eventBus.$off('emailType', this.typeDisplay)
	},
	components: {
		emailList,
		emailFilter,
		emailSideMenu,
	},
};
