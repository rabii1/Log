const SparqlClient = require('sparql-client-2');
// const dateFormat = require('dateFormat');
const uuid = require('uuid/v1');
 var dateFormat = require("dateformat");

//  var now = new Date();

var user = 'admin';
var password = 'kABo3qWo7K62cqF';
const endpoint = 'http://' + user + ':' + password + '@http://146.59.159.175:8180/agent';
 const client = new SparqlClient(endpoint);
module.exports = class Personne {
    constructor(id_personne, nompersonne, prenom, cin, genre, day_birth,month_birth,year_birth,nationalite,lieu_naissance,etat_civil,situation_professionnel,num_passeport,fonctionprofessionnel ) {
        this.id_personne = id_personne;
        this.nompersonne = nompersonne;
        this.prenom = prenom;
        this.cin = cin;
        this.genre = genre;
        this.day_birth = day_birth;
        this.month_birth = month_birth;
        this.year_birth = year_birth;
        this.nationalite = nationalite;
        this.lieu_naissance = lieu_naissance;
        this.etat_civil = etat_civil;
        this.situation_professionnel = situation_professionnel;
        this.num_passeport = num_passeport;
        this.fonctionprofessionnel = fonctionprofessionnel;
    }

        createPersonne(call) {
              var now = new Date();
         var dTime = dateFormat(now, "dd/mm/yyyy hh:M");
            var rand = uuid();
            var query =


        "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
        "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
        "PREFIX Agent:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>" +
        "PREFIX Personne:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent/Personne/>" +
        "Insert data " +
        "{" +

            "Personne:" + rand + "  rdf:type" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#Personne>." +
            "Personne:" + rand + "  Agent:id_personne'" + rand + "'." +
            "Personne:" + rand + "  Agent:nompersonne'" + this.nompersonne + "'. " +
            "Personne:" + rand + "  Agent:prenom    '" + this.prenom + "'. " +
            "Personne:" + rand + "  Agent:cin '" + this.cin + "'." +
            "Personne:" + rand + "  Agent:genre '" + this.genre + "'." +
            "Personne:" + rand + "  Agent:day_birth '" + this.day_birth + "'." +
            "Personne:" + rand + "  Agent:month_birth '" + this.month_birth + "'." +
            "Personne:" + rand + "  Agent:year_birth '" + this.year_birth + "'." +
            "Personne:" + rand + "  Agent:nationalite '" + this.nationalite + "'." +
            "Personne:" + rand + "  Agent:lieu_naissance '" + this.lieu_naissance + "'." +
            "Personne:" + rand + "  Agent:etat_civil '" + this.etat_civil + "'." +
            "Personne:" + rand + "  Agent:situation_professionnel '" + this.situation_professionnel + "'." +
            "Personne:" + rand + "  Agent:num_passeport '" + this.num_passeport + "'." +
            "Personne:" + rand + "  Agent:fonctionprofessionnel '" + this.fonctionprofessionnel + "'." +

            
           

            "};";
            console.log(query)
        client.query(query)
            .execute()
            .then(function (results) {
                call(rand)
            })
            .catch(function (error) {
                // Oh noes! 
                call('Failed to Add personne.');
            });
    }

    
   FindAll(call) {
    console.log(client);
    var query =
       
      "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
      "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
      "PREFIX Agent:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#Personne/>" +
      "PREFIX Personne:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent/Personne/>" +
        "SELECT  ?id_personne ?nompersonne ?prenom ?cin  ?genre ?day_birth ?month_birth ?year_birth ?nationalite ?lieu_naissance  ?etat_civil ?situation_professionnel ?num_passeport ?fonctionprofessionnel \n" +
        "WHERE  {" +
        "?y  Agent:id_personne ?id_personne ;\n" +
        "Agent:nompersonne ?nompersonne  ;\n" +
        "Agent:prenom ?prenom ;\n" + 
        "Agent:cin ?cin ;\n" +
        "Agent:genre ?genre  ;\n" +
        "Agent:day_birth ?day_birth ;\n" +
        "Agent:month_birth ?month_birth ;\n" +
        "Agent:year_birth ?year_birth  ;\n" +
        "Agent:nationalite ?nationalite ;\n" +
        "Agent:lieu_naissance ?lieu_naissance ;\n" +
        "Agent:etat_civil ?etat_civil  ;\n" +
        "Agent:situation_professionnel ?situation_professionnel ;\n" +
        "Agent:num_passeport ?num_passeport ;\n" +
        "Agent:fonctionprofessionnel ?fonctionprofessionnel  ;\n" +
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

FindOne( id_personne, call) {
    var query =
   
    "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
    "PREFIX Agent:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#>" +
    "PREFIX Personne:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent/Personne/>" +
      "SELECT  ?id_personne ?nompersonne ?prenom ?cin  ?genre ?day_birth ?month_birth ?year_birth ?nationalite ?lieu_naissance  ?etat_civil ?situation_professionnel ?num_passeport ?fonctionprofessionnel \n" +
       "WHERE  {" +
       "?y  Agent:id_personne ?id_personne ; Agent:id_personne '" +id_personne+  "';\n" +
       "Agent:nompersonne ?nompersonne  ;\n" +
       "Agent:prenom ?prenom ;\n" + 
       "Agent:cin ?cin ;\n" +
       "Agent:genre ?genre  ;\n" +
       "Agent:day_birth ?day_birth ;\n" +
       "Agent:month_birth ?month_birth ;\n" +
       "Agent:year_birth ?year_birth  ;\n" +
       "Agent:nationalite ?nationalite ;\n" +
       "Agent:lieu_naissance ?lieu_naissance ;\n" +
       "Agent:etat_civil ?etat_civil  ;\n" +
       "Agent:situation_professionnel ?situation_professionnel ;\n" +
       "Agent:num_passeport ?num_passeport ;\n" +
       "Agent:fonctionprofessionnel ?fonctionprofessionnel  ;\n" +
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

Update ( id_personne, nompersonne, prenom,
    cin, genre, day_birth, month_birth, year_birth,
    nationalite, lieu_naissance, etat_civil, situation_professionnel,
    num_passeport, fonctionprofessionnel,call)  {
    var query =

        "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
        "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
        "PREFIX Agent:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#Personne/>" +
        "PREFIX Personne:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent/Personne/>" +
        "DELETE{\n" +
                    
        "DELETE{\n" +
        "?y Agent:nompersonne  ?nompersonne.\n" +
        "?y Agent:prenom  ?prenom.\n" +
        "?y Agent:cin  ?cin .\n" +
        "?y Agent:genre  ?genre.\n" +
        "?y Agent:day_birth  ?day_birth.\n" +
        "?y Agent:month_birth  ?month_birth.\n" +
        "?y Agent:year_birth  ?year_birth.\n" +
        "?y Agent:nationalite ?nationalite.\n" +
        "?y Agent:lieu_naissance  ?lieu_naissance.\n" +
        "?y Agent:etat_civil  ?etat_civil.\n" +
        "?y Agent:situation_professionnel  ?situation_professionnel.\n" +
        "?y Agent:num_passeport  ?num_passeport.\n" +
        "?y Agent:fonctionprofessionnel  ?fonctionprofessionnel.\n" + 
         "}\n" +
        
         "INSERT{\n" +
        "?y Agent:nompersonne  '" +   nompersonne + "'.\n" +
        "?y Agent:prenom  '" +  prenom  + "'.\n" +
        "?y Agent:cin  '" +  cin + "'.\n" +
        "?y Agent:genre  '" +    genre + "'.\n" +
        "?y Agent:day_birth  '" +  day_birth + "'.\n" +
        "?y Agent:month_birth '" +    month_birth + "'.\n" +  
        "?y Agent:year_birth  '" +   year_birth + "'.\n" +
        "?y Agent:nationalite  '" +  nationalite + "'.\n" +
        "?y Agent:lieu_naissance  '" +   lieu_naissance + "'.\n" +
        "?y Agent:etat_civil  '" +  etat_civil + "'.\n" +
        "?y Agent:situation_professionnel '" +   situation_professionnel + "'.\n" +
        "?y Agent:num_passeport  '" +   num_passeport + "'.\n" +
        "?y Agent:fonctionprofessionnel  '" +  fonctionprofessionnel + "'.\n" +
        
        "} WHERE{\n" +
         "?y Agent:id_personne'" +  id_personne + "'.\n" +
        "?y Agent:nompersonne  ?nompersonne.\n" +
        "?y Agent:prenom  ?prenom.\n" +
        "?y Agent:cin  ?cin.\n" +
        "?y Agent:genre  ?genre .\n" +
        "?y Agent:day_birth  ?day_birth.\n" +
        "?y Agent:month_birth  ?month_birth.\n" +
        "?y Agent:year_birth  ?year_birth.\n" +
        "?y Agent:nationalite ?nationalite.\n" +
        "?y Agent:lieu_naissance  ?lieu_naissance.\n" +
        "?y Agent:etat_civil  ?etat_civil.\n" +
        "?y Agent:situation_professionnel  ?situation_professionnel.\n" +
        "?y Agent:num_passeport  ?num_passeport.\n" +
        "?y Agent:fonctionprofessionnel  ?fonctionprofessionnel. "  +
        "}";
        
    console.log(query); //affichage du réquete au dessus dans notre terminal
    client.query(query) // exc du reéquete au niveau du notre BD , fuseki 
            .execute()
            .then(function (results) {
                call('Personne Updated.');
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call('Failed To Update Personne  .');
            });

}
    


 
Delete( id_personne, call) {
    //var query = ' Matiere[nom_matiere: ' + this.nom_matiere + ',description_matiere: ' + this.description_matiere + ',enseignant: ' + this.enseignant + ',etablissement :'+this.etablissement+'] Action= DELETE.';
    var result;
    var query =
    "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
    "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
    "PREFIX Agent:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#Personne/>" +
    "PREFIX Personne:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent/Personne/>" +
    "DELETE {\n" +
    " ?s ?p ?o }WHERE {?s ?p ?o ;agent:id_personne" +'"'+ id_personne +'"' +"};"
            console.log(query);
    client.query(query)
        .execute()
        .then(function (results) {
            call('personne Deleted.');
        })
        .catch(function (error) {
            // Oh noes! :
            call('Failed To Delete personne .');
        });
    }



}