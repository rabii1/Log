const SparqlClient = require('sparql-client-2');
// const dateFormat = require('dateFormat');
const uuid = require('uuid/v1');
 var dateFormat = require("dateformat");

//  var now = new Date();

var user = 'admin';
var password = 'kABo3qWo7K62cqF';
const endpoint = 'http://' + user + ':' + password + '@http://146.59.159.175:8180/agent';
 const client = new SparqlClient(endpoint);
module.exports = class LogAction {
    constructor(id_action,associe_log, ancien_val, new_val, date) {
        this.id_action = id_action;
        this.associe_log = associe_log;
        this.ancien_val = ancien_val;
        this.new_val = new_val;
        this.date = date;
    }

    createLogAction(call) {
        var now = new Date();
   var dTime = dateFormat(now, "dd/mm/yyyy hh:MM");
      var rand = uuid();
      var query =
  "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
  "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
  "PREFIX LogAction:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/LogAction/>" +
  "Insert data " +
  "{" +

      "Log:" + rand + "  rdf:type <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#Log>." +
      "Log:" + rand + "  educa:id_action'" + rand + "'." +
      "Log:" + rand + "  educa:associe_log'" + this.associe_log + "'. " +
      "Log:" + rand + "  educa:ancien_val    '" + this.ancien_val + "'. " +
      "Log:" + rand + "  educa:new_val '" + this.new_val + "'." +
      
      "Log:" + rand + "  educa:date '" + dTime + "'." +
  

      
     

      "};";
      console.log(query)
  client.query(query)
      .execute()
      .then(function (results) {
          call('logAction Added.')
      })
      .catch(function (error) {
          // Oh noes! 
          call('Failed to Add log.');
      });




      
}



}