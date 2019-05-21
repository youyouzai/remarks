let util = {};
(function(root){
    let _ = function(){
        this.warp = undefined
    }
    _.uniq = function(arr, callback){
        let result = []
        for(let i = 0; i< arr.length; i++){
            let value = callback instanceof Function? callback(arr[i]): arr[i]
            if(result.indexOf(value) == -1){
                result.push(value)
            }
        }
        return result
    }
    _.reduce = function(arr){
        return [arr.join(',')]
    }
    _.chain = function(obj){
        if(obj instanceof _ && obj._chain == true){
            return this
        }else{
            let util = new _()
            util.warp = obj
            return util
        }
    }
    _.mixin = function(target){
        for(key in _){
            target.prototype[key] = (function(key){
                return function(){
                    let args = [this.warp]
                    args = args.concat(arguments)
                    this.warp =  _[key].apply(this, args)
                    return this
                }
            })(key)
        }
    }
    _.mixin(_)
    root._ = _
    
})(util)
let a = util._.chain([1,2,2,3]).uniq().reduce()