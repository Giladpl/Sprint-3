export default {
	props: ['email'],
	template: `
        <section class="email-preview" :class="isReadClass">
					<span v-if="!email.isSent" class="read-btn-preview"><img :src="isReadSrc" width="20"></span>
					<div class="sender-subject-container-preview">
						<p class="sender">From: {{email.sender}}</p>
						<p v-if="email.to" class="to">To: {{email.to}}</p>
						<p class="subject">Subject: {{email.subject}}</p>
						<p class="sentAt">{{sentAtConversion}}</p>
					</div>
        </section>
        `,
	methods: {},
	computed: {
		sentAtConversion() {
			return new Date().toDateString(this.email.sentAt);
		},
		isReadClass() {
			return {
				alreadyReadEmail: this.email.isRead,
				unreadEmail: !this.email.isRead,
			};
		},
		isReadSrc() {
			return this.email.isRead
				? '../../../../img/email-read.png'
				: '../../../../img/email-un-read.png';
		},
	},
};
