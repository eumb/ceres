import { Mongo } from "meteor/mongo";

export const Sensors = new Mongo.Collection("sensorvalues");
export const SensorNames = new Mongo.Collection("sensornames");
export const SensorTelemetry = new Mongo.Collection("sensortelemetries");
export const DeviceDetails =new Mongo.Collection("devicedatas");
export const WorkEvents = new Mongo.Collection("events");
export const Alerts = new Mongo.Collection("alerts");


if (Meteor.isServer) {

  Meteor.publish("sensor_precip_average", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to precip Sensor average");
  precip_average=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            pluv2:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             precip_averageDayValue: {$sum: "$pluv2"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 //console.log(precip_average)
_(precip_average).each(function(sensor) {
      self.added("sensor_precip_average", Random.id(), {
        date: sensor._id,
        precip_avg:sensor.precip_averageDayValue

    });
});
 self.ready();
});


  Meteor.publish("sensor_soil_t_average", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to soil Sensor average");
  soil_t_average=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            soil_t:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             soil_t_averageDayValue: {$avg: "$soil_t"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 //console.log(soil_t_average)
_(soil_t_average).each(function(sensor) {
      self.added("sensor_soil_t_average", Random.id(), {
        date: sensor._id,
        soil_t_avg:sensor.soil_t_averageDayValue

    });
});
 self.ready();
});

  Meteor.publish("sensor_soil_t_min", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to soil Sensor min");
  soil_t_min=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            soil_t:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             soil_t_minDayValue: {$min: "$soil_t"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 //console.log(soil_t_average)
_(soil_t_min).each(function(sensor) {
      self.added("sensor_soil_t_min", Random.id(), {
        date: sensor._id,
        soil_t_min:sensor.soil_t_minDayValue

    });
});
 self.ready();
});

  Meteor.publish("sensor_soil_t_max", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to soil Sensor max");
  soil_t_max=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            soil_t:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             soil_t_maxDayValue: {$max: "$soil_t"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 //console.log(soil_t_average)
_(soil_t_max).each(function(sensor) {
      self.added("sensor_soil_t_max", Random.id(), {
        date: sensor._id,
        soil_t_max:sensor.soil_t_maxDayValue

    });
});
 self.ready();
});


  Meteor.publish("sensor_w_1_average", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to w1 Sensor average");
  w_1_average=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            w_1:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             w_1_averageDayValue: {$avg: "$w_1"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 //console.log(w_1_average)
_(w_1_average).each(function(sensor) {
      self.added("sensor_w_1_average", Random.id(), {
        date: sensor._id,
        w_1_avg:sensor.w_1_averageDayValue

    });
});
 self.ready();
});

  Meteor.publish("sensor_w_2_average", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to w2 Sensor average");
  w_2_average=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            w_2:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             w_2_averageDayValue: {$avg: "$w_2"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 //console.log(w_2_average)
_(w_2_average).each(function(sensor) {
      self.added("sensor_w_2_average", Random.id(), {
        date: sensor._id,
        w_2_avg:sensor.w_2_averageDayValue

    });
});
 self.ready();
});

  Meteor.publish("sensor_w_3_average", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to w3 Sensor average");
  w_3_average=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            w_3:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             w_3_averageDayValue: {$avg: "$w_3"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 console.log(w_3_average)
_(w_3_average).each(function(sensor) {
      self.added("sensor_w_3_average", Random.id(), {
        date: sensor._id,
        w_3_avg:sensor.w_3_averageDayValue

    });
});
 self.ready();
});


  Meteor.publish("sensor_air_t_average", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to air_t Sensor average");
  air_t_average=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            air_t:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             air_t_averageDayValue: {$avg: "$air_t"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 //console.log(air_t_average)
_(air_t_average).each(function(sensor) {
      self.added("sensor_air_t_average", Random.id(), {
        date: sensor._id,
        air_t_avg:sensor.air_t_averageDayValue

    });
});
 self.ready();
});


  Meteor.publish("sensor_air_t_min", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to air_t Sensor min");
  air_t_minimum=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            air_t:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             air_t_minDayValue: {$min: "$air_t"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 //console.log(air_t_minimum)
_(air_t_minimum).each(function(sensor) {
      self.added("sensor_air_t_min", Random.id(), {
        date: sensor._id,
        air_t_min:sensor.air_t_minDayValue

    });
});
 self.ready();
});


  Meteor.publish("sensor_air_t_max", function sensorsPublication(senzor) {
  self = this;
  console.log("subscribed to air_t Sensor max");
  air_t_max=Sensors.aggregate([
      { $match: {
            nodename: senzor,
            air_t:{$exists:true}
        }
      },
      {$sort : {"created_at" : -1}},
      {$group: {
           _id: {
            year : { $year : "$created_at" },        
            month : { $month : "$created_at" },        
            day : { $dayOfMonth : "$created_at" },
          },
             air_t_maxDayValue: {$max: "$air_t"}
       }
      },
       {$sort : {"_id" : -1}},
      
    ]);

 //console.log(air_t_max)
_(air_t_max).each(function(sensor) {
      self.added("sensor_air_t_max", Random.id(), {
        date: sensor._id,
        air_t_max:sensor.air_t_maxDayValue

    });
});
 self.ready();
});


  Meteor.publish("lastsensordata", function sensorsPublication(senzor) {
    return Sensors.find(
      {nodename:senzor},
      { sort: { created_at: -1 },limit:3}
    );
  });




/*  Meteor.publish("lastsensordata", function sensorsPublication(senzor) {
    console.log("subscribed to S5");
        self=this;
        data = Sensors.aggregate([
      { $match: { nodename: senzor}},
      {$sort : {"created_at" : -1}},
        {
          $project: {
            'created_at': 1,            
            'soil_t':1 ,
            'w_1':1,
            'w_2':1,
            'w_3':1,
            'nodename':1
          }
        }
      ]);
      //console.log(soilDatas)
    _(data).each(function(sData) {
      self.added("lastsensordata", Random.id(), {
        created_at:sData.created_at,
        soil_t: sData.soil_t,
        w_1:sData.w_1,
        w_2:sData.w_2,
        w_3:sData.w_3,
        nodename: sData.nodename
      });
    });
    self.ready();
      //console.log(soilDatas);
      //return soilData;
  });
}*/


 Meteor.publish("sensordata", function sensorsPublication(senzor) {
    console.log("subscribed to sensordata");
        self=this;
        sensorDatas = Sensors.aggregate([
      { $match: { nodename: senzor }},
      //{$sort : {"created_at" : -1}},
        {
          $project: {
            'created_at': 1,            
            'soil_t':1 ,
            'w_1':1,
            'w_2':1,
            'w_3':1,

            'nodename':1
          }
        }
      ]);
      //console.log(sensorDatas)
    _(sensorDatas).each(function(sensorData) {
      self.added("sensordata", Random.id(), {
        created_at:sensorData.created_at,
        soil_t: sensorData.soil_t,
        w_1:sensorData.w_1,
        w_2:sensorData.w_2,
        w_3:sensorData.w_3,
        nodename: sensorData.nodename
      });
    });
    self.ready();
      //console.log(soilDatas);
      //return soilData;
  });
  

 Meteor.publish('events', function eventsPublication() {
      console.log("subscribed to events");
      //console.log(WorkEvents.find({}, { sort: { created_at: -1 } }).fetch())
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

  Meteor.publish("alerts", function sensorsPublication(senzor) {
    console.log("subscribed to alerts");
    return Alerts.find({} ,{ sort: { created_at: -1 },limit:1});
  });



  Meteor.publish("sensorvalues", function sensorsPublication(senzor) {
    console.log("subscribed to sensorvalues");
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
    if (senzor==="Senzor_5"){
      return Sensors.find(
      {nodename:senzor},
      { sort: { created_at: -1 },limit:1000}
    );
    } else 
    return Sensors.find(
      {nodename:senzor},
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
