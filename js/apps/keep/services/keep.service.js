import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

export const keepService = {
    query,
	getById,
	saveNote,
	removeNote,
	addKeep
}

let gKeeps = [
	{
		id: storageService._makeId(),
		type: 'noteTxt',
		isPinned: true,
		info: {
			txt: 'Fullstack Me Baby!',
			style: {
				backgroundColor: '#a9e2f8',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteVid',
		isPinned: true,
		info: {
			url: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
			title: 'Ed Sheeran - Perfect',
			style: {
				backgroundColor: '#ffa07a',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteTxt',
		isPinned: false,
		info: {
			txt: 'Sprint 3 is done!',
			style: {
				backgroundColor: '#a9c5f8',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteImg',
		isPinned: false,
		info: {
			url: 'http://coding-academy.org/books-photos/20.jpg',
			title: 'Me playing Mi',
			style: {
				backgroundColor: '#f8a9f8',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteTxt',
		isPinned: true,
		info: {
			txt: 'Oops, I did it again!!',
			style: {
				backgroundColor: '#a9f8b4',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteTodos',
		isPinned: false,
		info: {
			label: 'How was it:',
			todos: [
				{ txt: 'Do that', doneAt: null, isDone: false },
				{ txt: 'Do this', doneAt: 187111111, isDone: false },
			],
			style: {
				backgroundColor: '#a9c5f8',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteImg',
		isPinned: false,
		info: {
			url: 'https://picsum.photos/200/300',
			title: 'Fun day',
			style: {
				backgroundColor: '#ff8585',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteVid',
		isPinned: false,
		info: {
			url: 'https://www.youtube.com/embed/Jtauh8GcxBY',
			title: 'Lewis Capaldi - Before You Go',
			style: {
				backgroundColor: '#a9f8b4',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteTodos',
		isPinned: false,
		info: {
			label: 'How was it:',
			todos: [
				{ txt: 'Learn JS', doneAt: null, isDone: false },
				{ txt: 'Learn VUE', doneAt: null, isDone: false },
				{ txt: 'Learn CSS', doneAt: 187111111, isDone: false },
			],
			style: {
				backgroundColor: '#20b2aa',
			},
		},
	},
];

//'https://picsum.photos/200/300'
const KEEPS_KEY = 'keeps';

function query() {
    return storageService.query(KEEPS_KEY)
        .then(keeps => {
			if (!keeps.length) {
				utilService.saveToStorage(KEEPS_KEY, gKeeps);
				keeps = gKeeps;
			}
        	return keeps;
    })
}

function getById(id) {
    return storageService.get(KEEPS_KEY, id);
}

function saveNote(note) {
    if (note.id) {
      return storageService.put(KEEPS_KEY, note);
    } else {
      return storageService.post(KEEPS_KEY, note);
    }
}

function removeNote(noteId) {
    return storageService.remove(KEEPS_KEY, noteId)
}

function addKeep(userAdd) {
    var newInfo = {}
    switch (userAdd.typeInput) {
        case 'noteTxt':
            newInfo = {
				txt: userAdd.userInput,
				style: {
					backgroundColor: '#a9e2f8',
				},
			}
            break;
		case 'noteTodos':
			newInfo = {
				label: 'How was it:',
				todos: [],
				style: {
					backgroundColor: '#a9c5f8',
				}
			}
			let todosTxt = userAdd.userInput.split(',');
			todosTxt.forEach(todo => {
				newInfo.todos.push({txt: todo, doneAt: null, isDone: false})
			})
			break;
        case 'noteImg' || 'noteVid':
            newInfo = {
				url: userAdd.userInput,
				title: 'add title',
				style: {
					backgroundColor: '#f8a9f8',
				},
			}
            break;
    }
    const newNoteAdd = { id: storageService._makeId(), type: userAdd.typeInput, info: newInfo}
	return storageService.post(KEEPS_KEY, newNoteAdd)
}