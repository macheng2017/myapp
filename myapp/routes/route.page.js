var express = require('express');
var marked = require('marked'); //引入marked
var router = express.Router();
var PostModel = require("../models/post");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
// Get Posts page
router.get('/posts', (req, res, next) => {
  res.render("posts", {
    title: "你好!!"
  });
});
/* GET users listing. */
router.get('/user', function (req, res, next) {
  res.send('respond with a resource');
});

/*GET posts create page */
router.get('/posts/create', (req, res, next) => {
  res.render("create",{title:"填写表单"});
}); 
/* GET posts show article page */

router.get('/posts/show/:id',(req,res,next)=>{
 /*  var id = req.query.id; */
  var id = req.params.id;

  PostModel.findOne({_id:id},(err,post)=>{
    // push the content and convert to markdown syntax 
    post.content = marked(post.content);
    res.render('show',{title:"文章详情 "+post.title,post});
  });
});
/* processing send the edit article request of client browser then response an HTML skeleton   */

router.get("/posts/edit/:id",(req,res,next)=>{
 /*  var id = req.query.id; */ 
  var id = req.params.id;

    res.render('edit',{title:"编辑文章",id:id});
});

/* GET signup page.
 added the  route method for sigup  */
router.get("/signup",(req,res,next)=>{
  res.render('signup');
});
/* GET signin page */
router.get("/signin",(req,res,next)=>{
  res.render('signin');
});


module.exports = router;