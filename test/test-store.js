const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");
const configDB = require("../config/database.js");
const { app, runServer, closeServer } = require("../server.js");

const should = chai.should();

// this function deletes the entire database
// so that nothing is left over after the test
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedStoreData() {
  var stores = [];
  let rand = getRand(1);
  do {
    stores.push(generateStore());
    console.log(stores);
  } while (stores.length < rand);

  return Store.insertMany(stores);
}

function generateStore() {
  let tiers = ["silver", "gold", "platinum"];
  return {
    user: faker.internet.userName(),
    user_assigned_id: faker.finance.account(),
    name: faker.name.findName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    generalComments: faker.lorem.paragraph(),
    tier: tiers[Math.floor(Math.random() * 3)],
    personnel: {},
    havePaperwork: faker.random.boolean(),
    wantPaperworkBack: faker.random.boolean(),
    lastRedeemed: faker.random.boolean()
  };
}

function getRand(n) {
  return Math.floor(Math.random() * n);
}

describe("Stores API resource", function() {
  before(function() {
    return runServer(configDB.testUrl);
  });
  beforeEach(function() {
    return seedStoreData();
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  });

  describe("GET Stores endpoint", function() {
    it("should return stores with right fields", function() {
      let resStore;
      return chai
        .request(app)
        .get("/store")
        .then(function(res) {});
    });
  });
});
