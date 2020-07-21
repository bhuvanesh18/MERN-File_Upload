import React from 'react'

function FileDisplay({uploadedFile}) {
    return (
        <div>
            <h4>{uploadedFile.fileName}</h4>
            <img style={{width : `${50}%`}} src={`${uploadedFile.filePath}`} alt={`${uploadedFile.fileName}`}/>
        </div>
    )
}

export default FileDisplay
