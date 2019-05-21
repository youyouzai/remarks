function sort(arr, start = 0, end = arr.length-1){
    if(start < 0 || end <= start || end >= arr.length){
        return
    }
    let target = arr[start]
    let speration = start
    for(let i = start+1; i<= end; i++){
        if(arr[i] < target){
            if(i > speration +1){
                swap(arr, speration+1, i)
            }   
            speration ++
        }
       
    }
    swap(arr, start, speration)
    console.log(arr)
    // 排序两个子队列
    sort(arr, start, speration-1)
    sort(arr, speration+1, end)
    return arr
}
function swap(arr, i, j){
    if(i != j){
        var b = arr[i]
        arr[i] = arr[j]
        arr[j] = b
    }  
}

console.log(sort([100,3,4,5,1,99,3,7,1,9]))