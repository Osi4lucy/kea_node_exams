require('./models/db');

const express = require('express');

const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const employeeController = require('./controllers/employeeController');
app.use(bodyParser.urlencoded({
    extended:true
}));


app.use(bodyParser.json());
app.use('/employee', employeeController);
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname:'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

const PORT = 3000;


app.listen(PORT, (err)=>{
    if(err){
        console.log('an error has occured..')
    } else {
        console.log('app is running on port ' + PORT);
    }
});