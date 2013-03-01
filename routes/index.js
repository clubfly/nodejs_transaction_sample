
/*
 * GET home page.
 */
require("./Mongodb_Account");
var mongoose = require('mongoose');
var Account = mongoose.model("Account");
exports.index = function(req, res){
  /* 
  you can insert account data with this code by remove "/ * * /" under line,
  beware of inserting the same data.
  */
  /*
  new Account({
    "owner" : "B",
    "password" : "B",
    "acct_number" : "AMI_20130225_B",
    "lockflag" : "N",
    "datetime" : Date.now(),
    "balance" : "100",
    "peddingtransaction" : []         
  }).save(function(err,todo,count){
    console.log("done!");
  });
  */
  res.render('index', {title: 'Account Login'});
};
