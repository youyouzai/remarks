var Modules = function(){
    var depsMap = {}
    function define(name, deps, fn){
        // 初始化依赖引用
        var args = []
        for(let i = 0; i< deps.length; i++){
            deps[i] = get(deps[i])
        }
        depsMap[name] =  fn.apply(fn, deps)
    }
    function get(name){
        if(depsMap.hasOwnProperty(name)){
            return depsMap[name]
        }else{
            return getError(name)
        }  
    }
    function getError(name){
       return new Error('module Error: can\'t find module \''+name+'\'' )
    }
    return {
        define,
        get
    }
}()

/** 主程序-测试 */
Modules.define('bar', [], function(){
    function hello(who){
        return 'hello, ' + who
    }
    return {hello}
})
Modules.define('foo', ['bar'], function(bar){
    let name = 'lzg'
    function speak(){
        let res = bar.hello(name)
        console.log(res)
    }
    return {speak}
})
let fn = Modules.get('foo')
fn.speak()
