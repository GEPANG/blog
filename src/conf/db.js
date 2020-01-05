const env=process.env.NODE_ENV;

let CONF_MYSQL;
let CONF_REDIS;
if(env==='dev'){
    CONF_MYSQL={
        host:"localhost",
        user:"root",
        password:"123456",
        port:"3308",
        database:"bopyblog"
    }
    CONF_REDIS={
        post:"6379",
        host:"127.0.0.1"
    }
}
if(env==='production'){
    CONF_MYSQL={
        host:"localhost",
        user:"root",
        password:"123456",
        port:"3308",
        database:"bopyblog"
    } 
    CONF_REDIS={
        post:"6379",
        host:"127.0.0.1"
    }
}
module.exports={
    CONF_MYSQL,
    CONF_REDIS
}