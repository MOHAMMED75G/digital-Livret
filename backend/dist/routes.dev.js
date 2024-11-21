"use strict";

// backend/routes.js
var express = require('express');

var router = express.Router();

var User = require('./models/User');

var Profile = require('./models/Profile');

var Livret = require("./models/Livret");

var nodemailer = require("nodemailer");

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, path.join(__dirname, '../public/Images/')); // Uploads folder where the images will be saved
  },
  filename: function filename(req, file, cb) {
    // Rename the file to avoid name conflicts
    cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage
}); // Route to handle profile photo upload

router.post('/upload-profile-image', upload.single('image'), function _callee(req, res) {
  var imageUrl, profile;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (req.file) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'No image file provided.'
          }));

        case 3:
          // Save the image URL to the database
          imageUrl = "/images/".concat(req.file.filename); // Find the profile and update the profileImage field with the image URL

          _context.next = 6;
          return regeneratorRuntime.awrap(Profile.findOneAndUpdate({
            email: e
          }, {
            profileImage: imageUrl
          }));

        case 6:
          profile = _context.sent;

          if (profile) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'Profile not found.'
          }));

        case 9:
          // Respond with the image URL
          res.status(200).json({
            imageUrl: imageUrl
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Failed to upload profile photo.'
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.post('/upload-image', upload.single('image'), function _callee2(req, res) {
  var Url;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (req.file) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'No image file provided.'
          }));

        case 3:
          Url = "/images/".concat(req.file.filename);
          console.log({
            Url: Url
          });
          res.status(200).json({
            Url: Url
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: 'Failed to uploade photo.'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Route for user registration

var e;
router.post('/register', function _callee3(req, res) {
  var _req$body, name, email, password, existingUser, newUser;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password; // Check if the user already exists with the provided email

          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context3.sent;

          if (!existingUser) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'User with this email already exists'
          }));

        case 7:
          // Create a new user record
          newUser = new User({
            name: name,
            email: email,
            password: password
          });
          _context3.next = 10;
          return regeneratorRuntime.awrap(newUser.save());

        case 10:
          res.status(201).json({
            message: 'User registered successfully'
          });
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // Route for user login

router.post('/login', function _callee4(req, res) {
  var _req$body2, email, password, user;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          e = email;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email,
            password: password
          }));

        case 5:
          user = _context4.sent;

          if (user) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(401).json({
            error: 'Invalid credentials'
          }));

        case 8:
          // If login successful, send back the user data
          // console.log("login succesful");
          e = user.email;
          res.json({
            name: user.name,
            email: user.email // Add other user data fields as needed

          });
          _context4.next = 17;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](2);
          console.log("login INsuccesful");
          console.error('Login error:', _context4.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 12]]);
}); // Route for getting all users

router.get('/users', function _callee5(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.find({}, {
            password: 0
          }));

        case 3:
          users = _context5.sent;
          res.status(200).json(users);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Add more routes as needed

router.get('/profile', function (req, res) {
  // You can add authentication middleware here to check if the user is logged in
  // For example, verify the JWT and extract the user ID to get the user's profile data
  // For demonstration purposes, we'll just return a success message
  res.json({
    message: 'You have successfully logged in and accessed the profile page'
  });
});
router.post("/contact", function (req, res) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohammedghrab94@gmail.com",
      pass: "rxucvcisvhvohgog"
    }
  });
  var _req$body3 = req.body,
      fname = _req$body3.fname,
      lname = _req$body3.lname,
      phone = _req$body3.phone,
      email = _req$body3.email,
      subject = _req$body3.subject,
      company = _req$body3.company,
      message = _req$body3.message;
  var mailOptions = {
    from: email,
    // Set the sender email dynamically from the form input
    to: "digitallivret@gmail.com",
    // Email to send the form data
    subject: "Contact Form Submission",
    text: "\n        First Name: ".concat(fname, "\n        Last Name: ").concat(lname, "\n        Phone: ").concat(phone, "\n        Email: ").concat(email, "\n        Subject: ").concat(subject, "\n        Company: ").concat(company, "\n        Message: ").concat(message, "\n      ")
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
      res.status(500).json({
        error: "Failed to send email"
      });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({
        message: "Email sent successfully"
      });
    }
  });
});
router.post('/check-profile', function _callee6(req, res) {
  var email, existingProfile;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          email = req.body.email;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Profile.findOne({
            email: email
          }));

        case 4:
          existingProfile = _context6.sent;

          if (existingProfile) {
            // Profile exists, send a response indicating that the profile exists
            res.status(200).json({
              exists: true
            });
          } else {
            // Profile does not exist, send a response indicating that the profile does not exist
            res.status(200).json({
              exists: false
            });
          }

          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          console.error('Error checking profile:', _context6.t0);
          res.status(500).json({
            error: 'Failed to check profile'
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.post('/save-profile/:email', function _callee7(req, res) {
  var _req$body4, email, name, surname, location, profile;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body4 = req.body, email = _req$body4.email, name = _req$body4.name, surname = _req$body4.surname, location = _req$body4.location;
          _context7.prev = 1;
          profile = new Profile({
            email: email,
            name: name,
            surname: surname,
            location: location
          });
          _context7.next = 5;
          return regeneratorRuntime.awrap(profile.save());

        case 5:
          res.status(201).json({
            message: 'Profile saved successfully'
          });
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          console.error('Error saving profile:', _context7.t0);
          res.status(500).json({
            error: 'Failed to save profile'
          });

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.post("/profile/:email", function _callee8(req, res) {
  var email, profile;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          email = e;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Profile.findOne({
            email: email
          }));

        case 4:
          profile = _context8.sent;

          if (profile) {
            _context8.next = 8;
            break;
          }

          console.log("nothing");
          return _context8.abrupt("return", res.status(404).json({
            error: 'Profile not found'
          }));

        case 8:
          return _context8.abrupt("return", res.status(200).json(profile));

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          res.status(500).json({
            error: 'Server error'
          });

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.post("/new-livret", function _callee9(req, res) {
  var _req$body5, name, interest, date, background, livret;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body5 = req.body, name = _req$body5.name, interest = _req$body5.interest, date = _req$body5.date, background = _req$body5.background; // Create a new Livret instance

          livret = new Livret({
            name: name,
            interest: interest,
            date: date,
            userEmail: e,
            background: background
          }); // Save the Livret to the database

          _context9.next = 5;
          return regeneratorRuntime.awrap(livret.save());

        case 5:
          // Respond with a success status
          res.status(201).json({
            message: "Livret created successfully!"
          });
          _context9.next = 12;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          res.status(500).json({
            message: "Failed to create Livret."
          });

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get('/livrets/:email', function _callee10(req, res) {
  var email, livrets;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          email = e; // Use params to get the email from the URL

          _context10.next = 4;
          return regeneratorRuntime.awrap(Livret.find({
            userEmail: email
          }));

        case 4:
          livrets = _context10.sent;
          res.status(200).json(livrets);
          _context10.next = 12;
          break;

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          res.status(500).json({
            error: 'An error occurred'
          });

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // abt livret

router.post('/1/:livret_id', function _callee11(req, res) {
  var _req$body6, wifiName, wifiCode, livret_id, livret;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body6 = req.body, wifiName = _req$body6.wifiName, wifiCode = _req$body6.wifiCode;
          livret_id = req.params.livret_id; // Find the existing Livret based on the livret_id

          _context11.next = 5;
          return regeneratorRuntime.awrap(Livret.findById(livret_id));

        case 5:
          livret = _context11.sent;

          if (!livret) {
            _context11.next = 13;
            break;
          }

          livret.wifi = {
            ssid: wifiName,
            password: wifiCode
          };
          _context11.next = 10;
          return regeneratorRuntime.awrap(livret.save());

        case 10:
          res.status(201).json({
            message: 'Wi-Fi data saved successfully!'
          });
          _context11.next = 14;
          break;

        case 13:
          res.status(404).json({
            message: 'Livret not found.'
          });

        case 14:
          _context11.next = 20;
          break;

        case 16:
          _context11.prev = 16;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          res.status(500).json({
            message: 'Failed to save Wi-Fi data.'
          });

        case 20:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router.get('/1/:livret_id', function _callee12(req, res) {
  var livret_id, livret;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          livret_id = req.params.livret_id; // Find the existing Livret based on the livret_id

          _context12.next = 4;
          return regeneratorRuntime.awrap(Livret.findById(livret_id));

        case 4:
          livret = _context12.sent;
          res.status(200).json(livret.wifi); // If the livret is found, update the Wi-Fi data

          _context12.next = 12;
          break;

        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          res.status(500).json({
            message: 'Failed to save Wi-Fi data.'
          });

        case 12:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get('/3/:livret_id', function _callee13(req, res) {
  var livret_id, livret;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          livret_id = req.params.livret_id; // Find the existing Livret based on the livret_id

          _context13.next = 4;
          return regeneratorRuntime.awrap(Livret.findById(livret_id));

        case 4:
          livret = _context13.sent;
          res.status(200).json(livret.numbers); // If the livret is found, update the Wi-Fi data

          _context13.next = 12;
          break;

        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          res.status(500).json({
            message: 'Failed to save Wi-Fi data.'
          });

        case 12:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // POST endpoint for saving number data (Component2)

router.post('/3/:livret_id', function _callee14(req, res) {
  var _req$body7, number, description, livret_id, livret;

  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _req$body7 = req.body, number = _req$body7.number, description = _req$body7.description;
          livret_id = req.params.livret_id; // Find the existing Livret based on the livret_id

          _context14.next = 5;
          return regeneratorRuntime.awrap(Livret.findById(livret_id));

        case 5:
          livret = _context14.sent;

          if (!livret) {
            _context14.next = 13;
            break;
          }

          livret.numbers.push({
            number: number,
            description: description
          });
          _context14.next = 10;
          return regeneratorRuntime.awrap(livret.save());

        case 10:
          res.status(201).json({
            message: 'Number data saved successfully!'
          });
          _context14.next = 14;
          break;

        case 13:
          res.status(404).json({
            message: 'Livret not found.'
          });

        case 14:
          _context14.next = 20;
          break;

        case 16:
          _context14.prev = 16;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);
          res.status(500).json({
            message: 'Failed to save number data.'
          });

        case 20:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); // information

router.post('/4/:livret_id', function _callee15(req, res) {
  var _req$body8, name, message, livret_id, livret;

  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _req$body8 = req.body, name = _req$body8.name, message = _req$body8.message;
          livret_id = req.params.livret_id; // Find the existing Livret based on the livret_id

          _context15.next = 5;
          return regeneratorRuntime.awrap(Livret.findById(livret_id));

        case 5:
          livret = _context15.sent;

          if (!livret) {
            _context15.next = 13;
            break;
          }

          livret.practicalInfo = {
            Name: name,
            Message: message
          };
          _context15.next = 10;
          return regeneratorRuntime.awrap(livret.save());

        case 10:
          res.status(201).json({
            message: 'Wi-Fi data saved successfully!'
          });
          _context15.next = 14;
          break;

        case 13:
          res.status(404).json({
            message: 'Livret not found.'
          });

        case 14:
          _context15.next = 20;
          break;

        case 16:
          _context15.prev = 16;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);
          res.status(500).json({
            message: 'Failed to save Wi-Fi data.'
          });

        case 20:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router.get('/4/:livret_id', function _callee16(req, res) {
  var livret_id, livret;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          livret_id = req.params.livret_id; // Find the existing Livret based on the livret_id

          _context16.next = 4;
          return regeneratorRuntime.awrap(Livret.findById(livret_id));

        case 4:
          livret = _context16.sent;
          res.status(200).json(livret.practicalInfo); // If the livret is found, update the Wi-Fi data

          _context16.next = 12;
          break;

        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);
          res.status(500).json({
            message: 'Failed to save Wi-Fi data.'
          });

        case 12:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //info depart

router.post('/5/:livret_id', function _callee17(req, res) {
  var _req$body9, title, time, livret_id, livret;

  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _req$body9 = req.body, title = _req$body9.title, time = _req$body9.time;
          livret_id = req.params.livret_id; // Find the existing Livret based on the livret_id

          _context17.next = 5;
          return regeneratorRuntime.awrap(Livret.findById(livret_id));

        case 5:
          livret = _context17.sent;

          if (!livret) {
            _context17.next = 13;
            break;
          }

          livret.departure = {
            Name: title,
            Time: time
          };
          _context17.next = 10;
          return regeneratorRuntime.awrap(livret.save());

        case 10:
          res.status(201).json({
            message: 'Wi-Fi data saved successfully!'
          });
          _context17.next = 14;
          break;

        case 13:
          res.status(404).json({
            message: 'Livret not found.'
          });

        case 14:
          _context17.next = 20;
          break;

        case 16:
          _context17.prev = 16;
          _context17.t0 = _context17["catch"](0);
          console.log(_context17.t0);
          res.status(500).json({
            message: 'Failed to save Wi-Fi data.'
          });

        case 20:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router.get('/5/:livret_id', function _callee18(req, res) {
  var livret_id, livret;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          livret_id = req.params.livret_id; // Find the existing Livret based on the livret_id

          _context18.next = 4;
          return regeneratorRuntime.awrap(Livret.findById(livret_id));

        case 4:
          livret = _context18.sent;
          res.status(200).json(livret.departure); // If the livret is found, update the Wi-Fi data

          _context18.next = 12;
          break;

        case 8:
          _context18.prev = 8;
          _context18.t0 = _context18["catch"](0);
          console.log(_context18.t0);
          res.status(500).json({
            message: 'Failed to save Wi-Fi data.'
          });

        case 12:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // POST endpoint for saving data for Component7 (including text and image)

router.post('/7/:livret_id', function _callee19(req, res) {
  var _req$body10, text, text1, arrivalTime, imageUrl, livret_id, livret;

  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _req$body10 = req.body, text = _req$body10.text, text1 = _req$body10.text1, arrivalTime = _req$body10.arrivalTime, imageUrl = _req$body10.imageUrl;
          livret_id = req.params.livret_id; // Find the existing Livret based on the livret_id

          _context19.next = 5;
          return regeneratorRuntime.awrap(Livret.findById(livret_id));

        case 5:
          livret = _context19.sent;

          if (!livret) {
            _context19.next = 13;
            break;
          }

          livret.checkIn = {
            RH_name: text,
            parking: text1,
            timestamp: arrivalTime,
            image: imageUrl
          };
          _context19.next = 10;
          return regeneratorRuntime.awrap(livret.save());

        case 10:
          res.status(201).json({
            message: 'Component7 data saved successfully!'
          });
          _context19.next = 14;
          break;

        case 13:
          res.status(404).json({
            message: 'Livret not found.'
          });

        case 14:
          _context19.next = 20;
          break;

        case 16:
          _context19.prev = 16;
          _context19.t0 = _context19["catch"](0);
          console.log(_context19.t0);
          res.status(500).json({
            message: 'Failed to save Component7 data.'
          });

        case 20:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router.get('/check-email/:email', function _callee20(req, res) {
  var email, existingUser;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          email = req.params.email;
          _context20.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context20.sent;

          if (existingUser) {
            res.json({
              exists: true
            }); // Email already exists
          } else {
            res.json({
              exists: false
            }); // Email doesn't exist
          }

          _context20.next = 12;
          break;

        case 8:
          _context20.prev = 8;
          _context20.t0 = _context20["catch"](0);
          console.error("Error checking email:", _context20.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 12:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;