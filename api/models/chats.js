var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/my_db', { useNewUrlParser: true });
var Schema = mongoose.Schema;
var chatSchema=new Schema({
    message:{type:String,required:true},
    userid:{type:String,required:true},
    date:{type:Date,default:Date.now},
    username:{type:String,required:true},
})
module.exports = mongoose.model('msg', chatSchema);