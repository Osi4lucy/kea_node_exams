const express = require('express');
const path = require('path');

// init the app
const app = express();

// public folders for static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) =>{
    return res.sendFile(path.join(__dirname, './public/home/home.html'));
});

// Set up port and server
const PORT = 3000;

app.listen(PORT,(errors) =>{
    if(errors){
        comnsole.log('An error has occured in the server');
    } else {
        console.log(`App listening at port ${PORT}`);
    }
});
