function Deferred(){
    return (this instanceof Deferred)? this.init() : new Deferred()
}
Deferred.ok = function(x){
    return x
}
Deferred.ng = function(x){
    throw x
}
Deferred.prototype = {
    init: function(){
        this._next = null
        this.callback = {
            ok: Deferred.ok,
            ng: Deferred.ng
        }
        return this
    },
    next: function(fun){
        return this._post("ok", fun)
    },
    error: function(fun){
        return this._post("ng", fun)
    },
    call: function(valu){
        return this._fire("ok", val)
    },
    fail: function(err){
        return this._fire("ng", err)
    },
    cancel: function(){
        (this.canceller || function(){})()
        return this.init()
    },
    _post: function(okng, fun){
        this._next = new Deferred()
        this._next.callback[okng] = fun
        return this._next
    },
    _fire: function(okng, value){
        var next = "ok"
        try{
            value = this.callback[okng].call(this, value)
        }catch(e){
            next = "ng"
            value = e
        }
        if(value instanceof Deferred){
            value._next = this._next
        }else{
            if(this._next){
                this._next._fire(next, value)
            }
        }
        return this
    }
}
/**
 * 主函数-测试
 */
Deferred.next(function(){
    console.log(this)
    a = this
    console.log("a1")
}).next(function(){
    console.log(this)
    b = this
    console.log(a !== b)
    console.log("a1")
})