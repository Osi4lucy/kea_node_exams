module.exports = {
    ensureAuthenticated: (req,res, next)=>{
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to chat with others');
        res.redirect('/users/login');
    }
}