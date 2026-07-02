require("dotenv").config();

const connectDB = require("../config/db");

const Adventure = require("../models/Adventure");

const adventures = require("./adventures");

const importData = async () => {
  try {
    await connectDB();

    await Adventure.deleteMany();

    await Adventure.insertMany(adventures);

    console.log("=================================");
    console.log("Adventures Seeded Successfully");
    console.log(`Inserted ${adventures.length} adventures`);
    console.log("=================================");

    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();