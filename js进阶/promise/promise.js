class Promise{
    constructor(fn){
        this._status = 'pending'
        this.data = null;
        this.resolveQueue = []
        this.rejectQueue = []
        if(isFn(fn)){
            let slice = Array.prototype.slice
            let $this = this
            fn.call(this, function(data){
                $this.resolve(data)
            }, (data) => {
                this.reject(data)
            })
        }else{
            this.status = 'resolved'
        }
    }
    set status(value){
        if(this._status === 'pending'){
            this._status = value
        }
    }
    get status(){
        return this._status
    }
    resolve(data){
        this.data = data
        this.status = 'resolved'
        this.execute()
    }
    reject(data){
        this.data = data
        this.status = 'rejected'
        this.execute()  
    }
    execute(){
        try{
            
            if(this.status === 'resolved'){
                this.resolveQueue.forEach(fn=> fn(this.data))
            }else if(this.status === 'rejected'){
                this.rejectQueue.forEach(fn => fn(this.data))
            }
        }catch(e){
            this.catch(e)
        }
        
    }
    then(resolve, reject){
        if(isFn(resolve)){
            this.resolveQueue.push(resolve)
        }
        if(isFn(reject)){
            this.rejectQueue.push(reject)
        }
        this.execute()
    }
    catch(fn){
        this.then(null, fn)
    }
}
function isFn(obj){
    return toString.call(obj) === '[object Function]'
}
Promise.resolve = function(data){
    let promise = new Promise()
    promise.status = 'resolved'
    promise.data = data
    return promise
}
Promise.resolve = function(data){
    let promise = new Promise()
    promise.status = 'rejected'
    promise.data = data
    return promise
}

var promise = new Promise(function(resolve, reject){
    reject('333')
}).catch(e=>{
    console.log(e)
})