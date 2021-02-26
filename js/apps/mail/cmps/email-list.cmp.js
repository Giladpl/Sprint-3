import emailPreview from './email-preview.cmp.js';

export default {
	props: ['emails'],
	template: `
<ul class="email-list clean-list">
	<li v-for="email in emails" :key="email.id" class="email-preview-container">
		<router-link class="removeLinkStyle" :to="'/mail/'+email.id">
		<button @click.prevent="deleteEmail" class="trash-btn-preview"><img src="../../../../img/trash.png" width="20"></button>
			<email-preview @click.native="changeToRead(email)" :email="email" />
		</router-link>

	</li>
</ul>
`,
	methods: {
		changeToRead(email) {
			this.$emit('emailRead', email);
		},
		deleteEmail(email) {
			this.$emit('deleteEmail', email);
		},
	},

	components: {
		emailPreview,
	},
};
