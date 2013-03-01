#Transaction With Mongodb And Node.js For Sample Code

<h3>Mongodb Document Schema</h3>
collection : accounts
schema and dataset:
```json
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
```
collection : transactions
schema and dataset
```json
{ "App" : "A1", 
  "DateTime" : ISODate("2013-02-26T06:10:14.863Z"), 
  "From" : "AMI_20130225_B", 
  "PeddingFlag" : "pendding", 
  "To" : "AMI_20130225_A", 
  "balance" : 40
}
```
---------------------------------------------------------------------------------
<h3>Node.js Setting</h3>
<h4>dependencies:</h4>
 * express
 * jade
 * connect
 * mongoose

<h4>Project Structure:</h4>
 * app.js       -> main server setting
 * package.json -> all package setting
 * public (dir) -> all static file here
 * routes (dir) -> all code logic and models here
 * views  (dir) -> all templates file here

<h4>Module Lists: (Path:routes/)</h4>
 * index.js               -> Show login page
 * Mongodb_Account.js     -> Account ORM DataSet For Mongodb Document Schema
 * Mongodb_Transaction.js -> Transaction ORM DataSet For Mongodb Document Schema
 * trade_procedures.js    -> Implement data transaction (need setting system crontab)
 * recovery_committed.js  -> Implement data recovery
 * recovery_pendding.js   -> Implement data recovery
 * rollback.js            -> Implement cancel data transaction
 * transaction.js         -> Implement data controller management
 * user.js                -> Url routes logic module
---------------------------------------------------------------------------------
<h3>How To Use And Run This Sample Code?</h3>
 * 1. git clone this code.
 * 2. cd project and npm install -l with package.json.
 * 3. run with command -> node app.js
 * 4. open web brower -> http://127.0.0.1:3000 and you will see login page.
 * 5. login with owner and password you configured.
 * 6. try ~~~~~
 * 7. recovery data :
   * 1. run with command -> node recovery_committed.js
   * 2. run with command -> node recovery_pendding.js and check you data in mongodb.
---------------------------------------------------------------------------------
<h3>Notice List:</h3>
 * a. while recovering data, please stop trade_transaction.js first.
 * b. if you wanna recover data, do command onderline:
   * 1. cd  your project_path/routes/
   * 2. use command -> node recovery_committed.js
   * 3. use command -> node recovery_pendding.js and checkout data in your mongodb.
 * c. mongod instance has journaling enabled to ensure that your data is always in a recoverable state
     in the event of an unclean mongod shutdown.
