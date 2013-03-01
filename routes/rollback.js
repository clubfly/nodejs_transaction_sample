var transaction = require("./transaction.js");
var exec = require("child_process").exec;
var jobList = [1,2,3];
module.exports = {
  rollback : function(v,data){
    exec("echo Job " + v, function(err,run){
      setTimeout(function(){
        console.log("--> " + run);
        console.log(data);
        switch(v){
          case 1: //Set Transaction State To Canceled
            console.log(data["_id"] + "canceled data");
            transaction.update_transactiondata_status(data["_id"],"canceled");
          break;
          case 2: //Undo The Transaction
            console.log(data["To"] + " balance : -" + data["balance"]);
            transaction.update_account_balance(data["From"],data["_id"],-parseInt(data["balance"],10));
            console.log(data["From"] + " balance : +" + data["balance"]);
            transaction.update_account_balance_rollback(data["From"],data["_id"],parseInt(data["balance"],10));
          break;
          default://Set Transaction State To Cancelling
            transaction.update_transactiondata_status(data["_id"],"canceling");
          break;
        }
        if (jobList.length > 0){
          module.exports.rollback(jobList.pop(),data);
        } else {
          process.exit(code=0);
        }
      },1500);
    });
  }
};
