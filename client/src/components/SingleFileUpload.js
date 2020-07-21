import React, { useState, useRef } from 'react';
import axios, { CancelToken, isCancel } from 'axios';
import FileDisplay from './FileDisplay';
import Message from './Message';
import Progress from './Progress';

function SingleFileUpload() {
    const [ file, setFile ] = useState(null);
    const [ fileName , setFileName ] = useState('Choose file');
    const [ uploadedFile, setUploadedFile ] = useState(null);
    const [ message, setMessage ] = useState(null);
    const [ uploadedPercentage, setUploadedPercentage ] = useState(0);
    // for cancel option
    const cancelFileUpload = useRef(null);

    const onChangeHandler = (e) => {
        if(e.target.files[0]){
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }else{
            setFile(null); 
            setFileName('Choose file');
        }
    };

    const cancelUpload = () => {
        if(cancelFileUpload.current){
            cancelFileUpload.current("File uploading canceled!");
        }
    }

    const onSubmitHandler = async e => {
        // javascript FormData
        const formData = new FormData();
        formData.append('file',file);
        if(file){
            try{
                const res = await axios.post('/uploadFile', formData, {
                    headers : {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress : (progressEvent) => {
                        setUploadedPercentage(
                            parseInt(
                                Math.round( (progressEvent.loaded * 100) / (progressEvent.total))
                            )
                        );
                    },
                    cancelToken : new CancelToken( 
                        cancel => (cancelFileUpload.current = cancel)
                    )
                });
                if(res.data.success){
                    setUploadedFile(res.data.data , setTimeout( () => setUploadedPercentage(0), 2000 ));
                    setMessage({success : res.data.success , message : res.data.message},
                        setTimeout(()=> setMessage(null) , 5000)
                    );
                }
            }catch(err){
                if(isCancel(err)){
                    setMessage({ success : false , message: err.message},
                        setTimeout(()=> setMessage(null) , 5000)
                    );
                }else{
                    setMessage({ success : err.response.data.success , message: err.response.data.message},
                        setTimeout(()=> setMessage(null) , 5000)
                    );
                }
                // resetting
                setUploadedFile(null);
                setUploadedPercentage(0);
            }
        }else{
            setMessage({ success : false, message: 'Please select a file'},
                setTimeout(()=> setMessage(null) , 5000)
            );
        }
    };

    return (
        <>
            <h4>Mode - Single File Upload</h4>
            { message && <Message success={message.success} message={message.message}/> }
            <form onSubmit={(e)=> { e.preventDefault() }}>
                <div className="custom-file my-2">
                    <input type="file" className="custom-file-input" id="userFile" vlaue={file} onChange={onChangeHandler} />
                    <label className="custom-file-label" htmlFor="userFile">{fileName}</label>
                </div>
                { (uploadedPercentage>0) && 
                    <>
                        <Progress percentage={uploadedPercentage}/> 
                        <button className="btn btn-danger" onClick={cancelUpload}>Cancel</button>
                    </>
                }
                <div className="my-2">
                    <button type="button" onClick={onSubmitHandler} className="btn btn-primary btn-block">Upload File</button>
                </div>
            </form> 
            { uploadedFile && <FileDisplay uploadedFile={uploadedFile}/> }
        </>
    )
}

export default SingleFileUpload
