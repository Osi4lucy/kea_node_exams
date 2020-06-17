module.exports = {
    index: (req,res) =>{
      return  res.render('default/index');
    },

    loginGet: (reg, res) =>{
      return res.render('default/login');
    },

    loginPost: (req,res) =>{
      return res.send('Form submitted successfully...');
    },

    registerGet:(req,res) =>{
      return res.render('default/register');
    },
    registerPost: (req, res) => {
     return res.send('success..');
    },
};