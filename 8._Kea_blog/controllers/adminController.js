const Post = require('../models/BlogPostModel').Post;

module.exports ={
     index: (req, res) => {
         return res.render('admin/index');
     },

     getPosts:(req,res)=>{
         return res.render('admin/posts/index');
         //res.send('post');
     },

     submitPosts:(req,res)=>{
        const newPost = new Post ({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        });

        newPost.save().then(post =>{
            console.log(post);
            req.flash('success-message', 'Post created');
            res.redirect('/admin/posts');
        });
     },

     createPosts: (req,res) =>{
         return res.render('admin/posts/create');
     }
}