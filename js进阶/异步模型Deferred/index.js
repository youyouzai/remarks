function Deffered(){
    this.chain = []
    this.id = setTimeout(function(){}, 1)
    this.fired = -1
    this.paused = 0
    this.results = [null, null]
    this.canceller = null
    this.silentlyCancelled = false
    this.chained = false
}
// curry(fn, window, args)
function curry(fn, scope, args){
    return function(){
        var argv = [].concat.apply(args, arguments)
        return fn.apply(scope, argv)
    }
}
Deffered.prototype = {
    // 3种状态：未触发，触发成功，触发失败
    state: function(){
        if(this.fired == -1){
            return 'unfired'
        }else if(this.fired === 0){
            return 'success'
        }else{
            return 'error'
        }
    },
    // 取消触发：类似于ajax的abort
    cancel:function(e){
        if(this.fired == -1){
            if(this.canceller){
                this.canceller(this)
            }else{
                this.silentlyCancelled = true
            }
            if(this.fired === -1){
                if(!e instanceof Error){
                    e = new Error(e + '')
                }
                this.errback(e)
            }
        }else if((this.fired === 0) && (this.results[0] instanceof Deffered)){
            this.results[0].cancel(e)
        }
    },
    // 这里决定使用哪个队列
    _resback: function(res){
        this.fired = ((res instanceof Error)? 1: 0)
        this.results[this.fired] = res
        if(this.paused === 0){
            this._fire()
        }
    },
    // 判定是否触发过
    _check: function(){
        if(this.fired != -1){
            if(!this.silentlyCancelled){
                throw new "此方法已经被调用过"
            }
            this.silentlyCancelled = false
            return
        }
    },
    //触发成功队列
    callback: function(res){
        this._check()
        if(res instanceof Deffered){
            throw new Error("Defferred instance can only be chained if they are the result of a callback")
        }
        this._resback(res)
    },
    // 触发错误队列
    errback: function(res){
        this._check()
        if(res instanceof Deffered){
            throw new Error("Defferred instance can only be chained if they are the result of a callback")
        }
        if(!(res instanceof Error)){
            res = new Error(res + "")
        }
        this._resback(res)
    },
    // 同时添加成功与错误回调
    addBoth: function(a, b){
        b = b || a
        return this.addCallbacks(a, b)
    },
    //添加成功回调
    addCallback: function(fn){
        if(arguments.length > 1){
            var arg = [].slice.call(arguments, 1)
            fn = curry(fn, window, args)
        }
        return this.addCallbacks(fn, null)
    },
    // 添加错误回调
    addErrback: function(fn){
        if(arguments.length > 1){
            var args = [].slice.call(arguments, 1)
            fn = curry(fn, window, args)
        }
        return this.addCallbacks(null, fn)
    },
    // 同时添加成功回调与错误回调，后来Promise的then方法是参考它设计
    addCallbacks: function(cb, eb){
        if(this.chained){
            throw new Error("Chained Deffereds can not be re-used")
        }
        if(this.finalized){
            throw new Error("Finalized Deffereds can not be re-used")
        }
        this.chain.push([cb, eb])
        if(this.fired >= 0){
            this._fire()
        }
        return this
    },
    // 将队列的回调依次触发
    _fire: function(){
        var chain = this.chain
        var fired = this.fired
        var res = this.results[fired]
        var self = this
        var cb = null
        while(chain.length > 0 && this.paused >= 0){
            var pair = chain.shift()
            var f = pair[fired]
            if(f === null){
                continue
            }
            try{
                res = f(res)
                fired = ((res instanceof Error)? 1: 0)
                if(res instanceof Deffered){
                    cb = function(res){
                        self.paused--
                        self._resback(res)
                    }   
                } 
                this.paused++
            }catch(err){
                fired = 1
                if(!(err instanceof Error)){
                    try{
                        err = new Error(err + "")
                    }catch(e){
                        console.log("get error: " + e)
                    }
                }
                res = err
            }
        }
        this.fired = fired
        this.results[fired] = res
        if(cb && this.paused){
            res.addBoth(cb)
            res.chained = true
        }
    }
}
/**
 * 主函数-测试
 */
function increment(value){
    console.log(value)
    return value + 1
}
/**
 * results:
 * 1
 * 2
 * 3
 */
// var d = new Deffered()
// d.addCallback(increment)
// d.addCallback(increment)
// d.addCallback(increment)
// d.callback(1)
/**
 * results
 * 3
 * 4
 * Error：抛错！
 * 出错 回复正常
 */
var d = new Deffered()
d.addCallback(function(a){
    console.log(a)
    return 4
}).addBoth(function(a){
    console.log(a)
    throw "抛错"
},function(b){
    console.log(b)
    return "XXX"
}).addBoth(function(a){
    console.log(a)
    return "正常"
},function(b){
    console.log(b + "!")
    return "出错"
}).addBoth(function(a){
    console.log(a + "回复正常")
    return "正常2"
}, function(b){
    console.log(b + "继续出错")
    return "出错2"
})
d.callback(3)


