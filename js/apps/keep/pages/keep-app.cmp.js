import { keepService } from '../services/keep.service.js';
import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVid from '../cmps/note-vid.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import keepFilter from '../cmps/keep-filter.cmp.js';


export default {
	template: `
        <section class="keeps-app" >
			<keep-filter class="keep-filter" @filtered="setFilter"/>
			<div class="keep-content">
				<div v-for="keep in keeps">
					<component :is="keep.type" :id="keep.id" :info="keep.info" @setTxt="updateTxt" @setColor="updateColor" @remove="removeNote" @addTodo="addTodo" @setTitle="updateTitle"></component>
				</div>
			</div>
        </section>
    `,
	data() {
		return {
			keeps: null,
			filterBy: null,
			showType: 
		};
	},
	methods: {
		loadKeeps() {
			keepService.query().then((keeps) => {
				this.keeps = keeps;
				console.log(this.keeps);
			});
		},
		setFilter(filterBy) {
			this.filterBy = filterBy;
		},
		updateTxt(txt, id) {
			keepService.getById(id).then((note) => {
				note.info.txt = txt;
				keepService.saveNote(note);
			});
		},
		updateColor(color, id) {
			keepService.getById(id).then((note) => {
				note.info.style.backgroundColor = color;
				keepService.saveNote(note);
			});
		},
		removeNote(id) {
			keepService.removeNote(id).then(this.loadKeeps);
		},
		addTodo(todo, id) {
			keepService.getById(id).then((note) => {
				note.info.todos.push({ txt: todo, doneAt: null, isDone: false });
				keepService.saveNote(note);
			});
		},

		updateTitle(title, id) {
			keepService.getById(id).then((note) => {
				note.info.title = title;
				keepService.saveNote(note);
			});
		},
	},
	created() {
		this.loadKeeps();
	},
	components: {
		noteTxt,
		noteImg,
		noteVid,
		noteTodos,
		keepFilter
	},
};
