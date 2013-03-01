var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Transaction = new Schema({
                    "To" : String,
                    "From" : String,
                    "App" : String,
                    "DateTime" : Date,
                    "balance" : Number,
                    "PeddingFlag" : String
                  });
mongoose.model("Transaction",Transaction);
