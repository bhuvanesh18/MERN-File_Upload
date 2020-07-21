const { v1:uuidv1 } = require('uuid');

exports.uploadFileController = (req,res) => {
        if(req.files===null){
            return res.status(400).json({
                success : false,
                message : "No file is selected!"
            })
        }
        // getting the client file
        const file = req.files.file;

        // for getting the extension of the file
        const splittedArray = file.name.split('.');
        const extension = splittedArray[splittedArray.length-1];
        // newName with file extension
        const newFileName = uuidv1()+'.'+extension;
        file.mv(`./client/public/uploads/${newFileName}` , err => {
            if(err){
                return res.status(500).json({
                    success : false,
                    message : "Internal server error!"
                })
            }
            // successfully uploaded 
            res.json({
                success : true,
                message : "File Uploaded successfully!",
                data : {
                    fileName : newFileName,
                    filePath : `/uploads/${newFileName}`
                }
            })
        });
}