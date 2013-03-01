
/*
 * user manage.
 */

require("./Mongodb_Account");
require("./Mongodb_Transaction");
var mongoose = require("mongoose");
var Account = mongoose.model("Account");
var Account_info = {};
var Transaction = mongoose.model("Transaction");
mongoose.connect("mongodb://localhost/express-transaction");

exports.login = function(req, res){
  req.session.owner = null;
  var findaccount = {"owner": req.body.account,"password":req.body.password,"lockflag":"N"};
  var redirect = "/";  
  Account.find(findaccount,function(err,user){ // user login and get user data from mongodb
    try{
      if (user[0].owner !== "" && user[0].lockflag != "Y"){
        console.log("session : " + user[0].owner);
        req.session.owner = user[0].owner;
        req.session.login = 1;
        Account_info = user[0];
        Account_info["transfer"] = 0;
        redirect = "/user";
      }
      console.log("Url : " + redirect + " Session : " + req.session.owner);
    } catch(err) {
      console.log("Login Fail : " + err);
    }
    res.redirect(redirect);
  });
};

exports.logout = function(req,res){
  req.session.destroy(); // clean session
  Account_info = {}; // reset user data
  res.redirect("/"); // redirect info for sure session clean
};

exports.info = function(req,res){
  if (req.session.login && req.session.login != undefined){
    var DefautTransactionUser = "B";
    var findTransaction = {"From": Account_info.acct_number};
    if (req.session.owner == "B"){
      DefautTransactionUser = "A";
    }
    Transaction.find(findTransaction,function(err,user){
      var offset = user.length, i = 0,trade_balance = 0;
      if (offset > 0){
        for (i = 0; i < offset; i++){
          if (user[i].PeddingFlag == "pendding"){
            trade_balance += parseInt(user[i].balance,10);
          }
        }
      }
      Account_info.transfer = trade_balance;
      console.log(user);
      res.render('user', {title: "Account Information",
                          app: "A1",
                          owner: Account_info.owner,
                          acct_number: Account_info.acct_number,
                          balance: Account_info.balance,
                          transfered_balance: Account_info.transfer,
                          tradelist: "AMI_20130225_" + DefautTransactionUser,
                          transactionlist:user});
    });
  } else {
    res.redirect("/logout");
  }
};

exports.transaction = function(req,res){
  var Message = "You`re Not Login!";
  if (req.session.login && req.session.login != undefined){
    if (parseInt(Account_info.balance,10) > 0 && 
        (parseInt(req.body.balance,10) + parseInt(Account_info.transfer,10)) <= parseInt(Account_info.balance,10)){
      new Transaction({
        "To" : req.body.Account,
        "From" : Account_info.acct_number,
        "App" : "A1",
        "DateTime" : Date.now(),
        "balance" : paraseInt(req.body.balance,10),
        "PeddingFlag" : "inital"
      }).save(function(err,transactionApply,count){
        console.log("done!");
        Account_info.transfer = req.body.balance;
      });
      Message = "Your Transaction is Applied!";
    } else {
      Message = "You Dont`t Have Enough Balance!";
    }
  }
  res.render("transaction",{title:"Transaction Message",message: Message});
};

var rollback = require("./rollback.js");

exports.cancel_trade = function(req,res){
   var findtransaction = {_id:mongoose.Types.ObjectId(req.body._id),App:req.body.App};
   Transaction.findOne(findtransaction,function(err,user){
     if (user.PeddingFlag == "inital" || user.PeddingFlag == "pendding"){// not yet trade
       Transaction.update({_id:user._id},
                          {$set:{PeddingFlag:"canceled"}},
         function(err,numberAffected,raw){
           if (err) {
             console.log(err);
             return err;
           }
           console.log('The number of updated Transaction documents was %d', numberAffected);
           console.log('The raw response from Mongo was ', raw);
         }
       );
     }
     if (user.PeddingFlag == "committed"){// rollback
       var jobList = [1,2,3,4];
       rollback.rollback(jobList,user);
     }
     if (user.PeddingFlag == "finish"){// apply a new one
       new Transaction({
        "To" : user.From,
        "From" : user.To,
        "App" : "A1",
        "DateTime" : Date.now(),
        "balance" : paraseInt(user.balance,10),
        "PeddingFlag" : "inital"
      }).save(function(err,transactionApply,count){
        console.log("done!");
        Account_info.transfer = req.body.balance;
      });
     }
     res.send(200,"ok");
   });
};
