export default {
	props: ['todo'],
	template: `
          <section class="note-todo-list" @click="toggleDone" :class="doneClass">
				{{todo.txt}}
          </section>
          `,
	methods: {
		toggleDone() {
			this.todo.isDone = !this.todo.isDone;
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
