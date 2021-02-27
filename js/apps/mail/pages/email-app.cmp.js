import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailSideMenu from '../cmps/email-side-menu.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';

export default {
	template: `
        <section class="email-app">
					<!-- <div class="main-screen" @click="toggleScreen"></div> -->
					<div hidden class="burger-menu" @click="openMenu">&#x2630;</div>
					<email-filter @filtered="setFilter" />
					<email-side-menu ref="sideMenu" v-if="sideMenu" class="email-side-display" @onInbox="updateInbox" @onSent="updateSent" @openCompose="onCompose"/>
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
			sideMenu: true,
		};
	},
	methods: {
		loadEmails() {
			emailService.query().then((emails) => {
				// console.log('load', this.emailType);
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
			this.updateProgressBar();
		},
		updateProgressBar() {
			const readEmails = this.emails.filter((email) => email.isRead === true);
			this.readPercentage = (
				(readEmails.length / this.emails.length) *
				100
			).toFixed(1);
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
			this.loadEmails();
		},
		updateSent(type) {
			this.emailType = type;
			this.loadEmails();
		},
		typeDisplay(type) {
			this.emailType = type;
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
		openMenu() {
			this.sideMenu = !this.sideMenu;
		},
		closeCompose() {
			this.isCompose = false;
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
		eventBus.$on('emailType', this.typeDisplay);
		eventBus.$on('emailRead', this.changeToRead);
		eventBus.$on('toggleIsRead', this.toggleIsRead);
		eventBus.$on('deleteEmail', this.deleteEmail);
		eventBus.$on('closeCompose', this.closeCompose);
		this.loadEmails();
	},
	destroyed() {
		eventBus.$off('emailType', this.typeDisplay);
		eventBus.$off('emailRead', this.changeToRead);
		eventBus.$off('toggleIsRead', this.toggleIsRead);
		eventBus.$off('deleteEmail', this.deleteEmail);
		eventBus.$off('closeCompose', this.closeCompose);
	},
	components: {
		emailList,
		emailFilter,
		emailSideMenu,
		emailCompose,
		eventBus,
	},
};
