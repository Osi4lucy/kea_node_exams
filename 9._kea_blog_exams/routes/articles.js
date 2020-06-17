const express = require('express');
const router = express.Router();
const Article = require('../models/Articles');


// Route to get new article
router.get('/new', (req, res)=>{
    res.render('articles/new', {article: new Article()});
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article });
});


router.get('/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id);
    if(article == null) res.redirect('/articles')
    res.render('articles/show', {article: article});
})

router.get('/', async (req,res)=>{
    const articles = await Article.find().sort({dateCreated:'desc'});

res.render('articles/index', {articles:articles})
});


router.post('/', async (req,res, next)=>{
   req.article = await Article();
   next();
}, saveArticleAndRedirect('new'));

router.put('/:id', async (req,res, next)=>{
   req.article = await Article.findById(req.params.id);
   next();
}, saveArticleAndRedirect('/articles/edit'));

// function to save and redirect

function saveArticleAndRedirect(path) {
    return async (req, res) => {
       let article = req.article
       article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
    try{
         await article.save()
         res.redirect(`/articles/${article.id}`)
    } catch (e){
        console.log(e);
        res.render(`articles/${path}`, {article:article});
    }
  
    }
}

router.delete('/:id', async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles');
});

module.exports = router;