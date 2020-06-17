/**Importing modules */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { response } = require('express');
const exhbs = require('express-handlebars');
const {mongoDbUrl, globalVars} = require('./config/configurationTemplate');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');



/**Init the app */ 
const app = express();


/**Configure express */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**Set up view engine for handlebars */

app.engine('handlebars', exhbs({ defaultLayout: 'default' }));
app.set('view engine', 'handlebars');

/** Flash and session */

app.use(session({
  secret:'some secret',
  saveUninitialized: true,
  resave:true
}));

app.use(flash());

app.use(globalVars);

/**Configure app to connect MongDB */
mongoose.connect(mongoDbUrl, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(response =>{
        console.log('MongDB connection established');
    }).catch (err =>{
        console.log('An error has occured in DB connection..');
    });

/**Routing */ 

const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/', defaultRoutes);

app.use('/admin', adminRoutes);




// Init PORT and server

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error has occurred");
  } else {
    console.log("Server running at : ", PORT);
  }
});