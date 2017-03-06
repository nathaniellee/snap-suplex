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
	return JSON.parse(stringifiedData);
};

const getNewId = (allIds) => _.max(allIds) + 1;

const getMatches = () => {
	const { matches } = fetchData();
	return Promise.resolve(matches);
};

const postMatch = (match) => {
	const data = fetchData();
	const { matches } = data;
	const {
		allIds,
		byId,
	} = matches;

	const newId = getNewId(allIds);
	const newMatch = {
		...match,
		id: newId,
	};
	const updatedData = {
		...data,
		matches: {
			allIds: [
				...allIds,
				newId,
			],
			byId: {
				...byId,
				[newId]: newMatch,
			},
		},
	};

	putData(updatedData);

	return Promise.resolve(newMatch);
};

const putMatch = (updatedMatch) => {
	const data = fetchData();
	const { matches } = data;
	const { byId } = matches;
	const updatedMatchId = updatedMatch.id;
	const foundMatch = _.get(byId, updatedMatchId);

	if (!foundMatch) {
		const error = new Error(`There is no match with ID ${updatedMatchId} in the database.`);
		return Promise.reject(error);
	}

	const updatedData = {
		...data,
		matches: {
			...matches,
			byId: {
				...byId,
				[updatedMatchId]: {
					...foundMatch,
					...updatedMatch,
				},
			},
		},
	};

	putData(updatedData);

	return Promise.resolve(updatedMatch);
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

	const newId = getNewId(allIds);
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

const putMove = (updatedMove) => {
	const data = fetchData();
	const { moves } = data;
	const { byId } = moves;
	const updatedMoveId = updatedMove.id;
	const foundMove = _.get(byId, updatedMoveId);

	if (!foundMove) {
		const error = new Error(`There is no move with ID ${updatedMoveId} in the database.`);
		return Promise.reject(error);
	}

	const updatedData = {
		...data,
		moves: {
			...moves,
			byId: {
				...byId,
				[updatedMoveId]: {
					...foundMove,
					...updatedMove,
				},
			},
		},
	};

	putData(updatedData);

	return Promise.resolve(updatedMove);
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
	const updatedWrestlerId = updatedWrestler.id;
	const foundWrestler = _.find(wrestlers, { id: updatedWrestlerId });

	if (!foundWrestler) {
		const error = new Error(`There is no wrestler with ID ${updatedWrestlerId} in the database.`);
		return Promise.reject(error);
	}

	// TODO: Really need to adopt the `allIds`/`byId` pattern for wrestlers.
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
	matches: {
		get: getMatches,
		post: postMatch,
		put: putMatch,
	},
	moves: {
		get: getMoves,
		post: postMove,
		put: putMove,
	},
	wrestlers: {
		get: getWrestlers,
		post: postWrestler,
		put: putWrestler,
	},
};
