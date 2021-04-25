const http=require('http');
const server=http.createServer(function f1(req,res){
    res.write("hello guys");
    res.end();
}).listen(8000);
