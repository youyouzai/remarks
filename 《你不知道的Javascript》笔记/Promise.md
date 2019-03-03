1.  一个Promise决议后，这个Promise上所有的通过then(...)注册的回调都会在下一个异步时机点上依次被立即调用。

        var p = Promise.resolve(3)
        p.then(function(){
            p.then(function(){
                console.log("C")
            })
            console.log("A")
        })
        p.then(function(){
            console.log("B")
        })
        // A/B/C, C无法打断或抢占B

2.  如果p1和p2都已经决议，那么p1.then(..)、p2.then(..)应该最终会先调用p1的回调，然后是p2的回调。谁先注册谁先被调用。

        var p3 = Promise.resolve(3)
        var p1 = Promise.resolve(2)
        p3.then(function(){
            console.log(3)
        })
        p1.then(function(){
            console.log(2)
        })

        // 3、2
    
3.  如果在Promise决议之前出现了异常错误，则这个会异常会被捕获，并且会使这个Promise被拒绝


        var p = new Promise(function(resolve,reject){
            throw "error"
            resolve(3)
        })
        p.then(
            function(val){
                console.log(val)
            },
            function(err){
                console.log("get error")
            }
        )
        // get error
        
4.  调用Promise的then(..)会自动创建一个新的Promise从调用返回。
5.  try..catch无法跨异步操作工作。 
6.  Promise API

    *     Promise.all()，传入空数组会立即完成
    *     Promise.race()，传入空数组会永远挂住
    *     Promise.none()
    *     Promise.any()
    *     Promise.first()
    *     Promise.last()


7.  若Promise链都没有处理reject，则可以在后面加上p.catch(...)



  