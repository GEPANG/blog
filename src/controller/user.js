
const {exec,escape}=require('../db/mysql');
const {genPassword}=require('../utils/cryp');

const login=(username,password)=>{    
   /*  if(username ==="zhangsan" && password === "123"){
        return true
    }
    return false */
    username=escape(username)
    password=genPassword(password);
    password=escape(password)

    const sql=`
        select username,realname from users where username=${username} and password=${password}
    `;
    return exec(sql).then(Rows=>{
        return Rows[0] || {};
    })
}
module.exports={
    login
};