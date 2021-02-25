import emailPreview from './email-preview.cmp.js';

export default {
	props: ['emails'],
	template: `
    <ul class="email-list clean-list">
        <li v-for="email in emails" :key="email.id" class="email-preview-container">
        <router-link class="removeLinkStyle" :to="'/mail/'+email.id"><email-preview @click.native="changeToRead(email)" :email="email"/></router-link>
        </li>
    </ul>
    `,
	methods: {
		changeToRead(email) {
			this.$emit('emailRead', email);
		},
	},

	components: {
		emailPreview,
	},
};
