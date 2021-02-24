import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';

export default {
	template: `
        <section class="email-app">
            <email-filter @filtered="setFilter" />
            <email-list :emails="emailsToShow"/>
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
			emailService.query().then((emails) => (this.emails = emails));
		},
		setFilter(filterBy) {
			this.filterBy = filterBy;
		},
	},
	computed: {
		emailsToShow() {
			if (!this.filterBy) return this.emails;
			const byTxt = this.filterBy.txt.toLowerCase();
			return this.emails.filter((email) => {
				return (
					email.sender.toLowerCase().includes(byTxt) ||
					email.subject.toLowerCase().includes(byTxt) ||
					email.body.toLowerCase().includes(byTxt)
				);
			});
		},
	},
	created() {
		this.loadEmails();
	},
	components: {
		emailList,
		emailFilter,
	},
};
