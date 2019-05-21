Function.prototype.before = function(){
    let _self = this
    let fn = Array.prototype.shift.apply(arguments)
    return function(){
        fn.apply(this)
        _self.apply(this, arguments)
    }
}

Function.prototype.after = function(){
    let _self = this
    let fn = Array.prototype.shift.apply(arguments)
    return function(){
        _self.apply(this, arguments)
        fn.apply(this)
    }
}

function main(a,b){
    console.log(a + '-' + b)
}
main = main.before(function(){
    console.log('before')
}).after(function(){
    console.log('after')
})
main(3,4)