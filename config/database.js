const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((error) => {
      console.error("DB Connection Issue:", error);
    });
};
