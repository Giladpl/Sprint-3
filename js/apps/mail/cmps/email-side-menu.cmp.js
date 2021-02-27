import { eventBus } from '../../../services/event-bus.service.js';

export default {
	template: `
            <section class="email-side-display">
								<button @click="composeMail" class="btn-side-menu"><li>Compose</li></button>
								<button class="btn-side-menu" @click="onInbox"><i class="fas fa-inbox"></i>Inbox</button>
								<button class="btn-side-menu"><i class="fas fa-star"></i>Starred</button>
								<button class="btn-side-menu" @click="onSent"><i class="fas fa-share-square"></i>Sent Mail</button>
								<button class="btn-side-menu"><i class="fab fa-firstdraft"></i>Drafts</button>
								<div class="progress-bar-container">
									<div :style="statusBarLength" class="progress-bar">{{readPercentage}}%</div>
								</div>
            </section>`,
	data() {
		return {
			readPercentage: null,
		};
	},
	methods: {
		onInbox() {
			this.$emit('onInbox', 'inbox');
		},
		onSent() {
			this.$emit('onSent', 'sent');
		},
		composeMail() {
			this.$emit('openCompose');
		},
		updateReadPercents(percentage) {
			this.readPercentage = percentage;
		},
	},
	computed: {
		statusBarLength() {
			return { width: this.readPercentage + '%' };
		},
	},
	created() {
		eventBus.$on('changeBarSize', this.updateReadPercents);
	},
	destroyed() {
		eventBus.$off('changeBarSize', this.updateReadPercents);
	},
	components: {
		eventBus,
	},
};
