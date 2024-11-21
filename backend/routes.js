// backend/routes.js
const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Profile = require('./models/Profile');
const Livret = require("./models/Livret");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/Images/')); // Uploads folder where the images will be saved
  },
  filename: function (req, file, cb) {
    // Rename the file to avoid name conflicts
    cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


// Route to handle profile photo upload
router.post('/upload-profile-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    // Save the image URL to the database
    const imageUrl = `/images/${req.file.filename}`;

    // Find the profile and update the profileImage field with the image URL
    const profile = await Profile.findOneAndUpdate({ email: e }, { profileImage: imageUrl });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    // Respond with the image URL
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to upload profile photo.' });
  }
});
router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    const Url = `/images/${req.file.filename}`;
    console.log({Url});
    res.status(200).json({ Url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to uploade photo.' });
  }
});
// Route for user registration
let e;
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user record
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for user login
router.post('/login', async (req, res) => {  
    const { email, password } = req.body;
     e=email;
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      
      }
      // If login successful, send back the user data
     // console.log("login succesful");
      e=user.email;
      res.json({
        name: user.name,
        email: user.email,

        // Add other user data fields as needed
      });
    } catch (error) {
        console.log("login INsuccesful");
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// Route for getting all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add more routes as needed
router.get('/profile', (req, res) => {
    // You can add authentication middleware here to check if the user is logged in
    // For example, verify the JWT and extract the user ID to get the user's profile data
    // For demonstration purposes, we'll just return a success message
    res.json({ message: 'You have successfully logged in and accessed the profile page' });
  });

  

  router.post("/contact", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mohammedghrab94@gmail.com",
          pass: "rxucvcisvhvohgog",
        },
      });
    const { fname, lname, phone, email, subject, company, message } = req.body;
  
    const mailOptions = {
      from: email, // Set the sender email dynamically from the form input
      to: "digitallivret@gmail.com", // Email to send the form data
      subject: "Contact Form Submission",
      text: `
        First Name: ${fname}
        Last Name: ${lname}
        Phone: ${phone}
        Email: ${email}
        Subject: ${subject}
        Company: ${company}
        Message: ${message}
      `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  });
  router.post('/check-profile', async (req, res) => {
    const { email } = req.body;
  
    try {
      const existingProfile = await Profile.findOne({ email });
      if (existingProfile) {
        // Profile exists, send a response indicating that the profile exists
        res.status(200).json({ exists: true });
      } else {
        // Profile does not exist, send a response indicating that the profile does not exist
        res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error('Error checking profile:', error);
      res.status(500).json({ error: 'Failed to check profile' });
    }
  });
  router.post('/save-profile/:email', async (req, res) => {
    const { email, name, surname, location } = req.body;
  
    try {
      const profile = new Profile({
        email,
        name,
        surname,
        location,
      });
  
      await profile.save();
      res.status(201).json({ message: 'Profile saved successfully' });
    } catch (error) {
      console.error('Error saving profile:', error);
      res.status(500).json({ error: 'Failed to save profile' });
    }
  });

  router.post(`/profile/:email`, async (req, res) => {
    try {
      const email = e;
      const profile = await Profile.findOne({ email });
  
      if (!profile) {
        console.log("nothing");
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      return res.status(200).json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

router.post("/new-livret", async (req, res) => {
  try {
    const { name, interest, date ,background} = req.body;
    
    // Create a new Livret instance
    const livret = new Livret({
      name,
      interest,
      date,
      userEmail: e,
      background,
    });
   
    
    // Save the Livret to the database
    await livret.save();

    // Respond with a success status
    res.status(201).json({ message: "Livret created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create Livret." });
  }
});


router.get('/livrets/:email', async (req, res) => {
  try {
    const email = e; // Use params to get the email from the URL
    const livrets = await Livret.find({ userEmail: email });
    res.status(200).json(livrets);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// abt livret
router.post('/1/:livret_id', async (req, res) => {
  try {
    const { wifiName, wifiCode } = req.body;
    const { livret_id } = req.params;
    // Find the existing Livret based on the livret_id
    const livret = await Livret.findById(livret_id);

    // If the livret is found, update the Wi-Fi data
    if (livret) {
      livret.wifi = { ssid: wifiName, password: wifiCode };
      await livret.save();
      res.status(201).json({ message: 'Wi-Fi data saved successfully!' });
    } else {
      res.status(404).json({ message: 'Livret not found.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save Wi-Fi data.' });
  }
});
router.get('/1/:livret_id', async (req, res) => {
  try {
    const { livret_id } = req.params;
    // Find the existing Livret based on the livret_id
    const livret = await Livret.findById(livret_id);
    res.status(200).json(livret.wifi);
    // If the livret is found, update the Wi-Fi data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save Wi-Fi data.' });
  }
});
router.get('/3/:livret_id', async (req, res) => {
  try {
    const { livret_id } = req.params;
    // Find the existing Livret based on the livret_id
    const livret = await Livret.findById(livret_id);
    res.status(200).json(livret.numbers);
    // If the livret is found, update the Wi-Fi data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save Wi-Fi data.' });
  }
});

// POST endpoint for saving number data (Component2)
router.post('/3/:livret_id', async (req, res) => {
  try {
    const { number, description } = req.body;
    const { livret_id } = req.params;

    // Find the existing Livret based on the livret_id
    const livret = await Livret.findById(livret_id);

    // If the livret is found, update its numbers array
    if (livret) {
      livret.numbers.push({ number, description });
      await livret.save();
      res.status(201).json({ message: 'Number data saved successfully!' });
    } else {
      res.status(404).json({ message: 'Livret not found.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save number data.' });
  }
});
// information
router.post('/4/:livret_id', async (req, res) => {
  try {
    const { name, message } = req.body;
    const { livret_id } = req.params;
    // Find the existing Livret based on the livret_id
    const livret = await Livret.findById(livret_id);

    // If the livret is found, update the Wi-Fi data
    if (livret) {
      livret.practicalInfo = { Name: name, Message: message };
      await livret.save();
      res.status(201).json({ message: 'Wi-Fi data saved successfully!' });
    } else {
      res.status(404).json({ message: 'Livret not found.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save Wi-Fi data.' });
  }
});
router.get('/4/:livret_id', async (req, res) => {
  try {
    const { livret_id } = req.params;
    // Find the existing Livret based on the livret_id
    const livret = await Livret.findById(livret_id);
    res.status(200).json(livret.practicalInfo);
    // If the livret is found, update the Wi-Fi data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save Wi-Fi data.' });
  }
});


//info depart
router.post('/5/:livret_id', async (req, res) => {
  try {
    const { title, time } = req.body;
    const { livret_id } = req.params;
    // Find the existing Livret based on the livret_id
    const livret = await Livret.findById(livret_id);

    // If the livret is found, update the Wi-Fi data
    if (livret) {
      livret.departure = { Name: title, Time: time };
      await livret.save();
      res.status(201).json({ message: 'Wi-Fi data saved successfully!' });
    } else {
      res.status(404).json({ message: 'Livret not found.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save Wi-Fi data.' });
  }
});
router.get('/5/:livret_id', async (req, res) => {
  try {
    const { livret_id } = req.params;
    // Find the existing Livret based on the livret_id
    const livret = await Livret.findById(livret_id);
    res.status(200).json(livret.departure);
    // If the livret is found, update the Wi-Fi data
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save Wi-Fi data.' });
  }
});
// POST endpoint for saving data for Component7 (including text and image)
router.post('/7/:livret_id', async (req, res) => {
  try {
    const { text, text1, arrivalTime, imageUrl } = req.body;
    const { livret_id } = req.params;

    // Find the existing Livret based on the livret_id
    const livret = await Livret.findById(livret_id);

    // If the livret is found, update the Component7 data
    if (livret) {
      livret.checkIn={RH_name:text ,parking:text1,timestamp:arrivalTime,image:imageUrl}
      await livret.save();
      res.status(201).json({ message: 'Component7 data saved successfully!' });
    } else {
      res.status(404).json({ message: 'Livret not found.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to save Component7 data.' });
  }
});
router.get('/check-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.json({ exists: true }); // Email already exists
    } else {
      res.json({ exists: false }); // Email doesn't exist
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
