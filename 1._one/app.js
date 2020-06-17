require('models/db');

const express = require('express');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const orderController = require('./controllers/orderController');




// init the app
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/'
}));

app.set('views engine', 'hbs');



// paths to urls
app.get('/', (req, res) => {
    return res.send('Hello server');

app.use('/', orderController);
});

// init the server
const PORT = 3001;
app.listen(PORT,(error)=>{
    if(error){
        console.log('An error has occurred in the server...');

    } console.log('The server is running on port: ' + PORT);
})