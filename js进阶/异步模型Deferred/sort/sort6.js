function sort(arr){
    let min = Infinity, max = -Infinity
    for(let i = 0; i< arr.length; i++){
        min = arr[i]<min? arr[i]: min
        max = arr[i]>max? arr[i]: max
    }
    let countArr = new Array(max-min + 1).fill(0)
    for(let i = 0; i< arr.length; i++){
        let value = arr[i] - min
        countArr[value] = countArr[value] + 1
    }
    let result = []
    for(let i = 0; i< countArr.length; i++){
        for(let j = 0; j<countArr[i]; j++){
            result.push(i + min)
        }
    }
    return result
}
console.log(sort([100,3,4,5,1,99,3,7,1,9]))