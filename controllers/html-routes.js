// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const PATH = require("path");

//Functions
function LoggedIn(req)
{
  if (req.cookies.id !== undefined)
    return true;
  else
    return false;
}
// Routes
// =============================================================
module.exports = function(app) 
{

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // EXAMPLE for landing page (test.html using handlebars)
  app.get("/", function(req, res) {
   res.sendFile(PATH.join(__dirname, "../public/landing.html"));
  });

  app.get("/sign-in", function(req, res) {
    res.sendFile(PATH.join(__dirname, "../public/sign-in.html"));
  });

  app.get("/sign-up", function(req, res) {
    res.sendFile(PATH.join(__dirname, "../public/sign-up.html"));
  });

  app.get("/user-homepage", function(req, res) {
    if(LoggedIn(req))
      res.sendFile(PATH.join(__dirname, "../public/user-homepage.html"));
    else
      res.sendFile(PATH.join(__dirname, "../public/sign-up.html"));
  });

  app.get("/make-a-listing", function(req, res) {
    if(LoggedIn(req))
      res.sendFile(PATH.join(__dirname, "../public/make-a-listing.html"));
    else
      res.sendFile(PATH.join(__dirname, "../public/sign-up.html"));
  });

  app.get("/all-listings", function(req, res) {
    if(LoggedIn(req))
      res.sendFile(PATH.join(__dirname, "../public/all-listings.html"));
    else
      res.sendFile(PATH.join(__dirname, "../public/sign-up.html"));
  });

  app.get("/warehouse", function(req, res) {
    if(LoggedIn(req))
      res.sendFile(PATH.join(__dirname, "../public/warehouse.html"));
    else
      res.sendFile(PATH.join(__dirname, "../public/sign-up.html"));
  });

  app.get("/leaderboard", function(req, res) {
    res.sendFile(PATH.join(__dirname, "../public/leaderboard.html"));
  });

};
