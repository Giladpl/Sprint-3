import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailSideMenu from '../cmps/email-side-menu.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';

export default {
	template: `
	<section v-if="email" class="email-display">
	<div hidden class="burger-menu" @click="openMenu">&#x2630;</div>
		<email-side-menu v-if="sideMenu" @openCompose="onCompose" class="in-display-menu" @onInbox="updateInboxDisplay" @onSent="updateSentDisplay"/>
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
			<div class="reply-btn-container">
				<button class="reply-email-btn" @click=replyClick><img src="../../../../img/reply.svg" width="25"></button>
				<button class="trash-email-btn" @click="deleteEmail"><img src="../../../../img/trash.png" width="25"></button>
			</div>
			<div v-if="isReply" class="reply-container">
				<p>To: {{email.sender}}</p>
				<textarea rows="7" cols="82" placeholder="Enter your reply" v-model="replyMsg"></textarea>
				<button class="send-btn" @click="replyEmail"><img src="../../../../img/sent-email.png" width="25"></button>
			</div>
		</div>
		<email-compose v-if="isCompose" @newMail="sendNewMail"/>
</section>
`,
	data() {
		return {
			email: null,
			isReply: false,
			replyMsg: null,
			isCompose: false,
			sideMenu: true,
		};
	},
	methods: {
		loadEmail() {
			const emailId = this.$route.params.emailId;
			emailService
				.getById(emailId)
				.then((email) => (this.email = email))
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
			emailService.saveEmail(emptyEmail);
			this.$router.push('/mail');
		},
		updateInboxDisplay(type) {
			eventBus.$emit('emailType', type);
			this.$router.push('/mail');
		},
		updateSentDisplay(type) {
			eventBus.$emit('emailType', type);
			this.$router.push('/mail');
		},
		sendNewMail(newMail) {
			const mailToSend = emailService.getEmptySentEmail();
			mailToSend.to = newMail.to;
			mailToSend.subject = newMail.subject;
			mailToSend.body = newMail.body;
			emailService.saveEmail(mailToSend);
		},
		onCompose() {
			this.isCompose = !this.isCompose;
		},
		openMenu() {
			this.sideMenu = !this.sideMenu;
		},
		closeCompose() {
			this.isCompose = false;
		}
	},
	computed: {},
	created() {
		this.loadEmail();
		eventBus.$on('closeCompose', this.closeCompose);
	},
	destroyed() {
		eventBus.$off('closeCompose', this.closeCompose);
	},
	components: {
		emailSideMenu,
		emailCompose,
	},
};
