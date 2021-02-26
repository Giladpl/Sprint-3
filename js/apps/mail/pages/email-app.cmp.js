import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailSideMenu from '../cmps/email-side-menu.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';

export default {
	template: `
        <section class="email-app">
					<email-filter @filtered="setFilter" />
					<email-side-menu class="email-side-app" @onInbox="updateInbox" @onSent="updateSent" @openCompose="onCompose"/>
					<email-list @deleteEmail="deleteEmail" @emailRead="changeToRead" :emails="emailsToShow"/>
					<email-compose v-if="isCompose" @newMail="sendNewMail"/>
        </section>
    `,
	data() {
		return {
			emails: null,
			filterBy: null,
			emailType: 'inbox',
			isCompose: false,
			readPercentage: null,
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
		toggleIsRead(email) {
			email.isRead = !email.isRead;
			emailService.saveEmail(email);
			this.updateProgressBar();
		},
		changeToRead(email) {
			email.isRead = true;
			emailService.saveEmail(email);
		},
		updateProgressBar() {
			const readEmails = this.emails.filter((email) => email.isRead === true);
			this.readPercentage = ((readEmails.length / this.emails.length) * 100).toFixed(2);
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
		sendNewMail(newMail) {
			const mailToSend = emailService.getEmptySentEmail();
			mailToSend.to = newMail.to;
			mailToSend.subject = newMail.subject;
			mailToSend.body = newMail.body;
			emailService.saveEmail(mailToSend);
			this.isCompose = !this.isCompose;
		},
		onCompose() {
			this.isCompose = !this.isCompose;
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
		progressBar() {},
	},
	watch: {
		readPercentage() {
			eventBus.$emit('changeBarSize', this.readPercentage);
		},
	},
	created() {
		// console.log('create', this.emailType);
		eventBus.$on('emailType', this.typeDisplay);
		eventBus.$on('emailRead', this.changeToRead);
		eventBus.$on('toggleIsRead', this.toggleIsRead);
		eventBus.$on('deleteEmail', this.deleteEmail);
		this.loadEmails();
	},
	destroyed() {
		// eventBus.$off('emailType', this.typeDisplay)
	},
	components: {
		emailList,
		emailFilter,
		emailSideMenu,
		emailCompose,
		eventBus,
	},
};
