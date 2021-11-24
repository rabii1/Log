/**
 * LogActionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 var LogAction = require('../implements/LogActionImplement');
 const publicIp = require('public-ip');
 var Log = require('../implements/LogImplement');

module.exports = {
  
    // create: function (req, res) {
    //     var logaction = new LogAction(req.body.id_action,req.body.associe_log,req.body.ancien_val,req.body.new_val,req.body.date);
    //     logaction.createLogAction( function (result) {
    //       res.json({status:true,obj:result});       
    //     });
    //   },

   


create : function (req, res) {

             var log = new Log();
             log.createLog( function (result) {


                var logaction = new LogAction(req.body.id_action,req.body.result,req.body.ancien_val,req.body.new_val,req.body.date);
                logaction.createLogAction( function (result) {
                  res.json({status:true,obj:result});       
                });


                  });
    
         }
     
        };