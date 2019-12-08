const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog}=require('../controller/blog');
const {successModule,errrorModule}=require('../model/resModel');

const handleBlogRouter=(req,res)=>{//写接口    
    const method=req.method; 
    const id=req.query.id;

    if(method==="GET" &&  req.path==="/api/blog/list"){
        // return {
        //     "msg":'这里是博客list接口'
        // }
        /* const author=req.query.author;
        const keyword=req.query.keyword;
        const ListData=getList(author,keyword);
        if(ListData){
            return new successModule(ListData);
        }
        new errrorModule("获取失败！！");  */   

        const author=req.query.author;
        const keyword=req.query.keyword;
        const ListData=getList(author,keyword);
        return ListData.then(Data=>{
            return new successModule(Data);
        })        
    }

    if(method==="GET" &&  req.path==="/api/blog/detail"){
        /* return {
            "msg":'这里是博客detail接口'
        } */
       /*  const detailData=getDetail(id);
        return new successModule(detailData); */

        const detailData=getDetail(id);
        return detailData.then((Data)=>{
            return new successModule(Data)
        })
    }

    if(method==='POST' &&  req.path==="/api/blog/new"){
       /*  return {
            "msg":'这里是博客new接口'
        } */
        /* const blogData=req.body;
        const newResult=newBlog(blogData);
        if(newResult){
            return new successModule(newResult);
        }
        return new errrorModule('新增失败!!'); */

        const blogData=req.body;
        req.body.author='zhangsan';
        const newResult=newBlog(blogData);
        return newResult.then((data)=>{
            return new successModule(data)
       })
    }

    if(method==="POST" &&  req.path==="/api/blog/update"){
       /*  return {
            "msg":'这里是博客update接口'
        } */
        /* const blogData=req.body;
        const updataResult=updateBlog(id,blogData);
        if(updataResult){
            return new successModule();
        } */
        const blogData=req.body;
        const updataResult=updateBlog(id,blogData);
        return updataResult.then(bool=>{
            if(bool){
                return new successModule("更新博客成功!!");
            }else{
                return new errrorModule("更新博客失败!!!!");
            }            
        })
    }

    if(method==="POST" &&  req.path==="/api/blog/del"){
       /*  return {
            "msg":'这里是博客del接口'
        } */
        /* const author=req.query.author;
        const delResult=delBlog(id,author);
        if(delResult){
            return new successModule();
        } */
        const author='zhangsan';
        const delResult=delBlog(id,author);
       return delResult.then(bool=>{
           if(bool){
               return new successModule();
           }else{
                return new errrorModule("删除博客失败!!");
           }
       })
    }
}
module.exports=handleBlogRouter