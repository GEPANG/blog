const {CONF_REDIS}=require('../conf/db');
const redis=require('redis');

const redisClient=redis.createClient(CONF_REDIS.port,CONF_REDIS.host);
redisClient.on('error',err=>{
    console.error(err);
})

function set(key,val){
    if(val === 'object'){
        val=JSON.stringify(val);
    }
    redisClient.set(key,val,redis.print);
}

function get(key){
    const promise=new Promise((resolve,reject)=>{
        redisClient.get(key,(err,data)=>{
            if(err){
                reject(err);
            }
            if(data===null){
                resolve(null);
            }

            try{                
                resolve(
                    JSON.parse(data)
                );
            }catch(e){
                resolve(data);
            }
        })
    });
    
    return promise;
}

module.exports={
    set,get
}