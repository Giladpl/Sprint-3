import { eventBus } from '../../../services/event-bus.service.js';

export default {
	props: ['email'],
	template: `
        <section class="email-preview" :class="isReadClass">
					<span v-if="!email.isSent" class="read-btn-preview"><img @click.prevent="toggleIsRead" :src="isReadSrc" width="20"></span>
					<div @click="changeToRead" class="sender-subject-container-preview">
						<p class="sender">From: {{email.sender}}</p>
						<p v-if="email.to" class="to">To: {{email.to}}</p>
						<p class="subject">Subject: {{email.subject}}</p>
						<p class="sentAt">{{sentAtConversion}}</p>
						<button @click.prevent="deleteEmail" class="trash-btn-preview"><img src="../../../../img/trash.png" width="20"></button>
					</div>
        </section>
        `,
	methods: {
		toggleIsRead() {
			eventBus.$emit('toggleIsRead', this.email);
		},
		deleteEmail() {
			eventBus.$emit('deleteEmail', this.email);
		},
		changeToRead() {		
			eventBus.$emit('emailRead', this.email);
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
	components: {
		eventBus,
	},
};
