var mongoose = require("mongoose");
var uri = "mongodb://localhost:32768/myapp"
mongoose.connect(uri,{
    useMongoClient:true
});