/**
 * PersonneController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var Log = require('../implements/LogImplement');
const publicIp = require('public-ip');
var requestIp = require('request-ip');
var creatt = require('../services/logged');
var myServiceLog = require('../services/logged.js');
const moment = require('moment');


// what you want here? i show the all dates of this cuurent week
// if today is sunday then ? sunday is the first day in the week  you should show the count of sunday 

//forever day it gives me just result except the first day of the week like today sunday gives me the false result 
// Mistakes you have made: If u r doing date related calcuation or or any operatios then don't use string manipulations
// like oISOString().substr(0, 10).split('-').reverse().join('/') don't do this ... ok?
// if today is sunday then you should get ["03/10/2021"]   yes only today 

// if monday you should get sunday and monday .. ok got it 
// let me do a code ...


function getCurrentWeek() {

  var date = moment(),
    begin = moment(date).isoWeekday(0).startOf('week');
  begin = date.toDate().getDay() === 0 ? moment() : begin;
  var dates = [];

  // i <= date.toDate().getDay()

  for (var i = 0; i < 7; i++) {
    dates.push(begin.format('DD/MM/YYYY'));
    begin.add('d', 1);
  }

  return dates;
}


module.exports = {

  create: function (req, typex, res) {
    //  console.log(req);
    publicIp.v4().then(ip => {
      console.log("your public ip address", ip);
      url = req.baseUrl + req.path;

      var log = new Log('', '', '', typex, ip, req._startTime, req.method, url, PathController, PathAction, req.hostname, req._eventsCount, req.protocol, req.sessionID, req.port, result);
      log.createLog(function (result) {

        res.json({ status: true, obj: result });
      });
    });
  },



  list: function (req, res) {
    var log = new Log();
    log.FindAll(function (result) {
     myServiceLog.createlog(req, 'action');

      res.send(result);
    });
  },

  lista: function (req, res) {


    //   url=req.options = {
    //     controller : 'log',
    //     action: 'list'

    // }

    var contoller = req.path;
    var tableau = contoller.split("/");
    console.log(tableau[1]);

    // adresse ip public
    /*    publicIp.v4().then(ip => {
         console.log("your public ip address", ip);
       }); */

    //adresse ip privée
    /* var ip = require("ip");
    var a = ip.address();
    console.log("private ip address", a); */

  },

  delete: function (req, res) {
    //console.log(req.param('id'));
    var log = new Log();
    log.Delete(req.param('id_log'), function (result) {
      res.json({ status: true, idtodelete: result });
    });
  },

  update: function (req, res) {
    var log = new Log('', '', '', ip, req._startTime, req.method, url, req.hostname, req._eventsCount, req.protocol, req.sessionID, req.port);
    log.Update(function (result) {
      res.json({ status: true, result });
    });
  },


  listOne: function (req, res) {
    console.log(req.param('id_log'));
    var log = new Log();
    log.FindOne(req.param('id_log'), function (result) {
      res.json({ status: true, id_log: result });
    });
  },

  count: function (req, res) {
    var log = new Log();
    log.CountLog(function (result) {
      myServiceLog.createlog(req, 'action');

      res.send(result);
    });
  },


  countToday: function (req, res) {
    console.log();
    var log = new Log();
    log.CountDateToday(function (result) {
      myServiceLog.createlog(req, 'action');

      res.send(result);
    });
  },

  countWeek: function (req, res) {
    // affiche date d'aujourd'hui 
    var j = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    var d = new Date();
    console.log("CURRENT DAY  ", d.getDay());
    var day = j[d.getDay()];
    console.log("day ", day);
    // var jouuur = [];

    // var indice = j.indexOf(day);
    // console.log(" indice " , indice); // here you need  Lundi??   the index of today (sunday).. 

    var reslt = getCurrentWeek();

    var taille = reslt.length;
    console.log(taille);

    var log = new Log();
    var Flist = [];
    reslt = reslt.filter(total => total !== null);
    for (let i = 0; i < taille; i++) {

      console.log('rs', reslt[i]);

      log.CountDateWeek(reslt[i], function (resulta) {

        myServiceLog.createlog(req, 'action');

        console.log("RESULT  ", resulta)
        Flist.push({ date: reslt[i], total: resulta })
        if (i === (taille - 1)) {
          console.log('finale')
          console.log(Flist)
          res.send(Flist);
        }
      });
    }

  },


  countMonth: function (req, res) {
    console.log();
    var log = new Log();
    log.CountDateMonth(function (result) {
      myServiceLog.createlog(req, 'action');

      res.send(result);
    });
  },

  // count2Min: function (req, res) {
  //   console.log();
  //   var log = new Log();
  //   log.CountDate2Min(function (result) {
  //     // myServiceLog.createlog(req);

  //     res.send(result);
  //   });
  // },

  count5Min: function (req, res) {
    console.log();
    var log = new Log();
    log.count5MinuteDate(function (result) {
      myServiceLog.createlog(req, 'action');

      res.send(result);
    });
  },


  countDaysToday: function (req, res) {
    console.log();
    var log = new Log();
    log.CountDatesToday(function (result) {
      myServiceLog.createlog(req, 'action');

      res.send(result);
    });
  },

  count1Heure: function (req, res) {


    console.log();
    var log = new Log();
    log.CountDate1Heure(function (result) {
      myServiceLog.createlog(req, 'action');

      res.send(result);
    });
  },
};

