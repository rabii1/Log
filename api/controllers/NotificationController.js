
var myServiceLog = require('../services/logged.js');
var Log = require('../implements/LogImplement');
const publicIp = require('public-ip');



module.exports = {


  subscribeAdmins: function (req, res) {
      // Get userId of user by your method

    var roomName = 'administrators'
    sails.sockets.join(req.socket, roomName);
    res.json({
      room: roomName
    });
  },




  sendToAdmins: function (req, res) {
    // Get userId of user by your method
    var roomName = 'administrators'
    console.log(roomName);
        // console.log(publicIp.v4());

    sails.sockets.blast(roomName, { Adress_ip: publicIp.v4(), protocol: req.protocol, method: req.method, id_log: '', url: req.baseUrl + req.path, sessionID: req.sessionID, protocol: req.protocol, date_action: req._startTime });
    res.json({
      msg: roomName + " : Notif sended"
    });
  },

}