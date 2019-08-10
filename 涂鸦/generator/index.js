var fs = require('fs');
function logErr(err){
    console.log(err)
}
// 读取数据文件
fs.readFile('./data.json', 'utf8', function(err, data){
    var json
    try{
        json = JSON.parse(data)
    }catch(e){
        logErr("parse Json error: " + e)
        return
    }
    parse(json)
});
// 解析json数据
function parse(json){

}
