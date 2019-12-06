const getList=(athor,keyword)=>{
    return [
        {
            "id":"1",
            "title":"标题A",
            "content":"内容A",
            "createtime":Date.now(),
            "author":"zhangsan"
        },
        {
            "id":"2",
            "title":"标题B",
            "content":"内容B",
            "createtime":Date.now(),
            "author":"lisi"
        }
    ]
}
module.exports={
    getList
}