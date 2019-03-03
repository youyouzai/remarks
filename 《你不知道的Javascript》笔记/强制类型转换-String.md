将值从一种类型转换为另外一种类型通常称为类型转换，分为显示强制类型转换和隐示强制类型转换。“显示”和“隐示”是相对的。

 #####  toString
 
    var a = 1.07*100*1000000*1000000000000000000*1000;
    a.toString() // 1.07e+29


#####   JSON字符串化
1.  JSON字符串化和toString()基本相同。
2.  JSON.stringify(...)在对象中遇到undefined、function和symbol时会自动将其忽略，在数组中会返回null。

        JSON.stringify(42); // "42"
        JSON.stringify("42"); // ""42"" ->含双引号的字符串
        JSON.stringify(null); // "null"
        JSON.stringify(true); // "true"
        JSON.stringify(undefined); // "undefined"
        JSON.stringify(function(){}); // "undefined"
        JSON.stringify([1, undefined, function(){}, 4]); // [1,null,null,4]
        JSON.stringify({a:2, b: function(){}}); // "{"a":2}"


3.  对象包含循环引用，执行JSON.stringifly(...)会绕过掉循环引用。（与书中描述的“循环引用会报错”有异）

        var a = {name: 'lzg', b:b}
        var b = {a: a}
        console.log(JSON.stringify(a)) // {"name":"lzg"}
        console.log(JSON.stringify(b)) // {"a":{"name":"lzg"}}


4.  如果对象定义了toJSON()方法，JSON字符串化时会首先调用该方法。

        var a = {
        name: 'lzg',
        toJSON: function(){
        return 'hello, Kitty'
        }
        }
        console.log(JSON.stringify(a))  // "hello, Kitty"


5.  JSON.stringify(...)共有3个参数。第1个参数是要转化的对象；第2个参数可选参数replacer,它可以是数组或函数，用来指定对象那些属性被转化；第三个可选参数space,用来指定输出的缩进格式。

        var a = {
        b: 42,
        c: "42",
        d: [1,2,3]
        }
        JSON.stringify(a, ['c']) // {"c":"42"}
将值从一种类型转换为另外一种类型通常称为类型转换，分为显示强制类型转换和隐示强制类型转换。“显示”和“隐示”是相对的。

 #####  toString
 
    var a = 1.07*100*1000000*1000000000000000000*1000;
    a.toString() // 1.07e+29


#####   JSON字符串化
1.  JSON字符串化和toString()基本相同。
2.  JSON.stringify(...)在对象中遇到undefined、function和symbol时会自动将其忽略，在数组中会返回null。

        JSON.stringify(42); // "42"
        JSON.stringify("42"); // ""42"" ->含双引号的字符串
        JSON.stringify(null); // "null"
        JSON.stringify(true); // "true"
        JSON.stringify(undefined); // "undefined"
        JSON.stringify(function(){}); // "undefined"
        JSON.stringify([1, undefined, function(){}, 4]); // [1,null,null,4]
        JSON.stringify({a:2, b: function(){}}); // "{"a":2}"


3.  对象包含循环引用，执行JSON.stringifly(...)会绕过掉循环引用。（与书中描述的“循环引用会报错”有异）

        var a = {name: 'lzg', b:b}
        var b = {a: a}
        console.log(JSON.stringify(a)) // {"name":"lzg"}
        console.log(JSON.stringify(b)) // {"a":{"name":"lzg"}}


4.  如果对象定义了toJSON()方法，JSON字符串化时会首先调用该方法。

        var a = {
        name: 'lzg',
        toJSON: function(){
        return 'hello, Kitty'
        }
        }
        console.log(JSON.stringify(a))  // "hello, Kitty"


5.  JSON.stringify(...)共有3个参数。第1个参数是要转化的对象；第2个参数可选参数replacer,它可以是数组或函数，用来指定对象那些属性被转化；第三个可选参数space,用来指定输出的缩进格式。

        var a = {
        b: 42,
        c: "42",
        d: [1,2,3]
        }
        JSON.stringify(a, ['c']) // {"c":"42"}
