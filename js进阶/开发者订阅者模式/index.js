/**
 * 发布者/订阅者模式
 */
function Agency(){
    this.subscriberMap = {}
}
Agency.prototype.dispatch = function(key){
    if(!this.subscriberMap.hasOwnProperty(key)){
        return
    }
    let args = Array.prototype.slice.call(arguments, 1)
    let values = this.subscriberMap[key]
    for(let i = 0; i < values.length; i++){
        if(values[i] instanceof Function){
            values[i].apply(this, args)
        }
    }
}
Agency.prototype.subscribe = function(key, callback){
    if(this.subscriberMap.hasOwnProperty(key)){
        this.subscriberMap[key].push(callback)
    }else[
        this.subscriberMap[key] = [callback]
    ]
}
/**
 * 主程序——测试
 */
let agency = new Agency()

agency.subscribe('click', function(){
    console.log('click.arguments=' + JSON.stringify(arguments))
})
agency.subscribe('click', function(){
    console.log('click1.arguments=' + JSON.stringify(arguments))
})
agency.subscribe('move', function(){
    console.log('move.arguments=' + JSON.stringify(arguments))
})

agency.dispatch('click', 1,2)
agency.dispatch('click', 666)
agency.dispatch('move', {x: 12, y: 13})