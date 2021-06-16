var http = require('http')
const fs = require('fs')
const db = require('./daos')
const port = 3001;
const hasBody = function(req) {
    return  'transfer-encoding'  in  req.headers  ||  'content-length' in req.headers;
  };
http.createServer(function (req, res) {
    const {header,method,url} = req;
    console.log(`method is ${method}, url is ${url}`);
    if(method=="GET" && url==='/users'){
        let body = db.opendb();
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(body))
    }else if(method=="POST" && url === "/user"){
        if(hasBody(req)){
            let buffer = [];
            let body = '';
            req.on('data', (chunk) => {
                buffer.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(buffer).toString();
                console.log(`Server get data ${body}`);
                try {
                    body = JSON.parse(body)
                } catch (error) {
                    console.log(error)
                }
            })
        
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(body)
        }else{
            res.writeHead(404);
            res.end('Not found body')
        }
    }else{
        let html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(html)
    }
}).listen(port, '127.0.0.1')
console.log(`Server running at http://127.0.0.1:${port}/`)
