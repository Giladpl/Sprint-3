import emailPreview from './email-preview.cmp.js';

export default {
	props: ['emails'],
	template: `
		<ul v-if="sentEmails" class="email-list clean-list">
			<li v-for="email in sentEmails" :key="email.id" class="email-preview-container">
				<router-link class="removeLinkStyle" :to="'/mail/'+email.id">
				<button @click.prevent="deleteEmail" class="trash-btn-preview"><img src="../../../../img/trash.png" width="20"></button>
					<email-preview @click.native="changeToRead(email)" :email="email" />
				</router-link>

			</li>
		</ul>
		`,
    data() {
        return {
            sentEmails: null
        }
    },
	methods: {
		changeToRead(email) {
			this.$emit('emailRead', email);
		},
		deleteEmail(email) {
			this.$emit('deleteEmail', email);
		},
        loadSentEmails() {
			this.sentEmails = this.emails.filter((email) => email.isSent);
        }
	},
    created() {
        this.loadSentEmails();
    },
	components: {
		emailPreview,
	},
};