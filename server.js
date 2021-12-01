const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");

app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  hbs.engine({
    layoutsDir: `${__dirname}/views/layouts`,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening at http://localhost:3001"));
});

// Temp routing for handlebars testing
app.get("/", async (req, res) => {
  res.render("main", { layout: "index" });
});
