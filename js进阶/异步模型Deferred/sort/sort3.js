function sort(arr){
    let i,j
    for(i = 1; i<arr.length; i++){
        if(arr[i] < arr[i-1]){
            let b = arr[i]
            for(j = i; j>=1 && b < arr[j-1]; j--){
                arr[j] = arr[j-1] 
            }  
            arr[j] = b 
        }
        console.log(arr)
    }
    return arr
}
console.log(sort([ 3, 100, 4, 5, 1, 99, 100, 3, 7, 1, 9]))