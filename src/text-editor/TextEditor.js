import React, { createRef, Fragment } from "react";
import { connect } from 'react-redux'
import { updateWord } from "../actions";
import ControlPanel from "../control-panel/ControlPanel";
import FileZone from "../file-zone/FileZone";

import getMockText from '../text.service';

import './TextEditor.css'

class TextEditor extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			selectedWord: "",
			startOffset: 0,
			endOffset: 0,
			editorContent: []
		};
		
		this.tags  = {
			b: (content, tags, word) => ({element: <b>{content}</b>, tags, word, id: new Date().getMilliseconds() }),
			i: (content, tags, word) => ({element: <i>{content}</i>, tags, word, id: new Date().getMilliseconds() }),
			u: (content, tags, word) => ({element: <u>{content}</u>, tags, word, id: new Date().getMilliseconds() }),
			tab: (content, tags, word) => ({element: <blockquote style={{margin: "0 0 0 10px",border: "none", padding: "0px" }}>{content}</blockquote>, tags, word, id: new Date().getMilliseconds() }),
		
		};
	}
	
	async componentDidMount(prevProps, prevState, snapshot) {
		const mockText = await getMockText();
		this.setState({ editorContent: [mockText] })
	}
	
	componentDidUpdate(prevProps, prevState, ) {
		if (prevProps.selectedWordSynonym !== this.props.selectedWordSynonym) {
			this.replaceWordWithASynonim(this.props.selectedWordSynonym)
		}
	}
	
	replaceWordWithASynonim(synonym) {
		const { selectedWord, startOffset, endOffset, editorContent } = this.state;
		const content = editorContent.map(node => {
			if (typeof node === 'string') {
				const begin = node.slice(0, startOffset);
				const middle = node.slice(startOffset, endOffset);
				const finish = node.slice(endOffset, node.length);
				
				if (middle === selectedWord) {
					return `${begin} ${synonym} ${finish}`;
				}
			} else {
				return this.createByTags(synonym, node.tags);
			}
			
			return node;
		});
		
		this.setState({
			editorContent: [].concat.apply([], content)
		})
	};
	
	formatWordInText = (data, word, start, end, tag) => {
		const begin = data.slice(0, start);
		const middle = data.slice(start, end);
		const finish = data.slice(end, data.length);
		
		if (middle === word) {
			return [begin, this.createByTags(middle, [tag]), finish]
		}
		
		return data;
	};
	
	formatWordNode = (element, selectedWord, tag) => {
		if (element.word === selectedWord) {
			if (element.tags.includes(tag)) {
				const actualTags = element.tags.filter(currTag => currTag !== tag);
				return this.createByTags(element.word, actualTags)
			} else {
				return this.createByTags(selectedWord, [...element.tags, tag])
			}
		}
		
		return element
	};
	
	createByTags(word, tags) {
		let formattedElement = word;
		
		if (!tags.length) return word;
		
		for (let tag of tags) {
			formattedElement = this.tags[tag](typeof formattedElement === 'string' ? formattedElement : formattedElement.element, tags, word);
		}
		
		return formattedElement;
	};
	
	handleFormat = (tag) => {
		const { selectedWord, startOffset, endOffset, editorContent } = this.state;
		const content = editorContent.map(node =>
			typeof node === 'string'
				? this.formatWordInText(node, selectedWord, startOffset, endOffset, tag)
				: this.formatWordNode(node, selectedWord, tag)
			);
		
		this.setState({
			editorContent: [].concat.apply([], content)
		})
	};
	
	handleDoubleClick = () => {
		const s = window.getSelection();
		const range = s.getRangeAt(0);
		const selectedWord = window.getSelection().toString();
		const { startOffset, endOffset } = range;
		const {setWord} = this.props;
		
		setWord(selectedWord);
		
		this.setState({
			selectedWord,
			startOffset,
			endOffset
		});
	};
	
	render() {
		const { editorContent } = this.state;
		
		return (
			<Fragment>
				<main className="TextEditor__container">
					<ControlPanel handleFormat={this.handleFormat} />
					<FileZone
						onDoubleClick={this.handleDoubleClick}
					>
						{
							editorContent.map(chunkContent => {
								return chunkContent && chunkContent.element
									? <span key={chunkContent.id}>{chunkContent.element}</span>
									: <span key={chunkContent}>{chunkContent}</span>
							})
						}
					</FileZone>
				</main>
			</Fragment>
		)
	}
}

const mapStateToProps = ({ datamuse }) => {
	return {
		word: datamuse.word,
		synonyms: datamuse.synonyms,
		synonymsLoading: datamuse.synonymsLoading,
		selectedWordSynonym: datamuse.selectedWordSynonym,
	}
};

const mapDispatchToProps = (dispatch) => ({
	setWord: word => dispatch(updateWord(word)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
