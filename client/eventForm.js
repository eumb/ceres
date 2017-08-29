import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

import { WorkEvents } from "../imports/collections/sensors.js";

WorkEvents.attachSchema(new SimpleSchema({ 
 user: {
 	type: String,
 	label: "Utlizator",
 	max: 100,
 },
 operation:{
  	type: String,
    label: "Operatiune",
    optional: false,
    allowedValues: [
            "General",
            "Semant porumb",
            "Rasarit porumb",
            "Fertilizat cu îngrăşăminte organice", 
    				"Dezmiriştit", 
    				"Fertilizat cu îngrăşăminte simple cu fosfor", 
    				"Fertilizat cu îngrăşăminte simple cu potasiu"],
    autoform: {
      options: [
          {label: "General", value: "General"},
          {label: "Semant porumb", value: "Semant porumb"},
          {label: "Rasarit porumb", value: "Rasarit porumb"},
          {label: "Fertilizat cu îngrăşăminte organice", value: "Fertilizat cu îngrăşăminte organice"},
          {label: "Dezmiriştit", value: "Dezmiriştit"},
          {label: "Fertilizat cu îngrăşăminte simple cu fosfor", value: "Fertilizat cu îngrăşăminte simple cu fosfor"},
          {label: "Fertilizat cu îngrăşăminte simple cu potasiu", value: "Fertilizat cu îngrăşăminte simple cu potasiu"}
      ]
    }	
 },
 obs: {
 	type: String,
    label: "Observatii",
    max: 300,
    optional:true,
    autoform: {
        type: 'text'
    }
 },
 created_at: {
    type: Date,
    label: "Data",
    autoform: {
      afFieldInput: {
      	value: new Date(),
        type: Date,
      }
    }
  }
},{ tracker: Tracker }));


Template.eventForm.helpers({
 currentUser: function () {
        return Meteor.user().username;
    },
  workSchema:function() {
    return WorkEvents;
  }
});

