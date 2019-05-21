function sort(arr){
    let length = arr.length - 1
    for(let i = 0; i< length; i++){
        for(let j = i + 1; j < length ; j++){
            if(arr[j] < arr[i]){
               let b = arr[j]
               arr[j] = arr[i]
               arr[i] = b
            }
        }
    }
    return arr
}
console.log(sort([100,3,4,5,1,99,3,7,1,9]))