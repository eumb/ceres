import { Template } from "meteor/templating";
import { WorkEvents } from "../imports/collections/sensors.js";

/*
Template.body.onCreated(function () {
    var self = this;

    self.autorun(function() {
        //self.subscribe("sensornames",function(){
           //});
         subscriptions.subscribe('events',function(){
         	
         });
         //subscriptions.subscribe("sensorvalues", Session.get("senzor"));
    });
  });*/

function drawTimeLine(){
  var container = document.getElementById('visualization');
   console.log(container)
  var data = new vis.DataSet(timelineEvents());
  var options = {
    width: '1200px',
    height: '400px',
    moment: function(date) {
    return vis.moment(date).utcOffset('+03:00');
	}
  };
  var timeline = new vis.Timeline(container, data, options);

};


function timelineEvents() {
 
  eventsData=[];
  eventset = WorkEvents.find().fetch();

  console.log(eventset)

  event= _.pluck(eventset, "event_content");
  scale = _.pluck(eventset, "created_at");

  //console.log(day);
  //console.log(event)
  for (i = event.length; i >= 0; i--) {
      eventsData.push({
      start: moment(scale[i]).format('YYYY-MM-DD H:mm'),
/*		start:scale[i],*/
      content: event[i]
    });

    }
 
  console.log(eventsData);
  return eventsData;
};


Template.fisa_tehno.onRendered(function(){

 drawTimeLine();
});
