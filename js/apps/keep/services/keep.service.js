import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

export const keepService = {
    query,
	getById,
	saveNote,
	removeNote
}

let gKeeps = [
	{
		id: storageService._makeId(),
		type: 'noteTxt',
		isPinned: true,
		info: {
			txt: 'Fullstack Me Baby!',
			style: {
				backgroundColor: '#262322',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteImg',
		isPinned: false,
		info: {
			url: 'http://some-img/me',
			title: 'Me playing Mi',
			style: {
				backgroundColor: '#262322',
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
				{ txt: 'Do that', doneAt: null },
				{ txt: 'Do this', doneAt: 187111111 },
			],
			style: {
				backgroundColor: '#262322',
			},
		},
	},
	{
		id: storageService._makeId(),
		type: 'noteVid',
		isPinned: true,
		info: {
			url: 'https://www.youtube.com/watch?v=5OtbSxGnCS0',
			title: 'Eli Hahatul',
			style: {
				backgroundColor: '#262322',
			},
		},
	},
];
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