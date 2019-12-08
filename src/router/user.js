const login=require('../controller/user');
const {successModule,errrorModule}=require('../model/resModel');

const geteExpires=()=>{
    const d=new Date();
    d.setTime(d.getTime+(24*60*60*1000));
    return d.toGMTString();
}

const handleUserRouter=(req,res)=>{
    const method=req.method;   
    //POST
    if(method==='GET' &&  req.path==='/api/user/login'){
       /*  return {
            "msg":'这是博客登录接口'
        } */
       /*  const {username,password}=req.body;
        const userResult=login(username,password);
        if(userResult){
            return new successModule();
        };
        return new errrorModule("登录失败！！"); */
        const {username,password}=req.query;
        const userResult=login(username,password);
        return userResult.then(data=>{
            if(data.username){
                res.setHeader('Set-Cookie',`username=${data.username};path=/;httpOnly;expires=${geteExpires()}`);
                return new successModule();
            };
            return new errrorModule("登录失败！！");
        })
    }    

    if(method ==='GET' && req.path==='/api/user/login-test'){
        if(req.cookie.username){
            return Promise.resolve(new successModule({
                username:req.cookie.username
            }))
        }        
        return Promise.resolve(new successModule("尚未登录！"))
    }

}
module.exports=handleUserRouter;