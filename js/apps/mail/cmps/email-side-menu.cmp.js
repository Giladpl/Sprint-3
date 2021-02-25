export default {
	template: `
            <section class="email-side-menu">
							<button @click="composeMail" class="btn-side-menu">Compose</button>
							<button class="btn-side-menu" @click="onInbox"><i class="fas fa-inbox"></i>Inbox</button>
							<button class="btn-side-menu"><i class="fas fa-star"></i>Starred</button>
							<button class="btn-side-menu" @click="onSent"><i class="fas fa-share-square"></i>Sent Mail</button>
							<button class="btn-side-menu"><i class="fab fa-firstdraft"></i>Drafts</button>
            </section>`,
	data() {
		return {};
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
	},
	computed: {},
};
