export default {
	props: ['email'],
	template: `
        <section class="email-preview" :class="isReadClass">
            <div class="sender-subject-container-preview" >
                <p class="sender">{{email.sender}}</p>
                <p class="subject">{{email.subject}}</p>
            </div>
            <p class="sentAt">{{sentAtConversion}}</p>
			<button class="trash-btn-preview"><img src="../../../../img/trash.png" width="20"></button>
			<span class="read-btn-preview"><img :src="../../../../img/email-read.png" width="20"></span>
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
