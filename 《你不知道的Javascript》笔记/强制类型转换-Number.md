#####   ToNumber

检查该值是否有valueof()方法，若有则使用该值进行强制类型转换;否则使用toString()的返回值进行转换。

    var a = {
        valueOf(){
            return 12
        }
    }
    var b = {
        toString(){
            return '1'
        }
    }
    console.log(Number(a)) // 12
    console.log(Number(b)) // 1
    Number("") // 0
    Number([]) // 0
    Number(["abc"]) // NaN
    Number("abc")  // NaN


#####   ToBoolean

1.  除了假值以外的都为真值，假值列表为：undefined, null, false, +0/-0/NaN，""

        // 封装对象都为true
        new String("") // true
        new Number(0) // true
        new Boolean(false) // true

        var a = "false" // true
        var b = "0" // true
        var c = "''" // true
        var d = [] // true


        转换为数字
        var c = "3.14"
        var b = 5 + +c;

        var d = new Date()
        var s = +d; // 1548490977690

        // ~x大致等于 -(x+1)
        ~42 == -43
        var str = "hello word
        str.indexOf("lo") != -1 等同于 ~str.indexOf("lo") 

        // 字位截取
        Math.floor( - 49.6) ; // 50
        ~~(-49.6); // -49


2.  parseInt(...)只适用于字符串， 从左到右解析，如果遇到非字符串就停止

        parseInt("123abc")  // 123
        Number("123abc")  // NaN

3.  parseInt(...) 若遇到非字符串，则会先将其转换为字符串，再进行解析。

        parseInt(0.00008); // 0 -> "0"来自于"0.00008"
        parseInt(0.0000008); // 8 -> "8"来自于"8e-7"
        parseInt(false, 16); // 250 -> "fa" 来自于 "false"
        parseInt(parseInt, 16); // 15 -> "f" 来自于 "function..."
        parseInt("0x10") // 16
        parseInt("103", 2) // 2


4.  在if(...)中建议使用Boolean(a) 和 !!a 来进行显示强制类型转换。

5.  如果+的其中一个操作数是字符串，则执行字符串拼接； 否则执行数字加法。

        var a = 2 + '3'  // "23"

        // -是数字减法运算符
        var b = [3] - [2];     // 1
        var c = [3] + [2];   // "32"

6.  a + "" 会先调用a的valueOf()方法，再调用toString()

        var a = {
        valueOf: function(){return 42},
        toString: function(){return 4}
        }
        a + "" ; // 42
        String(a); // 4




