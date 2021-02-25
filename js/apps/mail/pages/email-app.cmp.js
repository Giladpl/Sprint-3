import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailSideMenu from '../cmps/email-side-menu.cmp.js';

export default {
	template: `
        <section class="email-app">
						<email-side-menu />
						<div class="list-menu-container">
							<email-filter @filtered="setFilter" />
							<email-list @emailRead="changeToRead" :emails="emailsToShow"/>
						</div>
        </section>
    `,
	data() {
		return {
			emails: null,
			filterBy: null,
		};
	},
	methods: {
		loadEmails() {
			emailService.query().then((emails) => {
				this.emails = emails.filter((email) => !email.isSent);
			});
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
		this.loadEmails();
	},
	components: {
		emailList,
		emailFilter,
		emailSideMenu,
	},
};
