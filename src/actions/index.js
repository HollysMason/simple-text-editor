import axios from 'axios';

export const updateWord = word => ({
	type: 'UPDATE_WORD',
	payload: word,
});

export const startLoadSynonyms = () => ({
	type: 'START_LOAD_SYNONYMS',
});

export const finishLoadSynonyms = () => ({
	type: 'FINISH_LOAD_SYNONYMS'
});

export const failedLoadingSynonyms = () => ({
	type: 'FAILED_LOAD_SYNONYMS'
});

export const setSynonyms = synonyms => ({
	type: 'SET_SYNONYMS',
	payload: synonyms,
});

export const updateSelectedWordSynonym = synonym => ({
	type: 'UPDATE_SELECTED_WORD_SYNONYM',
	payload: synonym,
});

export const getSynonyms = (word) => {
	return async dispatch => {
		dispatch(startLoadSynonyms());
		
		try {
			const response = await axios.get(`https://api.datamuse.com/words?ml=${word}`);
			await dispatch(setSynonyms(response.data));
			await dispatch(finishLoadSynonyms());
		} catch (error) {
			dispatch(failedLoadingSynonyms());
			console.error(error);
		};
	};
};
