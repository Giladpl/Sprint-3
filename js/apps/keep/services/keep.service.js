'use-strict';

const keeps = [
	{
		type: 'NoteTxt',
		isPinned: true,
		info: {
			txt: 'Fullstack Me Baby!',
		},
	},
	{
		type: 'NoteImg',
		info: {
			url: 'http://some-img/me',
			title: 'Me playing Mi',
		},
		style: {
			backgroundColor: '#00d',
		},
	},
	{
		type: 'NoteTodos',
		info: {
			label: 'How was it:',
			todos: [
				{ txt: 'Do that', doneAt: null },
				{ txt: 'Do this', doneAt: 187111111 },
			],
		},
	},
	{
		type: 'NoteVid',
		info: {
			url: 'https://www.youtube.com/watch?v=5OtbSxGnCS0',
			title: 'Eli Hahatul',
		},
	},
];

