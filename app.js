const querystring=require('querystring');
const handleBlogRouter=require('./src/router/blog');
const handleUserRouter=require('./src/router/user');
const {set,get}=require('./src/db/redis');
/* //session 数据
const SESSION_DATA={}; */

//设置过期时间
const geteExpires=()=>{
    const d=new Date();
    d.setTime(d.getTime()+(24*60*60*1000));
    return d.toGMTString();
}

//post data处理
const getPostData=(req)=>{
    const promise=new Promise((resolve,reject)=>{
        if(req.method!=='POST'){
            resolve({})
            return;
        }        
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return;
        }

        let postData='';
        req.on("data",(chunk)=>{     
            postData += chunk.toString();    
        })    
        req.on("end",()=>{
          if(!postData){
            resolve({});
            return
          }  
          resolve(
              JSON.parse(postData)
          );
        })
    })
    return promise;
}

const serverHandle=(req,res)=>{
    //字符处理
    res.setHeader('Content-type','application/json');
    
    const url=req.url;
    req.path=url.split('?')[0];
    req.query=querystring.parse(url.split('?')[1]);

    //处理blog路由
    /* const blogData=handleBlogRouter(req,res);
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        );
        return
    } */

    //解析cookie
    req.cookie={};
    const cookieStr=req.headers.cookie || '';
    cookieStr.split(";").forEach(item => {
        if(!item){
            return;
        }
        const arr=item.split('=');
        const key=arr[0].trim();
        const val=arr[1].trim();
        req.cookie[key]=val;
    });

    /* //解析session
    let userId=req.cookie.userid;
    let needCookie=false;
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId]={};
        } 
    }else{
        needCookie=true;
        userId=`${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId]={};
    }    
    req.session=SESSION_DATA[userId];
 */

    //解析session用redis
    let userId=req.cookie.userid;
    let needCookie=false;
    if(!userId){
        needCookie=true;
        userId=`${Date.now()}_${Math.random()}`;
        set(userId,{});
    }

    req.session=userId;
    get(req.session).then(sessionData=>{
        if(sessionData == null){
            set(userId,{});
            req.session={};
        }else{            
            req.session=sessionData;
        }

        //处理blog路由      
        return getPostData(req)
    }).then(postData=>{
        req.body=postData;
        const blogData=handleBlogRouter(req,res);
        /* if(blogData){
            res.end(
                JSON.stringify(blogData)
            );
            return
        } */
       if(blogData){
            blogData.then((Data)=>{
                if(needCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${geteExpires()}`);
                }
                res.end(
                    JSON.stringify(Data)
                )
            })
            return;
       }

        //处理user路由
        /* const userData=handleUserRouter(req,res);
        if(userData){
            res.end(
                JSON.stringify(userData)
            );
            return
        } */

        const userData=handleUserRouter(req,res);
        if(userData){
            userData.then(data=>{
                if(needCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${geteExpires()}`);
                }
                res.end(
                    JSON.stringify(data)
                )
            })
            return;
        }

        //处理404页面
        res.writeHead(404,{"Content-type":"text/plain"});
        res.write('404 NOT Found\n');
        res.end();
    });   
}

module.exports=serverHandle;
/*
const data={
        "name":"朱健999",
        "site":"gepang",
        "env":process.env.NODE_ENV
    }
    res.end(JSON.stringify(data));
*/