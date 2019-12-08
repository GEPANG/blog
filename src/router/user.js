const login=require('../controller/user');
const {successModule,errrorModule}=require('../model/resModel');
const handleUserRouter=(req,res)=>{
    const method=req.method;   

    if(method==='POST' &&  req.path==='/api/user/login'){
       /*  return {
            "msg":'这是博客登录接口'
        } */
        const {username,password}=req.body;
        const userResult=login(username,password);
        if(userResult){
            return new successModule();
        };
        return new errrorModule("登录失败！！");
    }
}
module.exports=handleUserRouter;