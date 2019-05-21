/**
 * 模拟异步请求
 */
function ajax1(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('ajax1')
            resolve()
        }, 2000)
    })
   
}
function ajax2(){
    console.log('ajax2')
}
function ajax3(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('ajax3')
            resolve()
        }, 1000)
    })
}
/**
 * 生成器
 */
function *main(){
    yield ajax1()
    yield ajax2()
    yield ajax3()
}
function run(iterator){
    let args = Array.prototype.slice.call(arguments, 1)
    let ite = iterator.apply(this, args)
    return Promise.resolve().then(function handlerNext(){
        let next = ite.next()
        if(next.done){
            return next.value
        }
        return Promise.resolve(next.value).then(
            handlerNext,
            function(err){
                ite.throw(err)
                Promise.resolve(err)
            }
        )
    }).catch(function(err){
        return Promise.reject(err)
    })
}
run(main).then(
    function resolve(){
        console.log('successfully!')
    },
    function reject(){
        console.log('fail!')
    }
)

function run1(){
    return Promise.resolve().then(function(){
         return Promise.reject(3)
    })
}
run1().then(
    function resolve(){
        console.log('resolve')
    },
    function reject(err){
        console.log('reject:'+err)
    }
)