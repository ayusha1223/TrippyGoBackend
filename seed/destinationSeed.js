require("dotenv").config();

const connectDB = require("../config/db");
const Destination = require("../models/Destination");

const pokhara = require("./pokhara");
const mustang = require("./mustang");
const chitwan = require("./chitwan");
const manang = require("./manang");
const tilicho = require("./tilicho");
// const abc = require("./abc");
// const mardi = require("./mardi");
// const kori = require("./kori");
// const everest = require("./everest");
const lumbini = require("./lumbini");
// const rara = require("./rara");
// const gosaikunda = require("./gosaikunda");
const bandipur = require("./bandipur");
// const ilam = require("./ilam");
// const nagarkot = require("./nagarkot");
const bhaktapur = require("./bhaktapur");
// const patan = require("./patan");
const janakpur = require("./janakpur");

const destinations = [
  pokhara,
  mustang,
  chitwan,
  manang,
  tilicho,
  // abc,
  // mardi,
  // kori,
  // everest,
  lumbini,
  // rara,
  // gosaikunda,
  bandipur,
//   ilam,
//   nagarkot,
  bhaktapur,
//   patan,
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

