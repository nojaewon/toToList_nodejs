const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('../template/template.js');

const app = http.createServer((req, res)=>{
    const url_ = req.url;
    const path = url.parse(url_, true).path;
    const model = JSON.parse(fs.readFileSync('model/toDos.json'));

    if(path === '/'){
        res.writeHead(200);
        res.end(template.index(model));
    } else if(path === '/submit'){
        let body = ``;
        req.on('data', function(data){
            body += data;
        })

        req.on('end', function(){
            let post = qs.parse(body);
            console.log(post);
        })

        fetch('/model',{
            method: "POST",
            body: JSON.stringify({
                what: post.what,
                how : post.how,
            }),
            headers: {
                "content-type":"application/json; charset=UTF-8",
            },
        }).then(()=>{
            req.writeHead(302, {Location: `/`});
            req.end();
        });
    } else {
        res.writeHead(404);
        res.end("not found");
    }
});

app.listen(3000);