function sort(arr){
    let leng = arr.length
    for(let gap = Math.floor(leng/2); gap>0 ; gap = Math.floor(gap/2)){
        for(let j = gap; j<leng; j+=gap){
            if(arr[j] < arr[j-1]){
                let k, temp = arr[j]
                for(k =j; k>0 && temp < arr[k-gap]; k-=gap){
                    if(temp<arr[k-gap]){
                        arr[k] = arr[k-gap] 
                    }
                }
                arr[k] = temp
                console.log('gap=' + gap + ', arr=' + arr)
            }
        }
       
    }
    return arr
}

console.log(sort([ 10, 9, 8, 7, 6]))