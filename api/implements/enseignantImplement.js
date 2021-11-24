
const SparqlClient = require('sparql-client-2');

var user = '';
var password = '';
const endpoint = 'http://' + user + ':' + password + '@localhost:3030/basee';
var client = new SparqlClient(endpoint);
const uuid = require('uuid/v1');
module.exports = class Enseignant{
    constructor(id_enseignant, associe_personne,statut,
                    date_recrutement,ancien_employeur,nombre_annee_experience,
                    grade,date_grade,image_enseignant,
                    modifierLe,modifierPar )
                {
                        this.id_enseignant=id_enseignant;
                        this.associe_personne=associe_personne;
                        this.statut=statut;
                        this.date_recrutement=date_recrutement;
                        this.ancien_employeur=ancien_employeur;
                        this.nombre_annee_experience=nombre_annee_experience;
                        this.grade=grade ;
                        this.date_grade=date_grade ;
                        this.image_enseignant = image_enseignant;
                        this.modifierLe=modifierLe ;
                        this.modifierPar =modifierPar ;
                      
                 }
                
           
  
    CreateEnseignant(call) {
    
        var now = new Date();
        var rand = uuid();
        var query =
                    "PREFIX  educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
                    "PREFIX  Enseignant: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Enseignant/> \n" +
                     "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +
                    "Insert data \n" +
                    "{\n" + 
                    "Enseignant:" + rand + "  rdf:type <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#Enseignant>." +
                    "Enseignant:" + rand + "  educa:id_enseignant'" + rand + "'." +
                    "Enseignant:" + rand + "  educa:associe_personne'" + this.associe_personne + "'.\n " +
                    "Enseignant:" + rand + "  educa:statut'" + this.statut + "'. \n" +
                    "Enseignant:" + rand + "  educa:date_recrutement '" + this.date_recrutement + "'. \n" +
                    "Enseignant:" + rand + "  educa:ancien_employeur '" + this.ancien_employeur + "'. \n" +
                    "Enseignant:" + rand + "  educa:nombre_annee_experience '" + this.nombre_annee_experience + "'.\n " +
                    "Enseignant:" + rand + "  educa:grade '" + this.grade + "'.\n " +
                    "Enseignant:" + rand + "  educa:date_grade '" + this.date_grade + "'.\n " +
                    "Enseignant:" + rand + "  educa:image_enseignant '" + this.image_enseignant + "'.\n " +
                    "Enseignant:" + rand + "  educa:modifierLe '" + this.modifierLe + "'.\n " +
                    "Enseignant:" + rand + "  educa:modifierPar '" + this.modifierPar + "'.\n " +
                    
                    "};";
            
                            console.log(query)
                            client.query(query)
                                    .execute()
                                    .then(function (results) {
                                        call('Enseignant Added.')
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                        call('Failed to Add Enseignant.');
                                    });
                            }
               
     
FindAll(call) {
    console.log(client);
    var query =
    "PREFIX  educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
    "PREFIX  Enseignant: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Enseignant/> \n" +
     "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +
        "SELECT  ?id_enseignant ?associe_personne ?statut ?date_recrutement  ?ancien_employeur ?nombre_annee_experience ?grade ?date_grade ?image_enseignant ?modifierLe  ?modifierPar \n" +
        "WHERE  {" +
        "?y  educa:id_enseignant ?id_enseignant ;\n" +
        "educa:associe_personne ?associe_personne  ;\n" +
        "educa:statut ?statut ;\n" + 
        "educa:date_recrutement ?date_recrutement ;\n" +
        "educa:ancien_employeur ?ancien_employeur  ;\n" +
        "educa:nombre_annee_experience ?nombre_annee_experience ;\n" +
        "educa:grade ?grade ;\n" +
        "educa:date_grade ?date_grade  ;\n" +
        "educa:image_enseignant ?image_enseignant ;\n" +
        "educa:modifierLe ?modifierLe ;\n" +
        "educa:modifierPar ?modifierPar ;\n" +
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

FindOne( id_enseignant, call) {
    var query =
    "PREFIX  educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
    "PREFIX  Enseignant: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Enseignant/> \n" +
     "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +
     "SELECT  ?id_enseignant ?associe_personne ?statut ?date_recrutement  ?ancien_employeur ?nombre_annee_experience ?grade ?date_grade ?image_enseignant ?modifierLe  ?modifierPar \n" +
     "WHERE  {" +
       "?y  educa:id_enseignant ?id_enseignant ; educa:id_enseignant '" +id_enseignant+  "';\n" +
       "educa:associe_personne ?associe_personne  ;\n" +
       "educa:statut ?statut ;\n" + 
       "educa:date_recrutement ?date_recrutement ;\n" +
       "educa:ancien_employeur ?ancien_employeur  ;\n" +
       "educa:nombre_annee_experience ?nombre_annee_experience ;\n" +
       "educa:grade ?grade ;\n" +
       "educa:date_grade ?date_grade  ;\n" +
       "educa:image_enseignant ?image_enseignant ;\n" +
       "educa:modifierLe ?modifierLe ;\n" +
       "educa:modifierPar ?modifierPar ;\n" +
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

// Update(call) {
//     var query =

//     "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
//     "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
//     "PREFIX Agent:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#Personne/>" +
//     "PREFIX Personne:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent/Personne/>" +
//         "DELETE{\n" +
//         "?y Agent:nompersonne ?nompersonne  ;\n" +
//         "?y Agent:prenom ?prenom ;\n" + 
//         "?y Agent:cin ?cin ;\n" +
//         "?y Agent:genre ?genre  ;\n" +
//         "?y Agent:day_birth ?day_birth ;\n" +
//         "?y Agent:month_birth ?month_birth ;\n" +
//         "?y Agent:year_birth ?year_birth  ;\n" +
//         "?y Agent:nationalite ?nationalite ;\n" +
//         "?y Agent:lieu_naissance ?lieu_naissance ;\n" +
//         "?y Agent:etat_civil ?etat_civil  ;\n" +
//         "?y Agent:situation_professionnel ?situation_professionnel ;\n" +
//         "?y Agent:num_passeport ?num_passeport ;\n" +
//         "?y Agent:fonctionprofessionnel ?fonctionprofessionnel  ;\n" +
//         "}\n" +
//         "INSERT{\n" +
//         "?y Agent:nompersonne '" + this.nompersonne + "'.\n" +
//         "?y Agent:prenom '" + this.prenom + "'.\n" +
//         "?y Agent:cin '" + this.cin + "'.\n" +
//         "?y Agent:genre '" + this.genre + "'.\n" +
//         "?y Agent:day_birth '" + this.day_birth + "'.\n" +
//         "?y Agent:month_birth '" + this.month_birth + "'.\n" +
//         "?y Agent:year_birth '" + this.year_birth + "'.\n" +
//         "?y Agent:nationalite '" + this.nationalite + "'.\n" +
//         "?y Agent:lieu_naissance '" + this.lieu_naissance + "'.\n" +
//         "?y Agent:etat_civil '" + this.etat_civil + "'.\n" +
//         "?y Agent:situation_professionnel '" + this.situation_professionnel + "'.\n" +
//         "?y Agent:num_passeport '" + this.num_passeport + "'.\n" +
//         "?y Agent:fonctionprofessionnel '" + this.fonctionprofessionnel + "'.\n" +

//         "}\n" +
//         "WHERE{\n" +
//         "?y Agent:id_personne'" + this.id_personne + "'.\n" +
//         "?y Agent:nompersonne ?nompersonne  ;\n" +
//         "?y Agent:prenom ?prenom ;\n" + 
//         "?y Agent:cin ?cin ;\n" +
//         "?y Agent:genre ?genre  ;\n" +
//         "?y Agent:day_birth ?day_birth ;\n" +
//         "?y Agent:month_birth ?month_birth ;\n" +
//         "?y Agent:year_birth ?year_birth  ;\n" +
//         "?y Agent:nationalite ?nationalite ;\n" +
//         "?y Agent:lieu_naissance ?lieu_naissance ;\n" +
//         "?y Agent:etat_civil ?etat_civil  ;\n" +
//         "?y Agent:situation_professionnel ?situation_professionnel ;\n" +
//         "?y Agent:num_passeport ?num_passeport ;\n" +
//         "?y Agent:fonctionprofessionnel ?fonctionprofessionnel  ;\n" +

//         "}";

//     console.log(query);
//     client.query(query)
//         .execute()
//         .then(function (results) {
//             call('personnes Updated.');
//         })
//         .catch(function (error) {
//             // Oh noes! 
//             call('Failed To Update personne .');
//         });
// }

 

Update (call) {
 var query =
"PREFIX  educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
"PREFIX  Admin: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Admin/> \n" +
"PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +
        
"DELETE{\n" +
       
        "?y educa:associe_personne  ?associe_personne.\n" +
        "?y educa:statut  ?statut.\n" +
        "?y educa:date_recrutement  ?date_recrutement .\n" +
        "?y educa:ancien_admin  ?ancien_admin.\n" +
        "?y educa:nombre_annee_experience  ?nombre_annee_experience.\n" +
        "?y educa:grade  ?grade.\n" +
        "?y educa:date_grade  ?date_grade.\n" +
        "?y educa:image_admin ?image_admin.\n" +
        "?y educa:modifierLe  ?modifierLe.\n" +
        "?y educa:modifierPar  ?modifierPar.\n" +
         "}\n" +
        
"INSERT{\n" +
        
        "?y educa:associe_personne "  +'"'+   associe_personne   +'"'+   ".\n" +
        "?y educa:statut "  +'"'+   statut    +'"'+   ".\n" +
        "?y educa:date_recrutement "  +'"'+   date_recrutement   +'"'+    ".\n" +
        "?y educa:ancien_admin "  +'"'+    ancien_admin  +'"'+   ".\n" +
        "?y educa:nombre_annee_experience "  +'"' +   nombre_annee_experience   +'"'+   ".\n" +   
        "?y educa:grade "  +'"' +    grade  +'"' +   ".\n" +   
        "?y educa:date_grade "  +'"' +   date_grade    +'"' +  ".\n" +
        "?y educa:image_admin "  +'"' +  image_admin   +'"' +  ".\n" +
        "?y educa:modifierLe "  +'"' +   modifierLe  +'"' +   ".\n" +
        "?y educa:modifierPar "  +'"' +  modifierPar   +'"' +  ".\n" + 
        
"} WHERE{\n" +
         "?y educa:id_admin"    +'"'+   id_admin   +'"'+   ".\n" +
        "?y educa:associe_personne  ?associe_personne.\n" +
        "?y educa:statut  ?statut.\n" +
        "?y educa:date_recrutement  ?date_recrutement.\n" +
        "?y educa:ancien_admin  ?ancien_admin .\n" +
        "?y educa:nombre_annee_experience  ?nombre_annee_experience.\n" +
        "?y educa:grade  ?grade.\n" +
        "?y educa:date_grade  ?date_grade.\n" +
        "?y educa:image_admin ?image_admin.\n" +
        "?y educa:modifierLe  ?modifierLe.\n" +
        "?y educa:modifierPar  ?modifierPar.\n" +
      
        "}";
        
    console.log(query); //affichage du réquete au dessus dans notre terminal
    client.query(query) // exc du reéquete au niveau du notre BD , fuseki 
            .execute()
            .then(function (results) {
                call('Admin Updated.');
            })
            .catch(function (error) {
                // Oh noes! 🙀
                call('Failed To Update Admin  .');
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
    " ?s ?p ?o }WHERE {?s ?p ?o ;Agent:id_personne" +'"'+ id_personne +'"' +"};"
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