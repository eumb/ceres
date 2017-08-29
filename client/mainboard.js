import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Sensors } from "../imports/collections/sensors.js";
import { SensorNames } from "../imports/collections/sensors.js";
import { Alerts } from "../imports/collections/sensors.js";

Template.mainboard.onCreated(function() {
  var self = this;

  self.autorun(function() {

    self.subscribe("lastsensordata",Session.get("senzor"));
    self.subscribe("alerts",Session.get("senzor"));

  });

});

Template.mainboard.events({
    'click a.item.node_name':function(){
      var senzor= $(this).attr('nodename');
      //console.log(this);
      //console.log(senzor);
     delete Session.keys['recoIrig']
     Session.set("senzor", senzor);

  }
});
  

Template.mainboard.onRendered(function() {




var activenode=Session.get('senzor');
  //chartNode = "Senzor_4";
  this.autorun(function() {


  

    chartNode = Session.get("senzor");
    

    var sensorairdata = Sensors.find(
      { 'nodename': chartNode, air_t: { $exists: true } },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity
    //console.log(sensorairdata);

    var sensorair_temp = sensorairdata.map(function(d) {
      return d.air_t;
    });

    if (sensorair_temp<30){
   
      Session.set("classsensorair_temp","saturated");

    }else if (sensorair_temp>=30 & sensorair_temp<40){

      Session.set("classsensorair_temp","regionYnok");

    }else if(sensorair_temp>=40 ){
        Session.set("classsensorair_temp","regionYbad");

    }
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
      { 'nodename': chartNode, ane: { $exists: true } },
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
      { 'nodename': chartNode, soil_t: { $exists: true } },
      { limit: 1 }
    ).fetch(); //mandatory ' ' not " "   //must have it like this for reactivity
    console.log(sensorsoildata);
    
    var w1 = sensorsoildata.map(function(d) {
      console.log(`d.w_1: ${d.w_1}`)
      var rsw1 = (d.w_1 * 8.19 - 150390) / (1 - d.w_1 * 0.021);
      console.log(`rsw1 ${rsw1}`);
      swt1 = (rsw1 - 550) / 137.5;
      console.log(`swt1 ${swt1}`);
      return Math.round(swt1); //return cb value
      //return d.w_1 // return frequency
      //return Math.round(d.w_1);
    });
    if (w1<10){
   
      Session.set("classw1","saturated");
      Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Nu exista alerte"}); 

    }else if (w1>=10 & w1<20){

      Session.set("classw1","regionYok");
      Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Nu exista alerte"}); 

    }else if(w1>=20 & w1 <45){
        Session.set("classw1","regionYalmostok");
        Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Nu exista alerte"}); 

    }else if(w1>=45 & w1 <60){
        Session.set("classw1","regionYnok");
        sAlert.warning('Adancime 10 cm - Aprovizionare necorespunzătoare cu apă');
        Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Adancime 10 cm - Aprovizionare necorespunzătoare cu apă"}); 
       

    }
    else {
         Session.set("classw1","regionYbad");
         sAlert.error('Adancime 10 cm - Umiditate in zona de ofilire');
         sAlert.success('Irigare recomandata');
         Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Umiditate 10cm deficitara: Irigatie necesara"});  
         
        
    }
    
    console.log(`Senzor w1 ${w1}`);
    if (isNaN(w1)){
      w1=150;
      console.log(`Senzor w1 is NaN`);
    }else
    console.log(`new w1 value is ${w1}`)

    Session.set("sensorw1", w1);

    var w2 = sensorsoildata.map(function(d) {
      var rsw2 = (d.w_2 * 8.19 - 150390) / (1 - d.w_2 * 0.021);
      swt2 = (rsw2 - 550) / 137.5;
      return Math.round(swt2); //return cb value
      //return d.w_2 // return frequency
      //return Math.round(d.w_2);
    });

    if (w2<10){
   
      Session.set("classw2","saturated");


    }else if (w2>=10 & w2<20){

      Session.set("classw2","regionYok");
      Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Nu exista alerte"}); 

    }else if(w2>=20 & w2 <45){
        Session.set("classw2","regionYalmostok");
        Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Nu exista alerte"}); 

    }else if(w2>=45 & w2 <60){
        Session.set("classw2","regionYnok");
        Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Adancime 30 cm - Aprovizionare necorespunzătoare cu apă"}); 
        sAlert.warning('Adancime 30 cm -  Aprovizionare necorespunzătoare cu apă');


    }
    else {
         Session.set("classw2","regionYbad");
         sAlert.error('Adancime 30 cm - Umiditate in zona de ofilire');
         Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Umiditate 30cm deficitara: Irigatie necesara"}); 
    }

 
       if (w2>60){
       
    }else{
       
    }
    

    console.log(`Senzor w2 ${w2}`);
    if (isNaN(w2)){
      w2=150;
      console.log(`Senzor w2 is NaN`);
    }else
    console.log(`new w2 value is ${w2}`)
    Session.set("sensorw2", w2);




    var w3 = sensorsoildata.map(function(d) {
      console.log(`d.w_3: ${d.w_3}`)
      var rsw3 = (d.w_3 * 8.19 - 150390) / (1 - d.w_3 * 0.021);
      swt3 = (rsw3 - 550) / 137.5;
      return Math.round(swt3); //return cb value
      //return d.w_3 // return frequency
      //return Math.round(d.w_3);
    });

    console.log(`W3 initial value is ${w3}`)

    if (w3<10){
   
      Session.set("classw3","saturated");

    }else if (w3>=10 & w3<20){

      Session.set("classw3","regionYok");
      Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Nu exista alerte"}); 

    }else if(w3>=20 & w3 <45){
        Session.set("classw3","regionYalmostok");
        Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Nu exista alerte"}); 

    }else if(w3>=45 & w3 <60){
        Session.set("classw3","regionYnok");
        sAlert.warning('Adancime 50 cm - Aprovizionare necorespunzătoare cu apă');
        Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Adancime 50 cm - Aprovizionare necorespunzătoare cu apă"}); 

    }
    else {
         Session.set("classw3","regionYbad");
         sAlert.error('Adancime 50 cm - Umiditate in zona de ofilire');
                  Alerts.insert({nodename:Session.get("senzor"),created_at:new Date(),alert:"Umiditate 50cm deficitara: Irigatie necesara"}); 

    }

    console.log(`Senzor w3 ${w3}`);
    if (isNaN(w3)){
      w3=150;
      console.log(`Senzor w3 is NaN`);
    }else
    console.log(`new w3 value is ${w3}`)
    Session.set("sensorw3", w3);

    var sensortemps = sensorsoildata.map(function(d) {
      return d.soil_t;
    });


    //console.log(sensortemps);
    Session.set("sensortempsoil_t", sensortemps);


  });
});

Template.mainboard.helpers({

    alerts:function(){

      alerts=Alerts.find({nodename:Session.get('senzor')},{sort: {'created_at' : -1},limit:1}).fetch();
      var last_alert = alerts.map(function(d) {
      return d.alert;
    });
      console.log(last_alert)
      if (last_alert.length===0){
          return Session.set("alert","Nu exista alerte");
      }else return Session.set("alert",last_alert);
    },
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
    count=distinctNamesFromNames.length;

    
    Session.set('count',count);

    Session.set('distinctNamesFromNames',distinctNamesFromNames);
    
    return Session.get('distinctNamesFromNames');
  },

  tab_menu:function(){
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
    count=distinctNamesFromNames.length;
    console.log(count)
    if(count === 1)return "ui one item tabular menu"
       if(count === 2)return "ui two item tabular menu"
         if(count === 3)return "ui three item tabular menu"
           if(count === 4)return "ui four item tabular menu"
             if(count === 5)return "ui five item tabular menu"
               if(count === 6)return "ui six item tabular menu"
  },

   active: function() {
    if(Session.get("senzor") === $(this).attr('nodename')) {
      return "active";
      }
  },
  colorw3:function(){
    if(Session.get('classw3')==="saturated"){
         console.log("gray")
       return "saturated extra center aligned content"
    }else  if(Session.get('classw3')==="regionYok"){
         console.log("regionYok")
       return "regionYok extra center aligned content"
    } else if(Session.get('classw3')==="regionYalmostok"){
         console.log("regionYalmostok")
       return "regionYalmostok extra center aligned content"
    }else if(Session.get('classw3')==="regionYnok"){
         console.log("regionYnok")
       return "regionYnok extra center aligned content"
    }else if(Session.get('classw3')==="regionYbad"){
         console.log("regionYbad")
       return "regionYbad extra center aligned content"
    }
  },
  colorw2:function(){

    if(Session.get('classw2')==="saturated"){
         console.log("gray")
       return "saturated extra center aligned content"
    }else if(Session.get('classw2')==="regionYok"){
         console.log("regionYok")
       return "regionYok extra center aligned content"
    } else if(Session.get('classw2')==="regionYalmostok"){
         console.log("regionYalmostok")
       return "regionYalmostok extra center aligned content"
    }else if(Session.get('classw2')==="regionYnok"){
         console.log("regionYnok")
       return "regionYnok extra center aligned content"
    }else if(Session.get('classw2')==="regionYbad"){
         console.log("regionYbad")
       return "regionYbad extra center aligned content"
    }
    },
   colorw1:function(){
    if(Session.get('classw1')==="saturated"){
         console.log("gray")
       return "saturated extra center aligned content"
    }else  if(Session.get('classw1')==="regionYok"){
         console.log("regionYok")
       return "regionYok extra center aligned content"
    } else if(Session.get('classw1')==="regionYalmostok"){
         console.log("regionYalmostok")
       return "regionYalmostok extra center aligned content"
    }else if(Session.get('classw1')==="regionYnok"){
         console.log("regionYnok")
       return "regionYnok extra center aligned content"
    }else if(Session.get('classw1')==="regionYbad"){
         console.log("regionYbad")
       return "regionYbad extra center aligned content"
    }
  },
  colorsensorair_temp:function(){
    if(Session.get('classsensorair_temp')==="saturated"){
         console.log("gray")
       return "regionYok extra center aligned content"
    }else if(Session.get('classsensorair_temp')==="regionYnok"){
         console.log("regionYnok")
       return "regionYnok extra center aligned content"
    }else if(Session.get('classsensorair_temp')==="regionYbad"){
         console.log("regionYbad")
       return "regionYbad extra center aligned content"
    }
  },
});
