require("dotenv").config();

const connectDB = require("../config/db");
const Destination = require("../models/Destination");

const pokhara = require("./pokhara");
const mustang = require("./mustang");
const chitwan = require("./chitwan");
const manang = require("./manang");
const tilicho = require("./tilicho");
const lumbini = require("./lumbini");
const sheyPhoksundo = require("./sheyPhoksundo");
const bandipur = require("./bandipur");
const ilam = require("./ilam");
const nagarkot = require("./nagarkot");
const bhaktapur = require("./bhaktapur");
const janakpur = require("./janakpur");

const destinations = [
  pokhara,
  mustang,
  chitwan,
  manang,
  tilicho,
  lumbini,
  sheyPhoksundo,
  bandipur,
  ilam,
  nagarkot,
  bhaktapur,
  janakpur,
];

const importData = async () => {
  try {
    await connectDB();

    await Destination.deleteMany();

    await Destination.insertMany(destinations);

    console.log("=================================");
    console.log("Destinations Seeded Successfully");
    console.log(`Inserted ${destinations.length} destinations`);
    console.log("=================================");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();

