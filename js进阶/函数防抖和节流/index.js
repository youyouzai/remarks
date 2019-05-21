/**
 * 执行动作
 */
function action(){
  let i = 0;
  return function(){
    i++
    console.log(i)
  }
}

/**
 * 函数防抖-延迟加载器
 */
function layerLoader(){
  let fun = Array.prototype.shift.apply(arguments)
  let timer = null
  return function(){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(function(){
      fun.apply(this, arguments)
      timer = null
    }, 2000)  
  }
}
/**
 * 函数节流-延迟加载器
 */
function layerLoader1(){
  let fun = Array.prototype.shift.apply(arguments)
  let timer = null
  return function(){
    if(timer){
      return
    }
    timer = setTimeout(function(){
      fun.apply(this, arguments)
      timer = null
    }, 2000)
  }
}
/**
 * 模拟用户事件
 */
function eventSimulator(){
  let fun = Array.prototype.shift.apply(arguments) 
  fun.apply(this, arguments)
  let duration = Math.random()*3000
  console.log("duration=" + duration)
  setTimeout(function(){
    eventSimulator(fun,...arguments)
  }, duration)
}
/**
 * 主函数体
 */
let action1 = layerLoader(action())
// let action1 = layerLoader1(action())
eventSimulator(action1)