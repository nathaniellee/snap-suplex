if (!localStorage.getItem('snap-suplex')) {
	localStorage.setItem('snap-suplex', JSON.stringify({
		wrestlers: [],
		moves: {},
	}));
}

const getMoves = () => {
	const stringifiedData = localStorage.getItem('snap-suplex');
	const data = JSON.parse(stringifiedData);
	const { moves } = data;

	return Promise.resolve(moves);
};

const getWrestlers = () => {
	const stringifiedData = localStorage.getItem('snap-suplex');
	const data = JSON.parse(stringifiedData);
	const { wrestlers } = data;

	return Promise.resolve(wrestlers);
};

export default {
	moves: {
		get: getMoves,
	},
	wrestlers: {
		get: getWrestlers,
	},
};
