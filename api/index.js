// Import necessary modules and models
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const Place = require('./models/place'); // Ensure you import the Place model
const Booking = require('./models/booking')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

require('dotenv').config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'Anu@2345';

// Middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Test route
app.get('/test', (req, res) => {
    res.json('test ok');
});

// Registration route
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const userDoc = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json(userDoc);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passwordMatch = bcrypt.compareSync(password, userDoc.password);
            if (passwordMatch) {
                jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
                });
            } else {
                res.status(401).json('Incorrect password');
            }
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Profile route
app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
            if (err) {
                console.error('Error verifying token:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const user = await User.findById(decoded.id, 'username email');
            res.json(user);
        });
    } else {
        res.json(null);
    }
});

// Logout route
app.post('/logout', async (req, res) => {
    res.cookie('token', '').json(true);
});

// Image upload by link route
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const destination = path.join(__dirname, 'uploads', newName);
    try {
        await imageDownloader.image({
            url: link,
            dest: destination,
        });
        res.json({ filename: newName });
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Failed to download image' });
    }
});

// Set up multer middleware
const photoMiddleware = multer({ dest: 'uploads/' });

// Image upload route
app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path: filePath, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = filePath + '.' + ext;
        fs.renameSync(filePath, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);
});

// Places route
app.post('/places', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {
      title,address,addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner:userData.id,
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,price
      });
      res.json(placeDoc);
      
    });
});

app.get('/user-places' , (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {id} = userData
        res.json(await Place.find({owner:id}));
    });

})
app.get('/places/:id' , async(req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params
    res.json(await Place.findById(id))
})
app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {id} = req.body;
    const {
        title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests,price
    } = req.body.data;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (!placeDoc) {
            return res.status(404).json({ error: 'Place not found' });
        }
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests,price
            });
            await placeDoc.save();
            res.json('ok');
        } else {
            res.status(403).json({ error: 'Unauthorized to update this place' });
        }
    });
});

app.get('/places' , async(req , res) => {
    res.json( await Place.find())
})

app.post('/bookings' , async(req,res) => {
    const userData = await getUserDataFromToken(req)
    const {places , checkIn , checkOut , guests , name , phone , price} = req.body;
    if (!places || !checkIn || !checkOut || !guests || !name || !phone || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    Booking.create({
        places , checkIn , checkOut , guests , name , phone , price , user:userData.id
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        throw err
    })
})

function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        const { token } = req.cookies;
        if (!token) {
            return reject(new Error('Token not provided'));
        }

        jwt.verify(token, jwtSecret, (err, userData) => {
            if (err) {
                return reject(err);
            }
            resolve(userData);
        });
    });
}

app.get('/bookings', async (req, res) => {
    try {
        const userData = await getUserDataFromToken(req);
        if (!userData) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const bookings = await Booking.find({ user: userData.id }).populate('places');
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});