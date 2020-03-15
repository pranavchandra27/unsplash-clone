global.fetch = require("node-fetch");
const config = require("universal-config");
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const express = require("express");

const unsplash = new Unsplash({
  accessKey: config.get("APPLICATION_ID"),
  secret: config.get("SECRET"),
  callbackUrl: config.get("CALLBACK_URL")
});

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/photos", (req, res) => {
  unsplash.photos
    .listPhotos(req.query.page, 30, "latest")
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/photos/random", (req, res) => {
  unsplash.photos
    .getRandomPhoto({ query: req.query.value, count: 1 })
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/photos/:id", (req, res) => {
  unsplash.photos
    .getPhoto(req.query.id)
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/search", (req, res) => {
  unsplash.search
    .photos(req.query.query, req.query.page, 30)
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/search/collections", (req, res) => {
  unsplash.search
    .collections(req.query.query, req.query.page, 30)
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/collections", (req, res) => {
  unsplash.collections
    .listCollections(req.query.page, 30, "latest")
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/collections/:id", (req, res) => {
  unsplash.collections
    .getCollectionPhotos(req.query.id, req.query.page, 30, "latest")
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/collection/:id", (req, res) => {
  unsplash.collections
    .getCollection(req.query.id)
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/users", (req, res) => {
  unsplash.users
    .profile(req.query.username)
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/users/photos", (req, res) => {
  unsplash.users
    .photos(req.query.username, req.query.page, 30, "latest", false)
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

app.get("/users/collections", (req, res) => {
  unsplash.users
    .collections(req.query.username, req.query.page, 30, "published")
    .then(toJson)
    .then(json => {
      res.send(json);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
