var person = {
    name: 'lzg',
    say(){
        console.log(this.name)
    }
}
let speak = person.say
var person1 = {
    name: 'lzg1',
    say: person.say
}
person1.say()