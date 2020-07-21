const express = require('express');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

dotenv.config({path : './config/config.env'});

const app = express();

app.use(fileUpload());

//routes
app.use('/uploadFile',require('./routes/uploadFileRoute'));

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} on ${NODE_ENV} mode`);
});