import React, {Component} from 'react';
import './App.css';
import TextEditor from "./text-editor/TextEditor";
import DataMuse from   './datamuse/DataMuse';

import getMockText from './text.service';

class App extends Component {
    getText() {
        getMockText().then(function (result) {
            console.log(result);
        });
    }
    render() {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <div className="App__container">
                    <DataMuse/>
                    <TextEditor/>
                </div>
            </div>
        );
    }
}

export default App;
