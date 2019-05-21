function sort(arr){
    let digit = Math.max(...arr)
    digit = Math.floor(Math.log10(digit)) + 1
    for(let i = 0; i< digit; i++){
        arr = sortByDigit(arr, i)
        console.log(arr)
    }
    return arr
}

function sortByDigit(arr, n){
    let m = Math.pow(10, n+1)
    let barrels = new Array(10)
    for(let i = 0; i< arr.length; i++){
        let index = arr[i]%m
        if(barrels[index] !== undefined){
            barrels[index].push(arr[i]) 
        }else{
            barrels[index] = [arr[i]]
        }
    }
    let results = []
    for(let i = 0; i< barrels.length; i++){
        if(barrels[i]){
            for(let j = 0; j < barrels[i].length; j++){
                results.push(barrels[i][j])
            }
        }
    }
    return results
}

console.log(sort([2111,1111,43,56,100,99,48,45]))