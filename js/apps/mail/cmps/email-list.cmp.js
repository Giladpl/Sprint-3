import emailPreview from './email-preview.cmp.js';

export default {
	props: ['emails'],
	template: `
    <ul class="email-list clean-list">
        <li v-for="email in emails" :key="email.id" class="email-preview-container">
        <router-link :to="'/mail/'+email.id"><email-preview :email="email"/></router-link>
        </li>
    </ul>
    `,
    
	components: {
		emailPreview,
	},
};
