export default {
	props: ['todo'],
	template: `
          <section class="note-todo-list" @click="toggleDone" :class="doneClass">
							{{todo.txt}}
          </section>
          `,
	data() {
		return {};
	},
	methods: {
		toggleDone() {
			this.todo.isDone = !this.todo.isDone;
			// this.$emit("toggleDone", this.id);
		},
	},
	computed: {
		doneClass() {
			return {
				'todoDone': this.todo.isDone,
			};
		},
	},
	created() {},
};
