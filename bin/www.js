const http=require('http');
const serverHandle=require('../app.js');

const port =5000;

const server = http.createServer(serverHandle);

server.listen(port);