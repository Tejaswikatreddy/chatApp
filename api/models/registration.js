var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/my_db', { useNewUrlParser: true });
var Schema = mongoose.Schema;
var registrationSchema = new Schema({
        "firstname":{type:String,required:true},
        "lastname": { type: String, required: true },
        "username":{type:String,required:true},
        "email_id": { type: String, required: true},
        "mobilenumber": { type: String, required: true },
        "password": { type: String, required: true }
});
module.exports = mongoose.model('data', registrationSchema);