const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MongoAtlasUri;
//To fix all deprecation warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

console.log(uri);
const connect = () => {
  mongoose.connect(uri, (err, db) => {
    if (!err) {
      console.log("connection successful");
    } else {
      console.log(err);
    }
  });
};

module.exports = connect;
