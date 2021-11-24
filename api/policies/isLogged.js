

 var requestIp = require('request-ip');



module.exports = function isLogged (req,res,next){

    // var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1

    // console.log("your public ip address", clientIp);
    // next();


    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
      ip = ip.substr(7)
    }
    console.log("your public ip address", ip);
    next();

};