/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 var User = require('../implements/UserImplement');


module.exports = {
  
    createUser: function (req, res) {
        res.json({check:'yes'});
      },

      create: function (req, res) {
        var userr = new User(req.body.nom,req.body.prenom,req.body.cin,req.body.id,req.body.login,req.body.password);
        userr.Create( function (result) {
          res.json({status:true,obj:result});       
        });
      },


      delete: function (req, res) {
        //console.log(req.param('id'));
        var userr = new User ();
        userr.Delete(req.param('id'),function (result) {
          res.json({status:true,idtodelete:result});       
        });
      },

      update: function (req, res) {
        var userr = new User(req.body.nom, req.body.prenom, req.body.cin, req.body.id);
        userr.Update(function (result) {
          res.json({status:true,result});       
        });
      },

      list: function (req, res) {
        var userr = new User();
        userr.FindAll( function (result) {
          res.send(result);
        });
      },

      listOne: function (req, res) {
        console.log(req.param('id'));
        var userr = new User();
        userr.FindOne(req.param('id'), function (result) {
          res.json({status:true,id:result});       
        });
      },

      findbyPwdLogin: function(req,res){
        console.log(req.param('password'))
        var userr = new User();
        userr.FindOne1(req.param('login'),req.param('password'),function(result){

          if(result){          res.json({status:true,user:result});   
                    }
          else           res.json({status:false,user:null});   

          
        })
      },

};

