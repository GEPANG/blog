const {exec}=require('../db/mysql');

const getList=(author,keyword)=>{
    /* return [
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
    ] */
    let sql=`select * from blogs where 1=1 `;
    if(author){
        sql +=`and author='${author}'`;
    }
    if(keyword){
        sql+=`and title like '%${keyword}%'`;
    }

    return exec(sql);
}

const getDetail=(id)=>{
    /* return [
        {
            "id":"1",
            "title":"标题A",
            "content":"内容A",
            "createtime":Date.now(),
            "author":"zhangsan"
        }
    ] */
    const sql=`select * from blogs where id='${id}' `;
    return exec(sql);
}

const newBlog=(blogData ={})=>{
   /*  return {
        id:2
    }; */
    const title=blogData.title;
    const content=blogData.content;
    const createtime=Date.now();
    const author=blogData.author;

    const sql=`
        insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createtime}','${author}');
    `;

    return exec(sql).then(insertData=>{
        return {
            id:insertData.insertId
        };
    })
}

const updateBlog=(id,blogData ={})=>{
    /* return true; */
    const title=blogData.title;
    const content=blogData.content;
    const createtime=Date.now();

    const sql=`
        update blogs set title='${title}',content='${content}',createtime='${createtime}'  where id='${id}'
    `;
    return exec(sql).then(updateData=>{
        if(updateData.affectedRows>0){
            return true;
        }
        return false;
    });
}

const delBlog=(id,author ={})=>{
    /* return true; */
    const sql=`
        delete from blogs where id='${id}' and author='${author}'
    `;
    return exec(sql).then(delData=>{
        if(delData.affectedRows>0){
            return true;
        }
        return false;
    });
}

module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}