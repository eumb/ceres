import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Sensors } from "../imports/collections/sensors.js";
import { SensorNames } from "../imports/collections/sensors.js";


SersorSoil_tAverage = new Mongo.Collection("sensor_soil_t_average");
SersorPrecipAverage = new Mongo.Collection("sensor_precip_average");
SersorSoil_tmin = new Mongo.Collection("sensor_soil_t_min");
SersorSoil_tmax = new Mongo.Collection("sensor_soil_t_max");
W_1Average = new Mongo.Collection("sensor_w_1_average");
W_2Average = new Mongo.Collection("sensor_w_2_average");
W_3Average = new Mongo.Collection("sensor_w_3_average");
Sensor_air_tAverage = new Mongo.Collection("sensor_air_t_average");
Sensor_air_tmin = new Mongo.Collection("sensor_air_t_min");
Sensor_air_tmax = new Mongo.Collection("sensor_air_t_max");

Template.stats.onCreated(function () {



this.autorun(function(){
     Meteor.subscribe("sensor_soil_t_average",Session.get("senzor"));
          Meteor.subscribe("sensor_w_1_average",Session.get("senzor"));
               Meteor.subscribe("sensor_w_2_average",Session.get("senzor"));
                    Meteor.subscribe("sensor_w_3_average",Session.get("senzor"));
                    	Meteor.subscribe("sensor_air_t_average",Session.get("senzor"));
                    		Meteor.subscribe("sensor_air_t_min",Session.get("senzor"));
                    			Meteor.subscribe("sensor_air_t_max",Session.get("senzor"));
                            Meteor.subscribe("sensor_soil_t_min",Session.get("senzor"));
                              Meteor.subscribe("sensor_soil_t_max",Session.get("senzor"));
                                Meteor.subscribe("sensor_precip_average",Session.get("senzor"));
});


});

Template.stats.onRendered(function() {




var activenode=Session.get('senzor');
  //chartNode = "Senzor_4";
  this.autorun(function() {


  


});

});


Template.stats.helpers({




Precip: function() {
   
    chartNode = Session.get("senzor");
    var averagedates=[]
    var newaverage=SersorPrecipAverage.find({}).fetch()
    //console.log(newaverage)
   
    var precipaverage=newaverage.map(function(d){
      return Math.round(d.precip_avg);
    });

    //console.log(newaverage);
    var average_dateyear=newaverage.map(function(d){
      return d.date.year;
    });
    var average_datemonth=newaverage.map(function(d){
      return d.date.month;
    });
    var average_dateday=newaverage.map(function(d){
      return d.date.day;
    });

    for(i=0;i<average_dateday.length;i++){
        averagedates.push(new Date(average_dateyear[i],average_datemonth[i],average_dateday[i]))
    }
    var theDataprecip = [];
    var xScale = [];
    theDataprecip = ["avg"].concat(precipaverage);

    xScale = ["x"].concat(averagedates);

    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDataprecip,
   

         
        ],
        type: 'bar', 
      },
    /*  color: {  
          pattern: ["#3A82D2", "#4EA338", "#EA3B23"]
        },*/
      axis: {
        x: {
          type: "timeseries",
          //extent: [last_week,today],
          tick: {
            format: "%d-%m",
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
        show: false
      },
         point: {
        show: false
      },

      zoom: {
        enabled: false,
        rescale: true,
      
      }
    };
  },

 Soil_t: function() {
   
    chartNode = Session.get("senzor");
    var averagedates=[]
    var newaverage=SersorSoil_tAverage.find({}).fetch()
    //console.log(newaverage)
    var newmin=SersorSoil_tmin.find({}).fetch()
    var newmax=SersorSoil_tmax.find({}).fetch()
    var soilaverage=newaverage.map(function(d){
      return Math.round(d.soil_t_avg);
    });
      var soilmin=newmin.map(function(d){
      return Math.round(d.soil_t_min);
    });
        var soilmax=newmax.map(function(d){
      return Math.round(d.soil_t_max);
    });
    //console.log(newaverage);
    var average_dateyear=newaverage.map(function(d){
      return d.date.year;
    });
    var average_datemonth=newaverage.map(function(d){
      return d.date.month;
    });
    var average_dateday=newaverage.map(function(d){
      return d.date.day;
    });
/*    console.log(average_dateyear);
    console.log(average_datemonth);
    console.log(average_dateday);*/

    for(i=0;i<average_dateday.length;i++){
        averagedates.push(new Date(average_dateyear[i],average_datemonth[i],average_dateday[i]))
    }
  
    //console.log(averagedates);




    var theDatasoil_t = [];
    var xScale = [];
    theDatasoil_tavg = ["avg"].concat(soilaverage);
     theDatasoil_tmin = ["min"].concat(soilmin);
      theDatasoil_tmax = ["max"].concat(soilmax);
    xScale = ["x"].concat(averagedates);
	//console.log(xScale);
	//console.log(theDatasoil_t);

    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDatasoil_tavg,
          theDatasoil_tmin,
          theDatasoil_tmax,

         
        ],
        //type: 'area' , 
      },
    /*  color: {
          pattern: ["#3A82D2", "#4EA338", "#EA3B23"]
        },*/
      axis: {
        x: {
          type: "timeseries",
          //extent: [last_week,today],
          tick: {
            format: "%d-%m",
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
        enabled: false,
        rescale: true,
      
      }
    };
  },





 Humidity: function() {
    


    chartNode = Session.get("senzor");
   //W_1 
    var w_1averagedates=[]
    var w_1Average=W_1Average.find({}).fetch()
    //console.log(w_1Average)

    var w_1_average=w_1Average.map(function(d){
      var rsw1 = (d.w_1_avg * 8.19 - 150390) / (1 - d.w_1_avg * 0.021);
      var swt1 = (rsw1 - 550) / 137.5;
      return Math.round(swt1); //return cb value
     
    });
    //console.log(newaverage);
    var w_1_dateyear=w_1Average.map(function(d){
      return d.date.year;
    });
    var w_1_datemonth=w_1Average.map(function(d){
      return d.date.month;
    });
    var w_1_dateday=w_1Average.map(function(d){
      return d.date.day;
    });


    for(i=0;i<w_1_dateday.length;i++){
        w_1averagedates.push(new Date(w_1_dateyear[i],w_1_datemonth[i],w_1_dateday[i]))
    }
  
    //console.log(w_1averagedates);

//W_2

    var w_2averagedates=[]
    var w_2Average=W_2Average.find({}).fetch()
    console.log(w_2Average)

    var w_2_average=w_2Average.map(function(d){
       var rsw1 = (d.w_2_avg * 8.19 - 150390) / (1 - d.w_2_avg * 0.021);
      var swt1 = (rsw1 - 550) / 137.5;
      return Math.round(swt1); //return cb value
     
    });
    //console.log(newaverage);
    var w_2_dateyear=w_2Average.map(function(d){
      return d.date.year;
    });
    var w_2_datemonth=w_2Average.map(function(d){
      return d.date.month;
    });
    var w_2_dateday=w_2Average.map(function(d){
      return d.date.day;
    });


    for(i=0;i<w_2_dateday.length;i++){
        w_2averagedates.push(new Date(w_2_dateyear[i],w_2_datemonth[i],w_2_dateday[i]))
    }
  
    //console.log(w_2averagedates);


    //W_3

        var w_3averagedates=[]
    var w_3Average=W_3Average.find({}).fetch()
    console.log(w_3Average)

    var w_3_average=w_3Average.map(function(d){
        var rsw1 = (d.w_3_avg * 8.19 - 150390) / (1 - d.w_3_avg * 0.021);
      var swt1 = (rsw1 - 550) / 137.5;
      return Math.round(swt1); //return cb value
     
    });
    //console.log(newaverage);
    var w_3_dateyear=w_3Average.map(function(d){
      return d.date.year;
    });
    var w_3_datemonth=w_3Average.map(function(d){
      return d.date.month;
    });
    var w_3_dateday=w_3Average.map(function(d){
      return d.date.day;
    });
    

    for(i=0;i<w_3_dateday.length;i++){
        w_3averagedates.push(new Date(w_3_dateyear[i],w_3_datemonth[i],w_3_dateday[i]))
    }
  
   //console.log(w_3averagedates);



    theDataw_1 = ["avg 10cm"].concat(w_1_average);
    //console.log("humidity chart dataset: "+theDataw_1);

    theDataw_2 = ["avg 30cm"].concat(w_2_average);
    //onsole.log("humidity chart dataset: "+theDataw_2);
    theDataw_3 = ["avg 50cm"].concat(w_3_average);
    //console.log("humidity chart dataset: "+theDataw_3);
    xScale = ["x"].concat(w_3averagedates);

    return {
      data: {
        x: "x",

        columns: [
          xScale,
          theDataw_1,
          theDataw_2,
          theDataw_3 
        ],
     

        //type: "area",
       
      },
      /* color: {
          pattern: ["#3A82D2", "#4EA338", "#EA3B23"]
        },*/
      transition: {
        duration: 0
      },
      axis: {
        x: {
          type: "timeseries",
          //extent: [last_week,today],
          tick: {
            format: "%d-%m",
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
        { axis: "y", start: 60, end: 100, class: "regionYbad" }
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
        enabled: false,
        rescale: true,
        /*onzoom: function (domain) { console.log(domain) }*/
      }
    };
  },


 Air_t: function() {
  
	chartNode = Session.get("senzor");
    var averagedates=[]
    var newaverage=Sensor_air_tAverage.find({}).fetch()
    var newmin=Sensor_air_tmin.find({}).fetch()
    var newmax=Sensor_air_tmax.find({}).fetch()
    //console.log(newaverage)

    var air_taverage=newaverage.map(function(d){
      return Math.round(d.air_t_avg);
    });
    var air_tmin=newmin.map(function(d){
      return Math.round(d.air_t_min);
    });
     var air_tmax=newmax.map(function(d){
      return Math.round(d.air_t_max);
    });
    //console.log(newaverage);
    var average_dateyear=newaverage.map(function(d){
      return d.date.year;
    });
    var average_datemonth=newaverage.map(function(d){
      return d.date.month;
    });
    var average_dateday=newaverage.map(function(d){
      return d.date.day;
    });


    for(i=0;i<average_dateday.length;i++){
        averagedates.push(new Date(average_dateyear[i],average_datemonth[i],average_dateday[i]))
    }
  
    //console.log(averagedates);




    theDataair_t_avg = ["avg"].concat(air_taverage);
    theDataair_t_min = ["min"].concat(air_tmin);
    theDataair_t_max = ["max"].concat(air_tmax);
    xScale = ["x"].concat(averagedates);

    return {
      data: {
        x: "x",

        columns: [xScale, theDataair_t_avg,theDataair_t_min,theDataair_t_max],

       //type: "area"
      },
   /*   color: {
          pattern: ["#3A82D2", "#4EA338", "#EA3B23"]
        },*/
      regions: [{ axis: "y", start: 30, end:40 ,class: "regionYnok" },
                { axis: "y", start: 40, end:50, class: "regionYbad" }],
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m",
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
        enabled: false,
        rescale: true
      }
    };
  },
  });