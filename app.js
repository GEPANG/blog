const serverHandle=(req,res)=>{
    //字符处理
    res.setHeader('Content-type','application/json');
    
    const data={
        "name":"朱健999",
        "site":"gepang"
    }
    res.end(JSON.stringify(data));
}


module.exports=serverHandle;