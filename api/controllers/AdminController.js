/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 var Personne = require('../implements/PersonneImplement');
 var CompteApp = require('../implements/CompteAppImplement');
 var Admin = require('../implements/adminImplement');

 var myServiceLog = require('../services/logged.js');
module.exports = {
 

    create : function (req, res) {
        console.log(req.body);
        var personne=new Personne(req.body.personne.id_personne,  req.body.personne.nompersonne,  req.body.personne.prenom, 
            req.body.personne.cin, req.body.personne.genre,  req.body.personne.day_birth,  req.body.personne.month_birth , req.body.personne.year_birth,
            req.body.personne.nationalite,  req.body.personne.lieu_naissance,
            req.body.personne.etat_civil, req.body.personne.situation_professionnel, req.body.personne.num_passeport,
             req.body.personne.fonctionprofessionnel);
         

          personne.createPersonne( function (resultPer) {
   
                        //res.send(result);  
                        var admin = new Admin(req.body.id_admin,resultPer,req.body.statut,  
                                                        req.body.grade, req.body.image_admin,
                                                        );


                                                        admin.CreateAdmin(function (resultAdmin) {
                            myServiceLog.createlog(req,'action');
                            console.log("creted Admin "+ resultAdmin);
                            console.log("creted Admin "+ resultAdmin);

                            var compte = new CompteApp ('','','',resultAdmin,'admin',req.body.compte.login,req.body.compte.password,'','initiale','non' );
                                compte.createCompte (function(resultCompte){
                                    console.log(req.body.compte);
                                    console.log("result2"+resultCompte)
                                  res.json({id:resultCompte}) 
                            
                            
                            
                            });

                              


            });

         });
        
             
           
     }, 


 


    delete: function (req, res) {
        //console.log(req.param('id'));
        var admin = new Admin ();
        admin.Delete(req.param('id_admin'),function (result) {
          myServiceLog.createlog(req);
          res.json({status:true,idtodelete:result});       
        });
      },

  //     update: function (req, res) {
  //  var admin = new Admin();
  //   admin.Update(req.body.id_admin,
  //     req.body.statut,
  //     req.body.date_recrutement,
  //     req.body.ancien_admin,
  //     req.body.nombre_annee_experience,
  //     req.body.grade,
  //     req.body.date_grade,
  //     function (result) {
  //       res.send(result);
  //     });

  //   },
    // update: function (req, res) {
    //   var admin = new Admin('', req.body.associe_personne,
    //     req.body.statut,
    //     req.body.date_recrutement,
    //     req.body.ancien_admin,
    //     req.body.nombre_annee_experience,
    //     req.body.grade,
    //     req.body.date_grade);
    //     admin.Update(function (result) {
    //     res.json({status:true,result});       
    //   });
    // },
      
 


   update :function(req, res) {
        
  
    var personne=new Personne(req.body.personne.id_personne,  req.body.personne.nompersonne,  req.body.personne.prenom, 
                                req.body.personne.cin, req.body.personne.genre,  req.body.personne.day_birth,  req.body.personne.month_birth , req.body.personne.year_birth,
                                req.body.personne.nationalite,  req.body.personne.lieu_naissance,
                                req.body.personne.etat_civil, req.body.personne.situation_professionnel, req.body.personne.num_passeport,
                                req.body.personne.fonctionprofessionnel);
         personne.createPersonne( function (resultPer) {
                        admin= new Admin (req.body.id_admin,resultPer,  req.body.statut, 
                                                    req.body.date_recrutement,   req.body.ancien_admin,   
                                                    req.body.nombre_annee_experience,
                                                    req.body.grade,  req.body.date_grade,  req.body.image_admin,
                                                    req.body.modifierLe, req.body.modifierPar);
        



                        admin.Update(function(result){

                            console.log("updated Admin "+ result);
                            res.json({status:true,result});       

                         
                          });
                        });
                    
    },



  // update: function (req, res) {
  //   var admin = new Admin();
  //   admin.Update(req.body.id_admin,
  //     req.body.statut,
  //     req.body.date_recrutement,
  //     req.body.ancien_admin,
  //     req.body.nombre_annee_experience,
  //     req.body.grade,
  //     req.body.date_grade,
  //     function (result) {
  //     res.json({status:true,result});       
  //     });

  // },
 


      list: function (req, res) {
        var personne =new Personne();
                  admin= new Admin ();
                            admin.FindAll(function(result){
                      //    res.send( { Enseignants: result} );
                                for (let i = 0; i < result.length; i++) {
                                    const element = result[i];
                                    personne.FindOne( element.associe_personne.value ,function (result1) {
                                        result[i].personne=result1;
                                        if (i==result.length-1) {
                                            res.send( { admins: result} );
                                        }
                                       
                                    })
                                }
                             });
      },

      listOne: function (req, res) {
        console.log(req.param('id_admin'));
        var admin = new Admin();
        admin.FindOne(req.param('id_admin'), function (result) {
          myServiceLog.createlog(req);
          res.json({status:true,id_admin:result});       
        });
      },

      findbyPwdLogin: function(req,res){
        console.log(req.param('password'))
        var admin = new Admin();
        admin.FindOne1(req.param('login'),req.param('password'),function(result){
          myServiceLog.createlog(req);

          if(result){          res.json({status:true,admin:result});   
                    }
          else           res.json({status:false,user:null});   

          
        })
      },



      
      findAdminByLoginPwd :function(req, res) {
                     var  compte= new CompteApp ();
                     compte.findByLoginPwd(req.param('login'),req.param('password'),function(result){
                      myServiceLog.createlog(req);

                      if(result){          res.json({status:true,admin:result});   
                                }
                      else           res.json({status:false,admin:null});   
            
                      
                    })
                  },
};





