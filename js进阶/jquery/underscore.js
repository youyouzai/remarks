(function(root){
    var optionsCache = {}
    var _ = {
        Callbacks: function(options){
            options = typeof options === 'string'? (optionsCache[options] || createOptions(options)): {}
            var list = [];
            var index = 0, length, testing, memory;
            var fire = function(data){
                memory = options.memory && data
                testing = true;
                index = memory? index: 0;
                length = list.length;
                for(; index < length; index++){
                    if(list[index].apply(data[0], data[1]) === false && options.stopOnFalse){
                        break
                    }
                }
            }
            var self = {
                add: function(){
                    var args = Array.prototype.slice.call(arguments)
                    args.forEach(function(fn){
                        if(toString.call(fn) === '[object Function]'){
                            list.push(fn)
                        }
                    })
                    memory && fire(memory)
                },
                fireWith: function(context, arguments){
                    var args = [context, arguments]
                    if(!options.once || !testing){
                        fire(args)
                    }
                    
                },
                fire: function(){
                    self.fireWith(this, arguments)
                }
            }
            return self;
        },
        Deffered: function(func){
            // 延迟对象三种不同状态信息描述
            var tuples = [
                ['resolve', 'done']
            ]
        }
    }
    function  createOptions(options){
        var object = optionsCache[options] = {}
        options.split(/\s+/).forEach(function(value) {
            object[value] = true
        });
        return object
    }
    root._ = _
})(this)