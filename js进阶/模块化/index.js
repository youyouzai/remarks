/**
 * 模拟异步加载的文件
 */
var vueFunString = `
function Vue(){
    this.name = 'vue'
    this.show = function(){
        console.log('show ' + this.name)
    }
}
exports = Vue`
var reactFunString = `
function React(){
    this.name = 'react'
    this.show = function(){
        console.log('show ' + this.name)
    }
}
exports = React`
/**
 * 模拟reque
 */
function converToArray(resources){
    if(resources instanceof Array){
        return resources
    }else{
        return Array.of(resources)
    }
}
function require(resources, callback){
    let args = []
    resources = converToArray(resources)
    resources.forEach(function(funString){
        eval(funString)
        args.push(exports)
    })
    callback.apply(null, args)
}
/**
 * 主程序-测试
 */
require(vueFunString, function(Vue){
    let vue = new Vue()
    vue.show()
})
require([vueFunString, reactFunString], function(Vue, React){
    new Vue().show()
    new React().show()
})