function Animal(name){
    this.name = name
}
Animal.prototype.wow = function(){
    console.log('animal:' + this.name)
}

function Dog(name){
    Animal.apply(this, arguments)
}
Dog.prototype.wow = function(){
    console.log("dog:" + this.name)
}
function exetends(child, father){
    let p = child.prototype
    child.prototype = Object.create(father.prototype)
    for(let prop in p){
        child.prototype[prop] = p[prop]
    }
}
exetends(Dog, Animal)
/**主程序-测试 */

let dog = new Dog('dog')
dog.wow()
let animal = new Animal('animal')
animal.wow()


