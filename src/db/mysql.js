const {CONF_MYSQL}=require('../conf/db');
const mysql=require('mysql');

//创建连接对象
const con=mysql.createConnection(CONF_MYSQL);

//开始连接
con.connect();

// const sql=``;
function exec(sql){
    const promise=new Promise((resolve,reject)=>{        
        con.query(sql,(err,result)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(result)
        }); 
    })
    return promise;
}

module.exports={
    exec,
    escape:mysql.escape
}