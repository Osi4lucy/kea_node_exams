const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useUnifiedTopology:true}, (err)=>{
    if(!err) {console.log('MongodDB connection successful..')}
    else {console.log('Error in DB connection: ' + err)}
});

require('./employee.model');