if (!localStorage.getItem('snap-suplex')) {
	localStorage.setItem('snap-suplex', JSON.stringify({
		wrestlers: [],
		moves: {},
	}));
}

const getWrestlers = () => {
	const stringifiedData = localStorage.getItem('snap-suplex');
	const data = JSON.parse(stringifiedData);
	const { wrestlers } = data;

	return Promise.resolve(wrestlers);
};

export default {
	wrestlers: {
		get: getWrestlers,
	},
};
