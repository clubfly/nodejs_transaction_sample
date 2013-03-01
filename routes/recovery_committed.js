var transaction = require("./transaction.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/express-transaction");
var exec = require("child_process").exec;
var jobListCommitted = [1,2,3];
var recoveryForCommitted = function(v){
  exec("echo Job " + v, function(err,run){
    setTimeout(function(){
      console.log("--> " + run);
      var data = transaction.DataSet;
      console.log(data);
      if (v < 3 && data == null){
        console.log("no data for recovery!");
        process.exit(code=0);
      }
      switch(v){
        case 1: //Set Transaction State To Finish
          transaction.update_transactiondata_status(data["_id"],"finish");
        break;
        case 2: //Remove Pending Transaction
          console.log(data["From"]);
          transaction.update_account_peddingtransaction(data["From"],data["_id"]);
          console.log(data["To"]);
          transaction.update_account_peddingtransaction(data["To"],data["_id"]);
        break;
        default: //get_Transection_Data
          transaction.get_transaction_dataset_by_status("A1","committed");
        break;
      }
      if (jobList.length > 0){
        recoveryForCommitted(jobListCommitted.pop());
      } else {
        process.exit(code=0);
      }
    },1500);
  });
};
recoveryForCommitted(jobListCommitted.pop());
