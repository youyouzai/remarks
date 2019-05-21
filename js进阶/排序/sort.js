/**2W名员工按年龄排序
 冒泡排序、选择排序、插入培训、希尔排序、归并排序、快速排序、堆排序、计数排序、桶排序、基数排序
 */

// 堆排序
function sort(arr){
    if(arr.length == 1){
        return arr
    }
    // 拆分
    let splitArr = split(arr)
    for(let i = 0; i< splitArr.length; i++){
        splitArr[i] = sort(splitArr[i])
    }
    // 合并
    return combin(...splitArr)
}
function split(arr){
    let length = arr.length
    let a = Math.ceil(length/2)
    let fun = Array.prototype.slice;
    return [arr.slice(0, a), arr.slice(a)]
}
function combin(left, right){
    let result = []
    while(left.length > 0 && right.length > 0){
        result.push(left[0] < right[0]? left.shift(): right.shift())
    }
    return result.concat(left).concat(right)
}
let start = new Date().getTime()
let arr = []
for(let i = 0; i<20000; i++){
    arr.push(Math.ceil(Math.random()*20000))
}
let end = new Date().getTime()
console.log(sort(arr))
console.log('spendTime = ' + Math.ceil((end-start)))
