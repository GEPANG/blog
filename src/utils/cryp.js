/* const crypto=require('crypto');

const SECRET_KEY='WJiol_8776#'

function md5(content){
    let md5=crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

function genPassword(password){
    const str=`password=${password}&key=${SECRET_KEY}`
    return md5(str);
}
module.exports={
    genPassword
} */
const crypto=require('crypto');

const SECRET_KEY='WJiol_8776#';

//加密方法
function md5(content){
    let md5=crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

//加密函数
function genPassword(password){
    const str=`password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}
// const result=genPassword('789');
// console.log(result);
module.exports={
    genPassword
}