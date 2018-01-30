process.env.NODE_ENV = "test";
var assert = require("assert");
var Browser = require("zombie");
const configDB = require("../config/database.js");
const { app, runServer, closeServer } = require("../server.js");
Browser.localhost("mrkt-tracker.heroku.com", 8080);
const browser = new Browser();
let cookies = {};
describe("All pages", function() {
  before(function() {
    return runServer(configDB.testDBUrl);
  });

  it("Homepage should display homepage stuff", function(done) {
    browser.visit("/", () => {
      assert.ok(browser.success);
      assert.equal(browser.text("h2.shadow"), "Work smarter. Not harder.");
      // TODO: TEST MORE HOME STUFF HERE
      done();
    });
  });

  it("Test creating an account", function(done) {
    browser.visit("/signup", () => {
      assert.ok(browser.success);
      browser
        .fill("email", "zombie@underworld.dead")
        .fill("password", "eat-the-living");
      browser.pressButton("#signup", () => {
        cookies = browser.cookies;
        //browser.setCookie("connect.sid", cookies);
        //console.log(cookies);
        browser.visit("/profile", () => {
          assert.ok(browser.success);
          assert.equal(browser.text("h1"), "Profile Page");
        });
      });

      //;
      //assert.equal(browser.text("h2.shadow"), "Work smarter. Not harder.");
      // TODO: TEST MORE HOME STUFF HERE
      done();
    });
  });

  after(function() {
    return closeServer();
  });
});
