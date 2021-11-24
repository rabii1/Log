/**
 * PersonneController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 var Personne = require('../implements/PersonneImplement');
 var myServiceLog = require('../services/logged.js');

 module.exports = {
  
  

      create: function (req, res) {
        var personne = new Personne(req.body.id_personne,req.body.nompersonne,req.body.prenom,req.body.cin,req.body.genre,req.body.day_birth,req.body.month_birth,req.body.month_birth,req.body.year_birth,req.body.nationalite,req.body.lieu_naissance,req.body.etat_civil,req.body.situation_professionnel,req.body.cin,req.body.genre,req.body.day_birth,req.body.month_birth,req.body.month_birth,req.body.year_birth,req.body.nationalite,req.body.lieu_naissance,req.body.etat_civil,req.body.situation_professionnel);
        personne.createPersonne( function (result) {
          myServiceLog.createlog(req);
          res.json({status:true,obj:result});       
        });
      },



      list: function (req, res) {
        var personne = new Personne();
        personne.FindAll( function (result) {
          myServiceLog.createlog(req);

          res.send(result);
        });
      },
      listOne: function (req, res) {
        console.log(req.param('id_personne'));
        var personne = new Personne();
        personne.FindOne(req.param('id_personne'), function (result) {
          myServiceLog.createlog(req);
          res.json({status:true,id_personne:result});       
        });
      },
   
 
      update: function (req, res) {
        var personne = new Personne ();
        personne.Update(req.body.id_personne , req.body.nompersonne , req.body.prenom ,
                              req.body.cin , req.body.genre , req.body.day_birth ,
                              req.body.month_birth , req.body.year_birth , req.body.nationalite ,
                              req.body.lieu_naissance , req.body.etat_civil , req.body.situation_professionnel ,
                              req.body.num_passeport , req.body.fonctionprofessionnel , 
           function (result){
            myServiceLog.createlog(req);
          res.json(result);
   
        });
  },
    

      delete: function (req, res) {
        //console.log(req.param('id'));
        var personne = new Personne ();
        personne.Delete(req.param('id_personne'),function (result) {
          myServiceLog.createlog(req);
          res.json({status:true,idtodelete:result});       
        });
      },
};


