function Vue(){
    this.name = 'vue'
    this.show = function(){
        console.log('show ' + this.name)
    }
}
exports = Vue