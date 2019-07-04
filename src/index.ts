import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT; // default port to listen

const app = express();

// Configure Express to parse incoming JSON data
app.use(express.json());

// configure session auth
sessionAuth.register(app);

// configure routes
routes.register(app);

// configure Express to use ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Configure Express to serve static files in the public folder
app.use(express.static(path.join(__dirname, "public")));

// define a route handler for the default home page
app.get("/", (req, res) => {
  // render the index template
  res.render("index");
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
