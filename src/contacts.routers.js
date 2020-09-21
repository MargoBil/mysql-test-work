const {Router} = require('express');
const contactsRouter = Router();
const {getContacts} = require('./contacts.controllers');


//get all contacts:
contactsRouter.get("/", getContacts);

module.exports = contactsRouter;