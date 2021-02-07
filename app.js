//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Bonjour! Ciao! Willkommen! Hello! Ohhh my goodness, we're so thrilled you decided to join The BLOG family! hats off on making an excellent decision! You're now officially in the loop to hear all about our awesome blog. If that's not exciting, we don't know what is! But hey, we're not all about the blog; get social with us! Check out our social media pages and discover more about us!. Are you ready for your firtst blog?";
const aboutContent = "This LongBlog features on a wide range of topics in day to day life. It was created to be a more open alternative to earlier question and answer sites such as Experts-Exchange and content writing. The name for the website was chosen by the creater in February 2021 for blog writers who need more than 255 characters."
const contactContent = "Catch you guys there 😉";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-rohitreddy:Rohitreddy9030@cluster0.giybb.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
