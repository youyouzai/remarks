function Deffered(){
    this._next = null
    this._callback = {
        'ok': null,
        'fail': null
    }
}
Deffered.prototype = {
    _post(fn, ng){
        if(!(fn instanceof Function)){
            throw new Error('next parameter must be funciton')
        }
        let deffered = new Deffered()
        deffered._callback[ng] = fn
        
        this._next = deffered
        return deffered
    },
    next(fn){
       return this._post(fn, 'ok')
    },
    fail(fn){
       return this._post(fn, 'fail')
    },
    callback(val){
        let deffered = this._next
        if(!deffered){
            return val
        }
        let ng = 'ok'
        if(val instanceof Error){
            ng = 'fail'
        }
        try{
            val = deffered._callback[ng].call(deffered, val)
        }catch(err){
            if(!(err instanceof Error)){
                err = new Error(err)
            }
            val = err 
        }
        val =  deffered.callback(val)
        return val
    }
}

/**
 * 主函数-测试
 */
let deffered = new Deffered()
deffered.next(function(){
    console.log("a1")
}).next(function(){
    console.log("b1")
    throw 'Error: kaokao'
}).fail(function(err){
    console.log("回复正常, the error is gone :" + err)
}).next(function(){
    console.log('successfully')
})

deffered.callback('wowo')