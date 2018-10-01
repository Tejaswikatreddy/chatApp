var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my_db',{ useNewUrlParser: true });
var Schema=mongoose.Schema;
var userSchema=new Schema({
   
        "firstname":String,
        "lastname":String
   
});
module.exports=mongoose.model('userc',userSchema);