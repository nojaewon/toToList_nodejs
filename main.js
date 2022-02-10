const fetch = require('node-fetch');
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./template/template.js');

const app = http.createServer((req, res)=>{
    const url_ = req.url;
    const path = url.parse(url_, true).path;
    const model = JSON.parse(fs.readFileSync('model/toDos.json'));

    if(path === '/'){
        res.writeHead(200);
        res.end(template.index(model));
    } else if(path === '/submit'){
        let body='';
        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            var post = qs.parse(body);
            console.log(post.todo);
            fetch('http://localhost:3000/thingsToDo',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    'what' : post.todo,
                    'how' : 'youtube'
                })
            }).then(()=>{
                res.writeHead(302, {'Location': '/'});
                res.end();
            })
        });
        
        
        // res.redirect('/'); express
    } else {
        res.writeHead(404);
        res.end("not found");
    }
});

app.listen(4000);