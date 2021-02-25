export default {
	props: ['email'],
	template: `
        <section class="email-preview" :class="isReadClass">
            <div class="sender-subject-container-preview" >
                <p class="sender">{{email.sender}}</p>
                <p class="subject">{{email.subject}}</p>
            </div>
            <p class="sentAt">{{sentAtConversion}}</p>
			<button @click="deleteEmail" class="trash-btn-preview"><img src="../../../../img/trash.png" width="20"></button>
			<span class="read-btn-preview"><img :src="isReadSrc" width="20"></span>
        </section>
        `,
	methods: {
		deleteEmail(ev) {
			ev.stopPropagation();
			console.log(this.email.id);
		},
	},
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
