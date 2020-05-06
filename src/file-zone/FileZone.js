import React from 'react';
import './FileZone.css';

const FileZone = ({children, onDoubleClick}) => (
    <div id="file-zone">
        <div
            onDoubleClick={onDoubleClick}
            id="file"
        >
            {children}
        </div>
    </div>
);

export default FileZone;
