IIFE，Immediately Iovoked Function Exception, 立即执行函数表达式

作用：用于封装/隐藏代码，形成作用域气泡，避免变量污染

示例1

    var a = 2;
    (function fun(){
        var a = 3
    console.log(a)
    })()
    console.log(a) // 3 2

示例2

    var a = 2;
    (function fun(){
        a = 3
    console.log(a)
    })()

    console.log(a) // 3 3



