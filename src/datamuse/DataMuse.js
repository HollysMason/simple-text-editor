import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateWord, getSynonyms, updateSelectedWordSynonym } from '../actions'

import './DataMuse.css';

class DataMuse extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps.word !== this.props.word) {
			this.props.getSynonyms(this.props.word);
		}
	}
	
	render() {
		const { word, synonyms, updateSelectedWordSynonym, synonymsLoading } = this.props;
		return (
			<div className="DataMuse">
				<h1> Selected word: { word }</h1>
				<ul>
					{ synonymsLoading
						? <span>Loadin ....</span>
						: synonyms.map(synonym => {
							return (
								<li key={synonym.word}>
									{synonym.word}
									<button type="button" onClick={updateSelectedWordSynonym.bind(null, synonym.word)}>Apply</button>
								</li>
							)
						})
						
					}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = ({ datamuse }) => {
	return {
		word: datamuse.word,
		synonyms: datamuse.synonyms,
		synonymsLoading: datamuse.synonymsLoading,
	}
};

const mapDispatchToProps = (dispatch) => ({
	setWord: word => dispatch(updateWord(word)),
	getSynonyms: word => dispatch(getSynonyms(word)),
	updateSelectedWordSynonym: word => dispatch(updateSelectedWordSynonym(word))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMuse)
