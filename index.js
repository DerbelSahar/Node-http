const http = require('http');
const hostname = 'localhost';
const port = 3000;
const fs = require('fs';)
const path = require('path');
const server = http.createServer((req,res) => {
    console.log("req for" + req.url + "by method" + req.method);
if (req.method == 'GET') {
    var fileUrl;
    if (req.utl == '/') fileUrl = '/index.html';
    else fileUrl = req.url;
    var filePath = path.resolve('./public' + fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
        fs.exists(filePath, (exists) => {
            if (!exists) { res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>error 404</h1></body></html>');
            return ;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
        })
    }
}
})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
})