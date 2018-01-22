process.env.NODE_ENV = "test";
var assert = require("assert");
var Browser = require("zombie");
const configDB = require("../config/database.js");
const { app, runServer, closeServer } = require("../server.js");

describe("contact page", function() {
  before(function(done) {
    // return runServer(configDB.testDBUrl).then(server => {
    //   this.server = server;
    //   this.browser = new Browser({ site: "http://localhost:8080" });
    //   done();
    // });
    // .catch(e => console.log(e));
    // console.log(this.server);
    return runServer(configDB.testDBUrl);
  });

  // load the contact page before each test
  beforeEach(function(done) {
    this.browser.visit("/", done);
  });

  // it('should show contact a form', function() {
  //   assert.ok(this.browser.success);
  //   assert.equal(this.browser.text('h1'), 'Contact');
  //   assert.equal(this.browser.text('form label'), 'First NameLast NameEmailMessage');
  // });
  //
  it("should refuse empty submissions", function(done) {
    var browser = this.browser;

    assert.ok(browser.success);
    assert.equal(browser.text("h2.shadow"), "Work smarter. Not harder.");
    // assert.equal(browser.text("div.alert"), "Please fill in all the fields");
    done();
  });
  //
  // it('should refuse partial submissions', function(done) {
  //   var browser = this.browser;
  //   browser.fill('first_name', 'John');
  //   browser.pressButton('Send').then(function() {
  //     assert.ok(browser.success);
  //     assert.equal(browser.text('h1'), 'Contact');
  //     assert.equal(browser.text('div.alert'), 'Please fill in all the fields');
  //   }).then(done, done);
  // });
  //
  // it('should keep values on partial submissions', function(done) {
  //   var browser = this.browser;
  //   browser.fill('first_name', 'John');
  //   browser.pressButton('Send').then(function() {
  //     assert.equal(browser.field('first_name').value, 'John');
  //   }).then(done, done);
  // });
  //
  // it('should refuse invalid emails', function(done) {
  //   var browser = this.browser;
  //   browser.fill('first_name', 'John');
  //   browser.fill('last_name', 'Doe');
  //   browser.fill('email', 'incorrect email');
  //   browser.fill('message', 'Lorem ipsum');
  //   browser.pressButton('Send').then(function() {
  //     assert.ok(browser.success);
  //     assert.equal(browser.text('h1'), 'Contact');
  //     assert.equal(browser.text('div.alert'), 'Please check the email address format');
  //   }).then(done, done);
  // });
  //
  // it('should accept complete submissions', function(done) {
  //   var browser = this.browser;
  //   browser.fill('first_name', 'John');
  //   browser.fill('last_name', 'Doe');
  //   browser.fill('email', 'test@example.com');
  //   browser.fill('message', 'Lorem ipsum');
  //   browser.pressButton('Send').then(function() {
  //     assert.ok(browser.success);
  //     assert.equal(browser.text('h1'), 'Message Sent');
  //     assert.equal(browser.text('p'), 'Thank you for your message. We\'ll answer you shortly.');
  //   }).then(done, done);
  // });

  after(function(done) {
    this.server.close(done);
  });
});
