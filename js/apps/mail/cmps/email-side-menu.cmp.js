export default {
	template: `
            <section class="email-side-menu">
							<button class="btn-side-menu">Compose</button>
							<button class="btn-side-menu" @click="onInbox"><i class="fas fa-inbox">Inbox</i></button>
							<button class="btn-side-menu"><i class="fas fa-star">Starred</i></button>
							<button class="btn-side-menu" @click="onSent"><i class="fas fa-share-square">Sent Mail</i></button>
							<button class="btn-side-menu"><i class="fab fa-firstdraft">Drafts</i></button>
            </section>`,
	data() {
		return {
			
		};
	},
	methods: {
		onInbox() {
			this.$emit('onInbox', 'inbox');
		},
		onSent() {
			this.$emit('onSent', 'sent');
		}
	},
	computed: {},
};