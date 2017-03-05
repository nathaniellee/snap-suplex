import _ from 'lodash';

if (!localStorage.getItem('snap-suplex')) {
	localStorage.setItem('snap-suplex', JSON.stringify({
		wrestlers: [],
		moves: {},
	}));
}

const fetchData = () => {
	const stringifiedData = localStorage.getItem('snap-suplex');
	return JSON.parse(stringifiedData);
};

const putData = (data) => {
	const stringifiedData = JSON.stringify(data);
	localStorage.setItem('snap-suplex', stringifiedData);
};

const getMoves = () => {
	const { moves } = fetchData();
	return Promise.resolve(moves);
};

const postMove = (move) => {
	const data = fetchData();
	const { moves } = data;
	const {
		allIds,
		byId,
	} = moves;

	const newId = _.max(allIds) + 1;
	const newMove = {
		...move,
		id: newId,
	};
	const updatedData = {
		...data,
		moves: {
			allIds: [
				...allIds,
				newId,
			],
			byId: {
				...byId,
				[newId]: newMove,
			},
		},
	};

	putData(updatedData);

	return Promise.resolve(newMove);
};

const getWrestlers = () => {
	const { wrestlers } = fetchData();
	return Promise.resolve(wrestlers);
};

const postWrestler = (wrestler) => {
	const data = fetchData();
	const { wrestlers } = data;

	const newId = _.max(_.map(wrestlers, 'id')) + 1;
	const newWrestler = {
		...wrestler,
		id: newId,
	};
	const updatedData = {
		...data,
		wrestlers: [
			...wrestlers,
			newWrestler,
		],
	};

	putData(updatedData);

	return Promise.resolve(newWrestler);
};

const putWrestler = (updatedWrestler) => {
	const data = fetchData();
	const { wrestlers } = data;
	const updatedData = {
		...data,
		wrestlers: _.map(wrestlers, (wrestler) => wrestler.id === updatedWrestler.id
			? {
				...wrestler,
				...updatedWrestler,
			}
			: wrestler),
	};

	putData(updatedData);

	return Promise.resolve(updatedWrestler);
};

export default {
	moves: {
		get: getMoves,
		post: postMove,
	},
	wrestlers: {
		get: getWrestlers,
		post: postWrestler,
		put: putWrestler,
	},
};
