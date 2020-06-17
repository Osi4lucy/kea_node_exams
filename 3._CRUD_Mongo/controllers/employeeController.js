const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Employee = mongoose.model('employee')

router.get('/', (req, res)=>{
    return res.render("employee/addOrEdit", {
        viewTitle: "Insert an Employee"
    });
});
router.post('/',(req,res)=>{
    insertPerson(req,res);
});
function insertPerson(req, res){
    const employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) =>{
        if(!err)
        res.redirect('employee/list');
        else {
            if (err.name == validationError){
            handleValidationError(err, reg.body);
                return res.render("employee/addOrEdit", {
                    viewTitle: "Insert an Employee",
                    employee: reg.body
                });
            }
        else
            console.log('Error in database : ' + err);
        }
    });
}

router.get('/list',(req,res) =>{
    return res.json('New list');
});


function handleValidationError(err, body) {
    for(field in err.errors){
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;