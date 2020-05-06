import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({handleFormat}) => (
    <div id="control-panel">
        <div id="format-actions">
            <button className="format-action" type="button" onClick={handleFormat.bind(null, 'b')}><b>B</b></button>
            <button className="format-action" type="button" onClick={handleFormat.bind(null, 'i')}><i>I</i></button>
            <button className="format-action" type="button" onClick={handleFormat.bind(null, 'u')}><u>U</u></button>
            <button className="format-action" type="button" onClick={handleFormat.bind(null, 'tab')}>tab</button>
        </div>
    </div>
);

export default ControlPanel;
