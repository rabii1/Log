
var Log = require('../implements/LogImplement');
const publicIp = require('public-ip');

module.exports = {
  createlog: function (req, typex) {
    //  console.log(req);
    publicIp.v4().then(ip => {
      console.log("your public ip address", ip);
      url = req.baseUrl + req.path;


      var url1 = req.path;
      var path = url1.split("/");
      PathController = path[1];
      PathAction = path[2];
      

      var log = new Log('', '', '', typex, ip, req._startTime, req.method, url, PathController, PathAction, req.hostname, req._eventsCount, req.protocol, req.sessionID, req.port, 'result');
      log.createLog(function (result) {
        
        //// socket send notification
        let roomName = 'administrators'
        sails.sockets.blast(roomName, { Adress_ip: publicIp.v4(), protocol: req.protocol, method: req.method, id_log: '', url: req.baseUrl + req.path, sessionID: req.sessionID, protocol: req.protocol, date_action: req._startTime });
        return true


      });
    });
  },


  test: function (req, res) {
    console.log("test");
  }
};




