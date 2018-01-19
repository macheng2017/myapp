
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId; //why did he write like that?
var PostSchema = new Schema({
    title:String,
    content:String,
    flag:String,
    authorId:ObjectId//添加作者ID
});

var PostModel = mongoose.model('post',PostSchema);

module.exports = PostModel;