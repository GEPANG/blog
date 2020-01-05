

const fs=require('fs');
const path=require('path');

function createWriteStream(filename){
    const fullName=path.join(__dirname,'../','../','logs',filename);
    const writeStream=fs.createWriteStream(fullName,{
        flags:'a'
    });
    return writeStream
}

//写日志
function log(writeStream,logs){
    writeStream.write(logs+'\n');
}

//写访问日志
const accessWriteStream=createWriteStream('access.log');
function access(logs){    
    log(accessWriteStream,logs);
}

module.exports={
    access
}