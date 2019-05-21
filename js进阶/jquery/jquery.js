(function(root){
    var rejectExp = /<(\w+)\s*\/?>(?:<\/\1>)$/;
    var redayList = []
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
    var wrapMap = {
        option: [1, "select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    }
    var jQuery = function(selector, context){
        return new jQuery.prototype.init(selector, context)
    }
    jQuery.expando = 'zgliu3'
    function completed() {
        document.removeEventListener( "DOMContentLoaded", completed );
        window.removeEventListener( "load", completed );
        jQuery.ready()
    }

    jQuery.fn = jQuery.prototype = {
        length: 0,
        selector: '',
        init: function(selector, context){
            context = context || document
            var match, elem, index = 0;
            if(!selector){
                return this
            }
        
            if(typeof selector === 'string'){
                if(selector.charAt(0) === '<' &&selector.charAt(selector.length - 1) === '>' && selector.length >=3){
                    match = [selector]
                }
                // 创建DOM
                if(match){
                    jQuery.merge(this, jQuery.parseHTML(selector, context));
                } else {
                    elem = document.querySelectorAll(selector)
                    var elems = Array.prototype.slice.call(elem)
                    this.length = elems.length
                    for(; index < elems.length; index++){
                        this[index] = elems[index]
                    }
                    this.context = context;
                    this.selector = selector
                }
            }else if(selector.nodeType){
                this.context = this[0] = selector
                this.length = 1
                return this
            }else if(jQuery.isFunction(selector)){
                redayList.push(selector)
                document.addEventListener( "DOMContentLoaded", completed );
                window.addEventListener( "load", completed );
            }
        },
        
        
    }
    jQuery.fn.extend = jQuery.extend = function(){
        var target = arguments[0] || {};
        var length = arguments.length;
        var i = 1;
        var option, name, src, copy, copyIsArray, clone;
        var deep = false
        if(typeof target === 'boolean'){
            deep = target;
            target = arguments[1]
            i = 2
        }
        if(typeof target !== 'object'){
            target = {}
        }
        if(length === i){
            target = this
            i--
        }
        for(;i<length; i++){
            option = arguments[i]
            for(name in option){
                // 浅拷贝
               copy = option[name];
               src = target[name];
               if(deep && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    if(copyIsArray){
                        clone = src && jQuery.isArray(src)? src: []
                    }else{
                        clone = src && jQuery.isPlainObject(src)? src: {}
                    }
                    target[name] = jQuery.extend(deep, clone, copy)
               }else if(copy != undefined){
                    target[name] = copy
               }
            }
        }
        return target
    }
    jQuery.fn.init.prototype = jQuery.fn
    jQuery.extend({
        now: Date.now,
        isPlainObject: function(obj){
            return toString.call(obj) === '[object Object]'
        },
        isArray: function(obj){
            return toString.call(obj) === '[object Array]'
        },
        isFunction: function(obj){
            return typeof obj === 'function'
        },
        merge(first, second){
            var l = second.length,
            i = first.length,
            j = 0
            if(typeof length === 'number'){
                for(;j < l;j++){
                    first[i++] = second[j]
                }
            }else{
                while(second[j] !== undefined){
                    first[i++] = second[j++]
                }
            }
            return first
        },
        makeArray(){
            var arr = [],
            args = Array.prototype.slice.call(arguments)
            for(let i = 0; i< args.length; i++){
                if(jQuery.isArray(arr[i])){
                    arr.push([...Array.prototype.slice.call(args[i])])
                }else{
                    arr.push(args[i])
                }
            }
            return arr;
        },
        parseHTML: function(data, context, keepScripts){
            if(!data || typeof data !== 'string'){
                return null
            }
            var parse = rejectExp.exec(data);
            var scripts = !keepScripts && [];
            if(parse){
                return [context.createElement(parse[1])]
            }else{
                parse = jQuery.buildFragment([data], context, scripts)
                return jQuery.merge([], parse.childNodes)
            }

        },
        buildFragment: function(elems, context, scripts){
            var elem ,tmp, tag, wrap, contains, j,
                i = 0,
                l = elems.length,
                fragment = context.createDocumentFragment(),
                nodes = []
                for(; i < l; i++){
                    elem = elems[i]
                    if(elem || elem === 0){
                        if(jQuery.isPlainObject(elem) && elem != null){
                            jQuery.merge(nodes, elem.nodeType? [elem]: elem)
                        }else if(!/<|&#?\w+;/.test(elem)){
                            nodes.push(context.createTextNode(elem))
                        }else{
                            tmp = tmp || fragment.appendChild(context.createElement("div"))
                            tag = (/<([\w:]+)/.exec(elem) || ["", ""])[1].toLocaleLowerCase()
                            wrap = wrapMap[tag] || wrapMap._default
                            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2]
                            
                            jQuery.merge(nodes, tmp.childNodes)
                        }
                    }
                }
            fragment.textContent = ""
            return tmp
        },
        ready(){
            var i = 0;
            while(redayList[i] !== undefined){
                redayList[i++].call(null, this)
            }
        },
        each: function(object, callback, args){
            var length = object.length
            var name, i = 0;
            if(args){
                if(length === undefined){
                    for(name in object){
                        callback.apply(object, args)
                    }
                }else{
                    for(; i<length;){
                        callback.apply(object[i++], args)
                    }
                }
            }else{
                if(length === undefined){
                    for(name in object){
                        callback.call(object, name, object[name])
                    }
                }else{
                    for(; i< length; ){
                        callback.call(object[i], i, object[i++])
                    }
                }
            }
        }
    })

    
    var optionsCache = {}
    jQuery.extend({
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
                    // return this
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
         Deferred: function(func){
            // 延迟对象三种不同状态信息描述
            var tuples = [
                ['resolve', 'done', jQuery.Callbacks('once momory'), 'resolved'],
                ['reject', 'fail', jQuery.Callbacks('once momory'), 'resolved'],
                ['notify', 'progress', jQuery.Callbacks('momory')]
            ],
            state = 'pending',
            promise = {
                state: function(){
                    return state
                },
                then: function(){

                },
                promise: function(obj){
                    return obj != null? jQuery.extend(obj, promise): promise;
                }
            },
            deferred = {};
            tuples.forEach(function(tuple, i){
                var list = tuple[2],
                stateString = tuple[3];
                promise[tuple[1]] = function(){
                    list.add.apply(this, arguments)
                    return this
                }
                if(stateString){
                    list.add(function(){
                        state = stateString
                    })
                }
                deferred[tuple[0]] = function(){
                    deferred[tuple[0] + 'With'](this === deferred? promise: this, arguments)
                    return this
                }
                deferred[tuple[0] + 'With'] = list.fireWith
            })
            promise.promise(deferred)
            return deferred
        },
        when: function(deferred){
            return deferred.promise()
        }
    })
    function  createOptions(options){
        var object = optionsCache[options] = {}
        options.split(/\s+/).forEach(function(value) {
            object[value] = true
        });
        return object
    }
    function isEmptyObject( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	}
    function Data(){
        this.expando = jQuery.expando + Math.random();
        this.cache = {}
    }
    Data.uid = 1;
    Data.prototype = {
        key: function(elem){
            var descriptor = {},
            unlock = elem[this.expando]
            if(!unlock){
                unlock = Data.uid ++;
                descriptor[this.expando] = {
                    value: unlock
                }
                Object.defineProperties(elem, descriptor)
            }
            if(!this.cache[unlock]){
                this.cache[unlock] = {}
            }
            return unlock
        },
        get: function(elem, key){
            var cache = this.cache[this.key(elem)]; // {events:{}, handle: function(){}}
            return key===undefined? cache: cache[key]
        },
        set: function(elem, data, value){
            var prop,
                unlock = this.key(elem),
                cache = this.cache[unlock];
                if(typeof data === "string"){
                    cache[data] = value
                }else{
                    if(jQuery.isEmptyObject(cache)){
                        jQuery.extend(this.cache[unlock], data)
                    }else{
                        for(prop in data){
                            cache[prop] = data[prop]
                        }
                    }
                }
                return cache;
        },
        // 多功能值操作
        access: function(owner, key, value){
            var stored;
            if(key === undefined || (key && typeof key === "string" && value === undefined)){
                stored = this.get(owner, key)
                return stored !== undefined ? stored: this.get(owner, jQuery.camelCase(key))
            }
            this.set(owner, key, value)
            return value !== undefined ? value: key
        }
    }
    jQuery.Event = function(src, props){
        if(!(this instanceof jQuery.Event)){
            return new jQuery.Event(src, props)
        }
        this.type = src;
        this.timeStamp = src && src.timeStamp || jQuery.now()
        this[jQuery.expando] = true
    }

    jQuery.Event.prototype = {
        isDefaultPrevented: false,
        isPropagationStopped: false,
        isImediateProgapationStopped: false,
        preventDefault: function(){

        }
    }
    function saveActiveElement(){
        try{
            return document.activeElement
        }catch(err){}
    }
    var data_priv = new Data()
    jQuery.guid = 1
    jQuery.event = {
        special: {
            focus: {
                trigger: function(){
                    if(this !== saveActiveElement() && this.focus){
                        this.focus()
                        return
                    }
                }
            }
        },
        add: function(elem, type, handler){
            var eventHandle, events, handlers;
            var elemData = data_priv.get(elem);
            if(!handler.guid){
                handler.guid = jQuery.guid++
            }
            if(!(events = elemData.events)){
                events = elemData.events = {}
            }
            if(!(eventHandle = elemData.handle)){
                eventHandle = elemData.handle = function(e){
                    return jQuery.event.dispatch.apply(eventHandle.elem, arguments)
                }
            }
            eventHandle.elem = elem;
            if(!(handlers = events[type])){
                handlers = events[type] = []
                handlers.delegateCount = 0;
            }
            handlers.push({
                type: type,
                handler: handler,
                guid: handler.guid
            })
            if(elem.addEventListener){
                elem.addEventListener(type, eventHandle, false)
            }
        },
        dispatch: function(event){
            var handlers = (data_priv.get(this, "events")||{})[event.type] || [];
            event.delegateTarget = this;
            let args = Array.prototype.slice.call(arguments)
            jQuery.event.handlers.call(this, args, handlers)
        },
        handlers: function(args, handlers){
            handlers[0].handler.apply(this, args)
        },
        trigger: function(event, data, elem){
            var i, cur, tmp, bubbleType, ontype, handle,
            i = 0,
            eventPath = [elem || document],
            type = event.type || event,
            cur = tem = elem = elem || document;
            event = event[jQuery.expando] ? event: new jQuery.Event(type, typeof event ==="object" && event)
            if(!event.target){
                event.target = elem;
            }
            data = data == null? [event]: jQuery.makeArray(event, data)
            special = jQuery.event.special[type] || {}
            if(special.trigger && special.trigger.apply(elem, data) === false){
                return
            }
            cur = cur.parentNode
            for(; cur; cur = cur.parentNode){
                eventPath.push(cur)
            }
            if(tmp = (elem.ownerDocument) || document){
                eventPath.push(tmp.defaultView || tmp.parentWindow || window)
            }
            while((cur = eventPath[i++])){
                handle =  (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle")
                if(handle){
                    handle.apply(cur, data)
                }
            }
        }
    }
    jQuery.fn.extend({
        each: function(callback, args){
            return jQuery.each(this, callback, args);
        },
        on: function(types, fn){
            var type ;
            if(typeof types === 'object'){
                for(type in types){
                    this.on(type, types[type])
                }
                return this
            }
            return this.each(function(){
                jQuery.event.add(this, types, fn)
            })
        },
        trigger: function(type, data){
            return this.each(function(){
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(types){

        }
    })
    jQuery.extend({
        access: function(elems, fn, key, value){
            var length = elems.length;
            var testring = key === null;
            var cache, chainable, name;
            // 处理key
            if(jQuery.isPlainObject(key)){ 
                chainable = true
                for(name in key){
                    jQuery.access(elems, fn, name, key[name])
                }
                return elems
            }
            if(value !== undefined){
                chainable = true
                if(testring){
                    cache = fn;
                    fn = function(key, value){
                        cache.call(this, value)
                    }
                }
                for(let i = 0; i<length; i++){
                    fn.call(elems[i], key, value)
                }
            }
            return chainable? elems: fn.call(elems[0], key, value)
        },
        empty: function(elem, value){
            
        },
        text: function(elem, value){
            var nodeType = elem.nodeType
            // 1 元素, 9 文档, 11 文档碎片
            if(nodeType === 1 || nodeType === 9 || nodeType === 11){
               return  value === undefined? elem.textContent: elem.textContent = value
            }
        },
        css: function(elem, name, styles){
            styles = styles || getStyles(elem)
            name = jQuery.camelCase(name)
            return styles[name]
        },
        style: function(elem, key, value){
            key = jQuery.camelCase(key)
            return elem.style[key] = value
        },
        camelCase: function(string){
            return string.replace(/^-ms-/, "ms-").replace(/-([a-z])/ig, function(str, first){
                return first.toUpperCase()
            })
        }
    })
    function getStyles(elem){
        return window.getComputedStyle(elem, null)
    }
    jQuery.fn.extend({
        html: function(){

        },
        text: function(value){
            return jQuery.access(this, function(value){
                return  jQuery.text(this, value)
            }, null, value)
        },
        css: function(key, value){
            return jQuery.access(this, function(key, value){   
                var length = key.length,
                map = {},
                i = 0;
                if(jQuery.isArray(key)){
                    for(;i < length; i++){
                        map[key[i]] = jQuery.css(this, key[i])
                    }
                    return map
                }
                return value === undefined? jQuery.css(this, key): jQuery.style(this,key, value)
                
            }, key, value)
        },
        addClass: function(value){
            var len = this.length;
            var cur, elem, i = 0, clazz;
            var proceed = arguments.length === 0 || typeof value === "string" && value
            if(proceed){
                classes = value.match(/\S+/g)
                for(; i< len; i++){
                    elem = this[i]
                    cur = elem.nodeType === 1 &&(elem.className ? " " + elem.className + " ":" ").replace(/\r\t\n\f/, '')
                }
                if(cur){
                    var j = 0;
                    while(clazz = classes[j++]){
                        if(cur.indexOf(" " + clazz + " ")< 0){
                            cur += clazz + " "
                        }
                    }
                    elem.className = cur.trim()
                }
            }
        }
    })
    jQuery.extend({
        queue: function(elem, type, data){
            var queue;
            if(elem){
                type = (type || "fx") + "queue"
                queue = data_priv.get(elem, type)
                if(data){
                    if(!queue || jQuery.isArray(data)){
                        queue = data_priv.access(elem, type, jQuery.makeArray(data))
                    }else{
                        queue.push(data)
                    }
                }
            }
            return queue || []
            
        },
        dequeue: function(elem ,type){
            type = type || 'fx'
            var queue = jQuery.queue(elem, type)
            var startLength = queue.length,
            fn = queue.shift(),
            next = function(){
                jQuery.dequeue(elem, type)
            }
            if(fn === 'inprogress'){
                fn = queue.shift()
                startLength --;
            }
            if ( fn ) {

                if ( type === "fx" ) {
                    queue.unshift( "inprogress" );
                }
                fn.call( elem, next );
            }
        }
    })
    jQuery.fn.extend({
        queue: function(type, data){ 
            var setter = 2;
            if(typeof type !== "string"){
                data = type;
                type = "fx";
                setter--;
            }
            if(arguments.length < setter){
                return jQuery.queue(this[0], type)
            }
            return data === undefined?
                this:
                this.each(function(){
                    var queue = jQuery.queue(this, type, data);
                    if(type === "fx" && queue[0] !== "inprogress"){
                        jQuery.dequeue(this, type)
                    }
                })
        },
        dequeue: function(){
            return this.each( function() {
                jQuery.dequeue( this, type );
            } );
        }
    })
    jQuery.fn.extend({
        animate: function(options){
            
            var elems = this;
            var start = 500;
            var end = options.left;
            var time,
                len = this.length,
                i = 0;
            var createTime = function(){
                return (+new Date())
            }
            var startTime = createTime();
            var logic = function(){
                var percent = Math.min((createTime()-startTime)/2000, 1)
                if(percent ==1){
                    clearInterval(logic)
                    timer = null
                }
                var move = (end-start)*percent + start
                elems.each(function(){
                    jQuery.style(this, "left", move + "px")
                })   
            }
            var time = setInterval(logic, 13)
        }
    })
    root.$ = root.jQuery = jQuery
})(this)