const SparqlClient = require('sparql-client-2');
var user = 'admin';
var password = 'kABo3qWo7K62cqF';
const endpoint = 'http://' + user + ':' + password + '@http://146.59.159.175:8180/basee';
 const client = new SparqlClient(endpoint);
module.exports = class User {
    constructor(nom, prenom, cin, id, login, password) {
        this.nom = nom;
        this.prenom = prenom;
        this.cin = cin;
        this.id = id;
        this.login = login;
        this.password = password;

    }

    Create(call) {
        var rand = Math.random();
        var query =
    
            "PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX User:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/User/>" +
            "Insert data " +
            "{" +
            "User:" + rand + "  rdf:type <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#User>." +
            "User:" + rand + "  educa:nom     '" + this.nom + "'." +
            "User:" + rand + "  educa:prenom    '" + this.prenom + "'." +
            "User:" + rand + "  educa:cin    '" + this.cin + "'. " +
            "User:" + rand + "  educa:id '" + this.id + "'." +
            "User:" + rand + "  educa:login '" + this.login + "'." +
            "User:" + rand + "  educa:password '" + this.password + "'." +


       


            "};";
            console.log(query)
        client.query(query)
            .execute()
            .then(function (results) {
                call('user Added.')
            })
            .catch(function (error) {
                // Oh noes! 
                call('Failed to Add user.');
            });
    }

    
    Delete( id, call) {
        //var query = ' Matiere[nom_matiere: ' + this.nom_matiere + ',description_matiere: ' + this.description_matiere + ',enseignant: ' + this.enseignant + ',etablissement :'+this.etablissement+'] Action= DELETE.';
        var result;
        var query =
        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
        "PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>\n"+
        "PREFIX User:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/User/>\n" +
        "DELETE {\n" +
        " ?s ?p ?o }WHERE {?s ?p ?o ;educa:id" +'"'+ id +'"' +"};"
                console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call('User Deleted.');
            })
            .catch(function (error) {
                // Oh noes! :
                call('Failed To Delete User .');
            });}



    Update(call) {
        var query =
        "PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>" +
        "PREFIX User:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/User/>" +  
        "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "DELETE{\n" +
            "?y educa:cin ?cin.\n" +
            "?y educa:nom ?nom.\n" +
            "?y educa:prenom ?prenom.\n" +

            "}\n" +
            "INSERT{\n" +
            "?y educa:cin '" + this.cin + "'.\n" +
            "?y educa:nom '" + this.nom + "'.\n" +
            "?y educa:prenom '" + this.prenom + "'.\n" +

            "}\n" +
            "WHERE{\n" +
            "?y educa:id '" + this.id + "'.\n" +
            "?y educa:cin ?cin.\n" +
            "?y educa:nom ?nom.\n" +
            "?y educa:prenom ?prenom.\n" +

            "}";

        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call('user Updated.');
            })
            .catch(function (error) {
                // Oh noes! 
                call('Failed To Update user .');
            });
}



FindAll(call) {
    console.log(client);
    var query =
        "PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>" +
        "PREFIX  rdf:  <http://www.w3.org/2000/01/rdf-schema#>\n " +
        "SELECT  ?id ?cin ?nom ?prenom \n" +
        "WHERE  {" +
        "?y  educa:id ?id ;\n" + "educa:cin ?cin  ;\n" + "educa:nom ?nom ;\n" + "educa:prenom ?prenom ;\n" + 
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

FindOne( id, call) {
    var query =
    "PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>" +
    "PREFIX  rdf:  <http://www.w3.org/2000/01/rdf-schema#>\n " +
    "SELECT ?id ?cin ?nom ?prenom \n" +
        "WHERE  {" +
       "?y  educa:id ?id ; educa:id '" +id+  "';\n" + "educa:cin ?cin  ;\n" + "educa:nom ?nom ;\n" + "educa:prenom ?prenom ;\n" + 

     
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

FindOne1(login,password,call) {
    var query =
    "PREFIX educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#>" +
    "PREFIX  rdf:  <http://www.w3.org/2000/01/rdf-schema#>\n " +
        "SELECT ?id  ?login ?password \n" +
        "WHERE  {" +
        "?y  educa:login ?login ; educa:login '" +login+  "';\n" + "educa:password ?password ; educa:password '" +password+   "';\n" +"educa:id ?id ;\n" +
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




}