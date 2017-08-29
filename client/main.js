import { Template } from 'meteor/templating';
import { SensorNames } from '../imports/collections/sensors.js';
import { Sensors } from '../imports/collections/sensors.js';
import { Meteor } from 'meteor/meteor'; 
import { WorkEvents } from "../imports/collections/sensors.js";







Tracker.autorun(function(){
   
    Meteor.subscribe("sensornames");
   
  Meteor.subscribe("sensordata");
  Meteor.subscribe("sensor_soil_t_average",Session.get("senzor"));
});

Session.set("itemMenu","Home");//default value
Session.set("senzor", "Senzor_5");






Meteor.startup(function () {


AutoForm.setDefaultTemplate("semanticUI");


    sAlert.config({
        effect: 'bouncyflip',
        position: 'bottom-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });


});




window.WorkEvents = WorkEvents


Template.body.events({
   
    'click .senzor_name':function(){
    	

      var senzor= $(this).attr("data-nodename");
      var description= SensorNames.find({nodename:senzor}).fetch();
    	   var description_data=description.map(function(d){
          console.log(d.description);
        return d.description;
    })
        

      //console.log(description);
    	Session.set("senzor",senzor);

      Session.set("tempdisplay", "1hdata");
      
      Session.set("humiddisplay", "1hdata");
      
      Session.set("precipdisplay", "1hdata");
      
      Session.set("airHumidDisplay", "1hdata");
      
      Session.set("airPressDisplay", "1hdata");
     
      Session.set("airTempDisplay", "1hdata"); 


      Session.set('SenzorDescription',description_data);
    },
  /*  'click .senzor_menu':function(){
      $(".senzor_menu_items").show();
    },*/
      'click .administration':function(){
        
      $(".senzor_menu_items").hide();
    },
   /*   'click .senzor_menu':function(){
        console.log("click");  
      delete Session.keys["senzor"];
    },*/
    'click .item_menu':function(){
      var item=$(this).text();
      console.log(item);
      return Session.set("itemMenu",item);
    }

});

Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 5, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 2, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    //top: 'auto', // Top position relative to parent in px
    //left: 'auto' // Left position relative to parent in px
};


