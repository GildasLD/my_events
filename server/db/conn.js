const { MongoClient } = require("mongodb");
const db = "mongodb://127.0.0.1:27042/mern-pool";
const client = new MongoClient(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("users");
        console.log("Successfully connected to MongoDB/users.");
      }
      return callback(err);
    });
  }, //202d44020abb332961824b6aa694547e8986dd0e

  getDb: function () {
    return _db;
  },
};
