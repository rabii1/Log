/**
 * CompteAppController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 var CompteApp = require('../implements/CompteAppImplement');
 var Admin = require('../implements/adminImplement');
 var Personne = require('../implements/PersonneImplement');

 var myServiceLog = require('../services/logged.js');

module.exports = {
  
    create: function (req, res) {
 
      var compte = new CompteApp( req.body.id_compte , req.body.modifierLe , req.body.modifierPar ,
        req.body.idProprietaire , req.body.categorieProp , req.body.login ,
        req.body.password , req.body.dernierAcces , req.body.etatCompte ,
        req.body.connecter);
             compte.createCompte( function (result) {
              myServiceLog.createlog(req,'action');
              res.json({status:true,obj:result});       
         });
       },
 
       delete: function (req, res) {
        //console.log(req.param('id'));
        var compte = new CompteApp ();
        compte.Delete(req.param('id_compte'),function (result) {
          myServiceLog.createlog(req,'action');
          res.json({status:true,idtodelete:result});       
        });
      },

     
        update: function (req, res) {
          var compte = new CompteApp( req.body.id_compte , req.body.modifierLe , req.body.modifierPar ,
            req.body.idProprietaire , req.body.categorieProp , req.body.login ,
            req.body.password , req.body.dernierAcces , req.body.etatCompte ,
            req.body.connecter);
            compte.Update(function (result) {
            res.json({status:true,result});       
          });
        },
  


      list: function (req, res) {
        var compte = new CompteApp();
        compte.FindAll( function (result) {
          myServiceLog.createlog(req,'action');
          res.send(result);
        });
      },

      listOne: function (req, res) {
        console.log(req.param('id_compte'));
        var compte = new CompteApp();
        compte.FindOne(req.param('id_compte'), function (result) {
          myServiceLog.createlog(req,'action');
          res.json({status:true,id_compte:result});       
        });
      },

      test: function (req, res) {
        myService.test();
        res.send("ok")
      },



      findbyPwdLogin: function(req,res){
     
        var compte = new CompteApp();
        var admin= new Admin();
        var personne= new Personne();
        compte.findByLoginPwd(req.param('login'),req.param('password'),function(result){
       
        console.log(result)
        if(result) {
            if (result.categorieProp.value=="admin") {
           
                admin.FindOne(result.idProprietaire.value,function(resultad){
                 
                    
                    personne.FindOne(resultad.associe_personne.value,function (resultPer){

                      myServiceLog.createlog(req,'login');

                        resultad["personne"]=resultPer;
                        result['proprietaire']=resultad
                        res.json({categorie:"admin",user : result,exist:true});    
                    }); 
                                   
    
                });
    
            }
            //  else if (result.categorieProp.value=="Parent")  {
    
            //      res.send({categorie:"Parent",user : null});                       
    
    
            // } 
            else {
                res.send({categorie:"other",user : null});                       
    
            }
        } else {
            res.send({ exist:false});           
        }
    
        })
    },







};

