const defaultState = {
	word: '',
	synonyms: [],
	synonymsLoading: false,
	selectedWordSynonym: '',
};

const datamuse = (state = defaultState, action) => {
	switch (action.type) {
		case 'UPDATE_WORD':
			return {
				...state,
				word: action.payload,
			};
		case 'START_LOAD_SYNONYMS':
			return {
				...state,
				synonymsLoading: true,
			};
		case 'FINISH_LOAD_SYNONYMS':
			return {
				...state,
				synonymsLoading: false,
			};
		case 'SET_SYNONYMS':
			return {
				...state,
				synonyms: action.payload,
			};
		case 'UPDATE_SELECTED_WORD_SYNONYM':
			return {
				...state,
				selectedWordSynonym: action.payload,
			};
		default:
			return state
	}
};

export default datamuse
