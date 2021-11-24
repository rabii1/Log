
const SparqlClient = require('sparql-client-2');
// const endpoint = 'http://localhost:3030/agent';

var user = 'admin';
var password = 'kABo3qWo7K62cqF';
const endpoint = 'http://' + user + ':' + password + '@http://146.59.159.175:8180/basee';
var client = new SparqlClient(endpoint);
const uuid = require('uuid/v1');
module.exports = class Admin {
    constructor(id_admin, associe_personne, statut,
        grade, image_admin) {
        this.id_admin = id_admin;
        this.associe_personne = associe_personne;
        this.statut = statut;
        this.grade = grade;
        this.image_admin = image_admin;
        

    }



    CreateAdmin(call) {

        var now = new Date();
        var rand = uuid();
        var query =
            "PREFIX  educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
            "PREFIX  Admin: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Admin/> \n" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +
            "Insert data \n" +
            "{\n" +
            "Admin:" + rand + "  rdf:type <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#Admin>." +
            "Admin:" + rand + "  educa:id_admin'" + rand + "'." +
            "Admin:" + rand + "  educa:associe_personne'" + this.associe_personne + "'.\n " +
            "Admin:" + rand + "  educa:statut'" + this.statut + "'. \n" +
            "Admin:" + rand + "  educa:grade '" + this.grade + "'.\n " +
            "Admin:" + rand + "  educa:image_admin '" + this.image_admin + "'.\n " +
         

            "};";

        console.log(query)
        client.query(query)
            .execute()
            .then(function (results) {
                call(rand)
            })
            .catch(function (error) {
                console.log(error)
                call('Failed to Add Admin.');
            });
    }


    FindAll(call) {
        console.log(client);
        var query =
            "PREFIX  educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
            "PREFIX  Admin: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Admin/> \n" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +
            "SELECT  ?id_admin ?associe_personne ?statut  ?grade  ?image_admin \n" +
            "WHERE  {" +
            "?y  educa:id_admin ?id_admin ;\n" +
            "educa:associe_personne ?associe_personne  ;\n" +
            "educa:statut ?statut ;\n" +
            "educa:grade ?grade ;\n" +
            "educa:image_admin ?image_admin ;\n" +
           
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

    FindOne(id_admin, call) {
        var query =
            "PREFIX  educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
            "PREFIX  Admin: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Admin/> \n" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +
            "SELECT  ?id_admin ?associe_personne ?statut ?grade ?image_enseignant \n" +
            "WHERE  {" +
            "?y  educa:id_admin ?id_admin ; educa:id_admin '" + id_admin + "';\n" +
            "educa:associe_personne ?associe_personne  ;\n" +
            "educa:statut ?statut ;\n" +
            "educa:grade ?grade ;\n" +
            "educa:image_admin ?image_admin ;\n" +
         
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



    // Update (id_admin, associe_personne, statut, date_recrutement, ancien_admin,
    //     nombre_annee_experience, grade, date_grade, image_admin, modifierLe, modifierPar,call) 
    //     {
    //     var query =
    //    "PREFIX  educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
    //    "PREFIX  Admin: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Admin/> \n" +
    // //    "PREFIX Agent:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#Personne/>" +
    // //    "PREFIX Personne:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent/Personne/>" +
    //    "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +

    //    "DELETE{\n" +

    //            "?y educa:associe_personne  ?associe_personne.\n" +
    //            "?y educa:statut  ?statut.\n" +
    //            "?y educa:date_recrutement  ?date_recrutement .\n" +
    //            "?y educa:ancien_admin  ?ancien_admin.\n" +
    //            "?y educa:nombre_annee_experience  ?nombre_annee_experience.\n" +
    //            "?y educa:grade  ?grade.\n" +
    //            "?y educa:date_grade  ?date_grade.\n" +
    //            "?y educa:image_admin ?image_admin.\n" +
    //            "?y educa:modifierLe  ?modifierLe.\n" +
    //            "?y educa:modifierPar  ?modifierPar.\n" +
    //             "}\n" +

    //    "INSERT{\n" +

    //            "?y educa:associe_personne "  +   associe_personne   + "'.\n" +
    //            "?y educa:statut "  +'"'+   statut   + "'.\n" +
    //            "?y educa:date_recrutement "  +'"'+   date_recrutement  + "'.\n" +
    //            "?y educa:ancien_admin "  +'"'+    ancien_admin + "'.\n" +
    //            "?y educa:nombre_annee_experience "  +'"' +   nombre_annee_experience   + "'.\n" +   
    //            "?y educa:grade "  +'"' +    grade  + "'.\n" +  
    //            "?y educa:date_grade "  +'"' +   date_grade    + "'.\n" +
    //            "?y educa:image_admin "  +'"' +  image_admin  + "'.\n" +
    //            "?y educa:modifierLe "  +'"' +   modifierLe + "'.\n" +
    //            "?y educa:modifierPar "  +'"' +  modifierPar   + "'.\n" +

    //    "} WHERE{\n" +
    //             "?y educa:id_admin"    +'"'+   id_admin   + "'.\n" +
    //            "?y educa:associe_personne  ?associe_personne.\n" +
    //            "?y educa:statut  ?statut.\n" +
    //            "?y educa:date_recrutement  ?date_recrutement.\n" +
    //            "?y educa:ancien_admin  ?ancien_admin .\n" +
    //            "?y educa:nombre_annee_experience  ?nombre_annee_experience.\n" +
    //            "?y educa:grade  ?grade.\n" +
    //            "?y educa:date_grade  ?date_grade.\n" +
    //            "?y educa:image_admin ?image_admin.\n" +
    //            "?y educa:modifierLe  ?modifierLe.\n" +
    //            "?y educa:modifierPar  ?modifierPar.\n" +

    //            "}";

    //        console.log(query); //affichage du réquete au dessus dans notre terminal
    //        client.query(query) // exc du reéquete au niveau du notre BD , fuseki 
    //                .execute()
    //                .then(function (results) {
    //                    call('Admin Updated.');
    //                })
    //                .catch(function (error) {
    //                    // Oh noes! 🙀
    //                    call('Failed To Update Admin  .');
    //                });

    //    }


    Update(call) {
        var query =
            "PREFIX  educa: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#> \n" +
            "PREFIX  Admin: <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Admin/> \n" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>\n" +

            "DELETE {"
            +
            "?y educa:associe_personne ?associe_personne .\n" +
            "?y educa:statut ?statut .\n" +
            "?y educa:date_recrutement ?date_recrutement.\n" +
            "?y educa:ancien_admin ?ancien_admin .\n" +
            "?y educa:nombre_annee_experience ?nombre_annee_experience.\n" +
            "?y educa:grade ?grade .\n" +
            "?y educa:date_grade ?date_grade .\n" +
            "} " +
            "INSERT {" +
            "?y educa:associe_personne'" + this.associe_personne + "'.\n" +
            "?y educa:statut'" + this.statut + "'.\n" +
            "?y educa:date_recrutement'" + this.date_recrutement + "'.\n" +
            "?y educa:ancien_admin'" + this.ancien_admin + "'.\n" +
            "?y educa:nombre_annee_experience'" + this.nombre_annee_experience + "'.\n" +
            "?y educa:grade'" + this.grade + "'.\n" +
            "?y educa:date_grade'" + this.date_grade + "'.\n" +
            "} " +
            "WHERE { " +
            "?y educa:id_admin '" + this.id_admin + "'.\n" +
            "?y educa:statut ?statut .\n" +
            "?y educa:date_recrutement ?date_recrutement.\n" +
            "?y educa:ancien_admin ?ancien_admin .\n" +
            "?y educa:nombre_annee_experience ?nombre_annee_experience.\n" +
            "?y educa:grade ?grade.\n" +
            "?y educa:date_grade ?date_grade.\n" +
            "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call('admin Updated.');
            })
            .catch(function (error) {
                // Oh noes! 
                call('Failed To Update admin .');
            });
    }

    Delete(id_personne, call) {
        //var query = ' Matiere[nom_matiere: ' + this.nom_matiere + ',description_matiere: ' + this.description_matiere + ',enseignant: ' + this.enseignant + ',etablissement :'+this.etablissement+'] Action= DELETE.';
        var result;
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Agent:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent#Personne/>" +
            "PREFIX Personne:" + "<http://www.semanticweb.org/ontologies/2016/e-Saad/Agent/Personne/>" +
            "DELETE {\n" +
            " ?s ?p ?o }WHERE {?s ?p ?o ;Agent:id_personne" + '"' + id_personne + '"' + "};"
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