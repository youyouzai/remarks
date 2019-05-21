function sort(arr){
    let length = arr.length - 1
    for(let i = 0; i< length; i++){
        for(let j = 0; j < length - i ; j++){
            if(arr[j] > arr[j+1]){
                let b = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = b
            }
        }
    }
    return arr
}
console.log(sort([3,7,1,9]))