import { emailService } from '../services/email.service.js';

export default {
	template: `
<section v-if="email" class="email-display">
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
			console.log(this.$route.params);
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
			console.log(this.replyMsg);
			this.isReply = false;
			this.$router.push('/mail');
		},
	},
	computed: {},
	created() {
		this.loadEmail();
	},
};
