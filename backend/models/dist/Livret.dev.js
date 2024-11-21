"use strict";

var mongoose = require("mongoose"); //departure info


var departureSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Time: {
    type: String,
    required: true
  }
}); // practical Info

var practicalInfoSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  }
}); // Subdocument schema for wifi

var wifiSchema = new mongoose.Schema({
  ssid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}); // Subdocument schema for around me

var aroundMeSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
var numberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}); // Subdocument schema for check-in

var checkInSchema = new mongoose.Schema({
  RH_name: {
    type: String
  },
  timestamp: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  parking: {
    type: String,
    required: false
  }
}); // Main schema for Livret with subdocuments

var livretSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  interest: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  background: {
    type: String
  },
  wifi: wifiSchema,
  aroundMe: aroundMeSchema,
  checkIn: checkInSchema,
  numbers: [numberSchema],
  practicalInfo: practicalInfoSchema,
  departure: departureSchema
});
var Livret = mongoose.model("Livret", livretSchema);
module.exports = Livret;