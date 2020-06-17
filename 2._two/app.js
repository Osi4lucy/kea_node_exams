const express = require ('express');
const path = require ('path');

const app = express();


app.get('/',(req, res)=>{

    return res.send('App');
})

const PORT = 4000;

app.listen(PORT,(err)=>{
    if(err){
        console.log('An error has occured...')
    } else {
        console.log('App is running: ' + PORT);
    }
});