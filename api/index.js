const express = require('express');
const app = express();
const port = 4000;
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const cors = require('cors');
// modal
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Reser = require('./models/Reservation.js');
const cookieParser = require('cookie-parser');

// passs
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);
const jwt = require('jsonwebtoken');
const jwtSecret = 'dgjwewh3rhgsddggs';


// file upload
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });


app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  // origin: 'http://127.0.0.1:5173',
  origin: 'https://airn-bnb-app-client.vercel.app'
}));
try {
  mongoose.connect(process.env.MONGGO_URL);
  console.log("Connect mongoose success");
} catch (error) {
  console.log("Connect mongoose failed");
}

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, hash)
    })
    res.json(userDoc);
  } catch (error) {
    res.status(402).json(error);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name
        },
          jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: 'false' });
            res.json(token);
          });
      } else {
        res.status(422).json("wrong password");
      }
    } else {
      res.status(402).json("not found user");
    }
  } catch (error) {
    res.status(402).json(error);
  }
});
// 1:40-40
app.get('/profile', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id, token });
    })
  } else {
    res.json(null);
  }
});

app.get('/logout', async (req, res) => {
  // clearCookie('token')
  res.cookie('token', null);
  return res.status(200).json('User Logged out');
});

app.post('/places', async (req, res) => {
  const {
    price,
    location,
    category,
    title,
    description,
    imageSrc,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue } = req.body;
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner: userData.id,
        price,
        category,
        title,
        description,
        imageSrc,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue,
        location
      })
      res.json(placeDoc);
    })
  };
});


app.get('/my-places', async (req, res) => {
  // const { token } = req.cookies;
  // if (token) {
  //   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
  // if (err) throw err;
  const places = await Place.find();
  // const places = await Place.find({ owner: userData.id });
  res.json(places);
  //   })
  // } else {
  //   res.json(null);
  // }
});

app.post('/my-places-detail', async (req, res) => {
  const { idPlace } = req.body;
  //   const { token } = req.cookies;
  //   if (token) {
  //     jwt.verify(token, jwtSecret, {}, async (err, userData) => {
  //       if (err) throw err;
  // const places = await Place.find();
  const places = await Place.find({ _id: idPlace });
  res.json(places);
  //   })
  // } else {
  //   res.json(null);
  // }
});


app.post('/reservations', async (req, res) => {
  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
    title,
    location
  } = req.body;
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const reserDoc = await Reser.create({
        owner: userData.id,
        listingId,
        startDate,
        endDate,
        totalPrice,
        title,
        location
      })
      res.json(reserDoc);
    })
  };
});


app.get('/reservations', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const places = await Reser.find({ owner: userData.id });
      res.json(places);
      // res.json(userData);
    })
  } else {
    res.json(null);
  }
});

app.delete('/delete-reservations/:id', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const idReser = req.params.id;
      const ReserDoc = await Reser.deleteOne({ listingId: idReser });
      res.json(ReserDoc);
      // res.json(req.params.id);
    })
  } else {
    res.status(500).json({ error: "Not found in DB" });
  }
});

app.post('/search-places', async (req, res) => {
  if (req.body) {
    const { locationLabel, region, guestCount, roomCount, bathroomCount } = req.body;
    console.log(region);
    const places = await Place.find({ "location.region": region });
    // const places = await Place.find({ location: { region: region } });
    res.status(200).json(places);
  } else {
    res.json(null);
  }
});
// 


// 64acf6b711812a3ea695224f
// app.post('/upload', upload.single('file'), async (req, res) => {
//   const data = req.file;
//   res.json(result);
// });



app.listen(port, () => console.log(`Example app listening on port ${ port }!`))