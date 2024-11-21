"use strict";

// backend/server.js
var express = require('express');

var cors = require('cors');

var mongoose = require('mongoose');

var routes = require('./routes');

var app = express();
app.use(cors());
app.use(express.json());
var PORT = 3001; // Use any port you prefer
// Connect to MongoDB Atlas

var MONGO_URI = 'mongodb+srv://mohamedgharab:helloworld@cluster0.tfqpsea.mongodb.net/?retryWrites=true&w=majority';

function connect() {
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
          console.log("Connected to MongoDB");
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

;
connect(); // Use the routes defined in routes.js

app.use('/', routes); // Start the server

app.listen(PORT, function () {
  console.log("Server running  ".concat(PORT));
});