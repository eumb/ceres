import { Template } from "meteor/templating";

import { Sensors } from "../imports/collections/sensors.js";
TempValues = new Mongo.Collection("sensorvalue"); //subscription for cumulated soil temp



Template.body.events({
  "submit .new_comment": function(event) {
    // Prevent default browser form submit
    event.preventDefault();
    //console.log("inserting");
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    //console.log("New comment " + text);

    // Insert a task into the collection
    //console.log(Session.get('comment_id'));
    /*id=Session.get('comment_id').toString();
    console.log(id);*/
    id = Session.get("comment_id").toHexString();
    //console.log(id);
    /*   var regex = /[^"\]]+(?=")/;
    var match = regex.exec(id);
    console.log(match);
    matchhex=match.toHexString();*/
    var newID = new Mongo.ObjectID(id);
    //console.log(newID);
    Sensors.update(newID, { $set: { comment_soil_t: text } });

    // Clear form
    target.text.value = "";
    $("#comment_modal").modal("hide");
  }
});
Template.dashboard.events({
  "click .toggle_soilTempData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("tempdisplay", "1hdata");
    $(".toggle_soilTempData24").removeClass('active');
    $(".toggle_soilTempData1").addClass('active');
  },
  "click .toggle_soilTempData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("tempdisplay", "24hdata");
    $(".toggle_soilTempData1").removeClass('active');
    $(".toggle_soilTempData24").addClass('active');
  },
  "click .toggle_humidData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("humiddisplay", "1hdata");
    $(".toggle_humidData24").removeClass('active');
    $(".toggle_humidData1").addClass('active');
  },
  "click .toggle_humidData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("humiddisplay", "24hdata");
    $(".toggle_humidData1").removeClass('active');
    $(".toggle_humidData24").addClass('active');
  },
  "click .toggle_precipData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("precipdisplay", "1hdata");
    $(".toggle_precipData24").removeClass('active');
    $(".toggle_precipData1").addClass('active');
  },
  "click .toggle_precipData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("precipdisplay", "24hdata");
    $(".toggle_precipData1").removeClass('active');
    $(".toggle_precipData24").addClass('active');
  },
  "click .toggle_airTempData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airTempDisplay", "1hdata");
    $(".toggle_airTempData24").removeClass('active');
    $(".toggle_airTempData1").addClass('active');
  },
  "click .toggle_airTempData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airTempDisplay", "24hdata");
    $(".toggle_airTempData1").removeClass('active');
    $(".toggle_airTempData24").addClass('active');
  },
  "click .toggle_airHumidData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airHumidDisplay", "1hdata");
    $(".toggle_airHumidData24").removeClass('active');
    $(".toggle_airHumidData1").addClass('active');
  },
  "click .toggle_airHumidData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airHumidDisplay", "24hdata");
    $(".toggle_airHumidData1").removeClass('active');
    $(".toggle_airHumidData24").addClass('active');
  },
  "click .toggle_airPressData1": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airPressDisplay", "1hdata");
      $(".toggle_airPressData24").removeClass('active');
    $(".toggle_airPressData1").addClass('active');
  },
  "click .toggle_airPressData24": function(event) {
    // Set the checked property to the opposite of its current value
    event.preventDefault();
    Session.set("airPressDisplay", "24hdata");
      $(".toggle_airPressData1").removeClass('active');
    $(".toggle_airPressData24").addClass('active');
  }
});

Template.dashboard.onRendered(function(){
       
       $(".toggle_airTempData24").addClass('active');
       $(".toggle_airPressData24").addClass('active');
       $(".toggle_airHumidData24").addClass('active');
       $(".toggle_precipData24").addClass('active');
       $(".toggle_humidData24").addClass('active');
       $(".toggle_soilTempData24").addClass('active'); 
});
//subscriptions = new SubsManager();
Template.dashboard.onCreated(function() {
/*  var self = this;
  

  //cache subscription

  self.ready = new ReactiveVar();
  self.autorun(function() {
    //subscriptions.subscribe("sensorvalue", Session.get("senzor"));  //for cumulated temp
    var handle=subscriptions.subscribe("sensorvalues", Session.get("senzor"));
    self.ready.set(handle.ready());
});
    

*/

  $("#comment_modal").modal("hide");

  $("#comment_modal").modal({
    selector: {
      close: ".button"
    }
  });
});

Tracker.autorun(function () {

    //if realtime is required

    chartNode = Session.get("senzor");
    Session.set("chartFor", Session.get("senzor"));

    var sensormeteodata = Sensors.find(
      { nodename: chartNode, ane: { $exists: true } },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity
    //console.log(sensormeteodata);
    console.log("returned ane data");
 
    
    //Get comments
/*

    var sensortempcomments = Sensors.find({
      nodename: chartNode,
      comment_soil_t: { $exists: true }
    }).fetch();
    console.log("returned temp comments");
    var sensortempscomment = sensortempcomments.map(function(d) {
      var info = [];
      info.push(d.comment_soil_t);
      info.push(d.created_at);
      return info;
    });
    //console.log(sensortempscomment);
    Session.set("sensortempcommentsoil_t", sensortempcomments);*/


    var sensormeteo_vane = sensormeteodata.map(function(d) {
      return d.vane;
    });
    Session.set("sensormeteo_vane", sensormeteo_vane);

    var sensormeteo_ane = sensormeteodata.map(function(d) {
      return d.ane;
    });
    Session.set("sensormeteo_ane", sensormeteo_ane);

    var sensormeteo_ane_ms = sensormeteodata.map(function(d) {
      ms = d.ane * 0.27;
      ms_2dec = ms.toFixed(2);
      return ms_2dec;
    });
    Session.set("sensormeteo_ane_ms", sensormeteo_ane_ms);
  }); //end tracker function


Template.dashboard.helpers({
  //cached subscription
/*  subscriptionReady: function() {
    //https://kadira.io/academy/meteor-routing-guide/content/subscriptions-and-data-management/using-subs-manager
    return Template.instance().ready.get();
  },
*/
  soilTempValues() {
    //return Session.get(soilTempMeanValue);
    
    var soilTempValues = TempValues.find({ nodename: chartNode }).fetch();
    //console.log(soilTempValues);

    dataSoilTempValues = _.pluck(soilTempValues, "temp");
    var mean_temp = 0;
    var temp_total_day = 0;
    var temp_total = 0;
    var cumulated_mean_values = 0;
    var sprout_temp=0;
    var i =0;
    
    for(i=0;i<dataSoilTempValues.length;i++){

      temp_total=temp_total+dataSoilTempValues[i]

    }
    console.log(`total temp: ${temp_total}`);
    mean_temp=temp_total/24-8*i/24;
    console.log(`mean temp: ${mean_temp}`);





      
    return Math.round(mean_temp);
  },


/*  sensortempcommments() {
    //console.log(Sensors.find({}).fetch());
    var tempcomments = Session.get("sensortempcommentsoil_t");
    //console.log("tempcomments: "+ JSON.stringify(tempcomments));

    return tempcomments;
    //return Sensors.find({nodename:"Senzor_3"},{sort: {'created_at' : -1},limit:1}).fetch(); //mandatory ' ' not " "
    //console.log(Sensors.find({},{sort: {'created_at' : -1},limit:1}));
  },*/


  sensor_meteo_vane() {
    var meteo_vane = Session.get("sensormeteo_vane");
    //console.log(Session.get('sensorair_pressure'));
    return meteo_vane;
  },
  sensor_meteo_ane() {
    var meteo_ane = Session.get("sensormeteo_ane");
    //console.log(Session.get('sensorair_pressure'));
    return meteo_ane;
  },
  sensor_meteo_ane_ms() {
    var meteo_ane_ms = Session.get("sensormeteo_ane_ms");
    //console.log(Session.get('sensorair_pressure'));
    return meteo_ane_ms;
  },


///Charts section


  myChartDataHumid1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    dataset = Sensors.find({
      nodename: chartNode,
      w_3: { $exists: true }
    }).fetch();
    console.log("returned humidity chart data");
    //dataset = Sensors.find({'nodename':chartNode },{sort: {'created_at' : -1},limit:28}).fetch() //, 'readingdatehour':{$in:[6,18]}
    //console.log("humidity chart dataset: "+dataset);
    var theDataw_1 = [];
    var theDataw_2 = [];
    var theDataw_3 = [];
    var xScale = [];




    var dataw_1 = dataset.map(function(d) {
      //console.log(d.w_1);
      var rsw1 = (d.w_1 * 8.19 - 150390) / (1 - d.w_1 * 0.021);
      var swt1 = (rsw1 - 550) / 137.5;
      return Math.round(swt1); //return cb value
      //return Math.round(d.w_1) // return frequency
    });
    //  console.log(dataw_1[0]);
    Session.set("sensorw1", dataw_1[0]);

    var dataw_2 = dataset.map(function(d) {
      var rsw2 = (d.w_2 * 8.19 - 150390) / (1 - d.w_2 * 0.021);
      var swt2 = (rsw2 - 550) / 137.5;
      return Math.round(swt2); //return cb value
      //return Math.round(d.w_2) // return frequency
    });
    Session.set("sensorw2", dataw_2[0]);

    var dataw_3 = dataset.map(function(d) {
      var rsw3 = (d.w_3 * 8.19 - 150390) / (1 - d.w_3 * 0.021);
      var swt3 = (rsw3 - 550) / 137.5;
      return Math.round(swt3); //return cb value
      //return Math.round(d.w_3) // return frequency
    });
    Session.set("sensorw3", dataw_3[0]);

    //dataw_1=_.pluck(dataset, 'w_1');
    //dataw_2=_.pluck(dataset, 'w_2');
    //dataw_3=_.pluck(dataset, 'w_3');
    scale = _.pluck(dataset, "created_at");

    theDataw_1 = ["10cm"].concat(dataw_1);
    //console.log("humidity chart dataset: "+theDataw_1);

    theDataw_2 = ["30cm"].concat(dataw_2);
    //onsole.log("humidity chart dataset: "+theDataw_2);
    theDataw_3 = ["50cm"].concat(dataw_3);
    //console.log("humidity chart dataset: "+theDataw_3);
    xScale = ["x"].concat(scale);
    today=moment(xScale[1]).format('YYYY-MM-DD');
    //console.log(today);
    last_week = moment(xScale[1]).subtract(7, 'days').format('YYYY-MM-DD');
    //console.log(last_week);

    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDataw_1,
          theDataw_2,
          theDataw_3 /*,
          ['data2', 10, 20, 45, 60,80]*/
        ],
        axes: {
          data2: "y2"
        },

        //type: 'spline',

        color: {
          pattern: ["#1f77b4", "#aec7e8", "#ff7f0e"]
        }
      },
      axis: {
        x: {
          type: "timeseries",
          extent: [last_week,today],
          tick: {
            format: "%d-%m %H:%M",
            culling: {

              max: 15 // the number of tick texts will be adjusted to less than this value
            }
          }
        },
        y2: {
          //max: 80,
          //min:0
        },
        y2: {
          show: false
        }
      },
      regions: [
        { axis: "y", start: 10, end: 20, class: "regionYok" },
        { axis: "y", start: 20, end: 45, class: "regionYalmostok" },
        { axis: "y", start: 45, end: 60, class: "regionYnok" },
        { axis: "y", start: 60, end: 80, class: "regionYbad" }
      ],
      size: {
        height: 480
      },

      grid: {
        y: {
          lines: [
            {
              value: 0,
              class: "threshold",
              text: "sol saturat",
              position: "start"
            },
            {
              value: 10,
              class: "threshold",
              class: "threshold",
              text: "aprovizionare optimă cu apă",
              position: "start"
            },
            {
              value: 20,
              class: "threshold",
              text: "aprovizionare bună cu apă",
              position: "start"
            },
            {
              value: 45,
              class: "threshold",
              text: "aprovizionare necorespunzătoare cu apă",
              position: "start"
            },
            {
              value: 60,
              class: "threshold",
              text: "ofilire",
              position: "start"
            }
          ]
        }
      },
      point: {
        show: false
      },
      subchart: {
        show: true
      },
      zoom: {
        enabled: true,
        rescale: false

      }
    };
  },

  myChartDataHumid24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    dataset = Sensors.find({
      nodename: chartNode,
      w_3: { $exists: true },
      readingdatehour: { $in: [13] }
    }).fetch();

    console.log("returned humidity chart data 24");

    //dataset = Sensors.find({'nodename':chartNode },{sort: {'created_at' : -1},limit:28}).fetch() //, 'readingdatehour':{$in:[6,18]}
    //console.log("humidity chart dataset: "+dataset);
    var theDataw_1 = [];
    var theDataw_2 = [];
    var theDataw_3 = [];
    var xScale = [];

    var dataw_1 = dataset.map(function(d) {
      //console.log(d.w_1);
      var rsw1 = (d.w_1 * 8.19 - 150390) / (1 - d.w_1 * 0.021);
      var swt1 = (rsw1 - 550) / 137.5;
      return Math.round(swt1); //return cb value
      //return Math.round(d.w_1) // return frequency
    });
    Session.set("sensorw1", dataw_1[0]);

    var dataw_2 = dataset.map(function(d) {
      var rsw2 = (d.w_2 * 8.19 - 150390) / (1 - d.w_2 * 0.021);
      var swt2 = (rsw2 - 550) / 137.5;
      return Math.round(swt2); //return cb value
      //return Math.round(d.w_2) // return frequency
    });
    Session.set("sensorw2", dataw_2[0]);

    var dataw_3 = dataset.map(function(d) {
      var rsw3 = (d.w_3 * 8.19 - 150390) / (1 - d.w_3 * 0.021);
      var swt3 = (rsw3 - 550) / 137.5;
      return Math.round(swt3); //return cb value
      //return Math.round(d.w_3) // return frequency
    });
    Session.set("sensorw3", dataw_3[0]);

    //dataw_1=_.pluck(dataset, 'w_1');
    //dataw_2=_.pluck(dataset, 'w_2');
    //dataw_3=_.pluck(dataset, 'w_3');
    scale = _.pluck(dataset, "created_at");

    theDataw_1 = ["10cm"].concat(dataw_1);
    //console.log("humidity chart dataset: "+theDataw_1);

    theDataw_2 = ["30cm"].concat(dataw_2);
    //onsole.log("humidity chart dataset: "+theDataw_2);
    theDataw_3 = ["50cm"].concat(dataw_3);
    //console.log("humidity chart dataset: "+theDataw_3);
    xScale = ["x"].concat(scale);
    today=moment(xScale[1]).format('YYYY-MM-DD');
    //console.log(today);
    last_week = moment(xScale[1]).subtract(7, 'days').format('YYYY-MM-DD');
    //console.log(last_week);

    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDataw_1,
          theDataw_2,
          theDataw_3 
        ],
        axes: {
          data2: "y2"
        },

        type: 'spline',

        color: {
          pattern: ["#1f77b4", "#aec7e8", "#ff7f0e"]
        }
      },
      transition: {
        duration: 0
      },
      axis: {
        x: {
          type: "timeseries",
          extent: [last_week,today],
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 15 // the number of tick texts will be adjusted to less than this value
            }
          }
        },
        y2: {
          //max: 80,
          //min:0
        },
        y2: {
          show: false
        }
      },
      regions: [
        { axis: "y", start: 10, end: 20, class: "regionYok" },
        { axis: "y", start: 20, end: 45, class: "regionYalmostok" },
        { axis: "y", start: 45, end: 60, class: "regionYnok" },
        { axis: "y", start: 60, end: 80, class: "regionYbad" }
      ],
      size: {
        height: 480
      },

      grid: {
        y: {
          lines: [
            {
              value: 0,
              class: "threshold",
              text: "sol saturat",
              position: "start"
            },
            {
              value: 10,
              class: "threshold",
              class: "threshold",
              text: "aprovizionare optimă cu apă",
              position: "start"
            },
            {
              value: 20,
              class: "threshold",
              text: "aprovizionare bună cu apă",
              position: "start"
            },
            {
              value: 45,
              class: "threshold",
              text: "aprovizionare necorespunzătoare cu apă",
              position: "start"
            },
            {
              value: 60,
              class: "threshold",
              text: "ofilire",
              position: "start"
            }
          ]
        }
      },
      point: {
        show: false
      },
      subchart: {
        show: true
      },
      zoom: {
        enabled: true,
        rescale: false,
        onzoom: function (domain) { console.log(domain) }
      }
    };
  },
  myChartDataTemp24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'soil_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch(); //,'readingdatehour':{$in:[5,6,7,8,9,10,17]}
    dataset = Sensors.find({
      nodename: chartNode,
      soil_t: { $exists: true },
      readingdatehour: { $in: [8] }
    }).fetch();
    console.log("returned soil temp chart data 24");

    let sensortempdata = Sensors.find(
      {
        nodename: chartNode,
        soil_t: { $exists: true },
      readingdatehour: { $in: [8] }
      },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity , 'readingdatehour':{$in:[6,18]}
    console.log("returned soil_temp");
    let sensortemps = sensortempdata.map(function(d) {
      return d.soil_t;
    });
    //console.log(sensortemps);
    Session.set("sensortempsoil_t", sensortemps);

    //console.log(JSON.stringify(dataset));

    var theDatasoil_t = [];
    var xScale = [];
    var theDatasoil_comment = [];

    datasoil_t = _.pluck(dataset, "soil_t");
    //datasoil_comment=_.pluck(dataset, 'comment_soil_t');
    
    scale = _.pluck(dataset, "created_at");
    //console.log(scale);

    theDatasoil_t = ["temp"].concat(datasoil_t);
    xScale = ["x"].concat(scale);

    //console.log(xScale[1]);
    today=moment(xScale[1]).format('YYYY-MM-DD');
    //console.log(today);
    last_week = moment(xScale[1]).subtract(7, 'days').format('YYYY-MM-DD');
    //console.log(last_week);

    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDatasoil_t
         
        ],
        type: 'spline', 
      },

      axis: {
        x: {
          type: "timeseries",
          extent: [last_week,today],
          tick: {
            format: "%d-%m %H:%M",
            culling: {
               min:10,
              max: 15 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      grid: {
        y: {
          lines: [
            { value: 0, class: "threshold", text: "Inghet", position: "start" }
          ]
        }
      },
/*      point: {
        show: true,
        enabled: true,
        focus: {
          expand: {
            r: 10
          }
        }
      },*/
      subchart: {
        show: true
      },
         point: {
        show: false
      },

      zoom: {
        enabled: true,
        rescale: true,
      
      }
    };
  },


//with comments enabled
 /* myChartDataTemp24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'soil_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch(); //,'readingdatehour':{$in:[5,6,7,8,9,10,17]}
    dataset = Sensors.find({
      nodename: chartNode,
      soil_t: { $exists: true },
      readingdatehour: { $in: [8] }
    }).fetch();
    console.log("returned soil temp chart data 24");

    let sensortempdata = Sensors.find(
      {
        nodename: chartNode,
        soil_t: { $exists: true },
      readingdatehour: { $in: [8] }
      },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity , 'readingdatehour':{$in:[6,18]}
    console.log("returned soil_temp");
    let sensortemps = sensortempdata.map(function(d) {
      return d.soil_t;
    });
    //console.log(sensortemps);
    Session.set("sensortempsoil_t", sensortemps);

    //console.log(JSON.stringify(dataset));

    var theDatasoil_t = [];
    var xScale = [];
    var theDatasoil_comment = [];

    datasoil_t = _.pluck(dataset, "soil_t");
    //datasoil_comment=_.pluck(dataset, 'comment_soil_t');
    datasoil_comment = _.map(dataset, function(d) {
      //console.log("d: "+ JSON.stringify(d));
      //console.log("comment: "+d.comment_soil_t);
      //console.log("typeof: "+typeof(d.comment_soil_t))
      if (typeof d.comment_soil_t == "undefined") {
        //must be in ''  not ""
        //console.log("no coment");
        return (d.comment_soil_t = "no comment");
      } else return d.comment_soil_t;
    });
    scale = _.pluck(dataset, "created_at");
    //console.log(datasoil_id);

    theDatasoil_t = ["temp"].concat(datasoil_t);
    theDatasoil_comment = ["comment"].concat(datasoil_comment);
    xScale = ["x"].concat(scale);

    console.log(xScale[xScale.length]);
    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDatasoil_comment,
          theDatasoil_t
          //theDatasoil_id
        ],

        onclick: function(d, element) {
          //console.log("element " + element);
          //console.log("d "  + JSON.stringify(d));
          //console.log("Valoarea " + d.value);
          //console.log(d._id);
          //console.log(Sensors.find({'created_at':d.x}).fetch());
          data = Sensors.find({ created_at: d.x }).fetch();
          var dataid = data.map(function(d) {
            return d._id;
          });

          Session.set("comment_id", dataid[0]);
          $("#comment_modal").modal("show");
        },

        //type: 'spline',
        color: function(color, d) {
          datacomments = Sensors.find({ created_at: d.x }).fetch();
          var datacomment = datacomments.map(function(d) {
            return d.comment_soil_t;
          });
          if (datacomment != "") {
            return "#d00";
          } else return "#2C7EB8";
        }
      },

      axis: {
        x: {
          type: "timeseries",
          extent: ['2017-05-01','2017-05-09'],
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      grid: {
        y: {
          lines: [
            { value: 0, class: "threshold", text: "Inghet", position: "start" }
          ]
        }
      },
      point: {
        show: true,
        enabled: true,
        focus: {
          expand: {
            r: 10
          }
        }
      },
      subchart: {
        show: true
      },

      zoom: {
        enabled: true,
        rescale: true,
        onzoom: function (domain) {
            console.log(this, domain);
          }
      }
    };
  },*/


  myChartDataTemp1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'soil_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch(); //,'readingdatehour':{$in:[5,6,7,8,9,10,17]}
    dataset = Sensors.find({
      nodename: chartNode,
      soil_t: { $exists: true }
    }).fetch();
    console.log("returned soil 1h chart data ");
    //console.log(dataset);

     let sensortempdata = Sensors.find(
      {
        nodename: chartNode,
        soil_t: { $exists: true }
      },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity , 'readingdatehour':{$in:[6,18]}
    console.log("returned soil_temp");
    let sensortemps = sensortempdata.map(function(d) {
      return d.soil_t;
    });
    //console.log(sensortemps);
    Session.set("sensortempsoil_t", sensortemps);


    var theDatasoil_t = [];
    var xScale = [];


    datasoil_t = _.pluck(dataset, "soil_t");
    //datasoil_comment=_.pluck(dataset, 'comment_soil_t');
    /* datasoil_comment=_.map(dataset, function(d){
          //console.log("d: "+ JSON.stringify(d));
          //console.log("comment: "+d.comment_soil_t);
          //console.log("typeof: "+typeof(d.comment_soil_t))
          if (typeof(d.comment_soil_t) == 'undefined') {    //must be in ''  not ""
              //console.log("no coment");
              return d.comment_soil_t = "no comment";
          }else return d.comment_soil_t;
        }); */
    scale = _.pluck(dataset, "created_at");
    //console.log(datasoil_id);

    theDatasoil_t = ["temp"].concat(datasoil_t);
    /* theDatasoil_comment=['comment'].concat(datasoil_comment);*/
    xScale = ["x"].concat(scale);
    //console.log(theDatasoil_comment);
    
    today=moment(xScale[1]).format('YYYY-MM-DD');
    //console.log(today);
    last_week = moment(xScale[1]).subtract(7, 'days').format('YYYY-MM-DD');
    //console.log(last_week);

    return {
      data: {
        x: "x",

        columns: [
          xScale,
          /* theDatasoil_comment,*/
          theDatasoil_t
          //theDatasoil_id
        ],

        /*       onclick: function (d, element) { 
          
          //console.log("element " + element);
          //console.log("d "  + JSON.stringify(d));
          //console.log("Valoarea " + d.value);
          //console.log(d._id); 
          //console.log(Sensors.find({'created_at':d.x}).fetch());
          data=Sensors.find({'created_at':d.x}).fetch();
          var dataid=data.map(function(d){
            return d._id;
          })


          Session.set('comment_id',dataid[0]);
           $('#comment_modal').modal('show');
        },

        */

        type: "area-spline"
        /*        color: function (color, d) {
             datacomments=Sensors.find({'created_at':d.x}).fetch();
                var datacomment=datacomments.map(function(d){
                  return d.comment_soil_t;
                })
            if (datacomment != ""){
              return "#d00" }
              else return "#2C7EB8";
            
            
        }*/
      },

      axis: {
        x: {
          type: "timeseries",
          extent: [last_week,today],
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 15 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      grid: {
        y: {
          lines: [
            { value: 0, class: "threshold", text: "Inghet", position: "start" }
          ]
        }
      },
      point: {
        show: false,
        enabled: false
      },

      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataAirTemp24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'air_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      air_t: { $exists: true } /*, 'readingdatehour':{$in:[8,17]}*/,
      readingdatehour: { $in: [13] }
    }).fetch();
    console.log("returned air 24h chart data");
    var theDataair_t = [];
    var xScale = [];

    dataair_t = _.pluck(dataset, "air_t");
    scale = _.pluck(dataset, "created_at");
    Session.set("sensorair_temp", dataair_t[0]);
    //console.log(dataw_1);

    theDataair_t = ["temp"].concat(dataair_t);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_t],

        type: "area-spline"
      },
      regions: [{ axis: "y", start: 30, end:40 ,class: "regionYnok" },
                { axis: "y", start: 40, end:50, class: "regionYbad" }],
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        },
        y: {
          max: 50
          //min:0
        }
      },
      grid: {
        y: {
          lines: [
            {
              value: 30,
              class: "threshold",
              text: "Zona temperaturilor critice pentru plante",
              position: "start"
            },
             {
              value: 40,
              class: "threshold",
              text: "Zona temperaturilor periculoase pentru plante",
              position: "start"
            }
          ]
        }
      },
      point: {
        show: false
      },

     
      zoom: {
        enabled: true,
        rescale: false
      }
    };
  },
  myChartDataAirTemp1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'air_t':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      air_t: { $exists: true }
    }).fetch();

    Session.set("sensorair_temp", dataair_t[0]);
    
    console.log("returned air 1h chart data");
    var theDataair_t = [];
    var xScale = [];

    dataair_t = _.pluck(dataset, "air_t");
    scale = _.pluck(dataset, "created_at");
    
    //console.log(dataw_1);
    today=moment(xScale[1]).format('YYYY-MM-DD');
    //console.log(today);
    last_week = moment(xScale[1]).subtract(7, 'days').format('YYYY-MM-DD');
    theDataair_t = ["temp"].concat(dataair_t);
    xScale = ["x"].concat(scale);

    today=moment(xScale[1]).zone("+3:00").format('YYYY-MM-DD');
    //console.log(today);
    last_week = moment(xScale[1]).zone("+3:00").subtract(7, 'days').format('YYYY-MM-DD');

    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_t],

        type: "area-spline"
      },
      regions: [{ axis: "y", start: 30, end:40 ,class: "regionYnok" },
                { axis: "y", start: 40, end:50, class: "regionYbad" }],
      axis: {
        x: {
          type: "timeseries",
          extent: [last_week,today],
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        },
        y: {
          max: 50
          //min:0
        }
      },
      grid: {
        y: {
          lines: [
            {
              value: 30,
              class: "threshold",
              text: "Zona temperaturilor critice pentru plante",
              position: "start"
            },
             {
              value: 40,
              class: "threshold",
              text: "Zona temperaturilor periculoase pentru plante",
              position: "start"
            }
          ]
        }
      },
      point: {
        show: false
      },
    subchart: {
        show: true
      },

      zoom: {
        enabled: true,
        rescale: false
      }
    };
  },

  myChartDataAirPress24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      press: { $exists: true },
      readingdatehour: { $in: [13] }
    }).fetch();
    console.log("returned pressure 24h chart data");
    var theDataair_pressmmhg = [];
    var theDataair_press = [];
    var xScale = [];

    //var press_mmhg=Math.round(dataset*760/101325);
    //console.log("press_mmhg: ", press_mmhg);

    dataair_pressmmhg = _.map(dataset, function(dataset) {
      return Math.round(dataset.press * 760 / 101325);
    });
    //console.log("air press mmhg: ",dataair_pressmmhg);
    dataair_press = _.map(dataset, function(dataset) {
      return Math.round(dataset.press);
    });
    scale = _.pluck(dataset, "created_at");


    Session.set("sensorair_pressure_mmhg", dataair_pressmmhg[0]);

  
    Session.set("sensorair_pressure_hPa", dataair_press[0]);


    //console.log(dataw_1);

    theDataair_pressmmhg = ["press mmhg"].concat(dataair_pressmmhg);
    //theDataair_press=['press hPa'].concat(dataair_press);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_pressmmhg],

        type: "spline"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },
  myChartDataAirPress1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      press: { $exists: true }
    }).fetch();
    console.log("returned pressure 24h chart data");
    var theDataair_pressmmhg = [];
    var theDataair_press = [];
    var xScale = [];

    //var press_mmhg=Math.round(dataset*760/101325);
    //console.log("press_mmhg: ", press_mmhg);

    dataair_pressmmhg = _.map(dataset, function(dataset) {
      return Math.round(dataset.press * 760 / 101325);
    });
    //console.log("air press mmhg: ",dataair_pressmmhg);
    dataair_press = _.map(dataset, function(dataset) {
      return Math.round(dataset.press);
    });
    scale = _.pluck(dataset, "created_at");
    Session.set("sensorair_pressure_mmhg", dataair_pressmmhg[0]);

  
    Session.set("sensorair_pressure_hPa", dataair_press[0]);
    //console.log(dataw_1);

    theDataair_pressmmhg = ["press mmhg"].concat(dataair_pressmmhg);
    //theDataair_press=['press hPa'].concat(dataair_press);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_pressmmhg],

        type: "spline"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataRain24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      pluv3: { $exists: true },
      readingdatehour: { $in: [13] }
    }).fetch();
    console.log("returned rain chart data");
    var theDataRain_pluv3 = [];

    var xScale = [];

    //var press_mmhg=Math.round(dataset*760/101325);
    //console.log("press_mmhg: ", press_mmhg);

    dataRain_pluv3 = _.map(dataset, function(dataset) {
      return dataset.pluv3;
    });
    //console.log("air press mmhg: ",dataair_pressmmhg);
    Session.set("sensormeteo_pluv3", dataRain_pluv3[0]);
    scale = _.pluck(dataset, "created_at");

    //console.log(dataw_1);

    theDataRain_pluv3 = ["precip mm"].concat(dataRain_pluv3);
    //theDataair_press=['press hPa'].concat(dataair_press);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataRain_pluv3],

        type: "bar"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataRain1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'press':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      pluv2: { $exists: true }
    }).fetch();
    console.log("returned rain chart data 1");
    var theDataRain_pluv2 = [];

    var xScale = [];

    //var press_mmhg=Math.round(dataset*760/101325);
    //console.log("press_mmhg: ", press_mmhg);
    
    dataRain_pluv2 = _.map(dataset, function(dataset) {
      return dataset.pluv2;
    });
    Session.set("sensormeteo_pluv2", dataRain_pluv2[0]);
    //console.log("air press mmhg: ",dataair_pressmmhg);
 
    scale = _.pluck(dataset, "created_at");

    //console.log(dataw_1);

    theDataRain_pluv2 = ["precip mm"].concat(dataRain_pluv2);
    //theDataair_press=['press hPa'].concat(dataair_press);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataRain_pluv2],

        type: "bar"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },
      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },

  myChartDataAirHumid24h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'humid':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      humid: { $exists: true },
      readingdatehour: { $in: [13] }
    }).fetch();
    console.log("returned air humidity 24h chart data ");
    var theDataair_humid = [];
    var xScale = [];

    dataair_humid = _.pluck(dataset, "humid");
    scale = _.pluck(dataset, "created_at");
    Session.set("sensorair_humid", dataair_humid[0]);
    //console.log(dataw_1);

    theDataair_humid = ["humid"].concat(dataair_humid);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_humid],

        type: "area-spline"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },

      zoom: {
        enabled: true,
        rescale: true
      }
    };
  },
  myChartDataAirHumid1h: function() {
    var chartNode = Session.get("senzor");
    //console.log(chartNode);
    //dataset = Sensors.find({'nodename':chartNode ,'humid':{$exists:true}},{sort: {'created_at' : -1},limit:168}).fetch();
    dataset = Sensors.find({
      nodename: chartNode,
      humid: { $exists: true }
    }).fetch();
    console.log("returned air humidity 1h chart data ");
    var theDataair_humid = [];
    var xScale = [];

    dataair_humid = _.pluck(dataset, "humid");
    scale = _.pluck(dataset, "created_at");
    Session.set("sensorair_humid", dataair_humid[0]);
    //console.log(dataw_1);

    theDataair_humid = ["humid"].concat(dataair_humid);
    xScale = ["x"].concat(scale);
    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_humid],

        type: "area-spline"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m %H:%M",
            culling: {
              max: 5 // the number of tick texts will be adjusted to less than this value
            }
          }
        }
      },
      point: {
        show: false
      },

      zoom: {
        enabled: true,
        rescale: true
      }
    };
  }
});
