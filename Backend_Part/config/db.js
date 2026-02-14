// // lets write the logic for connecting to mongodb for that we use odm library mongoose it helps to connect to the mongodb easily..
// const mongoose = require('mongoose')

// const connectDB = async () =>
// {
//     try
//     {
//         mongoose.set("strictQuery",true)
//         const conn = await mongoose.connect(process.env.MONGO_URI)
//         console.log(`Connected To database Successfully....${conn}`)
//     }catch(error)
//     {
//         console.log(`Error Occurred...`,error.message)
//         process.exit(1)
//     }
//     // lets handle the connection events..
//     mongoose.connection.on('disconnected',()=>{console.warn(`Disconnected To Database...`)})
//     mongoose.connection.on('reconnected',()=>{console.log(`Reconnected To Database Succesfully...`)})
// }

// export default connectDB










const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1);
  }
};

// Optional: Handle connection events
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB Disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB Reconnected");
});

module.exports = connectDB;
