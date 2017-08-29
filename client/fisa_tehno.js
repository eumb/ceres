import { Template } from "meteor/templating";
import { WorkEvents } from "../imports/collections/sensors.js";


/*Template.fisa_tehno.onCreated(function() {
  var self = this;

  self.autorun(function() {

    self.subscribe("events");
    

  });

});*/


Tracker.autorun(function () {
  
    Meteor.subscribe("events");
    //subscriptions.subscribe('sensorvalues', Session.get("senzor"));

});


function drawTimeLine(){
  var container = document.getElementById('visualization');
   console.log(container)
  var data = new vis.DataSet(timelineEvents());
  var options = {
    width: '1200px',
    height: '400px',
 
  };
  var timeline = new vis.Timeline(container, data, options);

};


function timelineEvents() {
 
  eventsData=[];
  eventset = WorkEvents.find().fetch();

  console.log(eventset)
  console.log(WorkEvents.find({}).fetch())

  operation= _.pluck(eventset, "operation");
  //obs=_.pluck(eventset, "obs");
  scale = _.pluck(eventset, "created_at");

  //console.log(day);
  //console.log(event)
  for (i = operation.length; i >= 0; i--) {
      eventsData.push({
      start: moment(scale[i]).zone("+3:00").format('YYYY-MM-DD H:mm'),
/*		start:scale[i],*/
      content: operation[i]
    });

    }
 
  console.log(eventsData);
  return eventsData;
};


Template.fisa_tehno.onRendered(function(){

 drawTimeLine();
});
