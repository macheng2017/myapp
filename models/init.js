var mongoose = require("mongoose");
// var uri = "mongodb://localhost:32768/myapp"
var uri = "mongodb://192.168.99.100:32769/myapp"
mongoose.connect(uri,{
    useMongoClient:true
});