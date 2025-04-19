const mongoose = require("mongoose");
const Campground = require("../models/campground");
const Review = require("../models/review");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  await Review.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;

    const camp = new Campground({
      author: "6800564fa4590e75356bf410",
      location: `${cities[random1000].city} ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price,
      description: "This is a campground on YelpCamp",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dc2lyjkps/image/upload/v1743925284/YelpCamp/cfelrrtxu4xdnfqi0lcf.jpg",
          filename: "YelpCamp/cfelrrtxu4xdnfqi0lcf",
        },
        {
          url: "https://res.cloudinary.com/dc2lyjkps/image/upload/v1743925291/YelpCamp/erovneiwungoj8xzhjow.jpg",
          filename: "YelpCamp/erovneiwungoj8xzhjow",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
