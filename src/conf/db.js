const env=process.env.NODE_ENV;

let CONF_MYSQL={};
if(env==='dev'){
    CONF_MYSQL={
        host:"localhost",
        user:"root",
        password:"123456",
        port:"3308",
        database:"bopyblog"
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
}
module.exports={
    CONF_MYSQL
}