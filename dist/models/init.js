"use strict";

var mongoose = require("mongoose");
var config = require("../config");
//var uri = "mongodb://localhost:27017/myapp"

mongoose.connect(config.mongodbUrl, {
  useMongoClient: true
});
//# sourceMappingURL=init.js.map