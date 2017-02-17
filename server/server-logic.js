const Q = require('q');
const RegularUsers = require('./../models/userSchema.js');
const BusinessUsers = require('./../models/businessUserSchema.js');
const Events = require('./../models/eventSchema.js');


// Promisify a few mongoose methods with the `q` promise library
const findUser = Q.nbind(RegularUsers.findOne, RegularUsers);
const findBusUser = Q.nbind(BusinessUsers.findOne, BusinessUsers);
const findAllEvents = Q.nbind(Events.find, Events);

module.exports = {

  getEvents: (req, res, next) => {
    findAllEvents({})
      .then((events) => {
        res.json(events);
      })
      .fail((error) => {
        next(error);
      });
  },

  // getUser: (req, res, next) => {
  //
  // },

  // postEvent: (req, res, next) => {
  //
  // },
};
