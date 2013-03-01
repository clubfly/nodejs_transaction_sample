Project : Transaction With Mongodb And Node.js For Sample Code

Mongodb Document Schema

collection : accounts
schema and dataset:
{
  "acct_number" : "AMI_20130225_A", 
  "balance" : 0, 
  "datetime" : ISODate("2013-02-25T08:41:41.025Z"), 
  "lockflag" : "N", 
  "owner" : "A", 
  "password" : "A", 
  "peddingtransaction" : [ ] 
}
{
  "acct_number" : "AMI_20130225_B",
  "balance" : 100,
  "datetime" : ISODate("2013-02-25T08:41:41.025Z"),
  "lockflag" : "N",
  "owner" : "B",
  "password" : "B",
  "peddingtransaction" : [ ]
}

collection : transactions
schema and dataset
{ "App" : "A1", 
  "DateTime" : ISODate("2013-02-26T06:10:14.863Z"), 
  "From" : "AMI_20130225_B", 
  "PeddingFlag" : "pendding", 
  "To" : "AMI_20130225_A", 
  "balance" : 40 
}
---------------------------------------------------------------------------------
Node.js Setting

dependencies:
  express
  jade
  connect
  mongoose

Project Structure:
  app.js       -> main server setting
  package.json -> all package setting
  public (dir) -> all static file here
  routes (dir) -> all code logic and models here
  views  (dir) -> all templates file here

Module Lists: (Path:routes/)
  index.js               -> Show login page
  Mongodb_Account.js     -> Account ORM DataSet For Mongodb Document Schema
  Mongodb_Transaction.js -> Transaction ORM DataSet For Mongodb Document Schema
  trade_procedures.js    -> Implement data transaction (need setting system crontab)
  recovery_committed.js  -> Implement data recovery
  recovery_pendding.js   -> Implement data recovery
  rollback.js            -> Implement cancel data transaction
  transaction.js         -> Implement data controller management
  user.js                -> Url routes logic module
---------------------------------------------------------------------------------
Notice List:
  a. while recovering data, please stop trade_transaction.js first.
  b. if you wanna recover data, do command onderline:
     1. cd  your project_path/routes/
     2. use command -> node recovery_committed.js
     3. use command -> node recovery_pendding.js
     4. checkout recovering data in mongodb.
  c. mongod instance has journaling enabled to ensure that your data is always in a recoverable state
     in the event of an unclean mongod shutdown.
      
