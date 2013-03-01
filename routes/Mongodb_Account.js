var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Account = new Schema({
                "owner" : String,
                "password" : String,
                "acct_number" : String,
                "lockflag" : String,
                "datetime" : Date,
                "balance" : Number,
                "peddingtransaction" : [String]
              });
mongoose.model("Account",Account);
