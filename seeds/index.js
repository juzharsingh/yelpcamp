const mongoose = require('mongoose');
const cities = require('./cities');
const {
  places,
  descriptors
} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // below is your user id
      author: '62c3ffefa4c43576025aebea',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price,
      geometry: {
          type : "Point",
          coordinates : [
            cities[random1000].longitude,
            cities[random1000].latitude,
          ]
      },
      images: [{
          url: 'https://res.cloudinary.com/dqd2qo3ya/image/upload/v1657630541/YelpCamp/tkzcytrvl2steioh3vhg.png',
          filename: 'YelpCamp/tkzcytrvl2steioh3vhg',
        },
        {
          url: 'https://res.cloudinary.com/dqd2qo3ya/image/upload/v1657630544/YelpCamp/r0lkf5pegr14nkliotll.png',
          filename: 'YelpCamp/r0lkf5pegr14nkliotll',
        }

      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})
