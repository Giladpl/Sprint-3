import noteTodoList from './note-todo-list.cmp.js';

export default {
	props: ['info', 'id', 'pin'],
	template: `
          <section class="noteTodos note-card" :style="{background: userColor}">
                <h2>Don't forget:</h2>
                <ul class="todos-list">
                    <li v-for="(todo, idx) in todos">
                        <note-todo-list :todo="todo" :idx="idx" @toggleDone="toggleDone"/>
                    </li>
                </ul>
                <form @submit.prevent="addTodo">
                    <input class="input-todo" type="text" placeholder="I need to do.." v-model="newTodo">
                    <button class="add-btn"><img src="../../../../img/add.png" width="20"/></button>
                </form>
				<div className="note-icons">
					<button class="pin-btn" :class="isPinned" @click="togglePin"><img src="../../../../img/pin.png" width="20"/></button>
					<button class="color-btn"><input class="input-color" type="color" @change="changeColor" v-model="userColor"></button>
					<button class="trash-btn" @click="removeNote"><img src="../../../../img/trash.png" width="20"/></button>
				</div>
          </section>
          `,
	data() {
		return {
			userColor: this.info.style.backgroundColor,
			todos: this.info.todos,
			newTodo: null
		};
	},
	methods: {
		changeColor() {
			this.$emit('setColor', this.userColor, this.id);
		},
		addTodo() {
			this.$emit('addTodo', this.newTodo, this.id);
			this.newTodo = null;
		},
		removeNote() {
			this.$emit('remove', this.id);
		},
        togglePin() {
            this.$emit('togglePin', this.id);
        },
		toggleDone(todoIdx) {
			this.$emit('toggleDone', this.id, todoIdx);
		}
	},
	computed: {
		isPinned() {
			return {isPinned: this.pin};
		},
	},
	components: {
		noteTodoList,
	},
};
