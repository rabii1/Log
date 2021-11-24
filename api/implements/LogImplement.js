const SparqlClient = require('sparql-client-2');
// const dateFormat = require('dateFormat');
const uuid = require('uuid/v1');
var dateFormat = require("dateformat");
const moment = require('moment');

const MomentRange = require('moment-range');

const Moment = MomentRange.extendMoment(moment);
//  var now = new Date();

var user = 'admin';
var password = 'saad';
const endpoint = 'https://' + user + ':' + password + '@fuseki-container.146.59.159.175.nip.io/log';
const client = new SparqlClient(endpoint);
module.exports = class Log {
    constructor(id_log, id_personne, id_compte,type, Adress_ip, date_action, method, url, controller, action, hote_personne, count, protocol, sessionID, port,resultat) {
        this.id_log = id_log;
        this.id_personne = id_personne;
        this.id_compte = id_compte;
        this.type = type;
        this.Adress_ip = Adress_ip;
        this.date_action = date_action;
        this.method = method;
        this.url = url;
        this.controller = controller;
        this.action = action;
        this.hote_personne = hote_personne;
        this.count = count;
        this.protocol = protocol;
        this.sessionID = sessionID;
        this.port = port;
        this.resultat = resultat;

    }

    createLog(call) {
        var now = new Date();
        var dTime = dateFormat(now, "dd/mm/yyyy HH:MM");
        var rand = uuid();
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +
            "Insert data " +
            "{" +

            "Log:" + rand + "  rdf:type <http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#Log>." +
            "Log:" + rand + "  educa:id_log'" + rand + "'." +
            "Log:" + rand + "  educa:id_personne'" + this.id_personne + "'. " +
            "Log:" + rand + "  educa:id_compte    '" + this.id_compte + "'. " +
            "Log:" + rand + "  educa:type '" + this.type + "'." +
            "Log:" + rand + "  educa:Adress_ip '" + this.Adress_ip + "'." +
            "Log:" + rand + "  educa:date_action '" + dTime + "'." +
            "Log:" + rand + "  educa:method '" + this.method + "'." +
            "Log:" + rand + "  educa:url '" + this.url + "'." +
            "Log:" + rand + "  educa:controller '" + this.controller + "'." +
            "Log:" + rand + "  educa:action '" + this.action + "'." +
            "Log:" + rand + "  educa:hote_personne '" + this.hote_personne + "'." +
            "Log:" + rand + "  educa:count '" + this.count + "'." +
            "Log:" + rand + "  educa:protocol '" + this.protocol + "'." +
            "Log:" + rand + "  educa:sessionID '" + this.sessionID + "'." +
            "Log:" + rand + "  educa:port '" + this.port + "'." +
            "Log:" + rand + "  educa:resultat '" + this.resultat + "'." +




            "};";
        console.log(query)
        client.query(query)
            .execute()
            .then(function (results) {
                console.log("adding role success * * * * * * ")
                console.log(results)
                call('log Added.')
            })
            .catch(function (error) {
                // Oh noes! 
                console.log("adding role failed * * * * * * ")
                console.log(error)
                call('Failed to Add log.');
            });





    }

    FindAll(call) {
        console.log(client);
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +

            "SELECT  ?id_log ?id_personne ?id_compte ?type ?Adress_ip  ?date_action ?method ?url ?controller ?action ?hote_personne ?count  ?protocol ?sessionID ?port ?resultat \n" +
            "WHERE  {" +
            // "?y a educa:Log .\n" +
            "?y  educa:id_log ?id_log ;\n" +
            "educa:id_personne ?id_personne  ;\n" +
            "educa:id_compte ?id_compte ;\n" +
            "educa:type ?type ;\n" +
            "educa:Adress_ip ?Adress_ip ;\n" +
            "educa:date_action ?date_action ;\n" +
            "educa:method ?method ;\n" +
            "educa:url ?url ;\n" +
            "educa:controller ?controller ;\n" +
            "educa:action ?action ;\n" +
            "educa:hote_personne ?hote_personne ;\n" +
            "educa:count ?count ;\n" +
            "educa:protocol ?protocol ;\n" +
            "educa:sessionID ?sessionID ;\n" +
            "educa:port ?port ;\n" +
            "educa:resultat ?resultat ;\n" +

            "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings);
            })
            .catch(function (error) {
                call(error);
            });
    }

    Delete(id_log, call) {
        //var query = ' Matiere[nom_matiere: ' + this.nom_matiere + ',description_matiere: ' + this.description_matiere + ',enseignant: ' + this.enseignant + ',etablissement :'+this.etablissement+'] Action= DELETE.';
        var result;
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +
            "DELETE {\n" +
            " ?s ?p ?o }WHERE {?s ?p ?o ;educa:id_log" + '"' + id_log + '"' + "};"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call('Log Deleted.');
            })
            .catch(function (error) {
                // Oh noes! :
                call('Failed To Delete Log .');
            });
    }



    Update(call) {
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +
            "DELETE{\n" +
            "educa:date_action ?date_action ;\n" +
            "educa:method ?method ;\n" +
            "educa:url ?url ;\n" +
            "educa:hote_personne ?hote_personne ;\n" +
            "educa:count ?count ;\n" +
            "educa:protocol ?protocol ;\n" +
            "educa:sessionID ?sessionID ;\n" +
            "educa:port ?port ;\n" +
            "}\n" +
            "INSERT{\n" +
            "?y educa:date_action '" + date_action + "'.\n" +
            "?y educa:method '" + method + "'.\n" +
            "?y educa:url '" + url + "'.\n" +
            "?y educa:hote_personne '" + hote_personne + "'.\n" +
            "?y educa:count '" + count + "'.\n" +
            "?y educa:protocol '" + protocol + "'.\n" +
            "?y educa:sessionID '" + sessionID + "'.\n" +
            "?y educa:port '" + port + "'.\n" +

            "}\n" +
            "WHERE{\n" +
            "?y educa:id_log '" + this.id_log + "'.\n" +
            "?y educa:date_action ?date_action.\n" +
            "?y educa:method ?method.\n" +
            "?y educa:url ?url.\n" +
            "?y educa:hote_personne ?hote_personne.\n" +
            "?y educa:count ?count.\n" +
            "?y educa:protocol ?protocol.\n" +
            "?y educa:sessionID ?sessionID.\n" +
            "?y educa:port ?port.\n" +

            "}";

        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call('log Updated.');
            })
            .catch(function (error) {
                // Oh noes! 
                call('Failed To Update log .');
            });
    }


    FindOne(id_log, call) {
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +
            "SELECT  ?id_log ?id_personne ?id_compte ?type ?Adress_ip ?date_action ?method ?url ?hote_personne ?count  ?protocol ?sessionID ?port \n" +
            "WHERE  {" +
            "?y  educa:id_log ?id_log ; educa:id_log '" + id_log + "';\n" +
            // "?y a educa:Log .\n" +
            "educa:id_personne ?id_personne  ;\n" +
            "educa:id_compte ?id_compte ;\n" +
            "educa:type ?type ;\n" +
            "educa:Adress_ip ?Adress_ip ;\n" +
            "educa:date_action ?date_action ;\n" +
            "educa:method ?method ;\n" +
            "educa:url ?url ;\n" +
            "educa:hote_personne ?hote_personne ;\n" +
            "educa:count ?count ;\n" +
            "educa:protocol ?protocol ;\n" +
            "educa:sessionID ?sessionID ;\n" +
            "educa:port ?port ;\n" +
            "}"

        "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings[0]);
            })
            .catch(function (error) {
                // Oh noes! 
                call(error);
            });
    }



    CountLog(call) {
        
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +

            "SELECT  (COUNT (?id_log) as ?Log) \n" +
            "WHERE  {" +
            "?y  educa:id_log ?id_log ;\n" +
            "educa:id_personne ?id_personne  ;\n" +
            "educa:id_compte ?id_compte ;\n" +
            "educa:type ?type ;\n" +
            "educa:Adress_ip ?Adress_ip ;\n" +
            "educa:date_action ?date_action ;\n" +
            "educa:method ?method ;\n" +
            "educa:url ?url ;\n" +
            "educa:controller ?controller ;\n" +
            "educa:action ?action ;\n" +
            "educa:hote_personne ?hote_personne ;\n" +
            "educa:count ?count ;\n" +
            "educa:protocol ?protocol ;\n" +
            "educa:sessionID ?sessionID ;\n" +
            "educa:port ?port ;\n" +
            "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings);
            })
            .catch(function (error) {
                call(error);
            });
    }



    CountDateToday(call) {
        // var date=CONCAT(month(date_action)+'/'+ day(date_action)+'/'+year(date_action));

        // var date= new Date();
        var today = new Date().toLocaleDateString()

        console.log(client);
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +

            "SELECT  (COUNT (?id_log) as ?Log) \n" +
            "WHERE  {" +



            "?y educa:id_log ?id_log  ;  educa:date_action ?date_action  . FILTER contains( ?date_action,'" + today + "')\n" +

            "}"

        "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings[0]);
            })
            .catch(function (error) {
                // Oh noes! 
                call(error);
            });
    }


    CountDateWeek(day, call) {

        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +

            "SELECT  (COUNT (?id_log) as ?Log) \n" +
            "WHERE  {" +


            "?y educa:id_log ?id_log  ;  educa:date_action ?date_action  . FILTER contains( ?date_action,'" + day + "' )\n" +



            "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings[0]);
            })
            .catch(function (error) {
                // Oh noes! 
                call(error);
            });
    }

    CountDateMonth(call) {
        //     const day = new Date()
        //    var month= day.toLocaleString('default', { month: 'long' })
        //     console.log(month);



        var day = new Date()
        var tab_mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
        console.log("Nous sommes en " + tab_mois[day.getMonth()]);


        var hours = day.getHours();
        var minutes = day.getMinutes();
        hours = hours % 12;
        hours = hours ? '0' + hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var time = hours + ':' + minutes;

        var dayHeure = day.toLocaleDateString().substr(0, 10) + " " + time;
        console.log(dayHeure);

        var minu = minutes - '02';
        var temps = hours + ':' + minu;

        var dayMinute = day.toLocaleDateString().substr(0, 10) + " " + temps;

        console.log(dayMinute);



        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substr(0, 10);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substr(0, 10);
        console.log(firstDay, lastDay);



        var dayy = date.toLocaleDateString().substr(3, 10);




        var date = new Date();

        // year and month are variables
        var year = date.getFullYear();
        var month = date.getMonth();
        var startDate = moment([year, month]);

        // console.log("inputDate : ", startDate.format("dddd, MMMM Do YYYY, h:mm:ss a"));

        // // Get the first and last day of the month
        var firstDay = moment(startDate).startOf('month')
        var endDay = moment(startDate).endOf('month')

        var monthRange = Moment.range(firstDay, endDay);
        // // Get all the weeks during the current month
        var weeks = []
        for (let mday of monthRange.by('days')) {
            // console.log("mday", mday.week());
            if (weeks.indexOf(mday.week()) === -1) {
                weeks.push(mday.week());
            }
        }
        var calendar = []
        for (let index = 0; index < weeks.length; index++) {
            var weeknumber = weeks[index];


            var firstWeekDay = moment(firstDay).week(weeknumber).day(0);
            if (firstWeekDay.isBefore(firstDay)) {
                firstWeekDay = firstDay;
            }

            var lastWeekDay = moment(endDay).week(weeknumber).day(6);
            if (lastWeekDay.isAfter(endDay)) {
                lastWeekDay = endDay;
            }

            console.log("week " + index + " day: " + firstWeekDay.format("DD/MM/YYYY") + " to " + lastWeekDay.format("DD/MM/YYYY"));
            var weekRange = Moment.range(firstWeekDay, lastWeekDay)
            calendar.push(weekRange)
        }





        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +

            "SELECT ?date_action  \n" +
            "WHERE  {" +
            "?y educa:id_log ?id_log  ;  educa:date_action ?date_action  . FILTER contains( ?date_action,'" + dayy + "' )\n" +


            //    " ?s ?p educa:id_log ?id_log  ;  educa:date_action ?date_action  . FILTER ( ?date_action >= xsd:date('"+firstWeekDay+"') && ?date_action < xsd:date('"+lastWeekDay+"')&& (str(?p) != str(rdfs:label)) ) )\n" + 

            //    " ?s ?p educa:id_log ?id_log  ;  educa:date_action ?date_action.  FILTER xsd:dateTime(?date_action) >= '30-08-2021T00:00:00Z'^^xsd:dateTime && xsd:dateTime(?date_action) < '09-09-2021T00:00:00Z'^^xsd:dateTime\n" +



            "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings);
            })
            .catch(function (error) {
                // Oh noes! 
                call(error);
            });
    }


    count5MinuteDate(call) {
        // 17,16,15,14 ...  ->  17, 12
        const currentTime = moment();

        const d = currentTime.format("DD/MM/YYYY HH:mm");
        console.log(d)

        const d1 = currentTime.subtract(1, 'minutes').format("DD/MM/YYYY HH:mm");
        console.log(d1)

        const d2 = currentTime.subtract(1, 'minutes').format("DD/MM/YYYY HH:mm");
        console.log(d2)

        const d3 = currentTime.subtract(1, 'minutes').format("DD/MM/YYYY HH:mm");
        console.log(d3)

        const d4 = currentTime.subtract(1, 'minutes').format("DD/MM/YYYY HH:mm");
        console.log(d4)

        // currentTime.subtract(1, 'minutes');
        // d.push(currentTime.format("DD/MM/YYYY HH:mm"));
        // callback(d)


        console.log(client);
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +

            "SELECT  (COUNT (?id_log) as ?Log) \n" +
            "WHERE  {" +

            "?y educa:id_log ?id_log  ;  educa:date_action ?date_action  . FILTER ( ?date_action ='" + d + "'  || ?date_action ='" + d1 + "' || ?date_action ='" + d2 + "' || ?date_action ='" + d3 + "' || ?date_action ='" + d4 + "')\n" +

            "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings[0]);
            })
            .catch(function (error) {
                // Oh noes! 
                call(error);
            });


    }

    // CountDate2Min(call) {

    //     // var d = new Date();
    //     // var n = d.toLocaleTimeString();

    //     var day = new Date("2021-09-22 11:03");
    //     var hours = day.getHours();
    //     var minutes = (day.getMinutes());
    //     minutes = minutes > 9 ? minutes : '0' + minutes;


    //     // hours = hours % 24;
    //     // hours = hours ? hours : 24; // the hour '0' should be '12'
    //     // minutes = minutes < 10 ? '0'+minutes : minutes;
    //     var time = hours + ':' + minutes;


    //     var dayHeure = day.toLocaleDateString().substr(0, 10) + " " + time;
    //     console.log(dayHeure);

    //     if (day.getMinutes() == "00") {
    //         var hours = hours - ("01".slice(-2));
    //         var minu = "59";
    //     }
    //     else {
    //         var minu = minutes - ("01".slice(-2));
    //         minu = minu > 9 ? minu : '0' + minu;
    //     }


    //     var minu1 = minu - "01".slice(-2);
    //     minu1 = minu1 > 9 ? minu1 : '0' + minu1;

    //     var minu2 = minu1 - "01".slice(-2);
    //     minu2 = minu2 > 9 ? minu2 : '0' + minu2;

    //     var minu3 = minu2 - "01".slice(-2);
    //     minu3 = minu3 > 9 ? minu3 : '0' + minu3;

    //     var temps = hours + ':' + minu;
    //     var temps1 = hours + ':' + minu1;
    //     var temps2 = hours + ':' + minu2;
    //     var temps3 = hours + ':' + minu3;

    //     var dayMinute = day.toLocaleDateString().substr(0, 10) + " " + temps;
    //     var dayMinute1 = day.toLocaleDateString().substr(0, 10) + " " + temps1;
    //     var dayMinute2 = day.toLocaleDateString().substr(0, 10) + " " + temps2;
    //     var dayMinute3 = day.toLocaleDateString().substr(0, 10) + " " + temps3;

    //     console.log(dayMinute);
    //     console.log(dayMinute1);
    //     console.log(dayMinute2);
    //     console.log(dayMinute3);

    //     // var minutesToAdd=1;
    //     // var currentDate = new Date();

    //     // var hou = currentDate.getHours();
    //     // var min = currentDate.getMinutes();
    //     // var hh = hou + ':' + min;
    //     // var hhh=hh- minutesToAdd*60000;
    //     // var futureDate = new Date(currentDate.toLocaleDateString().substr(0,10)+" "+hhh);
    //     // console.log(currentDate);

    //     // console.log(futureDate);



    //     console.log(client);
    //     var query =
    //         "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
    //         "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
    //         "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +

    //         "SELECT  (COUNT (?id_log) as ?Log) \n" +
    //         "WHERE  {" +



    //         "?y educa:id_log ?id_log  ;  educa:date_action ?date_action  . FILTER ( ?date_action ='" + dayHeure + "'  || ?date_action ='" + dayMinute + "' || ?date_action ='" + dayMinute1 + "' || ?date_action ='" + dayMinute2 + "' || ?date_action ='" + dayMinute3 + "')\n" +


    //         "}"
    //     console.log(query);
    //     client.query(query)
    //         .execute()
    //         .then(function (results) {
    //             call(results.results.bindings[0]);
    //         })
    //         .catch(function (error) {
    //             // Oh noes! 
    //             call(error);
    //         });
    // }



    async CountDate1Heure(call) {

        const currentTime = moment();

        const d = currentTime.format("DD/MM/YYYY HH:mm");

        console.log(d);

        const beforeAnHour = currentTime.subtract(1, 'hours').format("DD/MM/YYYY HH:mm");
        console.log(beforeAnHour);


        // console.log(client);
        // contains(lcase(str(?date_action)),'" + d + "' ) &&   contains(lcase(str(?date_action)),'" + hours + "')   
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +
            "SELECT  (COUNT (?id_log) as ?Log) \n" +
            "WHERE  {" +
            "?y educa:id_log ?id_log  ;  educa:date_action ?date_action  .FILTER (?date_action >= '" + beforeAnHour + "' && ?date_action <= '" + d + "')\n" +

            "}"
        console.log(query);
        try {
            const record = await client.query(query).execute();
            call(record.results.bindings[0])
        } catch (error) {
            call(error);
        }

        // client.query(query)
        //     .execute()
        //     .then(function (results) {
        //         call(results.results.bindings[0]);
        //     })
        //     .catch(function (error) {
        //         // Oh noes! 
        //         call(error);
        //     });
    }


    CountDatesToday(call) { // Is this API? this for select 


        const currentTime = moment();

        // const date= currentTime.format("DD/MM/YYYY HH:mm");
        // console.log(date);


        const d = currentTime.format("DD/MM/YYYY");

        console.log(d);

        // const dat = currentTime.format("HH");
        // console.log(dat);

        // const d1 =    currentTime.subtract(1, 'hours').format("DD/MM/YYYY HH:mm");
        // console.log(d1);

        var hours = currentTime.subtract(1, 'hours').format("HH:");
        console.log(hours);


        console.log(client);
        var query =
            "PREFIX educa:" + "<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa#/>" +
            "PREFIX  rdf:<http://www.w3.org/2000/01/rdf-schema#>" +
            "PREFIX Log:<http://www.semanticweb.org/gueddes/ontologies/2015/e-Saad-Educa/Log/>" +


            "SELECT ?date_action  \n" +
            "WHERE  {" +
            "?y educa:id_log ?id_log  ;  educa:date_action ?date_action  .FILTER ( contains(lcase(str(?date_action)),'" + d + "' ) &&   contains(lcase(str(?date_action)),'" + hours + "')     )\n" +

            "}"
        console.log(query);
        client.query(query)
            .execute()
            .then(function (results) {
                call(results.results.bindings);
            })
            .catch(function (error) {
                // Oh noes! 
                call(error);
            });
    }

}