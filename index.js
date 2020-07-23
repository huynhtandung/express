const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//controllers
const bird = require('./controllers/bird')
const fish = require('./controllers/fish')

const app = express();
const port = 3000;

//parser body
app.use(bodyParser.urlencoded({ extended: true }))

//cookie parser
app.use(cookieParser())

//view engine
app.set('views', './views')
app.set('view engine', 'pug')

//static folder
//app.use(express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.all("/all", (req, res) => {
  res.send("Request for all methods get post put delete ...");
});

app.get("/", (req, res) => {
  console.log(req.cookies)
  res.send("<strong>Hello world</strong>");
});

app.get("/params/:id", (req, res) => {
  res.send(`Params with id = ${req.params.id}`);
});

app.get("/query", (req, res) => {
  res.send(`Query with ${JSON.stringify(req.query)}`);
});

//call back api, can have many callback in handlers
const cb = (req, res, next) => {
  console.log("Handling...");
  next();
};
app.get(
  "/callback",
  (req, res, next) => {
    console.log("Preparing...");
    next();
  },
  [cb],
  (req, res) => {
    console.log("Finishing");
    res.status(201).send("Callback");
  }
);

//download images
app.get("/download/:name", (req, res) => {
  res.download(path.join(__dirname, `public/images/${req.params.name}`));
});

app.get("/redirect", (req, res) => {
  res.redirect("http://localhost:3000");
});

app.route('/book')
  .get((req, res) => {
    res.send('Get Book')
  })
  .post((req, res) => {
    res.send(`Create Book with body ${JSON.stringify(req.body)}`)
  })

app.use('/bird', bird)
app.use('/fish', fish)


//profile engine
app.get('/profile', (req, res) => {
  res.render('Profile', { title: 'Profile', name: 'Huynh Tan Dung', age: 22 })
})

//express 4
app.get('/express/:version', (req, res, next) => {
  if (req.params.version == '4') next('route')
  else next()
}, (req, res, next) => {
  res.send('Not express v4')
})

app.get('/express/:version', (req, res) => {
  res.send('Express v4')
})

// handler for the /user/:id path, which renders a special page
app.get('/users/:id', function (req, res, next) {
  res.send('special')
})



//file not found handle
app.use((req, res, next) => {
  console.log('Not found')
  //if(err) next(err)
  next()
}, (req, res) => {
  res.status(404).send("File not found :(");
});

app.listen(port, () => {
  console.log("Server is running...");
});
