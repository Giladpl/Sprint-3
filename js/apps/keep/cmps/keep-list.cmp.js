import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVid from '../cmps/note-vid.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';

export default {
	props: ['keeps'],
	template: `
		<div class="keep-content" v-for="keep in keeps" :key="keep.id">
			<component :is="keep.type" :id="keep.id" :info="keep.info" :pin="keep.isPinned" @setTxt="setTxt" @setColor="setColor" @remove="remove" @addTodo="addTodo" @setTitle="setTitle" @togglePin="togglePin"></component>
		</div>
		`,
	methods: {
		setColor(userColor, id) {
			this.$emit('setColor', userColor, id);
		},
		addTodo(newTodo, id) {
			this.$emit('addTodo', newTodo, id);
		},
		remove(id) {
			this.$emit('remove', id);
		},
        togglePin(id) {
            this.$emit("togglePin", id);
        },
        setTxt(userTxt, id) {
            this.$emit("setTxt", userTxt, id);
        },
        setTitle(userTitle, id) {
            this.$emit("setTitle", userTitle, id);
        },
	},
    created() {
        console.log(this.keeps);
    },
    components: {
		noteTxt,
		noteImg,
		noteVid,
		noteTodos,
	},
};