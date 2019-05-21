function Promise(fn){
    function resolve(data){
        promise.resolve(data)
    }
    function reject(){
        promise.reject()
    }
    let promise = {
        status: 'pending',
        data: null,
        resolve(data){
            this.data = data
            this.status = 'resolved'
        },
        reject(){
            this.status = 'rejected'
        },
        then(resolve, reject){
            if(this.status === 'resolved'){
                resolve(this.data)
            }else if(this.status === 'rejected'){
                reject(this.data)
            }
        }
    }
    fn(resolve, reject)
    return promise
}
let promise = new Promise(function(resolve){
    resolve('333')
})
promise.then(function(data){
    console.log(data)
})