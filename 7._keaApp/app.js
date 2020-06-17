const express = require('express');
const exhbs = require('express-handlebars');
const path = require('path');

// Init app
const app = express();

// Public folders
app.use(express.static('public'));

// Set handlebars middleware

app.set('view engine', 'handlebars');
app.engine('handlebars', exhbs({
        defaultLayout:'main',
        layoutsDir: path.join(__dirname, 'views/mainLayout')
}));


// Routing
app.get('/',(req,res)=>{
    res.render('index', { title: 'Home Page',
    style: 'home.css'});
});

app.get('/about', (req, res) => {
    res.render('about', {
        style:'about.css',
        title:'About Page',
        name: 'Solomon',
        description:'I am from Nigeria',
        isNameDisplayed: true});
});
 app.get('/helper',(req,res)=>{
    res.render('helper', {title: 'Helper Page',
        style:'helper.css',
    items: [
        "Cup",
        "Cap",
        "Computer",
        "captain"]
    })
 });

// Set up sever

const PORT = process.env.PORT || 5000;

app.listen(PORT,(err)=>{
    if(err){
        console.log('Error has occurred');
    } else {
        console.log('Server running at : ', PORT);
    }
});