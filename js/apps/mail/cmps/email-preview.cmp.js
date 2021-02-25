export default {
	props: ['email'],
	template: `
        <section class="email-preview" :class="isReadClass">
            <div class="sender-subject-container-preview" >
                <p class="sender">{{email.sender}}</p>
                <p class="subject">{{email.subject}}</p>
            </div>
            <p class="sentAt">{{sentAtConversion}}</p>
        </section>
        `,
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
	},
};
