
const handleBlogRouter=(req,res)=>{
    //写接口
    const method=req.method; 

    if(method==="GET" &&  req.path==="/api/blog/list"){
        return {
            "msg":'这里是博客list接口'
        }
    }
    if(method==="GET" &&  req.path==="/api/blog/detail"){
        return {
            "msg":'这里是博客detail接口'
        }
    }
    if(method==='POST' &&  req.path==="/api/blog/new"){
        return {
            "msg":'这里是博客new接口'
        }
    }
    if(method==="POST" &&  req.path==="/api/blog/update"){
        return {
            "msg":'这里是博客update接口'
        }
    }
    if(method==="POST" &&  req.path==="/api/blog/del"){
        return {
            "msg":'这里是博客del接口'
        }
    }
}
module.exports=handleBlogRouter