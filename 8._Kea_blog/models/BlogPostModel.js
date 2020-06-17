const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    status: {
        type: String,
            required: 'public'
    },
     description: {
         type: String,
         required: true,
     },

     creationDate: {
         type: Date,
         default: Date.now()
     }
});

module.exports = {Post: mongoose.model('post', BlogPostSchema)};
