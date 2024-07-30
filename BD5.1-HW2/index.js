const express = require("express");
const { restaurants } = require("./models/restaurants.models");
const { sequelize } = require("./lib/index");
const app = express();

let restaurantData = [
  {
    name: "The Gourmet Kitchen",
    cuisine: "French",
    location: "Paris",
    rating: 4.7,
    price_range: "$$$",
    opening_hours: "10:00 AM - 11:00 PM",
  },
  {
    name: "Sushi Haven",
    cuisine: "Japanese",
    location: "Tokyo",
    rating: 4.8,
    price_range: "$$",
    opening_hours: "11:00 AM - 10:00 PM",
  },
  {
    name: "Café Italia",
    cuisine: "Italian",
    location: "Rome",
    rating: 4.6,
    price_range: "$$",
    opening_hours: "8:00 AM - 10:00 PM",
  },
  {
    name: "Taco Fiesta",
    cuisine: "Mexican",
    location: "Mexico City",
    rating: 4.5,
    price_range: "$",
    opening_hours: "9:00 AM - 9:00 PM",
  },
  {
    name: "The Royal Curry",
    cuisine: "Indian",
    location: "Mumbai",
    rating: 4.4,
    price_range: "$$",
    opening_hours: "12:00 PM - 11:00 PM",
  },
  {
    name: "Burger Bliss",
    cuisine: "American",
    location: "New York",
    rating: 4.3,
    price_range: "$",
    opening_hours: "10:00 AM - 12:00 AM",
  },
  {
    name: "Dim Sum Delight",
    cuisine: "Chinese",
    location: "Hong Kong",
    rating: 4.6,
    price_range: "$$",
    opening_hours: "10:00 AM - 10:00 PM",
  },
  {
    name: "Le Petit Bistro",
    cuisine: "French",
    location: "Nice",
    rating: 4.7,
    price_range: "$$",
    opening_hours: "11:00 AM - 10:00 PM",
  },
  {
    name: "Szechuan Spice",
    cuisine: "Chinese",
    location: "Beijing",
    rating: 4.5,
    price_range: "$$",
    opening_hours: "11:00 AM - 10:00 PM",
  },
  {
    name: "Barbecue Junction",
    cuisine: "BBQ",
    location: "Austin",
    rating: 4.8,
    price_range: "$$",
    opening_hours: "11:00 AM - 11:00 PM",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await restaurants.bulkCreate(restaurantData);

    res.status(200).json({ message: "Database Seeding successful" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error Seeding the Data", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
