import { Mongo } from "meteor/mongo";

export const Sensors = new Mongo.Collection("sensorvalues");
export const SensorNames = new Mongo.Collection("sensornames");
export const SensorTelemetry = new Mongo.Collection("sensortelemetries");
export const DeviceDetails =new Mongo.Collection("devicedatas");
export const WorkEvents = new Mongo.Collection("events");


if (Meteor.isServer) {

 Meteor.publish('events', function eventsPublication() {
      console.log("subscribed to events");
      return WorkEvents.find({}, { sort: { created_at: -1 } });
   });
  
Meteor.publish("devicedatas", function sensorsPublication() {
    console.log("subscribed to devicedatas");
    return DeviceDetails.find({});
  });

  Meteor.publish("sensortelemetries", function sensorsPublication() {
    console.log("subscribed to sensortelemetries");
    return SensorTelemetry.find({}, { sort: { created_at: -1 } });
  });
  Meteor.publish("sensornames", function sensorsPublication() {
    console.log("subscribed to sensornames");
    return SensorNames.find({});
  });
  Meteor.publish("sensorvalues", function sensorsPublication() {
    //var offsetEESTmillisec =moment.tz.zone("Europe/Bucharest").offset(moment()) * 60 * 1000;
 
   
 /*   yesterday = moment().subtract(1,'days');
    console.log(yesterday);
    if (senzor==="Senzor_5")
    {
      return Sensors.find(
      { nodename: senzor , updatedAt: { $gte: yesterday }},
      { sort: { created_at: -1 }}
    )
    }else*/
    return Sensors.find(
      {},
      { sort: { created_at: -1 }}
    );
  });
  Meteor.publish("sensorvalue", function sensorsPublication(senzor) {
    self = this;
    var offsetEESTmillisec =
      moment.tz.zone("Europe/Bucharest").offset(moment()) * 60 * 1000;    ///compensate for  TZ from UTC  // must change to EET on wintertime
    //console.log(offsetEESTmillisec);
    soilDatas = Sensors.aggregate([
      { $match: { nodename: senzor, soil_t: { $exists: true }, updatedAt : { $gte : new Date("2017-04-14T21:00:00Z") } } },
      //{$sort : {"created_at" : -1}},
        {
          $project: {
            'hour': { $hour: [{ $subtract: ["$updatedAt", offsetEESTmillisec] }] },
            'day': {$dayOfMonth: [{ $subtract: ["$updatedAt", offsetEESTmillisec] }]},
            'month': { $month: [{ $subtract: ["$updatedAt", offsetEESTmillisec] }] },
            'soil_t':1 ,
            'nodename':1
          }
        }
      ]);
    _(soilDatas).each(function(soilData) {
      self.added("sensorvalue", Random.id(), {
        hour: soilData.hour,
        month: soilData.month,
        day: soilData.day,
        temp: soilData.soil_t,
        nodename: soilData.nodename
      });
    });
    self.ready();
      //console.log(soilDatas);
      //return soilData;
  });

  
}
