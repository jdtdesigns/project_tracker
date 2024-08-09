require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { engine } = require('express-handlebars');

const client = require('./config/connection');
const view_routes = require('./routes/view_routes');
const user_routes = require('./routes/user_routes');

// Create our server
const app = express();
const PORT = 3001;

// Create a GET route for every file in public
app.use(express.static('./public'));

// Allow urlencoded form data to be attached to req.body
app.use(express.urlencoded({ extended: false }));

// Load/Setup Handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Load/Setup Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      db: client,
    }),
    saveUninitialized: false,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    cookie: {
      httpOnly: true // sends a secure cookie that cannot be accessed by browser JS
    }
  })
);

// Load in the routes
app.use('/', [view_routes, user_routes]);

// Start the server/Make the server listen for client side requests
client.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  });


