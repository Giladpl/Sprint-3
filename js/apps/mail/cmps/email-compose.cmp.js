export default {
	template: `
            <section class="email-compose">
              <div>New Message</div>
            <form>
                <label for="send-to">To:</label>
                <input v-model="newMail.to" type="text" id="send-to">
                <label for="mail-subject">Subject:</label> 
                <input v-model="newMail.subject" type="text" id="mail-subject">
                <label for="other">Other</label>
                <textarea v-model="newMail.body" rows="10" cols="50"></textarea>
                <button @click.prevent="sendMail">Send</button>
            </form>

              

            </section>`,
	data() {
		return {
			newMail: {
				to: null,
				subject: null,
				body: null,
			},
		};
	},
	methods: {
		sendMail() {
			this.$emit('newMail', this.newMail);
		},
	},
	computed: {},
};
