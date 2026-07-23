const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Host:", conn.connection.host);
    console.log("Port:", conn.connection.port);
    console.log("Database:", conn.connection.name);

    const admin = conn.connection.db.admin();
    const info = await admin.serverStatus();

    console.log("MongoDB Version:", info.version);
    console.log("Process ID:", info.pid);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;

