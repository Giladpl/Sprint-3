export default {
    props: ['info', 'id'],
    template: `
          <section class="noteTodos" :style="{background: userColor}">
                <h2>Don't forget:</h2>
                <ul class="todos-list">
                    <li v-for="(todo, idx) in todos" @click="toggleDone(idx)" :class="doneClass">{{todo.txt}}</li>
                </ul>
                <form @submit.prevent="addTodo">
                    <input type="text" placeholder="I need to do.." v-model="newTodo">
                    <button class="add-btn">Add</button>
                </form>
                <button>pin or not</button>
                <button><input type="color" @change="changeColor" v-model="userColor"></button>
                <button @click="removeNote">remove</button>
          </section>
          `,
    data() {
        return {
            userColor: this.info.style.backgroundColor,
            todos: this.info.todos,
            newTodo: null,
            // isDone: this.info.todos.isDone
        }
    },
    methods: {
        changeColor() {
            this.$emit("setColor", this.userColor, this.id);
        },
        addTodo() {
            this.$emit('addTodo', this.newTodo, this.id);
            this.newTodo = null;
        },
        removeNote() {
            this.$emit("remove", this.id);
        },
        toggleDone(idx) {
            // this.isDone = !this.isDone
            console.log(idx);
            this.info.todos[idx].isDone
            // todo.isDone = !todo.isDone
            // this.$emit("toggleDone", this.id);
            
        }
    },
    computed: {
        doneClass() {
            return {todoDone: this.info.todos[].isDone}
        }
    },
    created() {
     
    }
};