const querystring=require('querystring');
const handleBlogRouter=require('./src/router/blog');
const handleUserRouter=require('./src/router/user');

const serverHandle=(req,res)=>{
    //字符处理
    res.setHeader('Content-type','application/json');
    
    const url=req.url;
    req.path=url.split('?')[0];
    req.query=querystring.parse(url.split('?')[1]);

    //处理blog路由
    const blogData=handleBlogRouter(req,res);
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        );
        return
    }

    //处理user路由
    const userData=handleUserRouter(req,res);
    if(userData){
        res.end(
            JSON.stringify(userData)
        );
        return
    }

    //处理404页面
    res.writeHead(404,{"Content-type":"text/plain"});
    res.write('404 NOT Found\n');
    res.end();
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