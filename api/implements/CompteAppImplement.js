const SparqlClient = require('sparql-client-2');
// const dateFormat = require('dateFormat');
const uuid = require('uuid/v1');
 var dateFormat = require("dateformat");

//  var now = new Date();

var user = 'admin';
var password = 'kABo3qWo7K62cqF';
const endpoint = 'http://' + user + ':' + password + '@http://146.59.159.175:8180/basee';
const client = new SparqlClient(endpoint);
module.exports = class CompteApp {
    constructor(id_compte,modifierLe, modifierPar, idProprietaire,categorieProp,login,password,dernierAcces,etatCompte,connecter ) {
        this.id_compte = id_compte;
        this.modifierLe = modifierLe;
        this.modifierPar = modifierPar;
        this.idProprietaire = idProprietaire;
        this.categorieProp = categorieProp;
        this.login = login;
        this.password = password;
        this.dernierAcces = dernierAcces;
        this.etatCompte = etatCompte;
        this.connecter = connecter;
       

    }

createCompte(call) {
              var now = new Date();
         var dTime = dateFormat(now, "dd/mm/yyyy hh:MM");
            var rand = uuid();
            var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX CompteApp:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/CompteApp/>" +
            "Insert data " +
            "{" +

            "CompteApp:" + rand + "  rdf:type <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#CompteApp>." +
            "CompteApp:" + rand + "  educa:id_compte'" + rand + "'." +
            "CompteApp:" + rand + "  educa:modifierLe '" + dTime + "'. " +
            "CompteApp:" + rand + "  educa:modifierPar'" + this.modifierPar + "'. " +
            "CompteApp:" + rand + "  educa:idProprietaire'" + this.idProprietaire + "'. " +
            "CompteApp:" + rand + "  educa:categorieProp'" + this.categorieProp + "'. " +
            "CompteApp:" + rand + "  educa:login'" + this.login + "'. " +
            "CompteApp:" + rand + "  educa:password'" + this.password + "'. " +
            "CompteApp:" + rand + "  educa:dernierAcces'" + this.dernierAcces + "'. " +
            "CompteApp:" + rand + "  educa:etatCompte'" + this.etatCompte + "'. " +
            "CompteApp:" + rand + "  educa:connecter'" + this.connecter + "'. " +
            "};";
            client.query(query)
            .execute()
            .then(function (results) {
                call('action-valid');
            })
            .catch(function (error) {
              call('action-failed');
            });
    }

FindAll(call) {
            console.log(client);
            var query =
             "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>" +
             "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
             "PREFIX CompteApp:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/CompteApp/>" +

             "SELECT  ?id_compte ?modifierLe ?modifierPar ?idProprietaire ?categorieProp ?login ?password ?dernierAcces ?etatCompte  ?connecter  \n" +
             "WHERE  {" +
             "?y  educa:id_compte ?id_compte ;\n" +
             "educa:modifierLe ?modifierLe  ;\n" + 
             "educa:modifierPar ?modifierPar ;\n" +
             "educa:idProprietaire ?idProprietaire ;\n" + 
             "educa:categorieProp ?categorieProp ;\n" + 
             "educa:login ?login ;\n" + 
             "educa:password ?password ;\n" +  
             "educa:dernierAcces ?dernierAcces ;\n" +
             "educa:etatCompte ?etatCompte ;\n" +
             "educa:connecter ?connecter ;\n" + 
             "}"
             console.log(query);
             client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings);
            })
            .catch(function (error) {
                call(error);
            });
            }
    
Delete( id_compte, call) {
                var result;
                var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX CompteApp:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/CompteApp/>" +
            "DELETE {\n" +
            " ?s ?p ?o }WHERE {?s ?p ?o ;educa:id_compte" +'"'+ id_compte +'"' +"};"
            console.log(query);
            client.query(query)
            .execute()
            .then(function (results) {
             call('compte Deleted.');
              })
            .catch(function (error) {
              // Oh noes! :
              call('Failed To Delete compte .');
            });}
        

            Update(call) {
                var query =
                "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
                "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
                "PREFIX CompteApp:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/CompteApp/>" +
                    "DELETE{\n" +
                    "?y educa:modifierLe ?modifierLe.\n" +
                    "?y educa:modifierPar ?modifierPar.\n" +
                    "?y educa:idProprietaire ?idProprietaire.\n" +
                    "?y educa:categorieProp ?categorieProp.\n" +
                    "?y educa:login ?login.\n" +
                    "?y educa:password ?password.\n" +
                    "?y educa:dernierAcces ?dernierAcces.\n" +
                    "?y educa:etatCompte ?etatCompte.\n" +
                    "?y educa:connecter ?connecter.\n" +
                    "}\n" +
                    "INSERT{\n" +
                    "?y educa:modifierLe '" + this.modifierLe + "'.\n" +
                    "?y educa:modifierPar '" + this.modifierPar + "'.\n" +
                    "?y educa:idProprietaire '" + this.idProprietaire + "'.\n" +
                    "?y educa:categorieProp '" + this.categorieProp + "'.\n" +
                    "?y educa:login '" + this.login + "'.\n" +
                    "?y educa:password '" + this.password + "'.\n" +
                    "?y educa:dernierAcces '" + this.dernierAcces + "'.\n" +
                    "?y educa:etatCompte '" + this.etatCompte + "'.\n" +
                    "?y educa:connecter '" + this.connecter + "'.\n" +
                    "}\n" +
                    "WHERE{\n" +
                    "?y educa:id_compte '" + this.id_compte + "'.\n" +
                    "?y educa:modifierLe ?modifierLe.\n" +
                    "?y educa:modifierPar ?modifierPar.\n" +
                    "?y educa:idProprietaire ?idProprietaire.\n" +
                    "?y educa:categorieProp ?categorieProp.\n" +
                    "?y educa:login ?login.\n" +
                    "?y educa:password ?password.\n" +
                    "?y educa:dernierAcces ?dernierAcces.\n" +
                    "?y educa:etatCompte ?etatCompte.\n" +
                    "?y educa:connecter ?connecter.\n" +
                  
                    
                    "}";
        
                console.log(query);
                client.query(query)
                    .execute()
                    .then(function (results) {
                        call('compte Updated.');
                    })
                    .catch(function (error) {
                        // Oh noes! 
                        call('Failed To Update compte .');
                    });
        }
        
        
        
FindOne( id_compte, call) {
             var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX CompteApp:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/CompteApp/>" +
            "SELECT  ?id_compte ?modifierLe ?modifierPar ?idProprietaire ?categorieProp ?login ?password ?dernierAcces ?etatCompte  ?connecter  \n" +
            "WHERE  {" +
            "?y  educa:id_compte ?id_compte ; educa:id_compte '" +id_compte+  "';\n" + 
               "educa:modifierLe ?modifierLe  ;\n" + 
               "educa:modifierPar ?modifierPar ;\n" +
               "educa:idProprietaire ?idProprietaire ;\n" + 
               "educa:categorieProp ?categorieProp ;\n" + 
               "educa:login ?login ;\n" + 
               "educa:password ?password ;\n" +  
               "educa:dernierAcces ?dernierAcces ;\n" +
               "educa:etatCompte ?etatCompte ;\n" +
               "educa:connecter ?connecter ;\n" + 
               "}"
             
                "}"
           console.log(query);
            client.query(query)
                .execute()
                .then(function (results) {
                    call(results.results.bindings[0]);
                })
                .catch(function (error) {
                    // Oh noes! 
                    call(error);
                });
        }
  
        findByLoginPwd(login,password,call) {
            var query =
            "PREFIX rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>" +
            "SELECT  ?id_compte ?modifierLe ?modifierPar ?idProprietaire ?categorieProp ?login ?password ?dernierAcces ?etatCompte  ?connecter  \n" +
                "WHERE  {" +
                "?y educa:id_compte ?id_compte;\n" +
                "educa:modifierLe ?modifierLe;\n" +
                "educa:modifierPar ?modifierPar;\n" +
                "educa:idProprietaire ?idProprietaire;\n" +
                "educa:categorieProp ?categorieProp;\n" +
                "educa:login "+ " " +'"'+ login +'"' + " " +"; \n" + 
                "educa:login ?login ;\n" +
                "educa:password ?password ;\n" +
                "educa:password " +" " +'"'+ password +'"' + " " +";\n" +
                "educa:dernierAcces ?dernierAcces;\n" +
                "educa:etatCompte ?etatCompte;\n" +
                "educa:connecter ?connecter;\n" +

                "}"
            console.log(query);
            client.query(query)
                .execute()
                .then(function (results) {
                    call(results.results.bindings[0],'compte succes');
                })
                .catch(function (error) {
                    call(error);
                });
        }
       

        // findByLoginPwd(login,password,call) {
        //     var query =
        //     "PREFIX rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +
        //     "PREFIX educa_URI:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
        //    // "PREFIX CompteApp:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/CompteApp/> \n" +
        //         "SELECT ?id_compte  ?login ?password ?idProprietaire   ?modifierLe  ?modifierPar  ?idProprietaire  ?categorieProp  ?dernierAcces ?etatCompte ?connecter \n" +
        //         "WHERE  {" +
        //         "?y educa_URI:id_compte ?id_compte;\n" +
        //         "educa_URI:login "+ " " +'"'+ login +'"' + " " +"; \n" + 
        //         "educa_URI:login ?login ;\n" +
        //         "educa_URI:password ?password ;\n" 
        //         + "educa_URI:modifierLe ?modifierLe  ;\n"
        //         + "educa_URI:modifierPar ?modifierPar;\n" 
        //         + "educa_URI:idProprietaire ?idProprietaire  ;\n"
        //         + "educa_URI:categorieProp ?categorieProp ;\n"
        //         +"educa_URI:dernierAcces ?dernierAcces ;\n"  
        //         +"educa_URI:etatCompte ?etatCompte ;\n" 
        //         + " educa_URI:connecter ?connecter ;\n"+
        //         "educa_URI:password " +" " +'"'+ password +'"' + " " +";\n" +
        //         "}"
        //     console.log(query);
        //     client.query(query)
        //         .execute()
        //         .then(function (results) {
        //             call(results.results.bindings[0]);
        //         })
        //         .catch(function (error) {
        //             call(error);
        //         });
        // }





















}