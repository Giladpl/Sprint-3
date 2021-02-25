import { emailService } from '../services/email.service.js';
import { eventBus } from "../../../services/event-bus.service.js";
import emailSideMenu from '../cmps/email-side-menu.cmp.js';

export default {
	template: `
<section v-if="email" class="email-display">
	<email-side-menu class="in-display-menu" @onInbox="updateInboxDisplay" @onSent="updateSentDisplay"/>
	<div class="menu-email-container">
		<div class="sender-subject-container">
			<div class="email-sender">
				From: {{this.email.sender}}
			</div>
			<div class="email-subject">
				Subject: {{this.email.subject}}
			</div>
		</div>
		<div class="email-body">
			{{this.email.body}}
		</div>
		<button @click=replyClick>Reply</button>
		<button @click="deleteEmail">Delete</button>
		<div v-if="isReply" class="reply-container">
			<p>To: {{email.sender}}</p>
			<textarea rows="4" cols="100" placeholder="Enter your reply" v-model="replyMsg"></textarea>
			<button @click="replyEmail">Reply</button>
		</div>
	</div>
</section>
`,
	data() {
		return {
			email: null,
			isReply: false,
			replyMsg: null,
		};
	},
	methods: {
		loadEmail() {
			const emailId = this.$route.params.emailId;
			// console.log(this.$route.params);
			emailService.getById(emailId).then((email) => (this.email = email));
		},
		deleteEmail() {
			emailService.removeEmail(this.email.id);
			this.$router.push('/mail');
		},
		replyClick() {
			this.isReply = true;
		},
		replyEmail() {
			const emptyEmail = emailService.getEmptySentEmail();
			emptyEmail.body = this.replyMsg;
			emptyEmail.subject = this.email.subject;
			emptyEmail.to = this.email.sender;
			console.log(emptyEmail);
			emailService.saveEmail(emptyEmail);
			this.$router.push('/mail');
		},
		updateInboxDisplay(type) {
			eventBus.$emit('emailType', type)
			this.$router.push('/mail');
		},
		updateSentDisplay(type) {
			eventBus.$emit('emailType', type)
			this.$router.push('/mail');
		}
	},
	computed: {},
	created() {
		this.loadEmail();
	},
	components: {
		emailSideMenu,
	},
};
