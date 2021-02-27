import { keepService } from '../services/keep.service.js';
import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVid from '../cmps/note-vid.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import keepFilter from '../cmps/keep-filter.cmp.js';
import keepAdd from '../cmps/keep-add.cmp.js';

export default {
	template: `
        <section class="keeps-app">
			<keep-filter class="keep-filter" @filtered="setFilter"/>
			<keep-add @added="addKeep"/>
			<div class="keep-content">
				<div v-for="keep in keepsToShow" :key="keep.id">
					<component :is="keep.type" :id="keep.id" :info="keep.info" :pin="keep.isPinned" 
						@setTxt="updateTxt" 
						@setColor="updateColor" 
						@remove="removeNote" 
						@addTodo="addTodo"
						@setTitle="updateTitle" 
						@togglePin="updateIsPinned"
						@toggleDone="updateTodoDone">
					</component>
				</div>
			</div>
        </section>
    `,
	data() {
		return {
			keeps: null,
			filterBy: null
		};
	},
	methods: {
		loadKeeps() {
			keepService.query().then((keeps) => {
				const pinned = keeps.filter((keep) => keep.isPinned);
				const notPinned = keeps.filter((keep) => !keep.isPinned);
				this.keeps = [...pinned, ...notPinned];
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
				keepService.saveNote(note).then(() => {
					this.loadKeeps();
				});
			});
		},
		updateTitle(title, id) {
			keepService.getById(id).then((note) => {
				note.info.title = title;
				keepService.saveNote(note);
				this.loadKeeps();
			});
		},
		noteConditions(note, txt) {
			if (note.type === 'noteTxt')
				return note.info.txt.toLowerCase().includes(txt);
			else if (note.type === 'noteImg' || note.type === 'noteVid')
				return note.info.title.toLowerCase().includes(txt);
			else if (note.type === 'noteTodos') {
				let todoTxt = note.info.todos.find(todo => {
					return todo.txt.toLowerCase().includes(txt);
				})
				let todoLabel = note.info.label.toLowerCase().includes(txt);
				if (todoTxt || todoLabel) return true;
				else return false;
			}
		
		},
		updateIsPinned(id) {
			keepService.getById(id).then((note) => {
				note.isPinned = !note.isPinned;
				keepService.saveNote(note);
				this.loadKeeps();
			});
		},
		addKeep(userAdd) {
			keepService.addKeep(userAdd).then(this.loadKeeps);
		},
		updateTodoDone(id, todoIdx) {
			keepService.getById(id).then((note) => {
				note.info.todos[todoIdx].isDone = !note.info.todos[todoIdx].isDone;
				keepService.saveNote(note);
				this.loadKeeps();
			});
		}
	},
	computed: {
		keepsToShow() {
			if (!this.filterBy) return this.keeps;
			const byTxt = this.filterBy.txt.toLowerCase();
			return this.keeps.filter((note) => {
				if (this.filterBy.filterType === 'all')
					return this.noteConditions(note, byTxt);
				else if (this.filterBy.filterType === 'txt')
					return this.noteConditions(note, byTxt) && note.type === 'noteTxt';
				else if (this.filterBy.filterType === 'img')
					return this.noteConditions(note, byTxt) && note.type === 'noteImg';
				else if (this.filterBy.filterType === 'vid')
					return this.noteConditions(note, byTxt) && note.type === 'noteVid';
				else if (this.filterBy.filterType === 'todos')
					return this.noteConditions(note, byTxt) && note.type === 'noteTodos';
			});
		},
	},
	watch: {

	},
	created() {
		this.loadKeeps();
	},
	components: {
		noteTxt,
		noteImg,
		noteVid,
		noteTodos,
		keepFilter,
		keepAdd,
	},
};