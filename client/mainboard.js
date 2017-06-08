import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Sensors } from "../imports/collections/sensors.js";
import { SensorNames } from "../imports/collections/sensors.js";
/*import { DDP } from 'meteor/ddp-client';*/
//var subscriptions = new SubsManager();

/*Template.mainboard.onRendered(function(){

console.log(conn.status());
conn.call('test',function(){
  console.log("connected");
})

});*/

/*if (Meteor.isClient){
conn=DDP.connect('http://bucurila.go.ro:4000/');

}
*/

var subscriptions = new SubsManager();
Template.body.onCreated(function () {
    var self = this;

    self.autorun(function() {
        //self.subscribe("sensornames",function(){
           //});
         subscriptions.subscribe('sensornames');
         //subscriptions.subscribe("sensorvalues");
    });

Session.set("itemMenu","Home");//default value
Session.set("senzor", "Senzor_4");

});



Template.mainboard.events({
    'click a.item.node_name':function(){
      var senzor= $(this).attr('nodename');
      //console.log(this);
      //console.log(senzor);
  
      Session.set("senzor", senzor);

  }
});
  
Template.mainboard.onRendered(function(){
      
      var activenode=Session.get('senzor');
       // console.log(activenode)
        
    /*if($('.node_name').attr('data-nodename')==activenode){
    //console.log(this)
    $(this).addClass('active');
  }*/

});

Template.mainboard.onCreated(function() {

  //chartNode = "Senzor_4";
  this.autorun(function() {
    chartNode = Session.get("senzor");
    var sensorairdata = Sensors.find(
      { nodename: chartNode, air_t: { $exists: true } },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity
    //console.log(sensorairdata);

    var sensorair_temp = sensorairdata.map(function(d) {
      return d.air_t;
    });
    //console.log("Sensor air" + sensorair_temp);
    Session.set("sensorair_temp", sensorair_temp);

    var sensorair_humid = sensorairdata.map(function(d) {
      return d.humid;
    });

    //console.log(sensortemps);
    Session.set("sensorair_humid", sensorair_humid);

    var sensorair_pressure_mmhg = sensorairdata.map(function(d) {
      //console.log(sensortemps);Formula exacta este 760 mm Hg = 101325 Pa = 1 atm. Adica P[mm Hg] = P[Pa] * 760 / 101325.
      var press_mmhg = d.press * 760 / 101325;
      return Math.round(press_mmhg);
    });

    Session.set("sensorair_pressure_mmhg", sensorair_pressure_mmhg);

    var sensormeteodata = Sensors.find(
      { nodename: chartNode, ane: { $exists: true } },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity

    var sensormeteo_vane = sensormeteodata.map(function(d) {
      return d.vane;
    });
    Session.set("sensormeteo_vane", sensormeteo_vane);

    var sensormeteo_pluv3 = sensormeteodata.map(function(d) {
      return d.pluv3;
    });
    Session.set("sensormeteo_pluv3", sensormeteo_pluv3);

    var sensormeteo_ane = sensormeteodata.map(function(d) {
      return d.ane;
    });
    Session.set("sensormeteo_ane", sensormeteo_ane);


    var sensorsoildata = Sensors.find(
      { nodename: chartNode, soil_t: { $exists: true } },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity
    //console.log(sensorsoildata);
    var w1 = sensorsoildata.map(function(d) {
      var rsw1 = (d.w_1 * 8.19 - 150390) / (1 - d.w_1 * 0.021);
      swt1 = (rsw1 - 550) / 137.5;
      return Math.round(swt1); //return cb value
      //return d.w_1 // return frequency
      //return Math.round(d.w_1);
    });
    Session.set("sensorw1", w1);

    var w2 = sensorsoildata.map(function(d) {
      var rsw2 = (d.w_2 * 8.19 - 150390) / (1 - d.w_2 * 0.021);
      swt2 = (rsw2 - 550) / 137.5;
      return Math.round(swt2); //return cb value
      //return d.w_2 // return frequency
      //return Math.round(d.w_2);
    });
    Session.set("sensorw2", w2);

    var w3 = sensorsoildata.map(function(d) {
      var rsw3 = (d.w_3 * 8.19 - 150390) / (1 - d.w_3 * 0.021);
      swt3 = (rsw3 - 550) / 137.5;
      return Math.round(swt3); //return cb value
      //return d.w_3 // return frequency
      //return Math.round(d.w_3);
    });
    Session.set("sensorw3", w3);

    var sensortemps = sensorsoildata.map(function(d) {
      return d.soil_t;
    });
    //console.log(sensortemps);
    Session.set("sensortempsoil_t", sensortemps);


  });
});

Template.mainboard.helpers({

    sensorsname() {
     //console.log("called")
      if(Meteor.user().username==="administrator"){
        var distinctNamesFromNames= _.uniq(SensorNames.find({},
                {sort:{nodename:1},fields:{nodename:1,description:1}}).map(function(x) {
           return x;
           //return names=_.pluck(distinctNames, 'description');
      }), true);
      }else {
        var distinctNamesFromNames= _.uniq(SensorNames.find({'role':'live'},
                {sort:{nodename:1},fields:{nodename:1,description:1}}).map(function(x) {
           return x;
           //return names=_.pluck(distinctNames, 'description');
      }), true);
      }
   
    Session.set('distinctNamesFromNames',distinctNamesFromNames);
  
    return Session.get('distinctNamesFromNames');
  },
   active: function() {
    if(Session.get("senzor") === $(this).attr('nodename')) {
      return "active";
      }
  }
});
