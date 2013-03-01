require("./Mongodb_Account");
require("./Mongodb_Transaction");
var mongoose = require("mongoose");
var Account = mongoose.model("Account");
var Transaction = mongoose.model("Transaction");

module.exports = {
  DataSet : {},
  get_transaction_dataset_by_status : function(app,transaction_status){
    Transaction.findOne({App:app,PeddingFlag:transaction_status},
      function(err,data){
        try {
          module.exports.DataSet = data;
        } catch(err){
          console.log(err);
        }
      }
    );
  },
  get_transaction_dataset_by_status_for_all : function(app,transaction_status){
    Transaction.find({App:app,PeddingFlag:transaction_status},
      function(err,data){
        try {
          console.log(data);
          module.exports.DataSet = data;
        } catch(err){
          console.log(err);
        }
      }
    );
  },
  update_transactiondata_status : function(obj_id,transaction_status){
    Transaction.update({_id:obj_id},
                       {$set:{PeddingFlag:transaction_status}},
      function(err,numberAffected,raw){
        if (err) {
          console.log(err);
          return err;
        }
        console.log('The number of updated Transaction documents was %d', numberAffected);
        console.log('The raw response from Mongo was ', raw);
      }
    );
  },
  update_account_balance : function(acct_number,obj_id,balance){
    Account.update({acct_number:acct_number,peddingtransaction:{$ne:obj_id}},
                   {$inc:{balance:balance},$push:{peddingtransaction:obj_id}},
      function(err,numberAffected,raw){
        if (err) {
          console.log(err);
          return err;
        }
        console.log('The number of updated Account documents was %d', numberAffected);
        console.log('The raw response from Mongo was ', raw);
      }
    );
  },
  update_account_peddingtransaction : function(acct_number,obj_id){
    Account.update({acct_number:acct_number},
                   {$pull:{peddingtransaction:obj_id}},
      function(err,numberAffected,raw){
        if (err) {
          console.log(err);
          return err;
        }
        console.log('The number of updated Account documents was %d', numberAffected);
        console.log('The raw response from Mongo was ', raw);
      }
    );
  },
  update_account_balance_rollback : function(acct_number,obj_id,balance){
     Account.update({acct_number:acct_number,peddingtransaction:obj_id},
                   {$inc:{balance:balance},$pull:{peddingtransaction:obj_id}},
      function(err,numberAffected,raw){
        if (err) {
          console.log(err);
          return err;
        }
        console.log('The number of updated Account documents was %d', numberAffected);
        console.log('The raw response from Mongo was ', raw);
      }
    );
  }
};
