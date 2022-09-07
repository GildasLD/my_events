const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect("mongodb://localhost:27042/mern-pool", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.error({
        success: false,
        message: "Database connection failed. exiting now..." + error,
        details: { error },
      });
      process.exit(1);
    });
};
