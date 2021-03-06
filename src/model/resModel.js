class BaseModel{
    constructor(data,message){
        if(typeof data === 'string'){
            this.message=data;
            data=null;
            message=null;
        }
        if(data){           
            this.data=data;
        }
        if(message){
            this.message=message
        }
    }
}
class successModule extends BaseModel{  
    constructor(data,message){
        super(data,message);
        this.error=0;
    }
}
class errrorModule extends BaseModel{
    constructor(data,message){
        super(data,message);
        this.error=-1;
    }
}
module.exports={
    successModule,
    errrorModule
}