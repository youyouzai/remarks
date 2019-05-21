function Deffered(){
    this.chain = []
    this.paused = 0
    this.fire = -1
}
Deffered.prototype = {
    state(){
        switch(this.fire){
            case -1:
                return '未调用'
            case 0:
                return '成功'
            case 1:
                return '失败'
        }
    },
    addCallback: function(fn){
        if(!(fn instanceof Function)){
            throw new Error('parameters of addCallback must be Function!')
        }
        return this.addBoth(fn, null)
    },
    addErrBack: function(fn){
        if(!(fn instanceof Function)){
            throw new Error('parameters of addErrBack must be Function!')
        }
        return this.addBoth(null, fn)
    },
    addBoth: function(cb, eb){
        if(!(cb instanceof Function) && !(eb instanceof Function)){
            throw new Error('parameters cb must be Function!')
        }
        this.chain.push([cb, eb])
        return this
    },
    callback: function(res){
        let fire = 0
        while(this.chain.length >0 && this.paused ===0){
            let node = this.chain.shift()
            let fn = node[fire]
            if(fn){
                try{
                    res = fn(res)
                    fire = 0
                }catch(err){
                    if(!(err instanceof Error)){
                        err = new Error(err)
                    }
                    res = err
                    fire = 1
                }
                this.fire = fire
            }
        }
        return res
    },
    cancel(){
        this.paused = 1
        this.fire = 2
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