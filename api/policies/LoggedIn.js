
 var Log = require('../implements/LogImplement');

const publicIp = require('public-ip');



 module.exports = function LoggedIn (req,res,next){
 
     // var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1
 
     // console.log("your public ip address", clientIp);
     // next();
 
     next();
   /*   publicIp.v4().then(ip => {
        console.log("your public ip address", ip);
            url=req.baseUrl+req.path;
            var log = new Log('','','',ip,req._startTime,req.method,url,req.hostname,req._eventsCount,req.protocol,req.sessionID,req.port);
            log.createLog( function (result) {
              res.json({status:true,obj:result});       
            });
           
           }); */
  
 
 };

