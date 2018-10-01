/**
 * @function encryption() is to encrypt the password and store it in the database
 * @param {string} password the string that is to be encrypted
 */
function encryption(password) {
    var pass = require('crypto')
        .createHash('sha1')
        .update(password)
        .digest('base64');
    return pass;            //it returns the encrypted string
}
/**
 * @function registration() validates the inputvalues before storing it into the database
 * @param {} req is the request sent by the client to the server
 * @param {} res is the response sent by the server to the client
 */
exports.registration = function (req, res) {
    var userModel = require('../models/registration')
    var db = new userModel();
    var response = {};
    var mail = req.body.email_id;   
    try {
        //checking if all the required input  values are given or not
        if (typeof req.body.firstname == "undefined" || typeof req.body.lastname == "undefined" 
            || typeof req.body.username == "undefined" || typeof req.body.email_id == "undefined"
            || typeof req.body.mobilenumber == "undefined" 
            || typeof req.body.password == "undefined"  ){
                throw new Error("every field should be filled")
            }
            //validating email_id using regular expressions
        var re = /\S+@\S+\.\S+/
        if (!re.test(req.body.email_id)) {
            throw new Error("invalid email id");
        }
        //validating password using regex expression
        var re = /[a-zA-Z]+[0-9]+[!@#$ %^&*_]/;
        if (!re.test(req.body.password)) {
            throw new Error("invalid password, your password should have atleast 1character number and special character");
        }
        //validating mobilenumber using regex
        var re = /[0-9]{10}/;
        if (!re.test(req.body.mobilenumber)) {
            throw new Error("invalid mobile number");
        }
      //validating name of the user using regex
        var re = /^[A-Za-z][A-Za-z0-9]*$/
        if (!re.test(req.body.firstname) || !re.test(req.body.lastname) || !re.test(req.body.username)) {
            throw new Error("your firstname,lastname and username  should not have spaces");
        }
        //passing the values into the schema object
        db.username = req.body.username;
        db.firstname = req.body.firstname;
        db.lastname = req.body.lastname;
        db.email_id = req.body.email_id;
        db.mobilenumber = req.body.mobilenumber;
        db.password = encryption(req.body.password);

        userModel.find({ "username": req.body.username }, function (err, data) {
            if (data.length > 0) {
                // throw new Error("username is already present");
                response = { "error": false, "message": "username is already there" }
                return res.status(400).send(response);
            }
          
        else{
       //checking if the email id is already present
        userModel.find({ "email_id": req.body.email_id }, function (err, data) {

            if (err) {
                response = { "error": true, "message": "error retrieving data" }
                return res.status(400).send(response);

            }
            else {
                if (data.length > 0) {
                    response = { "error": true, "message": "email_id is already there" }
                    return res.status(400).send(response);
                }
                else {
                    db.save(function (err, result) {
                        if (err) {
                            response = {
                                "error": true,
                                "message": "error storing data"
                            }
                        }
                        else {
                            response = { "error": false, "message": "succesfully registered" }
                        }
                        return res.status(200).send(response);
                    });

                }
            }
        });
        }
        })
    }
    catch (e) {
        console.log(e);
        if(e instanceof ReferenceError||
        e instanceof TypeError|| 
        e instanceof SyntaxError||
        e instanceof RangeError){
            response = { "error": true, "message": "something went wrong,contact system admin" }
            return res.status(400).send(response);
        }
        else{
        response = { "error": true, "message": e.message }
        return res.status(400).send(response);
        }

    }
}
/**
 * @function login() is the api to validate the username and password before validating
 * @param  req is the request that we give to the server
 * @param  res is the response given by the server
 */
exports.login = function (req, res) {
    var jwt = require('jsonwebtoken');
    const secret ="sfgrtfrdfwytuyfg!87632334"//secret from which the token will be generated
    var response = {};
    var userModel = require('../models/registration')//impoting the schema 
    if(typeof req.body.email_id=="undefined" || typeof req.body.password=="undefined"){
        response={
            "message":"give mail_id and password"
        }
        return res.status(400).send(response);
        //returning the response
    }
    userModel.find({ "email_id": req.body.email_id, "password": encryption(req.body.password) }, function (err, data) {
//finding if the email id and corresponding password is there in the database
        if (err) {
            response = {
                "error": true,
                "meassage": "error fetching data"
            }
            return res.status(400).send(response);
        } else {
            
            if (data.length > 0) {
                var token = jwt.sign({ email_id: req.body.email_id, password: req.body.password }, secret, { expiresIn: '1h' })
                //generating the token
                response = {
                    "error": false,
                    "message": "login succesfull",
                    "token": token,
                    "userid": data[0]._id,
                    "username":data[0].username,
                }
                return res.status(200).send(response);
            }
            else {
                response = {
                    "error": false,
                    "message": "invalid credentials"
                }
                return res.status(400).send(response);
            }
        }

    })

}
/**
 * @function listOFUsers gives the list of users who have registered except the one who have logged in
 * @param  req is the request sent by the clent to the server
 * @param  res is response returned by the user 
 */
exports.listOfUsers=function (req,res) {
    var userModel = require('../models/registration');
    var response = {};
    var arrList=[];
    var userid=req.params.id;//getting the id from the parameters
    userModel.find({"_id":{$ne:userid }},function (err,data) {//finding all the useers except the logged in user
        console.log(data);
        for(key in data){
                arrList.push({username:data[key].username,
                                        userid:data[key]._id});
        }
        if(err)
            {
                response={ "error":true,
                            "message":"error retrieving data"
                }
                return res.status(401).send(response);//returning response by the server
            }
            else{
                response={
                    "error":false,
                    "message":arrList
                }
            return res.status(200).send(response);
            }
       
    })
    
}
// exports.changePassword = function (req, res) {
//     var userModel = require('../models/registration');
//     var response = {};
//     var arrList = [];
//     var userid = req.params.id;
//     userModel.update({ "_id": userid },{$set:{"password":req.body.password}},function(err,data){
//                 if(err){
//                     response={
//                         "error":true,
//                         "message":"not updated"
//                     }
//                     return res.status(401).send(response);
//                 }
//                 else{
//                     response={
//                         "error":false,
//                         "message":"updated succesfully"
//                     }
//                     return res.status(200).send(response);
//                 }
              
//     })
//     }
/**
 * 
 * @param {string} userid is the id of the logged in user
 * @param {string} username is the name of the logged in user
 * @param {string} message is the message of the logged in user
 * @param {string} date is the date and time of the message sent
 */
exports.addtodb=function (userid,username,message,date) {
    var userModel = require('../models/chats');
    var db = new userModel();
    var response={};
    db.message=message;
    db.date=date;
    db.userid=userid;
    db.username=username;
    db.save(function (err) {//save the data into the database
        if (err) {
            response = {
                "error": true,
                "message": "error storing data"
            }
        }
        else {
            response = { "error": false, "message": "succesfully added to database" }
        }
    });
    console.log(response)

}
/**
 * @function getmsgs() gives the messages in the database
 * @param  req given by the client to the server
 * @param  res given by the server yo the client
 */
exports.getmsgs=function(req,res){
    var userModel = require('../models/chats');
    var response = {};
    userModel.find({},function(err,data){ //finds all the data in the database
        if(data){
            response={
                "error":false,
                "message":data
                
            }
            res.status(200).send(response);
        }
        else{
            response={
                "error":true,
                "message":"something went wrong",
                
            }
            console.log(err);
            res.status(401).send(response);
        }
       
    })
}




