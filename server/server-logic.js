const Q = require('q');
const RegularUsers = require('./../models/userSchema.js');
const BusinessUsers = require('./../models/businessUserSchema.js');
const Events = require('./../models/eventSchema.js');
const utils = require('../utils/utilities.js');


// Promisify a few mongoose methods with the `q` promise library
const findUser = Q.nbind(RegularUsers.findOne, RegularUsers);
const findBusUser = Q.nbind(BusinessUsers.findOne, BusinessUsers);
const findAllEvents = Q.nbind(Events.find, Events);
const postAnEvent = Q.nbind(Events.create, Events);

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

  postEvent: (req, res, next) => {
    const body = req.body;

    const tags = body.tags ? body.tags.split(' ') : '';

    postAnEvent({
      username: body.username,
      eventTime: body.eventTime,
      location: body.location,
      createdAt: new Date().toLocaleString(),
      tags,
      businessName: body.businessName,
      picLink: body.picLink,
      busLink: body.busLink,
      description: body.dscription,
    })
    .then(() => {
      res.setStatus(201).end();
    })
    .fail(err => err);
  },

  getUser: (req, res) => {
    findUser({
      username: req.body.username,
    })
    .then((data) => {
      res.send(data);
    })
    .catch(err => err);
  },

};
