const posts = [{
        title: 'Post One',
        body: 'This is the body one'
    },
    {
        title: 'Post Two',
        body: 'This is the body two'
    }
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
            //output += `<li>${post.body}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callback){
    setTimeout(()=>{
    posts.push(post);
    callback();
    },2000); 
}

createPost({title: 'Post Three', body:'This is postb three'}, getPosts);