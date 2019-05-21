function ajax1(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('ajax1')
            resolve()
        }, 2000)
    });
}
function ajax2(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('ajax2')
            resolve()
        }, 1000)
    });
}
function ajax3(){
    console.log('ajax3') 
}
function *main(){
    yield ajax1()
    yield ajax2()
    yield ajax3()
}

function run(generator){
    let args = Array.prototype.slice.call(arguments, 1)
    let ite = generator.apply(this, args)
    
    return Promise.resolve().then(function handlerNext(){
        let next = ite.next()
        if(next.done){
            return next.value
        }
        return Promise.resolve(next.value).then(
            handlerNext,
            function(err){
                ite.throw(err)
                return Promise.reject(err)
            } 
        )
    })
}

run(main).then(
    function resolve(){
        console.log('successfully')
    },
    function reject(err){
        console.log('get error: ' + err)
    }
)