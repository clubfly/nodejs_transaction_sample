var transaction = require("./transaction.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/express-transaction");
var exec = require("child_process").exec;
var jobList = [1,2,3,4,5,6];
var run_transaction = function(v){
  exec("echo Job " + v, function(err,run){
    setTimeout(function(){
      console.log("--> " + run);
      var data = transaction.DataSet;
      console.log(data);
      if (v < 6 && data == null){
        console.log("no data for transaction!");
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
        case 3: //Set Transaction State To Committed
          console.log("committed data");
          transaction.update_transactiondata_status(data["_id"],"committed");
        break;
        case 4: //Apply Transaction To Both Accounts
          console.log(data["From"] + " balance : -" + data["balance"]);
          transaction.update_account_balance(data["From"],data["_id"],-parseInt(data["balance"]));
          console.log(data["To"] + " balance : +" + data["balance"]);
          transaction.update_account_balance(data["To"],data["_id"],parseInt(data["balance"],10));
        break;
        case 5: //Switch Transaction State To Pending
          console.log("pendiing data");
          transaction.update_transactiondata_status(data["_id"],"pendding");
        break;
        default: //Get Transection Data
          console.log("get inital data");
          transaction.get_transaction_dataset_by_status("A1","inital");
        break;
      }
      if (jobList.length > 0){
        run_transaction(jobList.pop());
      } else {
        process.exit(code=0);
      }
    },1500);
  });
};
run_transaction(jobList.pop());
