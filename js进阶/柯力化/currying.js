
/** 柯力化， 分步传参，逐步求解 */
let _slice = Array.prototype.slice
function add(){ 
    let args = _slice.call(arguments)
    return args.reduce((a, b)=>{
        return a + b
    })   
}
function currying(fun){
    let _args = []
    return function curry(){
        let args = _slice.call(arguments)
        if(args.length == 0){
            return fun.apply(this, _args)
        }else{
            Array.prototype.push.apply(_args, args)
           return curry
        } 
    }
}
let result = currying(add)(3,4)(5,89,3)()
console.log(result)