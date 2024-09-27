const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

//use for creating unique ids randomly
const { v4: uuidv4 } = require("uuid");


// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//use to parse data for express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set ejs folder and public folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//listining port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//array for data 
let posts = [
  {
    id: uuidv4(),
    name: "rahul",
    email: "rahul@gmail.com",
    phone: "8097573742",
  },
  {
    id: uuidv4(),
    name: "suraj",
    email: "suraj@gmail.com",
    phone: "8057575742",
  },
  {
    id: uuidv4(),
    name: "sonali",
    email: "sonali@gmail.com",
    phone: "8097979742",
  },
];

//api for render static data
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//api for post new data
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { name, email, phone } = req.body;
  let id = uuidv4(); //
  posts.push({ id, name, email, phone }); // data push in posts array
  res.redirect("/posts"); //use to redirected on get api page
});

//api for get data from id basis for detail page
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

//edit exiting value email or mobile number
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newEmail = req.body.email;
  let newPhone = req.body.phone;
  let post = posts.find((p) => id === p.id);
  post.email = newEmail;
  post.phone = newPhone;
  console.log("patch request working");
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
