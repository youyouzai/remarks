function ajax1(){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            console.log("ajax1")
            resolve()
        }, 2000)
    })
}
function ajax2(){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            console.log("ajax2")
            resolve()
        }, 1000)
    })
    
}
function ajax3(){
    throw new Error("good day")
}
function *main(){
    yield ajax1();
    // yield ajax3()
    yield ajax2();
}
function run(){
    let gen = Array.prototype.shift.call(arguments)
    let ite = gen.apply(this, arguments)
    return Promise.resolve().then(function handlerNext(value){
        let next = ite.next()
        return (function handlerResult(next){
            if(next.done){
                return next.value
            }
            return Promise.resolve(next.value).then(
                handlerNext,
                function handlerError(err){
                    return Promise.resolve(function(){
                        ite.throw(err)
                    })
                }
            )
        })(next)
    }).catch(function(err){
        return Promise.reject(err)
    })
}
run(main).then(function resolve(){
    console.log("successfully")
},function reject(err){
    console.error("get error: " +err.message)
})