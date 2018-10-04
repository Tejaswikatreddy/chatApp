var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/my_db', { useNewUrlParser: true });
var Schema = mongoose.Schema;
var personalchatSchema = new Schema({
    message: { type: String, required: true },
    senderid: { type: String, required: true },
    date: { type: Date, default: Date.now },
    sendername: { type: String, required: true },
    receiverid: { type: String, required: true },
    receivername:{type:String,required:true}
})
module.exports = mongoose.model('personalmsg', personalchatSchema);