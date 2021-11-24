/**
 * EnseignantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 var Enseignant = require('../implements/enseignantImplement');
 var Personne = require('../implements/PersonneImplement');
 var CompteApp = require('../implements/CompteAppImplement');

 var myServiceLog = require('../services/logged.js');

module.exports = {
  


    create : function (req, res) {
        console.log(req.body);
        var personne=new Personne(req.body.personne.id_personne,  req.body.personne.nompersonne,  req.body.personne.prenom, 
            req.body.personne.cin, req.body.personne.genre,  req.body.personne.day_birth,  req.body.personne.month_birth , req.body.personne.year_birth,
            req.body.personne.nationalite,  req.body.personne.lieu_naissance,
            req.body.personne.etat_civil, req.body.personne.situation_professionnel, req.body.personne.num_passeport,
             req.body.personne.fonctionprofessionnel);
         

          personne.createPersonne( function (resul) {
   
                        //res.send(result);  
                        var enseignant = new Enseignant(req.body.id_enseignant,resul,req.body.statut, 
                                                        req.body.date_recrutement,req.body.ancien_employeur,   
                                                        req.body.nombre_annee_experience,
                                                        req.body.grade,  req.body.date_grade,  req.body.image_enseignant,
                                                        req.body.modifierLe, req.body.modifierPar
                                                        );


                          enseignant.CreateEnseignant(function (result) {
                            myServiceLog.createlog(req);


                            res.send(result)
                              


            });

         });
        
             
           
     }, 


     delete: function (req, res) {
            console.log(req.param('id_enseignant'))
            var enseignant = new Enseignant ();
            enseignant.DeleteEns(req.param('id_enseignant'), function (result) {
              myServiceLog.createlog(req);
                res.json({status:true,idtodelete:result});       
            
        });
    },

    
  
    delete: function (req, res) {
        //console.log(req.param('id'));
        var userr = new User ();
        userr.Delete(req.param('id'),function (result) {
          myServiceLog.createlog(req);
          res.json({status:true,idtodelete:result});       
        });
      },

      update: function (req, res) {
        var personne=new Personne(req.body.personne.id_personne,  req.body.personne.nompersonne,  req.body.personne.prenom, 
            req.body.personne.cin, req.body.personne.genre,  req.body.personne.day_birth,  req.body.personne.month_birth , req.body.personne.year_birth,
            req.body.personne.nationalite,  req.body.personne.lieu_naissance,
            req.body.personne.etat_civil, req.body.personne.situation_professionnel, req.body.personne.num_passeport,
             req.body.personne.fonctionprofessionnel);
         

          personne.createPersonne( function (resul) {
   
                        //res.send(result);  
                        var enseignant = new Enseignant(req.body.id_enseignant,resul,req.body.statut, 
                                                        req.body.date_recrutement,req.body.ancien_employeur,   
                                                        req.body.nombre_annee_experience,
                                                        req.body.grade,  req.body.date_grade,  req.body.image_enseignant,
                                                        req.body.modifierLe, req.body.modifierPar
                                                        );
        userr.Update(function (result) {
          myServiceLog.createlog(req);
          res.json({status:true,result});       
        });

    });
      
      
}, 

      list: function (req, res) {
        var enseignant = new Enseignant();
        enseignant.FindAll( function (result) {
          myServiceLog.createlog(req);
          res.send(result);
        });
      },

      listOne: function (req, res) {
        console.log(req.param('id_enseignant'));
        var enseignant = new Enseignant();
        enseignant.FindOne(req.param('id_enseignant'), function (result) {
          myServiceLog.createlog(req);
          res.json({status:true,id_enseignant:result});       
        });
      },

      findbyPwdLogin: function(req,res){
        console.log(req.param('password'))
        var userr = new User();
        userr.FindOne1(req.param('login'),req.param('password'),function(result){
          myServiceLog.createlog(req);

          if(result){          res.json({status:true,user:result});   
                    }
          else           res.json({status:false,user:null});   

          
        })
      },


      findEnsByLoginPwd :function(req, res) {
                     var  compte= new CompteApp ();
                     compte.findByLoginPwd(req.param('login'),req.param('password'),function(result){
                      myServiceLog.createlog(req);

                      if(result){          res.json({status:true,enseignant:result});   
                                }
                      else           res.json({status:false,enseignant:null});   
            
                      
                    })
                  },
};





