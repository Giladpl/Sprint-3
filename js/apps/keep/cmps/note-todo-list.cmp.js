export default {
	props: ['todo', 'idx'],
	template: `
          <section class="note-todo-list" @click="toggleDone" :class="doneClass">
				{{todo.txt}}
          </section>
          `,
	methods: {
		toggleDone() {
			this.todo.isDone = !this.todo.isDone;
			this.$emit('toggleDone', this.idx);
		},
	},
	computed: {
		doneClass() {
			return {
				'todoDone': this.todo.isDone,
			};
		},
	}
};
