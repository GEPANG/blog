
const handleUserRouter=(req,res)=>{
    const method=req.method;   

    if(method==='POST' &&  req.path==='/api/user/login'){
        return {
            "msg":'这是博客登录接口'
        }
    }
}
module.exports=handleUserRouter;