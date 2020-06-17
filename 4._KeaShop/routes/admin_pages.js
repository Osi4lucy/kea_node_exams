const express = require('express');
const router = express.Router();

// Get Page model

const Page = require('../models/page');
/**
 * GET pages index
 */
router.get('/', (req, res) => {
    return res.send('Admin area');
});

/**
 * GET add page index
 */
router.get('/add-page', (req, res) => {
    var title = "";
    var slug = "";
    var content = "";

    return res.render('admin/add_page', {
            title: title,
             slug: slug,
             content: content
    });

});

/**
 * POST add page by admin
 */

 router.post('/add-page', (req, res) => {
    req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('content', 'Content must have a value.').notEmpty();

    var title = req.body.title;
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();

    if (slug == "") slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;

    var errors = req.validationErrors();

    if (errors) {
        //console.log('Any error');
        return res.render('admin/add_page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content
        });
    } else {
        console.log('Success');
        Page.findOne({slug: slug}, (err, page)=>{
            if(page){
                req.flash('danger', 'Page slug exist, choose another');
                return res.render("admin/add_page", {
                  errors: errors,
                  title: title,
                  slug: slug,
                  content: content,
                });
            } else {
                const page = new Page ({
                        title: title,
                        slug:slug,
                        content:content,
                        sorting:0
                });
                page.save*((err)=>{
                    if(err) 
                        return console.log(err);

                    req.flash('success', 'Page added!');
                    res.redirect('/admin/pages');
                });
            }
        });
    }
 });


// Exports

module.exports = router;